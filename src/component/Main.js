import React, { Component } from "react";
import fire from "../config/fire";
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

  componentDidMount = async () => {
    var user = fire.auth().currentUser;
    var FBItems = [];

    await fire
      .firestore()
      .collection(user.uid)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          // FBItems = [doc.data(), ...this.state.items];
          var newItem = {
            id: doc.data().id,
            title: doc.data().title,
            rank: doc.data().rank,
            date: new Date(doc.data().date),
          };
          FBItems = [newItem, ...FBItems];
          FBItems.sort((a, b) => a.rank - b.rank);
        });
      });
    console.log(FBItems);
    this.setState({
      items: FBItems,
    });
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
    console.log(this.state.date.toString());
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

      const newItemFB = {
        id: this.state.id,
        title: this.state.item,
        rank: this.state.rank,
        date: this.state.date.toString(),
      };

      console.log(this.state.date.toString());

      var user = fire.auth().currentUser;

      console.log(newItem);

      const updatedItems = [newItem, ...this.state.items];
      updatedItems.sort((a, b) => a.rank - b.rank);

      fire.firestore().collection(user.uid).doc(newItem.id).set(newItemFB);

      this.setState({
        items: updatedItems,
        item: "",
        id: uuid(),
        editItem: false,
        rank: null,
        date: new Date(),
      });
    }
  };

  handleDelete = (id) => {
    var user = fire.auth().currentUser;
    const filteredItems = this.state.items.filter((item) => item.id !== id);
    const selectedItem = this.state.items.find((item) => item.id === id);
    this.setState({
      items: filteredItems,
    });
    fire.firestore().collection(user.uid).doc(selectedItem.id).delete();
  };

  clearList = () => {
    var user = fire.auth().currentUser;
    alert("Proceed to Clear List?");
    this.setState({
      items: [],
    });

    fire.firestore().collection(user.uid).delete();
  };

  handleEdit = (id) => {
    var user = fire.auth().currentUser;
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

    fire.firestore().collection(user.uid).doc(selectedItem.id).delete();
    // console.log(this.state.items[0].rank);
    // console.log(this.state.items[0] + 1);
  };

  handleUp = (id) => {
    var user = fire.auth().currentUser;
    var db = fire.firestore().collection(user.uid);

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
      
      db.doc(selectedItem.id).update({
        rank: filteredItems[flag - 1].rank
      });
      db.doc(filteredItems[flag - 1].id).update({
        rank: itemrank
      });

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
      date: selectedItem.date, //todo:: figure out date problem/////
    });

    // console.log(this.state.items[1].rank)
  };

  handleDown = (id) => {
    var user = fire.auth().currentUser;
    var db = fire.firestore().collection(user.uid);

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

      db.doc(selectedItem.id).update({
        rank: filteredItems[flag + 1].rank
      });
      db.doc(filteredItems[flag + 1].id).update({
        rank: itemrank
      });

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
