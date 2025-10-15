import { App, staticFiles } from "fresh";
import { type State } from "./utils.ts";
import { initDatabase } from "./lib/db.ts";

await initDatabase();

export const app = new App<State>();

app.use(staticFiles());
app.fsRoutes();
