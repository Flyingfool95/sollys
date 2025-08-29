import { type PageProps } from "$fresh/server.ts";
export default function App({ Component }: PageProps) {
    return (
        <html>
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Sollys - Every day a little brighter</title>
                {/* Global */}
                <link rel="stylesheet" href="/fonts/fonts.css" />
                <link rel="stylesheet" href="/styles/variables.css" />
                <link rel="stylesheet" href="/styles/styles.css" />
                {/* Header */}
                <link rel="stylesheet" href="/styles/header.css" />
                <link rel="stylesheet" href="/styles/logo.css" />
                <link rel="stylesheet" href="/styles/date-picker.css" />
                <link rel="stylesheet" href="/styles/location-picker.css" />
                <link rel="stylesheet" href="/styles/footer.css" />
            </head>
            <body>
                <Component />
            </body>
        </html>
    );
}
