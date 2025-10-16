import SunCalc from "npm:suncalc@1.9.0";

const latitude = 55.6078;
const longitude = 12.9982;

export function getSunRise() {
	const sunrise = SunCalc.getTimes(new Date(), latitude, longitude).sunrise;
	return {
		name: "sunrise",
		hours: sunrise.getHours(),
		minutes: sunrise.getMinutes(),
		date: sunrise,
	};
}

export function getSunSet() {
	const sunset = SunCalc.getTimes(new Date(), latitude, longitude).sunset;
	return {
		name: "sunset",
		hours: sunset.getHours(),
		minutes: sunset.getMinutes(),
		date: sunset,
	};
}

export function getDuration() {
	const sunrise = getSunRise().date;
	const sunset = getSunSet().date;

	const diffMs = sunset - sunrise;
	const diffMinutes = Math.floor(diffMs / 1000 / 60);
	const hours = Math.floor(diffMinutes / 60);
	const minutes = diffMinutes % 60;

	return {
		name: "duration",
		hours,
		minutes,
	};
}

export const sunData = {
	sunrise: getSunRise(),
	sunset: getSunSet(),
	duration: getDuration(),
};
