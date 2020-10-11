import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default class TodoInput extends Component {
  render() {
    const { item, handleChange, handleSubmit, editItem } = this.props;

    return (
      <div className="card card-body my-3">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-group-prepend">
              <div
                className={
                  !editItem
                    ? "input-group-text bg-primary text-white"
                    : "input-group-text bg-success text-white"
                }
              >
                <i className={ !editItem ? "fas fa-plus-circle" : "fas fa-pen"} />
              </div>
            </div>
            <input
              type="text"
              className="form-control text-capitalize mr-2"
              placeholder="add a todo item"
              value={item}
              onChange={handleChange} ///value pe work
            />
            {/* <input type="datetime" name="a" id="aa"/>  */}

            <div className="input-group-append">
              <button
                className="btn bg-warning"
                type="button"
                id="button-addon2"
              >
                Set Deadline
              </button>
            </div>
          </div>

          <button
            type="submit"
            className={
              editItem
                ? "btn btn-block btn-success mt-3"
                : "btn btn-block btn-primary mt-3"
            }
          >
            {editItem ? "Edit Item" : "Add Item"}
          </button>
        </form>
      </div>
    );
  }
}
