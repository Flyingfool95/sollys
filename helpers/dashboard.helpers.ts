import suncalc from "npm:suncalc@1.9.0";
import { Coordinates } from "../types/dashboard.types.ts";
import { persistentStorage } from "./global.helpers.ts";

// Utility to parse "HH:MM" string to Date for a given reference date
export function parseHHMMToDate(timeStr: string, referenceDate: Date = new Date()): Date | null {
    if (!timeStr) return null;
    const [hours, minutes] = timeStr.split(":").map(Number);
    if (isNaN(hours) || isNaN(minutes)) return null;
    const date = new Date(referenceDate);
    date.setHours(hours, minutes, 0, 0);
    return date;
}

// Utility to format time difference in hours and minutes
export function formatDurationMs(diffMs: number): string {
    const hours = Math.floor(diffMs / 1000 / 60 / 60);
    const minutes = Math.floor((diffMs / 1000 / 60) % 60);
    return `${hours}h ${minutes}m`;
}

// Utility to format time as "HH:MM"
export function formatDateToHHMM(date: Date): string {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
}

// Calculate time until next sunrise or sunset
export function getTimeUntilNextSunEvent(sunriseStr: string | null, sunsetStr: string | null): string | null {
    if (!sunriseStr || !sunsetStr) return null;

    const now = new Date();
    const sunrise = parseHHMMToDate(sunriseStr, now);
    const sunset = parseHHMMToDate(sunsetStr, now);

    if (!sunrise || !sunset) return null;

    let nextEvent: Date;
    if (now < sunrise) {
        nextEvent = sunrise;
    } else if (now < sunset) {
        nextEvent = sunset;
    } else {
        // Next sunrise is tomorrow
        nextEvent = new Date(sunrise.getTime() + 24 * 60 * 60 * 1000);
    }

    const diffMs = nextEvent.getTime() - now.getTime();
    return formatDurationMs(diffMs);
}

// Calculate daylight duration
export function getDaylightHours(sunriseStr: string | null, sunsetStr: string | null) {
    if (!sunriseStr || !sunsetStr) return null;

    const sunrise = parseHHMMToDate(sunriseStr);
    const sunset = parseHHMMToDate(sunsetStr);

    if (!sunrise || !sunset) return null;

    const diffMs = sunset.getTime() - sunrise.getTime();
    return formatDurationMs(diffMs);
}

// Get formatted sunrise/sunset time
export function getSunEventTime(key: string, date: Date, coordinates: Coordinates | null) {
    if (!coordinates?.lat || !coordinates?.lng) return null;

    const times = suncalc.getTimes(date, coordinates.lat, coordinates.lng);
    const targetTime = times[key];
    if (!targetTime || isNaN(targetTime.getTime())) return null;

    return formatDateToHHMM(targetTime);
}

//Setting selected element first in array
export function prioritizeSelectedItem(clickedName: string, array: Array<any>, setArray: any) {
    const selectedData = persistentStorage("selected-data");
    const index = array.findIndex((item) => item.name === clickedName);

    if (index === -1 || index === 0) return array; // nothing to change

    const before = array.slice(0, index);
    const after = array.slice(index);

    setArray([...after, ...before]);
    selectedData.set(clickedName, null);
}
