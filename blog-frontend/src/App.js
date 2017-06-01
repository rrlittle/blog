import React, { Component } from "react";
import { Container, Menu } from "semantic-ui-react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../node_modules/semantic-ui-css/semantic.min.css";
import Dashboard from "./dashboard";
import Login from "./auth";

class App extends Component {
  state = {
    loggedIn: false
  };
  setLogin = loggedIn => {
    this.setState({
      loggedIn: loggedIn
    });
  };
  render() {
    return (
      <Router>
        <div>
          <Menu>
            <Menu.Item header>Dashboard</Menu.Item>
            <Login setLogin={this.setLogin} />
          </Menu>
          <Container>
            <Switch location={{ pathname: String(this.state.loggedIn) }}>
              <Route path={"true"}>
                <Dashboard />
              </Route>
              <Route />
            </Switch>
          </Container>
        </div>
      </Router>
    );
  }
}

export default App;
