import React from "react";
import BasePage from "../BasePage";
import BaseLayout from "../layouts/BaseLayout";

const namespace = "http://localhost:3000/";

// Higher order component that if used, will allow
export default  (role) => {
  return (Component) => {
    return class withAuth extends React.Component {
      static async getInitialProps(args) {
        // if page Component has a getInitialProps - execute it
        const pageProps =
          (await Component.getInitialProps) &&
          (await Component.getInitialProps(args));

        return { ...pageProps };
      }

      renderProtectedPage() {
        const { isAuthenticated, user } = this.props.auth;
        const userRole = user && user[`${namespace}role`];
        let isAuthorized = false;
        console.log("userRole", userRole);
        console.log("role", role);
        if (role) {
          if (userRole && userRole === role) {
            isAuthorized = true;
          }
        } else {
          isAuthorized = true;
        }
        console.log("isAuthenticated", isAuthenticated);
        console.log("isAuthorized", isAuthorized);

        if (!isAuthenticated) {
          return (
            <BaseLayout {...this.props.auth}>
              <BasePage>
                <h1>
                  You are not authenticated. Please Login to access this page.
                </h1>
              </BasePage>
            </BaseLayout>
          );
        } else if (!isAuthorized) {
          return (
            <BaseLayout {...this.props.auth}>
              <BasePage>
                <h1>
                  You are not Authorized. You don't have permission to visit
                  this page.
                </h1>
              </BasePage>
            </BaseLayout>
          );
        } else {
          return <Component {...this.props} />;
        }
      }

      render() {
        return this.renderProtectedPage();
      }
    };
  };
}
