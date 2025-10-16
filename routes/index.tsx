import Dashboard from "../islands/Dashboard.tsx";
import { sql } from "../lib/db.ts";
import { sunData } from "../lib/helpers/sunData.helper.ts";
import { define } from "../utils.ts";

export const handler = define.handlers({
	async GET(ctx) {
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
