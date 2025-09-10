import Card from "./Card.tsx";
import ClearStorageButton from "./ClearStorageButton.tsx";

import { dataArray } from "../signals/dashboard.signals.ts";

export default function Dashboard() {
    return (
        <div className="dashboard">
            {/*<ClearStorageButton />*/}
            {dataArray.value && dataArray.value.map((data) => <Card key={data.name} data={data} />)}
        </div>
    );
}
