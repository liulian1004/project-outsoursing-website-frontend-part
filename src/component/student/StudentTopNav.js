import React, {Component} from "react";
import { Menu } from 'antd';
import {MailOutlined, AppstoreOutlined, SettingOutlined, UserOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import LogoutOutlined from "@ant-design/icons/lib/icons/LogoutOutlined";
import LoginOutlined from "@ant-design/icons/lib/icons/LoginOutlined";
import GithubOutlined from "@ant-design/icons/lib/icons/GithubOutlined";
import AuthenticationService from "../service/AuthenticationService";
import jwt_decode from "jwt-decode";
import Dropdown from "antd/es/dropdown";

const { SubMenu } = Menu;

class StudentTopNav extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.logout = this.logout.bind(this);
        this.state = {
            currentUser: undefined,
            decode: undefined,
        };
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
            });
        }
    }

    handleClick = e => {
        this.props.history.push('/')
    };

    logout() {
        AuthenticationService.logout();
    }
    render() {
        const { currentUser} = this.state;
        const menu = (
            <Menu>
                <Menu.Item>
                    <Link to="/student/profile" >
                        My Profile
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/student/projects" >
                        My Projects
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/student/rating" >
                        Rating Company
                    </Link>
                </Menu.Item>
            </Menu>
        );

        return (

            <div className="App-header">
                <div className="left">
                    <Link to="/" ><img src={logo} className="App-logo" alt="logo"/> </Link>
                </div>

                {currentUser ? (
                    <div className="right">
                        <UserOutlined style={{ fontSize: '20px', color: '#08c', marginRight:'10px'}} />
                        <Dropdown overlay={menu}>
                            <Link to={"/student"}>
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

export default StudentTopNav;
