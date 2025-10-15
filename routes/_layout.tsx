import { define } from "../utils.ts";

export default define.layout(({ Component }) => {
	return (
		<>
			<h1>Hello there...</h1>
			<Component />
		</>
	);
});
