import React, { Component } from 'react';
import Route from "react-router-dom/es/Route";
import TopNavBar from "../TopNavBar";
import AuthenticationService from "../service/AuthenticationService";
import jwt_decode from "jwt-decode";
import {withRouter} from 'react-router-dom';
import CompanyProjectManagerComponent from "./CompanyProjectManagerComponent";
import CompanyRecommendComponent from "./CompanyRecommendComponent";
import CompanyProfileManagerComponent from "./CompanyProfileManagerComponent";
import CompanyProjectComponent from "./CompanyProjectComponent";

class CompanyPage extends Component{
    constructor(props) {
        super(props);
        const user = AuthenticationService.getCurrentUser();

        if (user) {
            const decode = jwt_decode(user.token)
            const role = decode.role
            this.state = {
                role: role,
            };
            if (role === "student") {
                props.history.push("/student/profile")
            }

        } else {
            props.history.push("/login")
        }
    }
    render() {
        console.log(this.state.role)
        return (

            <div className="App">
                <TopNavBar role={this.state.role}/>
                <div className="App">
                    <Route path="/company/profile/"  exact component={CompanyProfileManagerComponent} />
                    <Route path="/company/projects/" exact component={CompanyProjectManagerComponent} />
                    <Route path="/company/projects/:id" exact component={CompanyProjectComponent} />
                </div>
            </div>
        )
    }
}

export default withRouter(CompanyPage);
