import { Head } from "$fresh/runtime.ts";

export default function Error404() {
    return (
        <>
            <Head>
                <title>404 - No sunlight found</title>
            </Head>
            <div>
                <div>
                    <h1>404 - No sunlight found</h1>
                    <p>The page you were looking for doesn't exist.</p>
                    <a href="/">Go back home</a>
                </div>
            </div>
        </>
    );
}
