import React, {Component} from 'react';
import logo from "../assets/images/logo.svg";
import {Link} from "react-router-dom";
import { UserOutlined } from '@ant-design/icons';
import AuthenticationService from "./service/AuthenticationService";
import jwt_decode from 'jwt-decode'
import LogoutOutlined from "@ant-design/icons/lib/icons/LogoutOutlined";
import LoginOutlined from "@ant-design/icons/lib/icons/LoginOutlined";
import GithubOutlined from "@ant-design/icons/lib/icons/GithubOutlined";
import {Menu} from "antd";
import Dropdown from "antd/es/dropdown";
import {withRouter} from 'react-router-dom';
class TopNavBar extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.logout = this.logout.bind(this);
        this.state = {
            currentUser: undefined,
            decode: undefined,
            role: "student",
        };
        console.log(this.props.role)
    }

    componentDidMount() {
        const user = AuthenticationService.getCurrentUser();

        if (user) {
            const decode = jwt_decode(user.token)
            console.log(decode)
            this.setState({
                currentUser: user,
                decode: decode,
                current: "profile",
                role:  decode.role,
            });
            this.jumpToProfile = this.jumpToProfile.bind(this);
            this.jumpToProject = this.jumpToProject.bind(this);
            this.jumpToRating = this.jumpToRating.bind(this);
        }

    }

    handleClick = e => {
        this.props.history.push('/')
    };

    logout() {
        AuthenticationService.logout();
    }

    jumpToProfile = e => {
        console.log(123)
        if (this.state.decode.role === 'student') {
            this.props.history.push('/student/profile')

        } else {
            this.props.history.push('/company/profile')
        }
    };

    jumpToProject = e => {
        if (this.state.decode.role === 'student') {
            this.props.history.push('/student/projects')
        } else {
            this.props.history.push('/company/projects')
        }
    };

    jumpToRating = e => {
        if (this.state.decode.role === 'student') {
            this.props.history.push('/student/rating')
        } else {
            this.props.history.push('/company/recommendation')
        }

    };


    render() {
        const {currentUser} = this.state;
        let menu;
        const role = this.state.role
        if (role === 'student') {
             menu = (
                <Menu>
                    <Menu.Item>
                        <Link onClick={this.jumpToProfile}>
                            My Profile
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <a onClick={this.jumpToProject}>
                            Project List
                        </a>
                    </Menu.Item>
                    <Menu.Item>
                        <a onClick={this.jumpToRating}>
                            Rating Company
                        </a>
                    </Menu.Item>
                </Menu>
            );
        } else {
             menu = (
                <Menu>
                    <Menu.Item>
                        <Link onClick={this.jumpToProfile}>
                            My Profile
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <a onClick={this.jumpToProject}>
                            Project List
                        </a>
                    </Menu.Item>
                </Menu>
            );
        }


        return (

            <div className="App-header">
                <div className="left">
                    <Link to="/" ><img src={logo} className="App-logo" alt="logo"/> </Link>
                </div>

                {currentUser ? (
                    <div className="right">
                        <UserOutlined style={{ fontSize: '20px', color: '#08c', marginRight:'10px'}} />
                        <Dropdown overlay={menu}>
                            <Link>
                                {this.state.decode.sub}
                            </Link>
                        </Dropdown>

                        <a href="/" onClick={this.logout}>
                            <LogoutOutlined style={{ fontSize: '18px', color: '#08c', marginRight:'10px', marginLeft:'20px'}}/> <span >LogOut</span></a>
                    </div>
                ) : (
                    <div className="right">
                        <Link to="/login" >
                            <LoginOutlined style={{ fontSize: '20px', color: '#08c', marginRight:'10px'}} />
                            <span>Sign in</span>
                        </Link>
                        <Link to="/registration">
                            <GithubOutlined style={{ fontSize: '20px', color: '#08c', marginLeft:'20px', marginRight:'10px'}}/>
                            <span>Sign up</span>
                        </Link>
                    </div>
                )}

            </div>
        );
    }
}

export default withRouter(TopNavBar);