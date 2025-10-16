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
	};
};

export default function Dashboard({ data }: { data: DashboardData }) {
	console.log(data);
	return <div>{data.sunrise.name}</div>;
}
