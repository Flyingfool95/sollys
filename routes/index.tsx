import { sql } from "../lib/db.ts";
import { define } from "../utils.ts";

export const handler = define.handlers({
	async GET(ctx) {
		const tips = await sql`SELECT * FROM tips2`;
		return { data: tips };
	},
});

export default define.page<typeof handler>(({ data }) => {
	return (
		<>
			<p>Dashboard </p>
			<hr />
			<p>Todays tip</p>
		</>
	);
});
