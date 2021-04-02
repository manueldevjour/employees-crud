import React, { Component } from "react";
import PersonDataService from "../services/person.service";

export default class Person extends Component {
  constructor(props) {
    super(props);
    this.onChangeId = this.onChangeId.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
    this.getPerson = this.getPerson.bind(this);
    this.updatePerson = this.updatePerson.bind(this);
    this.deletePerson = this.deletePerson.bind(this);

    this.state = {
      currentPerson: {
        _id: undefined,
        id: undefined,
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: undefined
      },
      message: ""
    };
  }

  componentDidMount() {
    console.log("params: ", this.props.match.params)
    this.getPerson(this.props.match.params.personID);
    console.log("current person: ", )
  }

  onChangeId(e) {
    const id = e.target.value;

    this.setState(function(prevState) {
      return {
        currentPerson: {
          ...prevState.currentPerson,
          id: id
        }
      };
    });
  }

  onChangeFirstName(e) {
    const firstName = e.target.value;
    
    this.setState(prevState => ({
      currentPerson: {
        ...prevState.currentPerson,
        firstName: firstName
      }
    }));
  }

  onChangeLastName(e) {
    const lastName = e.target.value;
    
    this.setState(prevState => ({
      currentPerson: {
        ...prevState.currentPerson,
        lastName: lastName
      }
    }));
  }

  onChangeEmail(e) {
    const email = e.target.value;
    
    this.setState(prevState => ({
      currentPerson: {
        ...prevState.currentPerson,
        email: email
      }
    }));
  }

  onChangePhoneNumber(e) {
    const phoneNumber = e.target.value;
    
    this.setState(prevState => ({
      currentPerson: {
        ...prevState.currentPerson,
        phoneNumber: phoneNumber
      }
    }));
  }

  getPerson(id) {
    PersonDataService.get(id)
      .then(response => {
        this.setState({
          currentPerson: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePerson() {
    PersonDataService.update(
      this.state.currentPerson._id,
      this.state.currentPerson
    )
      .then(response => {
        console.log("response data de updatePerson: ", response.data);
        console.log("this.state de updatePerson: ", this.state);
        console.log("this.state.currentPerson de updatePerson: ", this.state.currentPerson);
        console.log("this.state.currentPerson.id de updatePerson: ", this.state.currentPerson.id);
        this.props.history.push('/persons')
      })
      .catch(e => {
        console.log(e);
      });
  }

  deletePerson() {    
    PersonDataService.delete(this.state.currentPerson._id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/persons')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentPerson } = this.state;
    console.log("currentPerson when render starts: ", currentPerson)

    return (
      <div>
        {currentPerson ? (
          <div className="edit-form">
            <h4>Edit this employee</h4>
            <form>

              <div className="form-group">
                <label htmlFor="id">Company ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="id"
                  value={currentPerson.id}
                  onChange={this.onChangeId}
                />
              </div>

              <div className="form-group">
                <label htmlFor="firstName">First name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  onChange={this.onChangeFirstName}
                  value={currentPerson.firstName}
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  onChange={this.onChangeLastName}
                  value={currentPerson.lastName}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={currentPerson.email}
                  onChange={this.onChangeEmail}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber">Phone number</label>
                <input
                  type="number"
                  className="form-control"
                  id="phoneNumber"
                  value={currentPerson.phoneNumber}
                  onChange={this.onChangePhoneNumber}
                />
              </div>

            </form>

            <button
              className="btn btn-danger mr-2"
              onClick={this.deletePerson}
            >
              Delete
            </button>

            <button
              type="submit"
              className="btn btn-success"
              onClick={this.updatePerson}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a person...</p>
          </div>
        )}
      </div>
    );
  }
}