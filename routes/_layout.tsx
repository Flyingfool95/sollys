import { PageProps } from "$fresh/server.ts";
import Footer from "../components/footer/Footer.tsx";
import Header from "../components/header/Header.tsx";

export default function _layout({ Component }: PageProps) {
    return (
        <>
            <Header />
            <main>
                <Component />
            </main>
            <Footer />
        </>
    );
}
