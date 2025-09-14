import { type PageProps } from "$fresh/server.ts";
export default function App({ Component }: PageProps) {
    return (
        <html lang="en">
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="theme-color" content="#001a2d" />
                <link rel="icon" type="image/x-icon" href="/favicon.png"></link>
                <title>Sollys - Every day a little brighter</title>
                <meta
                    name="description"
                    content="Project Sollys is a PWA that helps northern residents make the most of their days by showing sunrise, sunset, daylight duration, and daily light-based tips."
                />
                {/* Global */}
                <link rel="preload" href="/fonts/fonts.css" />
                <link rel="preload" href="/styles/variables.css" />
                <link rel="preload" href="/styles/styles.css" />
                {/* Components */}
                <link rel="stylesheet" href="/styles/components/header.css" />
                <link rel="stylesheet" href="/styles/components/logo.css" />
                <link rel="stylesheet" href="/styles/components/footer.css" />
                <link rel="stylesheet" href="/styles/components/feedback.css" />

                {/* Islands */}
                <link rel="stylesheet" href="/styles/islands/date-picker.css" />
                <link rel="stylesheet" href="/styles/islands/location-picker.css" />
                <link rel="stylesheet" href="/styles/islands/dashboard.css" />
                <link rel="stylesheet" href="/styles/islands/loader.css" />
            </head>
            <body>
                <Component />
            </body>
        </html>
    );
}
