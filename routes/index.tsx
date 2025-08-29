import Footer from "../components/footer/Footer.tsx";
import Header from "../components/header/Header.tsx";
import Dashboard from "../islands/Dashboard.tsx";

export default function Home() {
    return (
        <div>
            <Header />
            <Dashboard />

            <hr />
            <h2>Feedback</h2>
            <form method="post">
                <textarea name="feedback" id="feedback" placeholder="My feedback goes here..."></textarea>
                <input type="submit" value="Send" />
            </form>

            <Footer />
        </div>
    );
}
