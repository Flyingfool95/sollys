import { sql } from "../db.ts";

export async function insertRowInDatabase<T extends Record<string, unknown>>(
	table: string,
	data: T,
): Promise<void> {
	const columns = Object.keys(data);
	const values = Object.values(data);

	const columnList = columns.map((c) => `"${c}"`).join(", ");
	const placeholders = columns.map((_, i) => `$${i + 1}`).join(", ");

	const query = `INSERT INTO "${table}" (${columnList}) VALUES (${placeholders})`;

	await sql.query(query, values);
}

export async function getRowIfExists<T extends Record<string, unknown>>(
	table: string,
	column: string,
	value: unknown,
): Promise<T | null> {
	const query = `SELECT * FROM "${table}" WHERE "${column}" = $1 LIMIT 1`;
	const result = await sql.query<T>(query, [value]);

	return result?.[0] ?? null;
}

export async function deleteRow(
	table: string,
	column: string,
	value: unknown,
): Promise<number> {
	const query = `DELETE FROM "${table}" WHERE "${column}" = $1`;
	const result = await sql.query(query, [value]);

	return result;
}
