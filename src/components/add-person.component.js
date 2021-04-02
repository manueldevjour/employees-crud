import React, { Component } from "react";
import PersonDataService from "../services/person.service";

export default class AddPerson extends Component {
  constructor(props) {
    super(props);
    this.onChangeId = this.onChangeId.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
    this.savePerson = this.savePerson.bind(this);
    this.newPerson = this.newPerson.bind(this);

    this.state = {
      id: null,
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: null,
      submitted: false
    };
  }

  onChangeId(e) {
    this.setState({
      id: e.target.value
    });
  }

  onChangeFirstName(e) {
    this.setState({
      firstName: e.target.value
    });
  }

  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePhoneNumber(e) {
    this.setState({
      phoneNumber: e.target.value
    });
  }

  savePerson() {

    var data = {
      id: this.state.id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber
    };

    PersonDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          phoneNumber: response.data.phoneNumber,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newPerson() {

    this.setState({
        id: null,
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: null,
        submitted: false
    });
  }

  render() {
    return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newPerson}>
                Add
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="title">Company ID</label>
                <input
                  type="number"
                  className="form-control"
                  id="id"
                  required
                  value={this.state.id}
                  onChange={this.onChangeId}
                  name="id"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">First name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  required
                  value={this.state.firstName}
                  onChange={this.onChangeFirstName}
                  name="firstName"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  required
                  value={this.state.lastName}
                  onChange={this.onChangeLastName}
                  name="lastName"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  required
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                  name="email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Phone number</label>
                <input
                  type="number"
                  className="form-control"
                  id="phoneNumber"
                  required
                  value={this.state.phoneNumber}
                  onChange={this.onChangePhoneNumber}
                  name="phoneNumber"
                  required
                />
              </div>
              <div>
                <small>All fields are required.</small>
                <br/>
              </div>
              
  
              <button onClick={this.savePerson} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      );
  }
}