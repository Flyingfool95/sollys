import { Head } from "$fresh/runtime.ts";
import MyDatePicker from "../../islands/MyDatePicker.tsx";
import Logo from "./Logo.tsx";

export default function Header() {
    return (
        <>
            <Head>
                <link rel="stylesheet" href="/styles/logo.css" />
                <link rel="stylesheet" href="/styles/header.css" />
                <link rel="stylesheet" href="/styles/date-picker.css" />
            </Head>

            <header>
                <MyDatePicker />
                <Logo />
                <div>Arlöv, Swe.</div>
            </header>
        </>
    );
}
