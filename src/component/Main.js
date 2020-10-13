import React, { Component } from "react";
// import fire from "../config/fire";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import DatePicker from "react-datepicker";

import { v1 as uuid } from "uuid";
import "bootstrap/dist/css/bootstrap.min.css";

class Main extends Component {
  state = {
    items: [],
    id: uuid(),
    item: "",
    editItem: false,
    rank: null,
    date: new Date(),
  };

  handleChange = (e) => {
    this.setState({
      item: e.target.value,
    });
  };
  handleDate = (e) => {
    if (e.getHours() === 0 && e.getMinutes() === 0) {
    }
    this.setState({
      rank:
        e.getMinutes() +
        e.getHours() * 100 +
        e.getDate() * 10000 +
        e.getMonth() * 1000000 +
        e.getYear() * 10000000,
      date: e,
    });

    console.log(this.state.rank);
    console.log(this.state.date);
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.item === "" || this.state.rank === "") {
      alert("Enter a non-empty item and rank");
    } else {
      const newItem = {
        id: this.state.id,
        title: this.state.item,
        rank: this.state.rank,
        date: this.state.date,
      };
      console.log(newItem);

      const updatedItems = [newItem, ...this.state.items];
      console.log(updatedItems);
      updatedItems.sort((a, b) => a.rank - b.rank);
      console.log(updatedItems);

      console.log(this.state.rank);

      this.setState({
        items: updatedItems,
        item: "",
        id: uuid(),
        editItem: false,
        rank: null,
        date: new Date(),
      });
    }

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
    alert("Proceed to Clear List?");
    this.setState({
      items: [],
    });
  };

  handleEdit = (id) => {
    const filteredItems = this.state.items.filter((item) => item.id !== id);

    const selectedItem = this.state.items.find((item) => item.id === id);

    console.log(this.state.selectedItem);
    console.log(this.state.items);

    this.setState({
      items: filteredItems,
      item: selectedItem.title,
      editItem: true,
      id: id,
      rank: selectedItem.rank,
      date: selectedItem.date
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
                date={this.state.date}
                handleDate={this.handleDate}
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
