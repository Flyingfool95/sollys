import { VNode, JSX } from "preact";
import Arrow from "./icons/Arrow.tsx";
import ClockTimeLeft from "./icons/ClockTimeLeft.tsx";
import Sun from "./icons/Sun.tsx";
import { prioritizeSelectedItem } from "../helpers/dashboard.helpers.ts";

const iconMap: Record<string, VNode> = {
    sunset: <Arrow />,
    sunrise: <Arrow />,
    duration: <Sun />,
    nextEvent: <ClockTimeLeft />,
};
const textMap: Record<string, string> = {
    sunset: "sunset",
    sunrise: "sunrise",
    duration: "of light",
    nextEventSunset: "until sunset",
    nextEventSunrise: "until sunrise",
};

const handleKeyDown = (e: JSX.TargetedKeyboardEvent<HTMLDivElement>, array: Array<any>, setArray: any) => {
    if (e.key === "Enter" || e.key === " ") {
        e.preventDefault(); // prevent scrolling for space
        prioritizeSelectedItem(e.currentTarget.classList[1], array, setArray);
    }
};

export default function Card({
    data,
    isLoading,
    array,
    setArray,
}: {
    data: { name: string; value: any };
    isLoading: boolean;
    array: Array<any>;
    setArray: any;
}) {
    if (isLoading) return <CardLoader />;
    const Icon = iconMap[data.name] ?? null;
    const Text = textMap[data.name] ?? null;

    return (
        <div
            className={`card ${data.name}`}
            onClick={(e) => prioritizeSelectedItem(e.currentTarget.classList[1], array, setArray)}
            onKeyDown={(e) => handleKeyDown(e, array, setArray)}
            tabIndex={0}
            role="button"
        >
            {Icon}
            <p className="card__value">{data.value.value ?? data.value}</p>
            <span className="card__text">{data.value.name ?? Text}</span>
        </div>
    );
}

function CardLoader() {
    return <div className="card loader"></div>;
}
