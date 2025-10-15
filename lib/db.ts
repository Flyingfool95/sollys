import { neon } from "@neon/serverless";

const databaseUrl = Deno.env.get("DATABASE_URL")!;
export const sql = neon(databaseUrl);

export async function initDatabase() {
	await sql`
	CREATE TABLE IF NOT EXISTS tips2 (
		id SERIAL PRIMARY KEY,
		title TEXT NOT NULL,
		description TEXT NOT NULL,
		weight INT NOT NULL
		)
		`;

	const { count } = (await sql<
		{ count: number }
	>`SELECT COUNT(*)::INT as count FROM tips2`)[0];

	if (count === 0) {
		// The table is empty, insert the book records
		await sql`
			INSERT INTO tips2 (title, description, weight) VALUES
			('Tip 1', 'Go out and get sunlight', 5),
			('Tip 2', 'Go out and get moonlight', 4)
			`;
	}
}
