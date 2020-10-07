import React, { Component } from "react";
import fire from "../config/fire";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

import uuid from "uuid";
import "bootstrap/dist/css/bootstrap.min.css";

class Main extends Component {
  state = {
    items: [],
    id: 0,
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
              <h2 className="text-capitalize text-center"> todo input</h2>
              <TodoInput
                item={this.state.item}
                handleChange={this.state.handleChange}
                handleSubmit={this.state.handleSubmit}
              />
              <TodoList />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

// const Main = ({ logout }) => {
//   return (
//     <section className="hero">
//       <nav>
//         <h2>SAELOUN | TODO APP</h2>
//         <button onClick={logout}>Logout</button>
//       </nav>
//     </section>
//   );
// };

export default Main;
