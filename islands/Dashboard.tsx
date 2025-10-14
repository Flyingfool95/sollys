import { useState, useEffect } from "preact/hooks";
import { dataArray } from "../signals/dashboard.signals.ts";
import Card from "./Card.tsx";
import { prioritizeSelectedItem } from "../helpers/dashboard.helpers.ts";
import { persistentStorage } from "../helpers/global.helpers.ts";

export default function Dashboard() {
    const [dashDataArray, setDashDataArray] = useState([...dataArray.value]);
    const selectedData = persistentStorage("selected-data");
    prioritizeSelectedItem(selectedData.get() as string, dashDataArray, setDashDataArray);

    useEffect(() => {
        const unsubscribe = dataArray.subscribe((newValue) => {
            setDashDataArray([...newValue]);
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className="dashboard">
            {dashDataArray.map((data) => (
                <Card
                    key={data.name}
                    data={data}
                    isLoading={!data.value}
                    array={dashDataArray}
                    setArray={setDashDataArray}
                />
            ))}
        </div>
    );
}
