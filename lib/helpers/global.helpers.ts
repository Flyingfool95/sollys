const DEFAULT_DEV_IP = "213.89.109.82";

export function getIPAddress(ctx: { info: { remoteAddr: Deno.NetAddr } }): string {
	const addr = ctx.info.remoteAddr;
	const host = addr.hostname;

	// Handle local dev addresses
	if (host === "localhost" || host === "::1") return DEFAULT_DEV_IP;

	return host;
}

export async function hashString(input: string): Promise<string> {
	const saltPre = Deno.env.get("HASH_SALT_PRE");
	const saltPost = Deno.env.get("HASH_SALT_POST");

	if (saltPre === undefined || saltPost === undefined) {
		throw new Error("Missing HASH_SALT_PRE or HASH_SALT_POST environment variable.");
	}

	const encoder = new TextEncoder();
	const data = encoder.encode(`${saltPre}${input}${saltPost}`);

	const hashBuffer = await crypto.subtle.digest("SHA-256", data);

	// Convert buffer to hex string
	return Array.from(new Uint8Array(hashBuffer))
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");
}

export function cacheIsStale(cacheCreatedAt: Date, staleTime: number): boolean {
	return Date.now() - cacheCreatedAt.getTime() > staleTime;
}
