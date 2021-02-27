// import { useAuth0 } from "@auth0/auth0-react";
import auth0 from "auth0-js";
import axios from "axios";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { getCookieFromReq } from "../helpers/utils";

const CLIENT_ID = process.env.CLIENT_ID;

class Auth0 {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: "dev-2osrhxob.us.auth0.com",
      clientID: CLIENT_ID,
      redirectUri: `${process.env.BASE_URL}/callback`,
      responseType: "token id_token",
      scope: "openid profile",
    });
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    // this.isAuthenticated = this.isAuthenticated.bind(this);

    // const newlogout = useAuth0.logout;
  }

  // success will return an authResult object with:
  // and accessToken string, an idToken string,
  // and idToken Payload object with the user's profile info
  handleAuthentication() {
    // debugger;
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        // debugger;
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

    // authResult.expiresIn is in milliseconds,
    // this statement transform into seconds (turn to seconds and add to current date)
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );

    // Got rid of localStorage
    // localStorage.setItem("access_token", authResult.accessToken);
    // localStorage.setItem("id_token", authResult.idToken);
    // localStorage.setItem("expires_at", expiresAt);

    // Cookies.set("user", authResult.idTokenPayload); //not using at all in app
    Cookies.set("jwt", authResult.idToken);
    // Cookies.set("expiresAt", expiresAt); //
  }

  login() {
    this.auth0.authorize();
  }

  logout() {
    // Cookies.remove("user");
    Cookies.remove("jwt");
    // Cookies.remove("expiresAt");
    // newlogout({ returnTo: window.location.origin });
    this.auth0.logout({
      // returnTo: "http://localhost:3000",
      returnTo: process.env.BASE_URL,

      clientID: CLIENT_ID,
    });
  }

  // check whether current time is past Access Token expiry time
  // if it is we are authenticated
  // isAuthenticated() {
  //   const expiresAt = Cookies.getJSON("expiresAt");
  //   return new Date().getTime() < expiresAt;
  // }

  // get set of public keys for signing a token
  async getJWKS() {
    const res = await axios.get(
      "https://dev-2osrhxob.us.auth0.com/.well-known/jwks.json"
    );
    const jwks = res.data;
    // console.log("in here jwks", jwks);
    return jwks;
  }

  // for a more secure check we added this function
  // to actually use/decode the jwt cookie

  // 1 - get JWKS (the set of public keys from auth0) - there is a jwks endpoint for each auth0 tenant
  // 2- extract jwt from request authorization header
  // 3 - decode jwt and grab kid property (kid is the key id property - indicates which key was used to secure signature)
  // 4 - find the signing key in jwks w/ a matching kid property
  // 5 - use x5c property tot build a certificate to verify JWT signature
  async verifyToken(token) {
    if (token) {
      const decodedToken = jwt.decode(token, { complete: true }); //complete true gives us token header parameters (need kid)

      if (!decodedToken) {
        // if token is corrupt or can't be decoded
        return undefined;
      }

      const jwks = await this.getJWKS();
      const jwk = jwks.keys[0];

      // BUILD CERTIFICATE
      let cert = jwk.x5c[0]; //get x5c property

      //split result into lines of 64 char
      cert = cert.match(/.{1,64}/g).join("\n"); // match returns an array, join each array element with a newline
      cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`;

      if (jwk.kid === decodedToken.header.kid) {
        try {
          const verifiedToken = jwt.verify(token, cert);
          const expiresAt = verifiedToken.exp * 1000;

          return verifiedToken && new Date().getTime() < expiresAt
            ? verifiedToken
            : undefined;
        } catch (err) {
          return undefined;
        }
      }
    }

    return undefined;
  }

  async clientAuth() {
    const token = Cookies.getJSON("jwt");
    const verifiedToken = await this.verifyToken(token);
    return verifiedToken;

    // return this.isAuthenticated();
  }

  async serverAuth(req) {
    if (req.headers.cookie) {
      const token = getCookieFromReq(req, "jwt");
      const verifiedToken = await this.verifyToken(token);
      return verifiedToken;
    }

    return undefined;
  }
}

const auth0Client = new Auth0();

export default auth0Client;
