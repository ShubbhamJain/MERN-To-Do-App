import React from "react";
import { connect } from "react-redux";
import { Container } from "reactstrap";
import List from "./List";
import ListModal from "./ListModal";
import PropTypes from "prop-types";

class Dashboard extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    auth: PropTypes.object.isRequired,
  };
  render() {
    return (
      <div>
        <Container>
          {this.props.isAuthenticated ? (
            <div>
              <h1
                className="text-center mt-4 mb-4"
                style={{
                  textTransform: "capitalize",
                  fontFamily: "'Niconne', cursive",
                  fontSize: "80px",
                }}
              >{`Welcome ${this.props.auth.user.name}`}</h1>
              <ListModal />
              <List />
            </div>
          ) : null}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
});

export default connect(mapStateToProps, null)(Dashboard);
