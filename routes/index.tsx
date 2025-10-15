import { Handlers } from "$fresh/server.ts";
import { getRandomTip } from "../helpers/database.helpers.ts";
import { getCoordinates } from "../helpers/location.helpers.ts";
import { ServerData } from "../types/serverData.types.ts";
import HydrateClientState from "../islands/HydrateClientState.tsx";
import Dashboard from "../islands/Dashboard.tsx";
import Tip from "../islands/Tip.tsx";

export const handler: Handlers = {
    async GET(_req, ctx) {
        const locationData = await getCoordinates(ctx);
        const todaysTip = await getRandomTip();

        const res = await ctx.render({
            locationData,
            todaysTip,
        });

        return res;
    },
};

export default function Home({ data }: { data: ServerData }) {
    return (
        <>
            <HydrateClientState serverData={data} />
            <Dashboard />
            <hr />
            <Tip />
        </>
    );
}
