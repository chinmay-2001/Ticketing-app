import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client";
import Headers from "./components/headers";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Headers currentUser={currentUser}></Headers>
      <Component {...pageProps} currentUser={currentUser} />;
    </div>
  );
};
AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  try {
    const { data } = await client.get("/api/users/currentuser");
    let pageProps = {};
    if (appContext.Component.getInitialProps) {
      pageProps = await appContext.Component.getInitialProps(
        appContext.ctx,
        client,
        data.currentUser
      );
    }
    return {
      pageProps,
      ...data,
    };
  } catch (err) {
    return {};
  }
};

export default AppComponent;
