// Stylings
import "bootstrap/dist/css/bootstrap.min.css";
import App from "next/app";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import auth0 from "../services/auth0";
import "../styles/main.scss";

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    // console.log("_app.js getInitialProps");

    let pageProps = {};
    const user = process.browser
      ? await auth0.clientAuth()
      : await auth0.serverAuth(ctx.req);

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const isSiteOwner =
      user && user[process.env.NAMESPACE + "/role"] === "siteOwner";
    const auth = { user, isAuthenticated: !!user, isSiteOwner };
    // console.log("auth: ", auth);
    // console.log("pageProps", pageProps);
    return { pageProps, auth };
  }

  render() {
    const { Component, pageProps, auth } = this.props;
    return (
      <>
        <ToastContainer />
        <Component {...pageProps} auth={auth} />
      </>
    );
  }
}
export default MyApp;

// doesn't work in _app.js
export async function getServerSideProps(ctx) {
  console.log("_app.js getserversideprops");
}
