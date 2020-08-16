import React from "react";
import { Container } from "reactstrap";

class Home extends React.Component {
  render() {
    return (
      <div
        className="text-center mt-4"
        style={{ fontFamily: "'Niconne', cursive" }}
      >
        <Container>
          <h1 className="mt-3" style={{ fontSize: "80px" }}>
            Welcome
          </h1>
          <h3 className="mt-3" style={{ fontSize: "50px" }}>
            This is To Do List App
          </h3>
          <p className="mt-3" style={{ fontSize: "30px" }}>
            Designed for users to create or login in an account and maintain
            their to do list.
          </p>
        </Container>
      </div>
    );
  }
}

export default Home;
