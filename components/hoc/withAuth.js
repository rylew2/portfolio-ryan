import React from "react";
import BasePage from "../BasePage";
import BaseLayout from "../layouts/BaseLayout";

export default function Named(Component) {
  return class withAuth extends React.Component {
    static async getInitialProps(args) {
      // if page Component has a getInitialProps - execute it
      const pageProps =
        (await Component.getInitialProps) &&
        (await Component.getInitialProps(args));

      return { ...pageProps };
    }

    renderProtectedPage() {
      //   debugger;
      const { isAuthenticated } = this.props.auth;
      if (isAuthenticated) {
        return <Component {...this.props} />;
      } else {
        return (
          <BaseLayout {...this.props.auth}>
            <BasePage>
              <h1>
                You are not authenticated. Please Login to access this page.
              </h1>
            </BasePage>
          </BaseLayout>
        );
      }
    }
    render() {
      return this.renderProtectedPage();
    }
  };
}
