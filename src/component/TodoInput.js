import React, { Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import "./Main.css";

import "react-datepicker/dist/react-datepicker.css";

export default class TodoInput extends Component {
  state = {
    selectedDate: new Date(),
  };

  onDateChange = (e) => {
    this.setState({
      selectedDate: e,
    });
    console.log(this.state.selectedDate);
  };

  render() {
    const {
      item,
      date,
      handleDate,
      handleChange,
      handleSubmit,
      editItem,
    } = this.props;

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
                <i
                  className={!editItem ? "fas fa-plus-circle" : "fas fa-pen"}
                />
              </div>
            </div>
            <input
              type="text"
              className="form-control text-capitalize mr-2"
              placeholder="add a todo item"
              value={item}
              onChange={handleChange}
            />

            <div>
              <DatePicker
                className="btn btn-block btn-warning"
                id="inputID"
                type="button"
                selected={date}
                placeholderText="Set Deadline"
                Value={date}
                onChange={handleDate}
                timeInputLabel="Time:"
                minDate={new Date()}
                dateFormat="dd/MM/yyyy h:mm aa"
                showTimeInput
                shouldCloseOnSelect={false}
                withPortal
              />
            </div>
            {console.log()}
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
