import { dateFilter } from "./signals.ts";

export default function MyDatePicker() {
    return <p className="myDatePicker">{dateFilter.value}</p>;
}
