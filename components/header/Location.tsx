import { city } from "../../signals/location.signals.ts";

export default function MyLocationPicker() {
    return <div className="myLocationPicker"><p>{city.value}</p></div>;
}
