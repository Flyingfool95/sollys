import { define } from "../utils.ts";
import { sql } from "../lib/db.ts";
import { sunData } from "../lib/helpers/sunData.helper.ts";
import Dashboard from "../islands/Dashboard.tsx";

export const handler = define.handlers({
	async GET(ctx) {
		console.log(ctx)
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
