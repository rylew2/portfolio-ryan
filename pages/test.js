import { withRouter } from "next/router";
import React, { Component } from "react";
import BaseLayout from "../components/layouts/BaseLayout";

class Test extends Component {
  static async getInitialProps({ query }) {
    const testId = query.id;
    return { testId };
  }

  render() {
    const { testId } = this.props;
    return (
      <BaseLayout>
        <h1>I am a Test page with id of {testId} </h1>
      </BaseLayout>
    );
  }
}

export default withRouter(Test);
