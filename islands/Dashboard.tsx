import suncalc from "npm:suncalc@1.9.0";
import { computed } from "@preact/signals";
import { coordinates } from "./signals.ts";
import Spinner from "../components/spinner/Spinner.tsx";

export default function Dashboard() {
    function getTimeUntilNextEvent(sunriseSignal, sunsetSignal) {
        return computed(() => {
            const sunriseStr = sunriseSignal.value;
            const sunsetStr = sunsetSignal.value;

            if (!sunriseStr || !sunsetStr) return null;

            const now = new Date();

            // Helper: convert "HH:MM" to Date for today
            function timeStringToDate(timeStr) {
                const [h, m] = timeStr.split(":").map(Number);
                const d = new Date(now);
                d.setHours(h, m, 0, 0);
                return d;
            }

            const sunrise = timeStringToDate(sunriseStr);
            const sunset = timeStringToDate(sunsetStr);

            let nextEvent: Date;

            if (now < sunrise) {
                nextEvent = sunrise;
            } else if (now < sunset) {
                nextEvent = sunset;
            } else {
                // next sunrise is tomorrow
                nextEvent = new Date(sunrise.getTime() + 24 * 60 * 60 * 1000);
            }

            const diffMs = nextEvent - now;
            const hours = Math.floor(diffMs / 1000 / 60 / 60);
            const minutes = Math.floor((diffMs / 1000 / 60) % 60);

            return `${hours}h ${minutes}m`;
        });
    }

    function getDaylightDuration(sunriseSignal, sunsetSignal) {
        return computed(() => {
            const sunrise = sunriseSignal.value;
            const sunset = sunsetSignal.value;

            if (!sunrise || !sunset) return null; // fallback if not loaded

            // Convert "HH:MM" strings to minutes
            const [sunriseH, sunriseM] = sunrise.split(":").map(Number);
            const [sunsetH, sunsetM] = sunset.split(":").map(Number);

            const sunriseMinutes = sunriseH * 60 + sunriseM;
            const sunsetMinutes = sunsetH * 60 + sunsetM;

            const durationMinutes = sunsetMinutes - sunriseMinutes;
            const hours = Math.floor(durationMinutes / 60);
            const minutes = durationMinutes % 60;

            return `${hours.toString()}h ${minutes.toString()}m`;
        });
    }

    function getFormattedSunTime(key, date, lat, lng) {
        const times = suncalc.getTimes(date, lat, lng);
        const target = times[key];
        const hours = target.getHours();
        const minutes = target.getMinutes();
        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    }

    const sunrise = computed(() =>
        coordinates.value?.lat && coordinates.value?.lng
            ? getFormattedSunTime("sunrise", new Date(), coordinates.value.lat, coordinates.value.lng)
            : null
    );

    const sunset = computed(() =>
        coordinates.value?.lat && coordinates.value?.lng
            ? getFormattedSunTime("sunset", new Date(), coordinates.value.lat, coordinates.value.lng)
            : null
    );

    return (
        <div className="dashboard">
            <div className="card">
                {sunrise.value ?? <Spinner />} <br /> sunrise
            </div>
            <br />
            <div className="card">
                {sunset.value ?? <Spinner />} <br /> sunset
            </div>
            <br />
            <div className="card">
                {getDaylightDuration(sunrise, sunset) ?? <Spinner />} <br /> of daylight
            </div>
            <br />
            <div className="card">
                {getTimeUntilNextEvent(sunrise, sunset) ?? <Spinner />} <br /> until event
            </div>
        </div>
    );
}
