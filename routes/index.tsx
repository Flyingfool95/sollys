import { Handlers } from "$fresh/server.ts";
import Feedback from "../components/feedback/Feedback.tsx";
import Footer from "../components/footer/Footer.tsx";
import Header from "../components/header/Header.tsx";
import { normalizeCityName } from "../helpers/location.helpers.ts";
import Dashboard from "../islands/Dashboard.tsx";
import { ServerData } from "../types/serverData.types.ts";

export const handler: Handlers = {
    async GET(_req, ctx) {
        const ip = ctx.remoteAddr?.hostname === "127.0.0.1" ? "213.89.109.82" : ctx.remoteAddr?.hostname;
        const geo = await fetch(
            `https://api.ipgeolocation.io/v2/ipgeo?apiKey=${Deno.env.get("IP_GEOLOCATION_API_KEY")}&ip=${ip}`
        ).then((r) => r.json());

        const res = await ctx.render({
            locationData: {
                country: geo.location.country_name,
                city: normalizeCityName(geo.location.city, geo.location.country_code2),
                longitude: geo.location.longitude,
                latitude: geo.location.latitude,
            },
        });

        return res;
    },
};

export default function Home({ data }: { data: ServerData }) {
    return (
        <>
            <Header data={data} />
            <main>
                <Dashboard data={data}/>
                <hr />
                {/* <Feedback /> */}
            </main>
            <Footer />
        </>
    );
}
