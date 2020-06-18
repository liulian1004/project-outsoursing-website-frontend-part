import React, { Component } from "react";
import TopNavBar from "../TopNavBar";
import RegistrationForm from "./RegistrationForm";

class RegistrationPage extends Component {
    render() {
        return (
            <div>
                <TopNavBar />
                <div className="register" >
                    <RegistrationForm />
                </div>
            </div>
        )
    }
}

export default RegistrationPage;