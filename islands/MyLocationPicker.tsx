import { useEffect } from "preact/hooks";
import { city, coordinates } from "../signals/location.signals.ts";
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

    return (
        <div className="myLocationPicker">
            {!coordinates.value || !city.value ? <div className="loader"></div> : <p>{city.value}</p>}
        </div>
    );
}
