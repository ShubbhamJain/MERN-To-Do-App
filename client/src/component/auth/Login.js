import React from "react";
import { Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import { Redirect } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      msg: null,
    };

    this.onChange = this.onChange.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
  }

  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;

    if (error !== prevProps.error) {
      if (error.id === "LOGIN_FAIL") {
        this.setState({
          msg: error.msg.msg,
        });
      } else {
        this.setState({
          msg: null,
        });
      }
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    let { email, password } = this.state;

    let user = {
      email,
      password,
    };

    this.props.login(user);
  };

  render() {
    if (this.props.isAuthenticated) {
      this.props.clearErrors();
      this.setState({
        email: "",
        password: "",
      });
      return <Redirect to="/dashboard" />;
    }
    return (
      <div
        className="register border border-dark rounded"
        style={{
          margin: "3% 22% 0",
          padding: "2% 3%",
        }}
      >
        <h1 className="text-center mb-3">Sign In</h1>
        {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
        <Form onSubmit={this.onSubmit}>
          <FormGroup className="">
            <Label htmlFor="userEmail">Email</Label>
            <Input
              type="email"
              name="email"
              id="userEmail"
              placeholder="Enter Email id..."
              className="mb-3"
              onChange={this.onChange}
            />
            <Label htmlFor="userPassword">Password</Label>
            <Input
              type="password"
              name="password"
              id="userPassword"
              placeholder="Enter Password..."
              className="mb-3"
              onChange={this.onChange}
            />
            <Button type="submit" color="primary" className="mt-4" block>
              Sign In
            </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { login, clearErrors })(Login);
