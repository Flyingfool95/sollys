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
                {/* Components */}
                <link rel="stylesheet" href="/styles/components/header.css" />
                <link rel="stylesheet" href="/styles/components/logo.css" />
                <link rel="stylesheet" href="/styles/components/footer.css" />
                <link rel="stylesheet" href="/styles/components/spinner.css" />
                {/* Islands */}
                <link rel="stylesheet" href="/styles/islands/date-picker.css" />
                <link rel="stylesheet" href="/styles/islands/location-picker.css" />
            </head>
            <body>
                <Component />
            </body>
        </html>
    );
}
