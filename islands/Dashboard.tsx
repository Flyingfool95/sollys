import Spinner from "../components/spinner/Spinner.tsx";
import Sun from "../components/icons/Sun.tsx";
import Arrow from "../components/icons/Arrow.tsx";
import ClockTimeLeft from "../components/icons/ClockTimeLeft.tsx";
import ClearStorageButton from "./ClearStorageButton.tsx";
import { dataArray } from "./signals/dashboard.signals.ts";

export default function Dashboard() {
    return (
        <div className="dashboard">
            <ClearStorageButton />

            {dataArray.value &&
                dataArray.value.map((data) => {
                    console.log(data);
                    if (!data.value) return <Spinner key={data.value} />;

                    if (data.name === "sunrise") {
                        return (
                            <div key={data.name} className="card sunrise">
                                <Arrow />
                                <p className="value">{data.value}</p>
                                <span>sunrise</span>
                            </div>
                        );
                    } else if (data.name === "sunset") {
                        return (
                            <div key={data.name} className="card sunset">
                                <Arrow />
                                <p className="value">{data.value}</p>
                                <span>sunset</span>
                            </div>
                        );
                    } else if (data.name === "duration") {
                        return (
                            <div key={data.name} className="card duration">
                                <Sun />
                                <p className="value">{data.value}</p>
                                <span>of light</span>
                            </div>
                        );
                    } else if (data.name === "nextEvent") {
                        return (
                            <div key={data.name} className="card next-event">
                                <ClockTimeLeft />
                                <p className="value">{data.value}</p>
                                <span>until event</span>
                            </div>
                        );
                    }
                })}
        </div>
    );
}
