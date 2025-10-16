export type DashboardData = {
	sunrise: {
		name: string;
		hours: number;
		minutes: number;
		date: Date;
	};
	sunset: {
		name: string;
		hours: number;
		minutes: number;
		date: Date;
	};
	duration: {
		name: string;
		hours: number;
		minutes: number;
	};
	nextEvent: {
		name: string;
		hours: number;
		minutes: number;
		eventName: string;
	};
};

export default function Dashboard({ data }: { data: DashboardData }) {
	return <div>Dashboard</div>;
}
