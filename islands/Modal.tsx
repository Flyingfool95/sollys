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
                    This service uses your location to display accurate daylight information. For best practices, we ask
                    for your permission before accessing it. Your location data is stored only on this device and never
                    shared.
                </p>
                <br />
                <button type="button" onClick={handleShowModal}>
                    Allow location access
                </button>
            </div>
        </div>
    );
}
