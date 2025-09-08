import { useEffect } from "preact/hooks";
import { signal } from "@preact/signals";
import { coordinates } from "./signals/location.signals.ts";
import Spinner from "../components/spinner/Spinner.tsx";

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

    if (!coordinates.value || !city.value) {
        return (
            <div className="myLocationPicker">
                <Spinner />
            </div>
        );
    }

    return <div className="myLocationPicker">{city.value}</div>;
}

async function getCity(lat: number, lng: number) {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
    const data = await res.json();
    return (
        (data.address.city || data.address.town || data.address.village) +
        ", " +
        data.address.country.substring(0, 3) +
        "."
    );
}
