import React, { Component }  from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../../styles/App.css';
import {Link} from "react-router-dom";
import AuthenticationService from "../service/AuthenticationService";
import {withRouter} from 'react-router-dom';

class LoginForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            help: '',
        }
    }
    render() {

        const onFinish = values => {
            AuthenticationService.login(values.email, values.password).then(response => {
                if (response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                    console.log(JSON.parse(localStorage.getItem('user')));
                    this.props.history.push(`/`);
                }
            }).catch(error => {
                console.log(error)
                this.setState({
                    error: 'error',
                    help: 'username and password are not match',
                })
            })
        };

        return (
            <div className="login">
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        validateStatus={this.state.error}
                        help={this.state.help}

                    >

                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Please input your email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="/">
                            Forgot password
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        Or <Link to="/registration" >register now!</Link>
                    </Form.Item>
                </Form>
            </div>
        );

    }
}

export default withRouter(LoginForm);