import axios from "axios";
import Cookies from "js-cookie";

const setAuthHeader = () => {
  const token = Cookies.getJSON("jwt");
  if (token) {
    return {
      headers: { authorization: `BEARER ${Cookies.getJSON("jwt")}` },
    };
  }
  return undefined;
};

export const getSecretData = async () => {
  return await axios.get("/api/v1/secret", setAuthHeader()).then((response) => {
    // console.log(response);
    return response.data;
  });
};
