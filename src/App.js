import React, { Component } from 'react';
import { Link, Switch } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import AddPerson from "./components/add-person.component";
import Person from "./components/person.component";
import PersonList from "./components/person-list.component";
import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/persons" className="navbar-brand">
            RingoManagement
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add new employee
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/persons"]} component={PersonList} />
            <Route exact path="/add" component={AddPerson} />
            <Route path="/persons/:personID" component={Person} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App;
