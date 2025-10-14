import { city } from "../../signals/location.signals.ts";

export default function MyLocationPicker() {
    return <div className="myLocationPicker">{!city ? <div className="loader"></div> : <p>{city}</p>}</div>;
}
