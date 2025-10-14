import { neon } from "@neon/serverless";

const databaseUrl = Deno.env.get("DATABASE_URL")!;
const sql = neon(databaseUrl);

// Create the tips tabel
await sql`
  CREATE TABLE IF NOT EXISTS tips (
    id SERIAL PRIMARY KEY,
    weight INT NOT NULL,
    title TEXT NOT NULL,
    tip TEXT NOT NULL,
    source TEXT NOT NULL
  )
`;

// Check if the table is empty
const { count } = await sql`SELECT COUNT(*)::INT as count FROM tips`.then((rows) => rows[0]);

if (count === 0) {
    // The table is empty, insert the tips records
    await sql`
    INSERT INTO tips (title, tip, weight, source) VALUES
      ('The first tip', 'Lorem dipsum, dol sit lorits lexica me tedoul neon sop a list LOOK AT THE SUN!!!!', 5, 'https://www.google.com'),
      ('The second tip', 'Lorem dipsum, dol sit lorits lexica me tedoul neon sop a list LOOK AT THE MOOON!!!!', 1, 'https://www.google.com'),
      ('The first tip', 'Lorem dipsum, dol sit lorits lexica me tedoul neon sop a list LOOK AT THE CARRR!!!!', 15, 'https://www.google.com'),
      ('The first tip', 'Lorem dipsum, dol sit lorits lexica me tedoul neon sop a list LOOK AT THE POPEYS!!!!', 7, 'https://www.google.com')
  `;
}

export const tips = await sql`SELECT * FROM tips`;

export async function getRandomTip(weight?: number) {
    if (weight !== undefined) {
        // Filter by weight
        const [tip] = await sql`
      SELECT * FROM tips
      WHERE weight = ${weight}
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
