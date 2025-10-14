import { city, coordinates } from "../signals/location.signals.ts";
import { ServerData } from "../types/serverData.types.ts";

export default function HydrateClientState({ serverData }: { serverData: ServerData }) {
    coordinates.value = {latitude: Number(serverData.locationData.latitude), longitude: Number(serverData.locationData.longitude)}
    city.value = serverData.locationData.city
    
    console.log(coordinates.value)
    return <></>;
}
