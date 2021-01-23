// import { useAuth0 } from "@auth0/auth0-react";
import auth0 from "auth0-js";
import Cookies from "js-cookie";

class Auth0 {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: "dev-2osrhxob.us.auth0.com",
      clientID: "jPgEKqalXKS1g6ZjPhKYK2rKk9eliUB2",
      redirectUri: "http://localhost:3000/callback",
      responseType: "token id_token",
      scope: "openid profile",
    });
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);

    // const newlogout = useAuth0.logout;
  }

  // success will return an authResult object with:
  // and accessToken string, an idToken string,
  // and idToken Payload object with the user's profile info
  handleAuthentication() {
    // debugger;
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          // history.replaceState("/home");

          resolve();
        } else if (err) {
          // history.replace("/home");
          reject(err);
          console.log(err);
        }
      });
    });
  }

  //set login tokens on client
  setSession(authResult) {
    // debugger;
    //Save tokens
    // authResult.expiresIn is in milliseconds - transform into seconds
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    // localStorage.setItem("access_token", authResult.accessToken);
    // localStorage.setItem("id_token", authResult.idToken);
    // localStorage.setItem("expires_at", expiresAt);

    Cookies.set("user", authResult.idTokenPayload);
    Cookies.set("jwt", authResult.idToken);
    Cookies.set("expiresAt", expiresAt);
  }

  login() {
    this.auth0.authorize();
  }

  logout() {
    Cookies.remove("user");
    Cookies.remove("jwt");
    Cookies.remove("expiresAt");
    // newlogout({ returnTo: window.location.origin });
    this.auth0.logout({
      returnTo: "http://localhost:3000",
      clientID: "jPgEKqalXKS1g6ZjPhKYK2rKk9eliUB2",
    });
  }

  // check whether current time is past Access Token expiry time
  // if it is we are authenticated
  isAuthenticated() {
    const expiresAt = Cookies.getJSON("expiresAt");
    return new Date().getTime() < expiresAt;
  }

  async clientAuth() {
    return this.isAuthenticated();
    // const token = Cookies.getJSON("jwt");
    // const verifiedToken = await this.verifyToken(token);

    // return verifiedToken;
  }

  async serverAuth(req) {
    if (req.headers.cookie) {
      const expiresAtCookie = req.headers.cookie
        .split(";")
        .find((c) => c.trim().startsWith("expiresAt="));

      if (!expiresAtCookie) {
        return undefined;
      }
      const expiresAt = expiresAtCookie.split("=")[1];
      return new Date().getTime() < expiresAt;
      //   const token = getCookieFromReq(req, "jwt");
      //   const verifiedToken = await this.verifyToken(token);

      //   return verifiedToken;
    }

    // return undefined;
  }
}

const auth0Client = new Auth0();

export default auth0Client;
