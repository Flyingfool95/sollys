import { today } from "../signals/global.signals.ts";

export default function MyDatePicker() {
    return <p className="myDatePicker">{today.value}</p>;
}
