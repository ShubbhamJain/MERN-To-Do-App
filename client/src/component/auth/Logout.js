import React, { Fragment } from "react";
import { logout } from "../../actions/authActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

class Logout extends React.Component {
  constructor(props) {
    super(props);

    this.log = this.log.bind(this);
  }

  static propTypes = {
    logout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  log = () => {
    this.props.logout();
  };

  render() {
    return (
      <Fragment>
        <Link to="/">
          <Button className="btn btn-danger ml-2" size="lg" onClick={this.log}>
            Logout
          </Button>
        </Link>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Logout);
