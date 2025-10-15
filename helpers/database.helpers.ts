import { initDataBase, sql } from "../lib/db.ts";

initDataBase();

//All tips
export const tips = await sql`SELECT * FROM tips`;

//One random tip
export async function getRandomTip(weight?: number) {
    if (weight !== undefined) {
        // Filter by weight
        const [tip] = await sql`
      SELECT * FROM tips
      WHERE weight <= ${weight}
      ORDER BY RANDOM()
      LIMIT 1
    `;
        return tip;
    } else {
        // No weight filter, just random tip
        const [tip] = await sql`
      SELECT * FROM tips
      ORDER BY RANDOM()
      LIMIT 1
    `;
        return tip;
    }
}
