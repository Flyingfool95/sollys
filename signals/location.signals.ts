import { persistentSignal } from "../helpers/global.helpers.ts";

export const coordinates = persistentSignal<{ latitude: number; longitude: number } | null>("coordinates", null);
export const city = persistentSignal<string | null>("city", null);
