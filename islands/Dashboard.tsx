import { coordinates } from "./signals.ts";

export default function Dashboard() {
    return (
        <div>
            <div>Dashboard</div>
            Lat: {coordinates.value?.lat} <br />
            Lon: {coordinates.value?.lng}
        </div>
    );
}
