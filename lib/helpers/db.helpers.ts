import { sql } from "../db.ts";

export async function insertRowInDatabase(
	table: string,
	data: Record<string, any>,
) {
	const columns = Object.keys(data);
	const values = Object.values(data);

	const columnList = columns.map((c) => `"${c}"`).join(", ");
	const placeholders = columns.map((_, i) => `$${i + 1}`).join(", ");

	const query = `INSERT INTO "${table}" (${columnList}) VALUES (${placeholders})`;

	// ✅ use sql.query() instead of sql()
	await sql.query(query, values);
}
