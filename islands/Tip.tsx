import { todaysTip } from "../signals/tips.signal.ts";

export default function Tip() {
    return (
        <div className="tip">
            <h2>{todaysTip.value?.title}</h2>
            <p>{todaysTip.value?.tip}</p>
            <a href={todaysTip.value?.source}>- Source to tip</a>
        </div>
    );
}
