import React, { Component } from "react";

import uuid from "uuid";
import "bootstrap/dist/css/bootstrap.min.css";

export default class TodoInput extends Component {
  render() {
    const { item, handleChange, handleSubmit, handleEdit } = this.props;

    return (
      <div className="card card-body my-3">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text bg-primary text-white">
                <i className="fas fa-plus-circle" />
              </div>
            </div>
            <input
              type="text"
              className="form-control text-capitalize mr-2"
              placeholder="add a todo item"
              defaultValue={item}
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

          <button type="submit" className="btn btn-block btn-primary mt-3">
            add item
          </button>
        </form>
      </div>
    );
  }
}
