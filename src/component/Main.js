import React, { Component } from "react";
// import fire from "../config/fire";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

import { v1 as uuid } from "uuid";
import "bootstrap/dist/css/bootstrap.min.css";

class Main extends Component {
  state = {
    items: [],
    id: uuid(),
    item: "",
    editItem: false,
  };

  handleChange = (e) => {
    this.setState({
      item: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      id: this.state.id,
      title: this.state.item,
    };
    // console.log(newItem);

    const updatedItems = [...this.state.items, newItem];

    this.setState({
      items: updatedItems,
      item: "",
      id: uuid(),
      editItem: false,
    });
    // this.setState({
    //   item: "",
    // });
  };

  handleDelete = (id) => {
    const filteredItems = this.state.items.filter((item) => item.id !== id);
    this.setState({
      items: filteredItems,
    });
  };

  clearList = () => {
    this.setState({
      items: [],
    });
  };

  handleEdit = (id) => {
    const filteredItems = this.state.items.filter((item) => item.id !== id);

    const selectedItem = this.state.items.find((item) => item.id === id);

    console.log(selectedItem);

    this.setState({
      items: filteredItems,
      item: selectedItem.title,
      editItem: true,
      id: id,
    });
  };

  render() {
    const { logout } = this.props;
    return (
      <section className="main">
        <nav>
          <h2>SAELOUN | TODO APP</h2>
          <button onClick={logout}>Logout</button>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col-10 mx-auto col-md-8 mt-4">
              <TodoInput
                item={this.state.item}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                editItem={this.state.editItem}
              />
              <TodoList
                items={this.state.items}
                clearList={this.clearList}
                handleDelete={this.handleDelete}
                handleEdit={this.handleEdit}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default Main;
