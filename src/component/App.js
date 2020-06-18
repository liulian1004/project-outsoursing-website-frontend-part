import React, {Component} from 'react';
import '../styles/App.css';
import StudentPage from "./student/StudentPage";
import { BrowserRouter as Router } from "react-router-dom";
import Switch from "react-router-dom/es/Switch";
import Route from "react-router-dom/es/Route";
import MainPage from "./main/MainPage";
import CompanyPage from "./comapny/CompanyPage";
import LoginPage from "./main/LoginPage";
import RegistrationPage from "./main/RegistrationPage";
import ProjectDetailComponent from "./main/ProjectDetailComponent";

class App extends Component{

    render() {
        return (
            <div className="APP">

                <Router>
                    <>
                        <Switch>
                            <Route path="/" exact component={MainPage} />
                            <Route path="/login"  component={LoginPage} />
                            <Route path="/student" component={StudentPage} />
                            <Route path="/company" component={CompanyPage} />
                            <Route path="/registration" component={RegistrationPage} />
                            <Route path="/projects/:id" component={ProjectDetailComponent} />
                        </Switch>
                    </>
                </Router>
            </div>
        );
    }


}

export default App;
