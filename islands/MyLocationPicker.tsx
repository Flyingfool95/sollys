import { useEffect } from "preact/hooks";
import { city, coordinates } from "../signals/location.signals.ts";
import Spinner from "./spinner/Spinner.tsx";
import { getCity } from "../helpers/location.helpers.ts";

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
        async function getCurrentCity() {
            if (coordinates.value) {
                try {
                    const currentCity = await getCity(coordinates.value.lat, coordinates.value.lng);
                    city.value = currentCity;
                } catch (error) {
                    console.log(error);
                }
            }
        }
        getCurrentCity();
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
