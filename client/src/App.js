import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    username: "",
    email: "",
    password: ""
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const userData = this.state;
    console.log(userData);
    axios
      .post("/api/users/register", userData)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err.message);
      });
  };
  render() {
    return (
      <div className="App">
        <div className="register">
          <h1>Register Form</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              placeholder="username"
              name="username"
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
            />
            <input
              placeholder="email"
              name="email"
              type="text"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <input
              placeholder="password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <button>Log in</button>
          </form>
        </div>
        <div className="login">
          <h1>Login Form</h1>
        </div>
      </div>
    );
  }
}

export default App;
