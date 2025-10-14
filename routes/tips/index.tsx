import { Handlers } from "$fresh/server.ts";
import { tips } from "../../helpers/database.helpers.ts";
import { Tips } from "../../types/serverData.types.ts";

export const handler: Handlers = {
    async GET(_req, ctx) {
        console.log(tips);

        const res = await ctx.render(tips);

        return res;
    },
};

export default function index({ data }: { data: Tips }) {
    return (
        <div>
            <h1>Tips</h1>
            {data.length > 0 &&
                data.map((tip) => (
                    <div>
                        <h2>{tip.title}</h2>
                        <p>{tip.tip}</p>
                        <a href={tip.source} target="_blank" rel="noopener noreferrer">
                            - Source
                        </a>{" "}
                    </div>
                ))}
        </div>
    );
}
