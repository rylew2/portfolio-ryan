import axios from "axios";
import Link from "next/link";
import React, { Component } from "react";
import BasePage from "../components/BasePage";
import BaseLayout from "../components/layouts/BaseLayout";
import {
  Col,
  Row,
  Card,
  CardHeader,
  CardBody,
  CardText,
  CardTitle,
} from "reactstrap";
class Portfolios extends Component {
  static async getInitialProps() {
    let posts = [];
    console.log("getInitialProps");
    let userData = {};
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      posts = response.data;
    } catch (error) {
      console.log(error);
    }

    return { posts: posts.splice(0, 10) };
  }

  renderPosts(posts) {
    return posts.map((p, index) => {
      return (
        <Col md="4">
          <React.Fragment key={index}>
            <span>
              <Card className="portfolio-card">
                <CardHeader className="portfolio-card-header">
                  Some Position {index}
                </CardHeader>
                <CardBody>
                  <p className="portfolio-card-city"> Some Location {index} </p>
                  <CardTitle className="portfolio-card-title">
                    Some Company {index}
                  </CardTitle>
                  <CardText className="portfolio-card-text">
                    Some Description {index}
                  </CardText>
                  <div className="readMore"> </div>
                </CardBody>
              </Card>
            </span>
          </React.Fragment>
        </Col>
      );
    });
  }

  render() {
    const { posts } = this.props;
    return (
      <BaseLayout {...this.props.auth}>
        {" "}
        <BasePage className="portfolio-page" title="Portfolio">
          <Row>{this.renderPosts(posts)}</Row>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default Portfolios;
