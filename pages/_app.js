// Stylings
import "bootstrap/dist/css/bootstrap.min.css";
import App from "next/app";
import React from "react";
import auth0 from "../services/auth0";
// import "react-toastify/dist/ReactToastify.css";
import "../styles/main.scss";

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    console.log("_app.js getInitialProps");

    let pageProps = {};

    const isAuthenticated = process.browser
      ? auth0.clientAuth()
      : auth0.serverAuth(ctx.req);
    console.log(isAuthenticated);

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const auth = { isAuthenticated };

    return { pageProps, auth };
  }

  render() {
    const { Component, pageProps, auth } = this.props;
    return <Component {...pageProps} auth={auth} />;
  }
}
export default MyApp;

export async function getServerSideProps(ctx) {
  console.log("_app.js getserversideprops");
  // let pageProps = {};

  // if (Component.getInitialProps) {
  //   pageProps = await Component.getInitialProps(ctx);
  // }
  // return {
  //   props: { pageProps }, // will be passed to the page component as props
  // };
}
