import { define } from "../utils.ts";
import { sql } from "../lib/db.ts";
import { sunData } from "../lib/helpers/sunData.helper.ts";
import Dashboard from "../islands/Dashboard.tsx";
import { insertRowInDatabase } from "../lib/helpers/db.helpers.ts";
import { getIPAddress } from "../lib/helpers/global.helpers.ts";

export const handler = define.handlers({
	async GET(ctx) {
		const IP = getIPAddress(ctx);
		//Fetch geolocation - check cache first and if is a miss then re-fetch from api
		/* 		await insertRowInDatabase("cache_ip_geolocation", {
			ip_hash: "abc123",
			latitude: 37.7749,
			longitude: -122.4194,
			city: "San Francisco",
			country: "US",
			created_at: new Date().toISOString(),
		}); */

		const tips = await sql`SELECT * FROM tips2`;
		return { data: { tips, sunData } };
	},
});

export default define.page<typeof handler>(({ data }) => {
	return (
		<>
			<Dashboard data={data.sunData} />
			<hr />
			<p>Todays tip</p>
		</>
	);
});
