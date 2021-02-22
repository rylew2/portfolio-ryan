import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import Typed from "react-typed";
import { Col, Container, Row } from "reactstrap";
import BaseLayout from "../components/layouts/BaseLayout";

class Index extends Component {
  constructor(props) {
    super(props);

    this.roles = [
      "Developer",
      "Tech lover",
      "Team player",
      "Course Creator",
      "React.js",
    ];
  }
  

  render() {
    const { isAuthenticated, user } = this.props.auth;
    return (
      <BaseLayout className="cover" {...this.props.auth} headerType="index">
        <div className="main-section">
          <div className="background-image">
            <img src="/static/images/background-index.png" />
          </div>

          <Container>
            <Row>
              <Col md="6">
                <div className="hero-section">
                  <div className={`flipper`}>
                    <div className="back">
                      <div className="hero-section-content">
                        <h2> Full Stack Web Developer </h2>
                        <div className="hero-section-content-intro">
                          Have a look at my portfolio and job history.
                        </div>
                      </div>
                      <img
                        className="image"
                        src="/static/images/section-1.png"
                      />
                      <div className="shadow-custom">
                        <div className="shadow-inner"> </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md="6" className="hero-welcome-wrapper">
                <div className="hero-welcome-text">
                  <h1>
                    {isAuthenticated && <b>{user.name}</b>}
                    Welcome to the portfolio website of Filip Jerga. Get
                    informed, collaborate and discover projects I was working on
                    through the years!
                  </h1>
                </div>
                <Typed
                  // typedRef={typedRef()}
                  loop
                  typeSpeed={60}
                  backSpeed={60}
                  strings={this.roles}
                  smartBackspace
                  backDelay={1000}
                  loopCount={0}
                  showCursor
                  cursorChar="|"
                  className="self-typed"
                />
                <div className="hero-welcome-bio">
                  <h1>Let's take a look on my work.</h1>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </BaseLayout>
    );
  }
}

export default Index;

// export async function getServerSideProps(context) {
//   console.log("in getserverSideProps");
//   let userData = {};
//   try {
//     const response = await axios.get(
//       "https://jsonplaceholder.typicode.com/todos/1"
//     );
//     userData = response.data;
//   } catch (error) {
//     console.log(error);
//   }

//   return {
//     props: { initialData: [1, 2, 3, 4], userData }, // will be passed to the page component as props
//   };
// }

// export async function getStaticProps(context) {
//   console.log("in getStaticProps");

//   return {
//     props: {}, // will be passed to the page component as props
//   };
// }
