import React, { Component } from "react";
import "./App.css";
import Tracker from "./Tracker";
import CreateApplication from "./CreateApplication";
import { Route, NavLink } from "react-router-dom";
import Switch from "react-bootstrap/esm/Switch";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="#home">Context Checks</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              {/* <NavLink exact activeClassName="active-link" to="/tracker">
                Tracker
              </NavLink>
              <NavLink
                exact
                activeClassName="active-link"
                to="/start-application"
              >
                Start Application
              </NavLink> */}
              <Nav.Link href="/tracker">Tracker</Nav.Link>
              <Nav.Link href="/create-application">Create Application</Nav.Link>
              {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
            <Nav>
              <Nav.Link eventKey={2} href="/sign-out">
                <AmplifySignOut />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Switch>
          <Route exact path="/tracker" component={Tracker} />
          <Route
            exact
            path="/create-application"
            component={CreateApplication}
          />
        </Switch>
      </div>
    );
  }
}

export default withAuthenticator(App, true);
