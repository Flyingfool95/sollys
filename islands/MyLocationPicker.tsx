import { useEffect } from "preact/hooks";
import { city, coordinates, locationConsent } from "../signals/location.signals.ts";
import { getCity } from "../helpers/location.helpers.ts";

export default function MyLocationPicker() {
    useEffect(() => {
        if (!locationConsent.value) return;
        if (!navigator.geolocation) {
            alert("Geolocation is not supported");
            return;
        }

        const options = {
            enableHighAccuracy: false, // faster, less battery
            timeout: 10000, // max wait 10s
            maximumAge: 10000, // allow cached positions up to 10s old
        };

        const success = (pos: GeolocationPosition) => {
            coordinates.value = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        };

        const error = (err: GeolocationPositionError) => {
            console.error("Geolocation error:", err);
        };

        navigator.geolocation.getCurrentPosition(success, error, options);
    }, [locationConsent.value]);

    useEffect(() => {
        async function getCurrentCity() {
            if (coordinates.value /* also check if cahce is stale otherwise dont do a fetch */) {
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
