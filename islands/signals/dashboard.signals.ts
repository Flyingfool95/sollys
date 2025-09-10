import { computed } from "@preact/signals";
import { coordinates } from "./location.signals.ts";
import { getDaylightDuration, getFormattedSunTime, getTimeUntilNextEvent } from "../../helpers/dashboard.helpers.ts";

// Main signals
const sunrise = getFormattedSunTime("sunrise", new Date(), coordinates.value);
const sunset = getFormattedSunTime("sunset", new Date(), coordinates.value);
const duration = getDaylightDuration(sunrise, sunset);
const nextEvent = getTimeUntilNextEvent(sunrise, sunset);

export const dataArray = computed(() => [
    { name: "sunrise", value: sunrise.value },
    { name: "sunset", value: sunset.value },
    { name: "duration", value: duration.value },
    { name: "nextEvent", value: nextEvent.value },
]);
