import { withRouter } from "next/router";
import React, { Component } from "react";
import BasePage from "../components/BasePage";
import BaseLayout from "../components/layouts/BaseLayout";
import auth0Client from "../services/auth0";

class Callback extends Component {
  async componentDidMount() {
    await auth0Client.handleAuthentication();
    this.props.router.push("/");
  }
  render() {
    return (
      <BaseLayout>
        <BasePage>
          <h1>Verifying login data ... </h1>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withRouter(Callback);
