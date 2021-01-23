import axios from "axios";
import { withRouter } from "next/router";
import React, { Component } from "react";
import BaseLayout from "../../components/layouts/BaseLayout";

class Portfolio extends Component {
  static async getInitialProps(context) {
    console.log("getInitialProps in [id]");
    let post = {};
    const postId = context.query.id;

    let userData = {};
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      post = response.data;
    } catch (error) {
      console.log(error);
    }

    return { post };
  }

  render() {
    const { post } = this.props;
    return (
      <BaseLayout>
        <h1>I am a Portfolio page</h1>
        <h2>{this.props.router.query.id}</h2>
        <h2>{post.title}</h2>
        <h2>{post.body}</h2>
        <p>{post.id}</p>
      </BaseLayout>
    );
  }
}

export default withRouter(Portfolio);
