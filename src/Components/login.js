import React, {useState} from "react";
// import ReactDOM from "react-dom";
import "../styles/styles.css";
// import {Route, IndexRoute} from 'react-router';
import UsersDataValidate from "./login.json"; // Users to validate access

// import Messages from 'http://localhost:9091/tutorials';

function LoginComponent() {
   // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  
  const errors = {
    username: "Wrong username!",
    password: "Wrong password!"
  };

  const loginOnSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { username, password } = document.forms[0];

    // Find user login info
    const userData = UsersDataValidate.find((user) => user.username === username.value);

    // Compare user info
    if (userData) {
      if (userData.password !== password.value) {
        // Invalid password
        setErrorMessages({ name: "password", message: errors.password });
      } else {
        setIsSubmitted(true);
        window.location.replace('http://localhost:9091/messages')
      }
    } else {
      // Username doesn't exists
      setErrorMessages({ name: "username", message: errors.username });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const showLoginComponent = (
    <div className="login-box">
        <div className="background">
            <div className="shape"></div>
            <div className="shape"></div>
        </div>
        <h2>Log In</h2>
    
        <form onSubmit={loginOnSubmit}>
            <div className="user-box">
                <input type="text" id="username" required/>
                <label>Enter a valid email</label>
                {renderErrorMessage("username")}
            </div>
            <div className="user-box">
                <input type="password" id="password" required/>
                <label>Enter your password</label>
                {renderErrorMessage("password")}
            </div>
            <button data-text="Awesome" className="button">
                <span className="actual-text">&nbsp;Enter&nbsp;</span>
                <span className="hover-text" aria-hidden="true">&nbsp;Enter&nbsp;</span>
            </button>
        </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        {isSubmitted ? <div><div className="title">WELCOME!</div><div className="logged">You are logged in!</div></div> : showLoginComponent}
      </div>
    </div>
  );
}

export default LoginComponent;