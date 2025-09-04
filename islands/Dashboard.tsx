import suncalc from "npm:suncalc@1.9.0";
import { computed, signal } from "@preact/signals";
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

    const duration = getDaylightDuration(sunrise, sunset);
    const nextEvent = getTimeUntilNextEvent(sunrise, sunset);

    return (
        <div className="dashboard">
            <div className="main-card">
                <div className="card sunrise">
                    {sunrise.value ? (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor">
                                <path d="M229.66,114.34l-96-96a8,8,0,0,0-11.32,0l-96,96A8,8,0,0,0,32,128H72v56a8,8,0,0,0,8,8h96a8,8,0,0,0,8-8V128h40a8,8,0,0,0,5.66-13.66ZM176,112a8,8,0,0,0-8,8v56H88V120a8,8,0,0,0-8-8H51.31L128,35.31,204.69,112Zm8,104a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,216Z" />
                            </svg>{" "}
                            <p className="value">{sunrise.value}</p>
                        </>
                    ) : (
                        <Spinner />
                    )}
                    <span>sunrise</span>
                </div>
            </div>

            <div className="secondary-cards">
                <div className="card sunset">
                    {sunset.value ? (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor">
                                <path d="M229.66,114.34l-96-96a8,8,0,0,0-11.32,0l-96,96A8,8,0,0,0,32,128H72v56a8,8,0,0,0,8,8h96a8,8,0,0,0,8-8V128h40a8,8,0,0,0,5.66-13.66ZM176,112a8,8,0,0,0-8,8v56H88V120a8,8,0,0,0-8-8H51.31L128,35.31,204.69,112Zm8,104a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,216Z" />
                            </svg>{" "}
                            <p className="value">{sunset.value}</p>
                        </>
                    ) : (
                        <Spinner />
                    )}
                    <span>sunset</span>
                </div>

                <div className="card duration">
                    {duration.value ? (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor">
                                <path d="M232,136.66A104.12,104.12,0,1,1,119.34,24,8,8,0,0,1,120.66,40,88.12,88.12,0,1,0,216,135.34,8,8,0,0,1,232,136.66ZM120,72v56a8,8,0,0,0,8,8h56a8,8,0,0,0,0-16H136V72a8,8,0,0,0-16,0Zm40-24a12,12,0,1,0-12-12A12,12,0,0,0,160,48Zm36,24a12,12,0,1,0-12-12A12,12,0,0,0,196,72Zm24,36a12,12,0,1,0-12-12A12,12,0,0,0,220,108Z" />
                            </svg>
                            <p className="value">{duration.value}</p>
                        </>
                    ) : (
                        <Spinner />
                    )}
                    <span>of light</span>
                </div>

                <div className="card  next-event">
                    {nextEvent.value ? (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor">
                                <path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z" />
                            </svg>
                            <p className="value">{nextEvent.value}</p>
                        </>
                    ) : (
                        <Spinner />
                    )}
                    <span>until event</span>
                </div>
            </div>
        </div>
    );
}
