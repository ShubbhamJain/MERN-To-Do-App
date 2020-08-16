import React, { Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
} from "reactstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Logout from "./auth/Logout";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Dashboard from "./Dashboard";
import Home from "./Home";

class AppNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    const guestLinks = (
      <Fragment>
        <NavItem>
          <NavLink href="/" active>
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/login">Sign In</NavLink>
        </NavItem>
        <NavItem>
          <Button href="/register" className="btn btn-primary" size="lg">
            Sign Up
          </Button>
        </NavItem>
      </Fragment>
    );
    const authLinks = (
      <Fragment>
        <NavItem>
          <NavLink href="/dashboard" active>
            Dashboard
          </NavLink>
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </Fragment>
    );
    return (
      <Router>
        <div>
          <Navbar
            color="dark"
            dark
            expand="md"
            style={{ padding: "20px 60px" }}
          >
            <NavbarBrand
              style={{ fontFamily: "'Niconne', cursive", fontSize: "32px" }}
            >
              To Do App
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav
                className="ml-auto"
                navbar
                style={{ fontFamily: "'Lato', sans-serif", fontSize: "24px" }}
              >
                {isAuthenticated ? authLinks : guestLinks}
              </Nav>
            </Collapse>
          </Navbar>

          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(AppNavbar);
