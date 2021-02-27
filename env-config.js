//only available on client, not server

const prod = process.env.NODE_ENV === "production";

module.exports = {
  "process.env.BASE_URL": prod
    ? "https://portfolio-rylew.herokuapp.com"
    : "http://localhost:3000",
  "process.env.NAMESPACE": "https://portfolio-rylew.herokuapp.com",
  "process.env.CLIENT_ID": "jPgEKqalXKS1g6ZjPhKYK2rKk9eliUB2",
};
