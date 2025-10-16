import SunCalc from "npm:suncalc@1.9.0";
import { getLocationFromIP } from "./location.helpers.ts";

export function getSunrise(date = new Date(), latitude: number, longitude: number) {
	const sunrise = SunCalc.getTimes(date, latitude, longitude).sunrise;
	return {
		name: "sunrise",
		hours: sunrise.getHours(),
		minutes: sunrise.getMinutes(),
		date: sunrise,
	};
}

export function getSunset(date = new Date(), latitude: number, longitude: number) {
	const sunset = SunCalc.getTimes(date, latitude, longitude).sunset;
	return {
		name: "sunset",
		hours: sunset.getHours(),
		minutes: sunset.getMinutes(),
		date: sunset,
	};
}

export function getDuration(latitude: number, longitude: number) {
	const sunrise = getSunrise(new Date(), latitude, longitude).date;
	const sunset = getSunset(new Date(), latitude, longitude).date;

	const { hours, minutes } = getDeltaTime(sunrise, sunset);
	return { name: "duration", hours, minutes };
}

export function getNextEvent(latitude: number, longitude: number) {
	const currentTime = new Date();
	const todaySunset = getSunset(currentTime, latitude, longitude).date;
	const tomorrowSunrise = getSunrise(new Date(Date.now() + 24 * 60 * 60 * 1000), latitude, longitude).date;

	let hours, minutes, eventName;

	if (currentTime < todaySunset) {
		({ hours, minutes } = getDeltaTime(currentTime, todaySunset));
		eventName = "sunset";
	} else {
		({ hours, minutes } = getDeltaTime(currentTime, tomorrowSunrise));
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

export async function getSunData(ctx: any) {
	const location = await getLocationFromIP(ctx);
	if (!location) return;
	return {
		sunrise: getSunrise(new Date(), location.latitude, location.longitude),
		sunset: getSunset(new Date(), location.latitude, location.longitude),
		duration: getDuration(location.latitude, location.longitude),
		nextEvent: getNextEvent(location.latitude, location.longitude),
		location: {
			city: location.city,
			country: location.country,
		},
	};
}
