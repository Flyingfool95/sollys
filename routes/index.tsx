import Feedback from "../components/feedback/Feedback.tsx";
import Footer from "../components/footer/Footer.tsx";
import Header from "../components/header/Header.tsx";
import Dashboard from "../islands/Dashboard.tsx";

export default function Home() {
    return (
        <>
            <Header />

            <main>
                <Dashboard />
                <hr />
                {/* <Feedback /> */}
            </main>
            <Footer />
        </>
    );
}
