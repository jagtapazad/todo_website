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

    // console.log(this.state.selectedItem);
    console.log(this.state.items.length);

    this.setState({
      items: filteredItems,
      item: selectedItem.title,
      editItem: true,
      id: id,
      rank: selectedItem.rank,
      date: selectedItem.date,
    });

    // console.log(this.state.items[0].rank);
    // console.log(this.state.items[0] + 1);
  };

  handleUp = (id) => {
    const filteredItems = this.state.items;
    const selectedItem = this.state.items.find((item) => item.id === id);

    let flag = 0;
    for (let i = 0; i < this.state.items.length; i++) {
      if (selectedItem.id === this.state.items[i].id) {
        flag = i;
      }
    }

    if (flag !== 0) {
      let itemrank = selectedItem.rank;
      selectedItem.rank = filteredItems[flag - 1].rank;
      filteredItems[flag - 1].rank = itemrank;

      filteredItems.sort((a, b) => a.rank - b.rank);
    }

    // console.log(filteredItems[flag-1]);
    // console.log(this.state.items);

    this.setState({
      items: filteredItems,
      item: "",
      id: id,
      rank: selectedItem.rank,
      date: selectedItem.date,
    });

    // console.log(this.state.items[1].rank)
  };

  handleDown = (id) => {
    const filteredItems = this.state.items;
    const selectedItem = this.state.items.find((item) => item.id === id);

    let flag = 0;
    for (let i = 0; i < this.state.items.length; i++) {
      if (selectedItem.id === this.state.items[i].id) {
        flag = i;
      }
    }

    if (flag !== this.state.items.length - 1) {
      let itemrank = selectedItem.rank;
      selectedItem.rank = filteredItems[flag + 1].rank;
      filteredItems[flag + 1].rank = itemrank;

      filteredItems.sort((a, b) => a.rank - b.rank);
    }

    // console.log(filteredItems[flag-1]);
    // console.log(this.state.items);

    this.setState({
      items: filteredItems,
      item: "",
      id: id,
      rank: selectedItem.rank,
      date: selectedItem.date,
    });

    // console.log(this.state.items[1].rank)
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
                handleUp={this.handleUp}
                handleDown={this.handleDown}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default Main;
