import { computed } from "@preact/signals";
import { coordinates } from "./location.signals.ts";
import { getFormattedSunTime, getDaylightDuration, getTimeUntilNextEvent } from "../helpers/dashboard.helpers.ts";

export const sunrise = computed(() =>
    coordinates.value?.lat && coordinates.value?.lng
        ? getFormattedSunTime("sunrise", new Date(), coordinates.value)
        : null
);

export const sunset = computed(() =>
    coordinates.value?.lat && coordinates.value?.lng
        ? getFormattedSunTime("sunset", new Date(), coordinates.value)
        : null
);

export const duration = computed(() => getDaylightDuration(sunrise.value, sunset.value));
export const nextEvent = computed(() => getTimeUntilNextEvent(sunrise.value, sunset.value));

export const dataArray = computed(() => [
    { name: "sunrise", value: sunrise.value },
    { name: "sunset", value: sunset.value },
    { name: "duration", value: duration.value },
    { name: "nextEvent", value: nextEvent.value },
]);
