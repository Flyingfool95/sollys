import { dateFilter } from "./signals.ts";

export default function Dashboard() {
    return (
        <div>
            <div>Dashboard</div>
            <div>Current date filter: {dateFilter.value}</div>
        </div>
    );
}
