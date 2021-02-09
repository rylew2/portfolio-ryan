const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

//MIDDLEWARE

// build certificate - same way as our manual check in auth0.js verifyToken()
// checking for a token in authorization header, if token is present it will check validity
// if token is valid it will pass to middleware
// if token not present it will show an error

exports.checkJWT = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true, // Default Value
    rateLimit: true,
    jwksRequestsPerMinute: 15,
    jwksUri: "https://dev-2osrhxob.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "jPgEKqalXKS1g6ZjPhKYK2rKk9eliUB2", //auth0 clientID
  issuer: "https://dev-2osrhxob.us.auth0.com/", //auth0 domain  w/ https
  algorithms: ["RS256"],
});
