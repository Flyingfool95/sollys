import { useEffect } from "preact/hooks";
import { signal } from "@preact/signals";
import { coordinates } from "./signals.ts";

const city = signal<string | null>(null);

export default function MyLocationPicker() {
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                coordinates.value = { lat: pos.coords.latitude, lng: pos.coords.longitude };

                // fetch city once we have location
                getCity(pos.coords.latitude, pos.coords.longitude).then((c) => {
                    city.value = c;
                });
            },
            (err) => console.error(err)
        );
    }, []);

    if (!coordinates.value) {
        return <div className="myLocationPicker">Loading location…</div>;
    }

    if (!city.value) {
        return <div className="myLocationPicker">Resolving city…</div>;
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
