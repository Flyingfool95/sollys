import SunCalc from "npm:suncalc@1.9.0";

const latitude = 55.6078;
const longitude = 12.9982;

export function getSunrise(date = new Date()) {
	const sunrise = SunCalc.getTimes(date, latitude, longitude).sunrise;
	return {
		name: "sunrise",
		hours: sunrise.getHours(),
		minutes: sunrise.getMinutes(),
		date: sunrise,
	};
}

export function getSunset(date = new Date()) {
	const sunset = SunCalc.getTimes(date, latitude, longitude).sunset;
	return {
		name: "sunset",
		hours: sunset.getHours(),
		minutes: sunset.getMinutes(),
		date: sunset,
	};
}

export function getDuration() {
	const sunrise = getSunrise().date;
	const sunset = getSunset().date;

	const { hours, minutes } = getDeltaTime(sunrise, sunset);

	return {
		name: "duration",
		hours,
		minutes,
	};
}

export function getNextEvent() {
	const currentTime = new Date();
	const tomorrowsSunrise = getSunrise(new Date(Date.now() + 24 * 60 * 60 * 1000)).date;
	const sunset = getSunset().date;

	let hours: number;
	let minutes: number;
	let eventName: string;

	if (currentTime < sunset) {
		const times = getDeltaTime(currentTime, sunset);
		hours = times.hours;
		minutes = times.minutes;
		eventName = "sunset";
	} else {
		const times = getDeltaTime(currentTime, tomorrowsSunrise);
		hours = times.hours;
		minutes = times.minutes;
		eventName = "sunrise";
	}

	return {
		name: "nextEvent",
		hours,
		minutes,
		eventName,
	};
}

export function getDeltaTime(startTime: Date, endTime: Date) {
	const diffMs = endTime.valueOf() - startTime.valueOf();
	const diffMinutes = Math.floor(diffMs / 1000 / 60);
	const hours = Math.floor(diffMinutes / 60);
	const minutes = diffMinutes % 60;

	return {
		hours,
		minutes,
	};
}

export const sunData = {
	sunrise: getSunrise(),
	sunset: getSunset(),
	duration: getDuration(),
	nextEvent: getNextEvent(),
};
