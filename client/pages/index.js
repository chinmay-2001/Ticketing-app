import buildClient from "../api/build-client";
const landingPage = ({ currentUser }) => {
	return currentUser ? (
		<h1> Your are signed in</h1>
	) : (
		<h1>You are not singed in</h1>
	);
};

landingPage.getInitialProps = async (context) => {
	try {
		const client = buildClient(context);
		const { data } = await client.get("/api/users/currentuser");
		return data;
	} catch (err) {
		return {};
	}
};

export default landingPage;
