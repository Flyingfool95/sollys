import { type PageProps } from "$fresh/server.ts";
export default function App({ Component }: PageProps) {
    const criticalCss = `
    /* Reset and global styles */
    *,
    *::before,
    *::after {
        box-sizing: border-box;
        margin: 0;
    }

    html {
        font-family: "QuickSand", sans-serif;
        letter-spacing: 1px;
        line-height: 1.6;
        background: linear-gradient(var(--color-bg-top), var(--color-bg-bottom));
    }

    body {
        display: flex;
        flex-direction: column;
        min-height: 100dvh;
        overscroll-behavior: none;
        font-size: var(--font-size-sm);
        color: var(--color-secondary);
    }

    main,
    header,
    footer {
        padding: var(--spacing-md);
    }

    main {
        padding-bottom: calc(var(--spacing-xl) * 2);
    }

    footer {
        margin-top: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    h1,
    h2,
    h3,
    h4,
    h5 {
        letter-spacing: 0.5px;
        line-height: 1.2;
        overflow-wrap: break-word;
    }

    p {
        max-width: 75ch;
        line-height: 1.6;
    }

    a {
        color: var(--color-primary-alt);
        text-decoration: none;
        font-weight: bold;
    }

    a:hover{
        text-decoration: underline;
    }

    img,
    picture,
    video,
    canvas,
    svg {
        display: block;
        max-width: 100%;
    }

    input,
    button,
    textarea,
    select {
        font: inherit;
        color: inherit;
        font-size: var(--font-size-sm);
        background-color: var(--color-secondary-15);
        border: none;
        border-radius: var(--border-radius);
        padding: var(--spacing-xs) var(--spacing-sm);
        resize: none;
        line-height: 1.6;
    }

    textarea {
        resize: vertical;
        min-height: calc(var(--spacing-xl) * 3);
        max-height: calc(var(--spacing-xl) * 5);
    }

    input[type="submit"],
    button {
        background-color: transparent;
        border: 2px solid var(--color-primary);
        color: var(--color-primary);
        line-height: 1;
    }

    hr {
        color: var(--color-secondary-15);
        margin: var(--spacing-xxl) 0;
    }

    .hidden {
        display: none;
    }

    @media (min-width: 370px) {
        body {
            font-size: var(--font-size-md);
        }
    }

    /* CSS variables */
    :root {
        --spacing-xs: 5px;
        --spacing-sm: 10px;
        --spacing-md: 18px;
        --spacing-lg: 24px;
        --spacing-xl: 32px;
        --spacing-xxl: 50px;

        --color-primary: #fabb46;
        --color-primary-alt: #be9645;
        --color-secondary: #90aec4;
        --color-secondary-alt: #122e45;
        --color-secondary-15: #90aec427;

        --color-bg-top: #0b2d48;
        --color-bg-bottom: #001a2d;

        --font-size-xs: 12px;
        --font-size-sm: 14px;
        --font-size-md: 18px;
        --font-size-lg: 24px;
        --font-size-xl: 32px;
        --font-size-xxl: 50px;

        --border-radius: 10px;
    }
  `;

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
                    content="See today’s sunrise, sunset, and how long the sun will shine in your location with the Sollys daylight app."
                />
                {/* Critical */}
                <style dangerouslySetInnerHTML={{ __html: criticalCss }} />
                {/* Global */}
                <link rel="stylesheet" href="/fonts/fonts.css" />
                {/* Components */}
                <link rel="stylesheet" href="/styles/components/header.css" />
                <link rel="stylesheet" href="/styles/components/footer.css" />
                <link rel="stylesheet" href="/styles/components/logo.css" />
                <link rel="stylesheet" href="/styles/components/feedback.css" />
                {/* Islands */}
                <link rel="stylesheet" href="/styles/islands/date-picker.css" />
                <link rel="stylesheet" href="/styles/islands/location-picker.css" />
                <link rel="stylesheet" href="/styles/islands/dashboard.css" />
                <link rel="stylesheet" href="/styles/islands/loader.css" />
                <link rel="stylesheet" href="/styles/islands/modal.css" />{" "}
                <link rel="stylesheet" href="/styles/islands/tip.css" />
            </head>
            <body>
                <Component />
            </body>
        </html>
    );
}
