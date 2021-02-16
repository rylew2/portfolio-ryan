import React, { Component } from "react";
import BasePage from "../components/BasePage";
import BaseLayout from "../components/layouts/BaseLayout";
import PortfolioCreateForm from "../components/portfolios/PortfolioCreateForm";
import withAuth from "../components/hoc/withAuth";
import { Row, Col } from "reactstrap";
class PortfolioNew extends Component {
  render() {
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage
          className="portfolio-create-page"
          title="Create new Portfolio"
        >
          <Row>
            <Col md="6">
              <PortfolioCreateForm />
            </Col>
          </Row>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withAuth("siteOwner")(PortfolioNew);
