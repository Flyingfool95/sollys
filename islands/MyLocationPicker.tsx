import { useEffect } from "preact/hooks";
import { signal } from "@preact/signals";
import { coordinates } from "./signals/location.signals.ts";
import Spinner from "../components/spinner/Spinner.tsx";
import { getCity } from "../helpers/location.helpers.ts";

const city = signal<string | null>(null);

export default function MyLocationPicker() {
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                coordinates.value = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            },
            (err) => console.error(err)
        );
    }, []);

    useEffect(() => {
        if (coordinates.value) {
            getCity(coordinates.value.lat, coordinates.value.lng)
                .then((c) => (city.value = c))
                .catch((err) => console.error(err));
        }
    }, [coordinates.value]);

    if (!coordinates.value || !city.value) {
        return (
            <div className="myLocationPicker">
                <Spinner />
            </div>
        );
    }

    return <div className="myLocationPicker">{city.value}</div>;
}
