import { city } from "../../signals/location.signals.ts";

export default function MyLocationPicker() {
    return <div className="myLocationPicker">{!city.value ? <div className="loader"></div> : <p>{city.value}</p>}</div>;
}
