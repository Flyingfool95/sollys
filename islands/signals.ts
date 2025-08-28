import { signal } from "@preact/signals";

export const dateFilter = signal(new Date().toISOString().split("T")[0]);
