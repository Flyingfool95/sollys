import { define } from "../utils.ts";
import { sql } from "../lib/db.ts";
import { getSunData } from "../lib/helpers/sunData.helpers.ts";
import Dashboard from "../islands/Dashboard.tsx";

export const handler = define.handlers({
	async GET(ctx) {
		const sunData = await getSunData(ctx);
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
