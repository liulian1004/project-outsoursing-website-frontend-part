import React, { Component } from 'react';
import AuthenticationService from "../service/AuthenticationService";
import jwt_decode from "jwt-decode";
import { withRouter} from 'react-router-dom';
import Route from "react-router-dom/es/Route";
import StudentProfileManagerComponent from "./StudentProfileManagerComponent";
import StudentRatingComponent from "./StudentRatingComponent";
import TopNavBar from "../TopNavBar";
import StudentProjectList from "./StudentProjectList";

class StudentPage extends Component{
    constructor(props) {
        super(props);
        const user = AuthenticationService.getCurrentUser();

        if (user) {
            const decode = jwt_decode(user.token)
            const role = decode.role
            this.state = {
                role: role,
            };
            if (role === "company") {
                props.history.push("/company")
            }
        } else {
            props.history.push("/login")
        }
        this.router = this.router.bind(this)

    }

    router(url) {
        this.props.history.push(url)
        console.log(this.props.history)
    }

    render() {

        return (
            <div className="App" role={this.state.role}>
                <TopNavBar router={this.router}/>
                <Route path="/student"  exact component={StudentProfileManagerComponent} />
                <Route path="/student/profile"  exact component={StudentProfileManagerComponent} />
                <Route path="/student/projects" exact component={StudentProjectList} />
                <Route path="/student/rating" exact component={StudentRatingComponent} />
            </div>
        )
    }
}

export default withRouter(StudentPage);
