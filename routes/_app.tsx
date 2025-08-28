import { type PageProps } from "$fresh/server.ts";
export default function App({ Component }: PageProps) {
    return (
        <html>
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Sollys - Every day a little brighter</title>
                <link rel="stylesheet" href="/fonts/fonts.css" />
                <link rel="stylesheet" href="/styles/variables.css" />
                <link rel="stylesheet" href="/styles/styles.css" />
            </head>
            <body>
                <Component />
            </body>
        </html>
    );
}
