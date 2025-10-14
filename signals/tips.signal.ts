import { signal } from "@preact/signals";
import { Tip } from "../types/serverData.types.ts";

export const todaysTip = signal<Tip | undefined>(undefined);
