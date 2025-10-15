import { persistentSignal } from "../helpers/global.helpers.ts";

export const city = persistentSignal<string | null>("city", null);
