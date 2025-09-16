import { useState } from "preact/hooks";
import { locationConsent } from "../signals/location.signals.ts";

export default function Modal() {
    const [isHidden, setIsHidden] = useState(locationConsent.value);
    const handleShowModal = () => {
        locationConsent.value = true;
        setIsHidden(true);
    };
    return (
        <div className={`modal ${isHidden ? "hidden" : ""}`}>
            <div className="modal__content">
                <p>
                    This service uses location data to display the daylight data. Out of best pratices we ask you to
                    permit us using it. All location data is stored locally on this device.
                </p>
                <br />
                <button type="button" onClick={handleShowModal}>
                    Give permission to use location
                </button>
            </div>
        </div>
    );
}
