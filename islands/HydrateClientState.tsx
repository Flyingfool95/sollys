import { city } from "../signals/location.signals.ts";
import { todaysTip } from "../signals/tips.signal.ts";
import { ServerData } from "../types/serverData.types.ts";

export default function HydrateClientState({ serverData }: { serverData: ServerData }) {

    if (!city.value) {
        city.value = serverData.locationData.city;
    }

    if (!todaysTip.value) {
        todaysTip.value = serverData.todaysTip;
    }

    return <span></span>;
}
