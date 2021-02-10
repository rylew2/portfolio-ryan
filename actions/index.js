import axios from "axios";
import Cookies from "js-cookie";
import { getCookieFromReq } from "../helpers/utils";

const setAuthHeader = (req) => {
  const token = req ? getCookieFromReq(req, "jwt") : Cookies.getJSON("jwt");
  if (token) {
    return {
      headers: { authorization: `BEARER ${token}` },
    };
  }
  return undefined;
};

//works for both a client or server api call
export const getSecretData = async (req) => {
  // need full url for server side (getInitialProps call here)
  const url = "http://localhost:3000/api/v1/secret";
  console.log(url);
  return await axios.get(url, setAuthHeader(req)).then((response) => {
    return response.data;
  });
};

// function(user,context, callback){
//   if(user.email==='johnfoo@gmail.com'){
//     context.idToken['http://mynamespace/roles'] = ['admin', 'guest']
//   }
//   else{
//     context.idToken['http://mynamespace/roles'] = ['guest']
//   }
//   callback(null, user, context)
// }