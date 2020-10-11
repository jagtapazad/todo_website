import React, { Component } from "react";

export default class TodoItem extends Component {
  itsme = () => {
    console.log("Works!!!");
  };

  itsmedown = () => {
    console.log("Works Down!!!");
  };

  render() {
    const {title, handleDelete, handleEdit} = this.props;
    return (
      
      <li className="list-group-item text capitalize d-flex justify-content-between my-2">
        <h6>{title}</h6>
        <div className="todo-icon"> 
          <span className="mx-2 text-success" onClick={handleEdit}>
            <i className="fas fa-pen" />
          </span>
          <span className="mr-3 text-danger" onClick={handleDelete}>
            <i className="fas fa-trash" />
          </span>

          <span className="mx-1 text-dark">
            <i className="fas fa-chevron-circle-up" />
          </span>
          <span className="mr-1 text-dark">
            <i className="fas fa-chevron-circle-down" />
          </span>
        </div>
      </li>
    );
  }
}
