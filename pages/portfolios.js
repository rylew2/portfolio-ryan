import axios from "axios";
import Link from "next/link";
import React, { Component } from "react";
import BasePage from "../components/BasePage";
import BaseLayout from "../components/layouts/BaseLayout";

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
    return posts.map((p, idx) => {
      return (
        <li key={idx}>
          <Link as={`/portfolio/${p.id}`} href="/portfolio/[id]">
            <a>{p.title}</a>
          </Link>
        </li>
      );
    });
  }

  render() {
    const { posts } = this.props;
    return (
      <BaseLayout {...this.props.auth}>
        {" "}
        <BasePage className="portfolios-page" title="Portfolio">
          <ul>{this.renderPosts(posts)}</ul>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default Portfolios;
