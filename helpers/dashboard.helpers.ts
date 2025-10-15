import suncalc from "npm:suncalc@1.9.0";
import { Coordinates } from "../types/dashboard.types.ts";
import { persistentStorage } from "./global.helpers.ts";
import { LocationData, SunData } from "../types/serverData.types.ts";

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
export function getTimeUntilNextSunEvent(
    sunriseStr: string | null,
    sunsetStr: string | null
): { name: "until sunrise" | "until sunset"; value: string } | null {
    if (!sunriseStr || !sunsetStr) return null;

    const now = new Date();
    const sunrise = parseHHMMToDate(sunriseStr, now);
    const sunset = parseHHMMToDate(sunsetStr, now);

    if (!sunrise || !sunset) return null;

    let nextEvent: { name: "until sunrise" | "until sunset"; value: Date };

    if (now < sunrise) {
        nextEvent = { name: "until sunrise", value: sunrise };
    } else if (now < sunset) {
        nextEvent = { name: "until sunset", value: sunset };
    } else {
        // Next sunrise is tomorrow
        nextEvent = { name: "until sunrise", value: new Date(sunrise.getTime() + 24 * 60 * 60 * 1000) };
    }

    const diffMs = nextEvent.value.getTime() - now.getTime();
    return {
        name: nextEvent.name,
        value: formatDurationMs(diffMs),
    };
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
    if (!coordinates?.latitude || !coordinates?.longitude) return null;

    const times = suncalc.getTimes(date, coordinates.latitude, coordinates.longitude);
    const targetTime = times[key];
    if (!targetTime || isNaN(targetTime.getTime())) return null;

    return formatDateToHHMM(targetTime);
}

//Setting selected element first in array
export function prioritizeSelectedItem(clickedName: string, array: SunData, setArray: any) {
    const selectedData = persistentStorage("selected-data");
    const index = array.findIndex((item) => item.name === clickedName);

    if (index === -1 || index === 0) return array; // nothing to change

    const before = array.slice(0, index);
    const after = array.slice(index);

    setArray([...after, ...before]);
    selectedData.set(clickedName, null);
}

//Get sundata
export function getSunData(locationData: LocationData) {
    const coordinates = {
        latitude: Number(locationData.latitude),
        longitude: Number(locationData.longitude),
    };

    const sunrise = getSunEventTime("sunrise", new Date(), coordinates);

    const sunset = getSunEventTime("sunset", new Date(), coordinates);

    const duration = getDaylightHours(sunrise, sunset);

    const nextEvent = getTimeUntilNextSunEvent(sunrise, sunset);

    return [
        { name: "sunrise", value: sunrise },
        { name: "sunset", value: sunset },
        { name: "duration", value: duration },
        { name: "nextEvent", value: nextEvent },
    ];
}
