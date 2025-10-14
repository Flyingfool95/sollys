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
  ('Maximize Morning Light', 'Expose yourself to bright natural light within the first hour of waking to reset your circadian rhythm and improve alertness.', 1, 'https://www.sleepfoundation.org'),
  ('Morning Walk', 'Take a 10–15 minute walk outside in the morning to boost mood and energy levels.', 1, 'https://www.cdc.gov'),
  ('Bright Light Exposure', 'Ensure exposure to bright light during the first few hours of the day to enhance cognitive performance.', 2, 'https://www.ncbi.nlm.nih.gov'),
  ('Avoid Dim Lighting', 'Avoid dim lighting in the morning to prevent sleep inertia and maintain alertness.', 2, 'https://www.sleepfoundation.org'),
  ('Midday Sun Break', 'Take a short break outside around midday to maintain energy levels and mood.', 3, 'https://www.cdc.gov'),
  ('Natural Light at Work', 'Ensure your workspace has access to natural light to improve productivity and well-being.', 3, 'https://www.ncbi.nlm.nih.gov'),
  ('Afternoon Sun Exposure', 'Spend time outdoors in the afternoon to maintain circadian rhythm alignment.', 4, 'https://www.sleepfoundation.org'),
  ('Limit Evening Light', 'Reduce exposure to bright light in the evening to prepare for restful sleep.', 4, 'https://www.cdc.gov'),
  ('Evening Walk', 'Take a gentle walk in the evening to unwind and promote better sleep quality.', 5, 'https://www.ncbi.nlm.nih.gov'),
  ('Dim Lighting Indoors', 'Use dim lighting indoors in the evening to signal to your body that it is time to wind down.', 5, 'https://www.sleepfoundation.org'),
  ('Limit Screen Time', 'Avoid screens at least one hour before bedtime to prevent disruption of melatonin production.', 6, 'https://www.cdc.gov'),
  ('Consistent Sleep Schedule', 'Maintain a consistent sleep schedule, even on weekends, to regulate your circadian rhythm.', 6, 'https://www.ncbi.nlm.nih.gov'),
  ('Morning Sunlight', 'Expose yourself to natural sunlight within 30 minutes of waking to enhance mood and alertness.', 7, 'https://www.sleepfoundation.org'),
  ('Bright Light Therapy', 'Consider using a light therapy box if you have limited access to natural sunlight.', 7, 'https://www.cdc.gov'),
  ('Outdoor Activities', 'Engage in outdoor activities during daylight hours to boost vitamin D levels and mood.', 8, 'https://www.ncbi.nlm.nih.gov'),
  ('Avoid Caffeine Late in Day', 'Avoid consuming caffeine in the late afternoon to prevent interference with sleep.', 8, 'https://www.sleepfoundation.org'),
  ('Evening Light Exposure', 'Limit exposure to bright light in the evening to promote melatonin production.', 9, 'https://www.cdc.gov'),
  ('Relaxing Evening Routine', 'Establish a relaxing evening routine to prepare your body for sleep.', 9, 'https://www.ncbi.nlm.nih.gov'),
  ('Limit Naps', 'Avoid napping late in the afternoon to ensure you are ready for sleep at night.', 10, 'https://www.sleepfoundation.org'),
  ('Evening Sunlight', 'If possible, get some sunlight exposure in the early evening to maintain circadian rhythm.', 10, 'https://www.cdc.gov'),
  ('Dim Lighting Indoors', 'Use dim lighting indoors in the evening to signal to your body that it is time to wind down.', 11, 'https://www.ncbi.nlm.nih.gov'),
  ('Limit Screen Time', 'Avoid screens at least one hour before bedtime to prevent disruption of melatonin production.', 11, 'https://www.sleepfoundation.org'),
  ('Consistent Sleep Schedule', 'Maintain a consistent sleep schedule, even on weekends, to regulate your circadian rhythm.', 12, 'https://www.cdc.gov'),
  ('Prepare for Sleep', 'Establish a calming pre-sleep routine to signal to your body that it is time to rest.', 12, 'https://www.ncbi.nlm.nih.gov'),
  ('Morning Light Exposure', 'Expose yourself to natural light within the first hour of waking to reset your circadian rhythm.', 13, 'https://www.sleepfoundation.org'),
  ('Bright Light Exposure', 'Ensure exposure to bright light during the first few hours of the day to enhance cognitive performance.', 13, 'https://www.ncbi.nlm.nih.gov'),
  ('Avoid Dim Lighting', 'Avoid dim lighting in the morning to prevent sleep inertia and maintain alertness.', 14, 'https://www.sleepfoundation.org'),
  ('Midday Sun Break', 'Take a short break outside around midday to maintain energy levels and mood.', 14, 'https://www.cdc.gov'),
  ('Natural Light at Work', 'Ensure your workspace has access to natural light to improve productivity and well-being.', 15, 'https://www.ncbi.nlm.nih.gov'),
  ('Afternoon Sun Exposure', 'Spend time outdoors in the afternoon to maintain circadian rhythm alignment.', 15, 'https://www.sleepfoundation.org'),
  ('Limit Evening Light', 'Reduce exposure to bright light in the evening to prepare for restful sleep.', 16, 'https://www.cdc.gov'),
  ('Evening Walk', 'Take a gentle walk in the evening to unwind and promote better sleep quality.', 16, 'https://www.ncbi.nlm.nih.gov'),
  ('Dim Lighting Indoors', 'Use dim lighting indoors in the evening to signal to your body that it is time to wind down.', 17, 'https://www.sleepfoundation.org'),
  ('Limit Screen Time', 'Avoid screens at least one hour before bedtime to prevent disruption of melatonin production.', 17, 'https://www.cdc.gov'),
  ('Consistent Sleep Schedule', 'Maintain a consistent sleep schedule, even on weekends, to regulate your circadian rhythm.', 18, 'https://www.ncbi.nlm.nih.gov'),
  ('Prepare for Sleep', 'Establish a calming pre-sleep routine to signal to your body that it is time to rest.', 18, 'https://www.sleepfoundation.org'),
  ('Morning Light Exposure', 'Expose yourself to natural light within the first hour of waking to reset your circadian rhythm.', 19, 'https://www.sleepfoundation.org'),
  ('Bright Light Exposure', 'Ensure exposure to bright light during the first few hours of the day to enhance cognitive performance.', 19, 'https://www.ncbi.nlm.nih.gov'),
  ('Avoid Dim Lighting', 'Avoid dim lighting in the morning to prevent sleep inertia and maintain alertness.', 20, 'https://www.sleepfoundation.org'),
  ('Midday Sun Break', 'Take a short break outside around midday to maintain energy levels and mood.', 20, 'https://www.cdc.gov'),
  ('Natural Light at Work', 'Ensure your workspace has access to natural light to improve productivity and well-being.', 21, 'https://www.ncbi.nlm.nih.gov'),
  ('Afternoon Sun Exposure', 'Spend time outdoors in the afternoon to maintain circadian rhythm alignment.', 21, 'https://www.sleepfoundation.org'),
  ('Limit Evening Light', 'Reduce exposure to bright light in the evening to prepare for restful sleep.', 22, 'https://www.cdc.gov'),
  ('Evening Walk', 'Take a gentle walk in the evening to unwind and promote better sleep quality.', 22, 'https://www.ncbi.nlm.nih.gov'),
  ('Dim Lighting Indoors', 'Use dim lighting indoors in the evening to signal to your body that it is time to wind down.', 23, 'https://www.sleepfoundation.org'),
  ('Limit Screen Time', 'Avoid screens at least one hour before bedtime to prevent disruption of melatonin production.', 23, 'https://www.cdc.gov'),
  ('Consistent Sleep Schedule', 'Maintain a consistent sleep schedule, even on weekends, to regulate your circadian rhythm.', 24, 'https://www.ncbi.nlm.nih.gov');
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
