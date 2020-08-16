import React from "react";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItems, delItem } from "../actions/listActions";
import PropTypes from "prop-types";

class List extends React.Component {
  static propTypes = {
    list: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.getItems();
  }

  delItem = (itemName) => {
    this.props.delItem(itemName);
  };

  render() {
    let { list } = this.props.list;
    let listItems = list.map((item, i) => (
      <CSSTransition key={i} timeout={500} classNames="fade">
        <ListGroupItem className="group">
          <span className="item">{item}</span>
          <Button
            color="danger"
            className="remove-btn"
            size="sm"
            onClick={this.delItem.bind(this, item)}
          >
            &times;
          </Button>
        </ListGroupItem>
      </CSSTransition>
    ));

    return (
      <div className="list">
        {list.length === 0 ? (
          <ListGroup>
            <ListGroupItem>
              <h4 className="text-center mt-2">No Items To Show</h4>
            </ListGroupItem>
          </ListGroup>
        ) : (
          <ListGroup className="listItems">
            <TransitionGroup>{listItems}</TransitionGroup>
          </ListGroup>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  list: state.list,
});

export default connect(mapStateToProps, { getItems, delItem })(List);
