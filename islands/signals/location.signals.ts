import { effect } from "@preact/signals";
import { persistentSignal } from "../../helpers/global.helpers.ts";

export const coordinates = persistentSignal<{ lat: number; lng: number } | null>("coordinates", null);
export const city = persistentSignal<string | null>("city", null);

effect(() => console.log(coordinates.value));
