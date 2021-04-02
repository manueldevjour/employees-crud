import React, { Component } from "react";
import PersonDataService from "../services/person.service";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom';

import { FaPhone, FaMailBulk, FaIdCard } from 'react-icons/fa'

export default class PersonList extends Component {
  constructor(props) {
    super(props);
    this.retrievePersons = this.retrievePersons.bind(this);

    this.state = {
      persons: [],
      dataToShow: false
    };
  }

  componentDidMount() {
    this.retrievePersons();
  }

  retrievePersons() {
    PersonDataService.getAll()
      .then(response => {
        this.setState({
          persons: response.data.people
        });
        console.log(response.data.people);
        console.log(this.state.persons)
      })
      .catch(e => {
        console.log(e);
      });
  }

  deletePerson(id) {    
    PersonDataService.delete(id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/persons')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {

    return (
      <div className="row">
        <div className="col-md-12">
          <h2 className="text-center mb-5">Employee list</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Company ID</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Email</th>
                <th>Phone number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {
              this.state.persons.map((person, index) =>
              
                <tr>
                  <td>{person.id}</td>
                  <td>{person.firstName}</td>
                  <td>{person.lastName}</td>
                  <td>{person.email}</td>
                  <td>{person.phoneNumber}</td>
                  <Link
                    to={"/persons/" + person._id}
                    className="btn btn-warning ml-2 mt-1"
                  >
                    Edit
                  </Link>
                </tr>
              )
            }
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}