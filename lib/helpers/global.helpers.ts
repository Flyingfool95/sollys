export function getIPAddress(ctx) {
	const addr = ctx.info.remoteAddr as Deno.NetAddr;
	const IP = addr.hostname === "localhost" ? "213.89.109.82" : addr.hostname;

	return IP;
}
