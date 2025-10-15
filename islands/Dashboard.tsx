import { useState } from "preact/hooks";
import Card from "./Card.tsx";
import { prioritizeSelectedItem } from "../helpers/dashboard.helpers.ts";
import { persistentStorage } from "../helpers/global.helpers.ts";
import { SunData } from "../types/serverData.types.ts";

export default function Dashboard({ sunData }: { sunData: SunData }) {
    const [dashDataArray, setDashDataArray] = useState(sunData);
    const selectedData = persistentStorage("selected-data");
    prioritizeSelectedItem(selectedData.get() as string, dashDataArray, setDashDataArray);

    return (
        <div className="dashboard">
            {dashDataArray.map((data) => (
                <Card key={data.name} data={data} array={dashDataArray} setArray={setDashDataArray} />
            ))}
        </div>
    );
}
