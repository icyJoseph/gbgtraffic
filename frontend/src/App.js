import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import { fetchToken } from "./ducks/auth";

class App extends Component {
  componentDidMount() {
    this.props.fetchToken();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default connect(
  undefined,
  { fetchToken }
)(App);
