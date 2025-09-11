import { useState, useEffect } from "preact/hooks";
import { dataArray } from "../signals/dashboard.signals.ts";
import Card from "./Card.tsx";

export default function Dashboard() {
    const [dashDataArray, setDashDataArray] = useState([...dataArray.value]);

    useEffect(() => {
        const unsubscribe = dataArray.subscribe((newValue) => {
            setDashDataArray([...newValue]);
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className="dashboard">
            {dashDataArray.map((data) => (
                <Card key={data.name} data={data} array={dashDataArray} setArray={setDashDataArray} />
            ))}
        </div>
    );
}
