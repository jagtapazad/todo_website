import React, { Component } from "react";

import uuid from "uuid";
import "bootstrap/dist/css/bootstrap.min.css";

export default class TodoInput extends Component {
  render() {
    const {item, handleChange, handleSubmit}= this.props;
    return (
      <div className="card card-body my-3">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text bg-secondary text-white">
                <i className="fas fa-plus-circle" />
              </div>
            </div>
            <input
              type="text"
              className="form-control text-capitalize"
              placeholder="add a todo item"
              
              onChange={handleChange}            ///value pe work
            />
          </div>
          <button type="submit" className="btn btn-block btn-primary mt-3">
            add item
          </button>
        </form>
      </div>
    );
  }
}
