import React from "react";
import { Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import { Redirect } from "react-router-dom";

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      msg: null,
    };

    this.onChange = this.onChange.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
  }

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
  };

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    const { error } = this.props;

    if (error !== prevProps.error) {
      if (error.id === "REGISTER_FAIL") {
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

    let { name, email, password } = this.state;

    let newUser = {
      name,
      email,
      password,
    };

    this.props.register(newUser);
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
        <h1 className="text-center mb-3">Sign Up</h1>
        {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
        <Form onSubmit={this.onSubmit}>
          <FormGroup className="">
            <Label htmlFor="userName">Name</Label>
            <Input
              type="text"
              name="name"
              id="userName"
              placeholder="Enter User Name..."
              className="mb-3"
              onChange={this.onChange}
            />
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
              Sign Up
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

export default connect(mapStateToProps, { register, clearErrors })(Register);
