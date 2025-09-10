import { computed, Signal } from "@preact/signals";
import suncalc from "npm:suncalc@1.9.0";
// Type definition for clarity
interface Coordinates {
    lat: number;
    lng: number;
}

// Utility to parse "HH:MM" string to Date for a given reference date
export function parseTimeString(timeStr: string, referenceDate: Date = new Date()): Date | null {
    if (!timeStr) return null;
    const [hours, minutes] = timeStr.split(":").map(Number);
    if (isNaN(hours) || isNaN(minutes)) return null;
    const date = new Date(referenceDate);
    date.setHours(hours, minutes, 0, 0);
    return date;
}

// Utility to format time difference in hours and minutes
export function formatTimeDifference(diffMs: number): string {
    const hours = Math.floor(diffMs / 1000 / 60 / 60);
    const minutes = Math.floor((diffMs / 1000 / 60) % 60);
    return `${hours}h ${minutes}m`;
}

// Utility to format time as "HH:MM"
export function formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
}

// Calculate time until next sunrise or sunset
export function getTimeUntilNextEvent(sunriseStr: string | null, sunsetStr: string | null) {
    if (!sunriseStr || !sunsetStr) return null;

    const now = new Date();
    const sunrise = parseTimeString(sunriseStr, now);
    const sunset = parseTimeString(sunsetStr, now);

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
    return formatTimeDifference(diffMs);
}

// Calculate daylight duration
export function getDaylightDuration(sunriseStr: string | null, sunsetStr: string | null) {
    if (!sunriseStr || !sunsetStr) return null;

    const sunrise = parseTimeString(sunriseStr);
    const sunset = parseTimeString(sunsetStr);

    if (!sunrise || !sunset) return null;

    const diffMs = sunset.getTime() - sunrise.getTime();
    return formatTimeDifference(diffMs);
}

// Get formatted sunrise/sunset time
export function getFormattedSunTime(key: string, date: Date, coordinates: Coordinates | null) {
    if (!coordinates?.lat || !coordinates?.lng) return null;

    const times = suncalc.getTimes(date, coordinates.lat, coordinates.lng);
    console.log(times["sunset"].getTime());
    const targetTime = times[key];
    if (!targetTime || isNaN(targetTime.getTime())) return null;

    return formatTime(targetTime);
}
