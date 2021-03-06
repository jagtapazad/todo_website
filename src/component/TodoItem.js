import React, { Component } from "react";

export default class TodoItem extends Component {

  render() {
    const {
      title,
      date,
      handleDelete,
      handleEdit,
      handleUp,
      handleDown,
    } = this.props;
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
            <i className="fas fa-chevron-circle-up" onClick={handleUp} />
          </span>
          <span className="mr-1 text-dark">
            <i className="fas fa-chevron-circle-down" onClick={handleDown} />
          </span>
        </div>
      </li>
    );
  }
}
