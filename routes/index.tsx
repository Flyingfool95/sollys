import { Handlers } from "$fresh/server.ts";
import { getRandomTip } from "../helpers/database.helpers.ts";
import { getCoordinates } from "../helpers/location.helpers.ts";
import { getSunData } from "../helpers/dashboard.helpers.ts";
import { ServerData } from "../types/serverData.types.ts";
import HydrateClientState from "../islands/HydrateClientState.tsx";
import Dashboard from "../islands/Dashboard.tsx";
import Tip from "../islands/Tip.tsx";

export const handler: Handlers = {
    async GET(_req, ctx) {
        const locationData = await getCoordinates(ctx);
        const sunData = getSunData(locationData);
        const duration = sunData.filter((data) => data.name === "duration")[0].value as string;
        const todaysTip = await getRandomTip(Number(duration?.slice(0, 2)));

        const res = await ctx.render({
            locationData,
            todaysTip,
            sunData,
        });

        return res;
    },
};

export default function Home({ data }: { data: ServerData }) {
    return (
        <>
            <HydrateClientState serverData={data} />
            <Dashboard sunData={data.sunData} />
            <hr />
            <Tip />
        </>
    );
}
