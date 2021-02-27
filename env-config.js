// const prod = process.env.NODE_ENV === "production";

// module.exports = {
//   "process.env.BASE_URL": prod
//     ? // ? "https://filipjerga.herokuapp.com"
//       "https://portfolio-rylew.herokuapp.com"
//     : "http://localhost:3000",
//   // "process.env.NAMESPACE": "https://filipjerga.herokuapp.com",
//   "process.env.NAMESPACE": "https://portfolio-rylew.herokuapp.com",
//   "process.env.CLIENT_ID": "jPgEKqalXKS1g6ZjPhKYK2rKk9eliUB2",
// };

const prod = process.env.NODE_ENV === "production";
console.log("prod", prod);
module.exports = {
  "process.env.BASE_URL": prod
    ? "https://portfolio-rylew.herokuapp.com"
    : "http://localhost:3000",
  "process.env.NAMESPACE": "https://portfolio-rylew.herokuapp.com",
  "process.env.CLIENT_ID": "jPgEKqalXKS1g6ZjPhKYK2rKk9eliUB2",
};
