const routes = require("next-routes");

module.exports = routes()
// map a page to a route
//.add(page, route)

//order matters - put more specific before more general
  .add("portfolioNew", "/portfolios/new")
  .add("portfolio", "/portfolio/:id")
  .add("portfolioEdit", "/portfolios/:id/edit")
  .add("userBlogs", "/blogs/dashboard")
  .add("blogEditor", "/blogs/new")
  .add("blogDetail", "/blogs/:slug")
  .add("blogEditorUpdate", "/blogs/:id/edit");
