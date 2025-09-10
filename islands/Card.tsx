import { VNode } from "preact";
import Spinner from "./spinner/Spinner.tsx";
import Arrow from "./icons/Arrow.tsx";
import ClockTimeLeft from "./icons/ClockTimeLeft.tsx";
import Sun from "./icons/Sun.tsx";

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
    nextEvent: "until event",
};

export default function Card({ data }: { data: { name: string; value: string | null } }) {
    if (!data.value) return <Spinner />;

    const Icon = iconMap[data.name] ?? null;
    const Text = textMap[data.name] ?? null;

    return (
        <div className={`card ${data.name}`}>
            {Icon}
            <p className="value">{data.value}</p>
            <span>{Text}</span>
        </div>
    );
}
