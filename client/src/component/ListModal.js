import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { connect } from "react-redux";
import { addItem } from "../actions/listActions";
import PropTypes from "prop-types";

class ListModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      name: "",
    };

    this.toggle = this.toggle.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  static propTypes = {
    addItem: PropTypes.func.isRequired,
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    let newItem = {
      item: this.state.name,
    };

    this.props.addItem(newItem);

    this.toggle();
  };

  render() {
    return (
      <div>
        <Button
          color="dark"
          size="lg"
          className="add-btn d-flex mx-auto"
          style={{ margin: "20px 0px" }}
          onClick={this.toggle}
        >
          Add item
        </Button>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          style={{ paddingTop: "3%" }}
        >
          <ModalHeader toggle={this.toggle}>Add To List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup className="mb-2">
                <Label htmlFor="item">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Enter Item Name..."
                  onChange={this.onChange}
                />
                <div
                  className="mt-3"
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Button color="primary" className="mr-2">
                    Submit
                  </Button>{" "}
                  <Button color="secondary" onClick={this.toggle}>
                    Cancel
                  </Button>
                </div>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default connect(null, { addItem })(ListModal);
