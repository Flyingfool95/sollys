import { LocationData } from "../../types/serverData.types.ts";

export default function MyLocationPicker({ locationData }: { locationData: LocationData }) {
    return (
        <div className="myLocationPicker">
            {!locationData.city ? <div className="loader"></div> : <p>{locationData.city}</p>}
        </div>
    );
}
