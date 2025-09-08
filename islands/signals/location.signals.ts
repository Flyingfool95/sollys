import { persistentSignal } from "../../helpers/global.helpers.ts";

export const coordinates = persistentSignal<{ lat: number; lng: number } | null>("coordinates", null);
