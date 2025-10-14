import { city, coordinates } from "../signals/location.signals.ts";
import { ServerData } from "../types/serverData.types.ts";

export default function HydrateClientState({ serverData }: { serverData: ServerData }) {
    if (!coordinates.value) {
        coordinates.value = {
            latitude: Number(serverData.locationData.latitude),
            longitude: Number(serverData.locationData.longitude),
        };
    }
    if (!city.value) {
        city.value = serverData.locationData.city;
    }

    return <span></span>;
}