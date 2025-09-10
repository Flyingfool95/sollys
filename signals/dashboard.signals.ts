import { computed } from "@preact/signals";
import { coordinates } from "./location.signals.ts";
import { getDaylightDuration, getFormattedSunTime, getTimeUntilNextEvent } from "../helpers/dashboard.helpers.ts";

export const dataArray = computed(() => {
    const sunrise = getFormattedSunTime("sunrise", new Date(), coordinates.value);
    const sunset = getFormattedSunTime("sunset", new Date(), coordinates.value);
    const duration = getDaylightDuration(sunrise, sunset);
    const nextEvent = getTimeUntilNextEvent(sunrise, sunset);

    return [
        { name: "sunrise", value: sunrise },
        { name: "sunset", value: sunset },
        { name: "duration", value: duration },
        { name: "nextEvent", value: nextEvent },
    ];
});
