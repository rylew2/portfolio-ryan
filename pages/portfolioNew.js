import React, { Component } from "react";
import BasePage from "../components/BasePage";
import BaseLayout from "../components/layouts/BaseLayout";
import PortfolioCreateForm from "../components/portfolios/PortfolioCreateForm";
import withAuth from "../components/hoc/withAuth";

class PortfolioNew extends Component {
  render() {
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage
          className="portfolio-create-page"
          title="Create new Portfolio"
        >
          <PortfolioCreateForm />
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withAuth("siteOwner")(PortfolioNew);
