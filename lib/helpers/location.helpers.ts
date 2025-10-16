import { deleteRow, getRowIfExists, insertRowInDatabase } from "./db.helpers.ts";
import { cacheIsStale, getIPAddress, hashString } from "./global.helpers.ts";

export type GeoCache = {
	ip_hash: string;
	latitude: number;
	longitude: number;
	city: string;
	country: string;
	created_at: Date;
};

const CACHE_TTL = 5000; //1000 * 60 * 60 * 24 * 7; // 7 days

export async function getLocationFromIP(ctx: any) {
	const IP = getIPAddress(ctx);
	if (!IP) throw new Error("Could not determine IP address.");

	const hashedIP = await hashString(IP);

	const cacheResult = (await getRowIfExists<GeoCache>(
		"cache_ip_geolocation",
		"ip_hash",
		hashedIP,
	)) as GeoCache | null;

	// Return valid cache immediately
	if (cacheResult && !cacheIsStale(cacheResult.created_at, CACHE_TTL)) {
		return {
			city: cacheResult.city,
			country: cacheResult.country,
			latitude: cacheResult.latitude,
			longitude: cacheResult.longitude,
		};
	}

	// Delete stale cache asynchronously
	if (cacheResult) void deleteRow("cache_ip_geolocation", "ip_hash", hashedIP);

	try {
		const apiKey = Deno.env.get("IP_GEOLOCATION_API_KEY");
		if (!apiKey) throw new Error("Missing IP geolocation API key.");

		const geoRes = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${IP}`);
		if (!geoRes.ok) throw new Error("Failed to fetch location data from IP.");

		const geoData = await geoRes.json();
		const latitude = Number(geoData.latitude);
		const longitude = Number(geoData.longitude);

		if (isNaN(latitude) || isNaN(longitude)) return;

		const cacheEntry: GeoCache = {
			ip_hash: hashedIP,
			latitude,
			longitude,
			city: geoData.city || "",
			country: geoData.country_name || "",
			created_at: new Date(),
		};

		await insertRowInDatabase("cache_ip_geolocation", cacheEntry);

		return {
			city: cacheEntry.city,
			country: cacheEntry.country,
			latitude,
			longitude,
		};
	} catch (err) {
		console.error("getLocationFromIP error:", err);
		// fallback to stale cache if available
		return cacheResult
			? {
				city: cacheResult.city,
				country: cacheResult.country,
				latitude: cacheResult.latitude,
				longitude: cacheResult.longitude,
			}
			: undefined;
	}
}
