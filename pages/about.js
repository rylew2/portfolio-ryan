import React, { Component } from "react";
import BasePage from "../components/BasePage";
import BaseLayout from "../components/layouts/BaseLayout";


class About extends Component {
  render() {
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage className="about-page" title="I am About Page">

        </BasePage>
      </BaseLayout>
    );
  }
}

export default About;
