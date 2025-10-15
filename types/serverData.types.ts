export type LocationData = {
    country: string;
    city: string;
    longitude: string;
    latitude: string;
};

export type Tip = {
    id: number;
    title: string;
    tip: string;
    weight: number;
    source: string;
};
export type Tips = Array<Tip>;

export type SunData = Array<{ name: string, value: string }>;
export type ServerData = {
    locationData: LocationData;
    todaysTip: Tip;
    sunData: SunData;
};
