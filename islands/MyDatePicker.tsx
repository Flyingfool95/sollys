import { dateFilter } from "./signals.ts";

export default function MyDatePicker() {
    function handleInput(e: any) {
        dateFilter.value = e.target.value;
    }

    return <input type="date" value={dateFilter.value} onInput={handleInput} />;
}
