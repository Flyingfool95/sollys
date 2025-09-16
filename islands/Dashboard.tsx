import { useState, useEffect } from "preact/hooks";
import { dataArray } from "../signals/dashboard.signals.ts";
import Card from "./Card.tsx";
import { prioritizeSelectedItem } from "../helpers/dashboard.helpers.ts";
import { persistentStorage } from "../helpers/global.helpers.ts";
import { locationConsent } from "../signals/location.signals.ts";
import Modal from "./Modal.tsx";

export default function Dashboard() {
    const [dashDataArray, setDashDataArray] = useState([...dataArray.value]);

    const [isCheckingStorage, setIsCheckingStorage] = useState(true);

    useEffect(() => {
        const unsubscribe = dataArray.subscribe((newValue) => {
            setDashDataArray([...newValue]);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const selectedData = persistentStorage("selected-data");

        prioritizeSelectedItem(selectedData.get() as string, dashDataArray, setDashDataArray);
        setIsCheckingStorage(false);
    }, []);

    return (
        <div className="dashboard">
            {!locationConsent.value && <Modal />}
            {dashDataArray.map((data) => (
                <Card
                    key={data.name}
                    data={data}
                    isLoading={isCheckingStorage || !data.value}
                    array={dashDataArray}
                    setArray={setDashDataArray}
                />
            ))}
        </div>
    );
}
