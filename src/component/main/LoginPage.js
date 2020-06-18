import React, { Component } from "react";
import TopNavBar from "../TopNavBar";
import LoginForm from "./LoginForm";

class LoginPage extends Component {
    render() {
        return (
            <div>
                <TopNavBar />
                <LoginForm />
            </div>
        )
    }
}

export default LoginPage;