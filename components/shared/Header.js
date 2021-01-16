import React, { Component } from "react";
import Link from "next/link";
import '../../styles/main.scss'

class Header extends Component {
  render() {
    const title = this.props.title;
    return (
      <>
        <p>{title}</p>
        {this.props.children}
        <p className="customClass">I am styled P element</p>
        <p className="customClassFromFile">I am styled P element</p>
        <div>
          <Link href="/">
            <a style={{ fontSize: "20px" }}>home</a>
          </Link>
        </div>
        <div>
          <Link href="/about">
            <a>about</a>
          </Link>
        </div>
        <div>
          <Link href="/blog">
            <a>blog</a>
          </Link>
        </div>
        <div>
          <Link href="/cv">
            <a>cv</a>
          </Link>
        </div>
        <div>
          <Link href="/portfolio">
            <a>portfolio</a>
          </Link>
        </div>
        <style jsx>
          {`
            a {
              font-size: 20px;
            }
            .customClass {
              color: red;
            }
          `}
        </style>
      </>
    );
  }
}

export default Header;
