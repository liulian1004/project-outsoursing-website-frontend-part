import React, { Component } from 'react';
import {
    Form,
    Input,
    Tooltip,
    Select,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import Checkbox from "antd/es/checkbox";
import Button from "antd/es/button";
import AuthenticationService from "../service/AuthenticationService";
import {withRouter} from 'react-router-dom';

const {Option} = Select;

class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: "student",
            error: undefined,
            help: undefined,
        }
        this.onFinish = this.onFinish.bind(this);


    }
    onFinish(values) {
        AuthenticationService.signUp(values).then(response => {
            this.props.history.push(`/login`)
        }).catch(error => {
            console.log(error)
            this.setState({
                error: 'error',
                help: 'email or username has been taken!',
            })
        })
    }

    render() {
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 8},
        };
        function isSimplePwd(s) {
            if (s.length < 8) {
                return 0;
            }
            var ls = 0;
            if (s.length >= 8) {
                ls++;
            }
            if (s.match(/([a-z])+/)) {
                ls++;
            }
            if (s.match(/([0-9])+/)) {
                ls++;
            }
            if (s.match(/([A-Z])+/)) {
                ls++;
            }
            if (s.match(/[^a-zA-Z0-9]+/)) {
                ls++;
            }
            return ls;
        }

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 5,
                    offset: 7,
                },
            },
        };

        function isLowLetter(a) {
            if (a.match(/([a-z])+/)) {
                return true;
            } else {
                return false;
            }
        }
        function isUpperLetter(a) {
            if (a.match(/([A-Z])+/)) {
                return true;
            } else {
                return false;
            }
        }
        function isNum(a) {
            if (a.match(/([0-9])+/)) {
                return true;
            } else {
                return false;
            }
        }
        function isSpecial(a) {
            if (a.match(/[^a-zA-Z0-9]+/)) {
                return true;
            } else {
                return false;
            }
        }

        const prefixSelector = (
            <Form.Item name="prefix" noStyle>
                <Select style={{ width: 70 }}>
                    <Option value="1">+1</Option>
                    <Option value="86">+86</Option>
                </Select>
            </Form.Item>
        );
        return (
            <Form
                name="validate_other"
                {...formItemLayout}
                onFinish={this.onFinish}
            >
                <Form.Item
                    validateStatus={this.state.error}
                    help={this.state.help}
                ></Form.Item>
                <Form.Item
                    name="userType"
                    label="Sign up as"
                    hasFeedback
                    rules={[{required: true, message: 'Please select your role!'}]}
                >
                    <Select placeholder="Sign up as a student or a company?">
                        <Option value="student">Student</Option>
                        <Option value="company">Company</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                        ({getFieldValue}) => (
                            {
                                validator(rule, value) {
                                    if (value !== "jl9829@nyu.edu") {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('This email has been taken!');
                                },
                            }),
                    ]}

                >
                    <Input autoComplete="new-user"/>
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        ({getFieldValue}) => (
                            {
                                validator(rule, value) {
                                    const score = isSimplePwd(value)
                                    if (score < 5) {
                                        if (value.length < 8) {
                                            return Promise.reject('Minimum length is 8');
                                        } else if (!isLowLetter(value)) {
                                            return Promise.reject('Require lowercase letter');
                                        } else if (!isUpperLetter(value)) {
                                            return Promise.reject('Require lowercase letter');
                                        } else if (!isNum(value)) {
                                            return Promise.reject('Require numbers')
                                        }
                                    }
                                    return Promise.resolve();
                                }
                            }),
                    ]}
                    hasFeedback
                >
                    <Input.Password autoComplete="new-password"/>
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({getFieldValue}) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('The two passwords that you entered do not match!');
                            },
                        }),
                    ]}
                >
                    <Input.Password autoComplete="new-password"/>
                </Form.Item>
                <Form.Item
                    name="username"
                    label={
                        <span>
            Username&nbsp;
                            <Tooltip title="What do you want others to call you?">
              <QuestionCircleOutlined/>
            </Tooltip>
          </span>
                    }
                    rules={[
                        {
                            required: true, message: 'Please input your nickname!', whitespace: true
                        },
                        ({getFieldValue}) => (
                            {
                                validator(rule, value) {

                                    if (value.length < 5) {
                                        return Promise.reject('Minimum length is 5');
                                    }
                                    return Promise.resolve();
                                }
                            }),
                        ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="phoneNum"
                    label="Phone Number"
                    rules={[{ required: false, message: 'Please input your phone number!' }]}
                >
                    <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        { validator:(_, value) => value ? Promise.resolve() : Promise.reject('Should accept agreement') },
                    ]}
                    {...tailFormItemLayout}
                >
                    <Checkbox>
                        I have read the <a href="">agreement</a>
                    </Checkbox>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        )
    }

}

export default withRouter(RegistrationForm);