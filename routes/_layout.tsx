import Footer from "../components/Footer.tsx";
import Header from "../components/Header.tsx";
import { define } from "../utils.ts";

export default define.layout(({ Component }) => {
	return (
		<>
			<Header />
			<main>
				<Component />
			</main>
			<Footer />
		</>
	);
});
