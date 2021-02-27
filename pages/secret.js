import React, { Component } from "react";
import { getSecretData } from "../actions/index";
import BasePage from "../components/BasePage";
import withAuth from "../components/hoc/withAuth";
import BaseLayout from "../components/layouts/BaseLayout";

class Secret extends Component {
  // getInitialProps receives a single object argument - one of the obj keys is req
  // destructure req
  static async getInitialProps({ req }) {
    // const superSecretValue = "Super Secret Value";

    const anotherSecretData = await getSecretData(req);
    // console.log(anotherSecretData);
    return { anotherSecretData };
  }

  constructor(props) {
    super(props);
    this.state = { secretData: [] };
  }

  async componentDidMount() {
    const secretData = await getSecretData();
    // console.log(secretData);
    this.setState({ secretData });
  }

  displaySecretData() {
    const { secretData } = this.state;
    // debugger;
    if (secretData && secretData.length > 0) {
      return secretData.map((data, idx) => {
        return (
          <div key={idx}>
            <p>{data.title}</p>
            <p>{data.description}</p>
          </div>
        );
      });
    }
    return null;
  }

  render() {
    const { superSecretValue } = this.props;
    console.log(this.props);
    console.log(this.state);
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage>
          <h1>I am Secret Page</h1>
          <p>Secret Content here</p>
          <h2>{superSecretValue}</h2>

          {this.displaySecretData()}
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withAuth()(Secret);
