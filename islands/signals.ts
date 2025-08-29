import { signal } from "@preact/signals";

export const today = signal<string>(new Date().toISOString().split("T")[0]);

export const coordinates = signal<{ lat: number; lng: number } | null>(null);
