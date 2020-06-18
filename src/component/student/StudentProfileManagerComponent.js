import React, { Component } from "react";
import { Drawer, Form, Col, Row, Input, Select, message } from 'antd';
import Button from "antd/es/button";
import Avatar from "antd/es/avatar";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import MailOutlined from "@ant-design/icons/lib/icons/MailOutlined";
import WhatsAppOutlined from "@ant-design/icons/lib/icons/WhatsAppOutlined";
import Divider from "antd/es/divider";
import EditOutlined from "@ant-design/icons/lib/icons/EditOutlined";
import ContainerOutlined from "@ant-design/icons/lib/icons/ContainerOutlined";
import Upload from "antd/es/upload";
import UploadOutlined from "@ant-design/icons/lib/icons/UploadOutlined";
import StudentService from "../service/StudentService";
import AuthenticationService from "../service/AuthenticationService";
import Popconfirm from "antd/es/popconfirm";
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";
import CompanyService from "../service/CompanyService";

const { Option } = Select;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

class StudentProfileManagerComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            fistName: "",
            lastName: "",
            phone: "",
            email: "",
            institution:"",
            avatar:"",
            resumeURL: undefined,
        };
        this.showDrawer = this.showDrawer.bind(this);
        this.onClose = this.onClose.bind(this);
        this.update = this.update.bind(this);
        this.getResume = this.getResume.bind(this);

    }


    showDrawer = () => {

        this.setState({
            visible: true,
        });
        console.log(this.state.visible)
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    update(values) {
        console.log(values)
        StudentService.updateStudentProfile(values).then(response => {
            StudentService.getUserProfile().then(response => {
                let fistName;
                let lastName;
                let phone;
                let email;
                let institution;
                fistName = response.data.userinfo.firstName;
                lastName = response.data.userinfo.lastName;
                phone = response.data.phone;
                email = response.data.email;
                institution = response.data.userinfo.institution;
                this.setState({
                    visible: false,
                    fistName: fistName,
                    lastName: lastName,
                    phone: phone,
                    email: email,
                    institution: institution,
                });
            })
        })
    }

    refresh = () => {
        let fistName;
        let lastName;
        let phone;
        let email;
        let institution;
        let icon
        StudentService.getUserProfile().then(response => {
            fistName = response.data.userinfo.firstName;
            lastName = response.data.userinfo.lastName;
            phone = response.data.phone;
            email = response.data.email;
            institution = response.data.userinfo.institution;
            icon = response.data.userinfo.iconUrl
            this.setState({
                fistName: fistName,
                lastName: lastName,
                phone: phone,
                email: email,
                institution: institution,
                avatar: '',
                icon: icon,
            });
        })
        this.getResume();
    }

    componentDidMount() {
        this.refresh();
    }

    getResume() {
        StudentService.getResumeURL().then(response => {
            this.setState({
                resumeURL: response.data
            })
        }).catch(error => {
            console.log(error);
        })
    }

    confirm = (e) => {
        StudentService.deleteResume().then(response => {
            message.success("deleted")
            this.refresh();

        }).catch(error => {
            message.error("failed")
        })
    }


    render() {

        const prefixSelector = (
            <Form.Item name="prefix" noStyle>
                <Select style={{ width: 70 }}>
                    <Option value="1">+1</Option>
                    <Option value="86">+86</Option>
                </Select>
            </Form.Item>
        );

        const icon = this.state.icon;
        const resume = this.state.resumeURL;

        const token = AuthenticationService.authHeader();
        const header =  {
            Authorization: token,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH',
        }
        const refresh = this.refresh;

        let my = this;
        const props = {
            name: 'file',
            action: 'http://localhost:8080/students/resumes',
            headers: header,
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                    refresh();
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
            accept: ".docx, .pdf, .doc"
        };

        const uploadIcon = {
            name: "icon",
            listType: "picture",
            className: "avatar-uploader",
            showUploadList: false,
            headers: header,
            action: 'http://localhost:8080/students/info/icon',
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                    refresh();
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };

        return (
            <div className="ant-card-bordered student-profile-container">
                <div className="profile-detail-head">
                    <div className="profile-detail-head-wrapper" >
                        <div className="profile-detail-head-title">
                            <div className="avatar">
                                <Upload
                                    {...uploadIcon}
                                >
                                    {icon?(
                                        <Avatar src={icon} className="project-img" size={100}/>
                                        ):(
                                            <Avatar icon={<UserOutlined/>}className="project-img" size={100}/>
                                    )}
                                </Upload>
                            </div>
                            <div className="profile-title-right">
                                <div className="div-context">{
                                    this.state.fistName ? (
                                        <h2>{this.state.fistName} {this.state.lastName}</h2>
                                ): (
                                    <h2>please input your name</h2>
                                )}</div>
                                <div className="div-context email-div">
                                    <span className="email-phone">
                                        <MailOutlined /> &nbsp; {this.state.email} &nbsp;
                                        <WhatsAppOutlined /> {this.state.phone? (this.state.phone):(<>no phone num</>)}
                                    </span></div>
                                <div className="div-context"><a href="#" className="edit-font" onClick={this.showDrawer}><EditOutlined /> &nbsp; edit your profile</a></div>

                            </div>
                        </div>
                        <div className="profile-edit">
                            <Button type="primary" shape="round" size="large" onClick={this.showDrawer}>
                                Edit
                            </Button>
                            <Drawer
                                title="Update your profile"
                                width={720}
                                onClose={this.onClose}
                                visible={this.state.visible}
                                bodyStyle={{ paddingBottom: 80 }}

                            >
                                <Form
                                    layout="vertical"
                                    hideRequiredMark
                                    onFinish={this.update}
                                    initialValues={{
                                    residence: ['zhejiang', 'hangzhou', 'xihu'],
                                    prefix: '1',
                                    }}
                                >
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item
                                                name="first_name"
                                                label="First Name"
                                                rules={[
                                                    { required: false, message: 'Please enter first name' }
                                                ]}
                                            >
                                                <Input placeholder="Please enter user name" defaultValue={this.state.fistName}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                name="last_name"
                                                label="Last Name"
                                                rules={[{ required: false, message: 'Please enter Last name' }]}
                                            >
                                                <Input placeholder="Please enter user name" defaultValue={this.state.lastName}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item
                                                name="phone"
                                                label="Phone Number"
                                                rules={[{ required: false, message: 'Please input your phone number!' }]}
                                            >
                                                <Input addonBefore={prefixSelector} style={{ width: '100%' }} defaultValue={this.state.phone}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                name="university"
                                                label="University"
                                                rules={[{ required: false, message: 'Please enter your university' }]}
                                            >
                                                <Input placeholder="Please enter user university" defaultValue={this.state.institution}/>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col span={24}>
                                            <Form.Item
                                                name="description"
                                                label="Description"
                                                rules={[
                                                    {
                                                        required: false,
                                                        message: 'please introduce yourself',
                                                    },
                                                ]}
                                            >
                                                <Input.TextArea rows={4} placeholder="please enter the description" />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Form.Item >
                                            <Button type="primary" htmlType="submit">
                                                Submit
                                            </Button>
                                        </Form.Item>
                                    </Row>
                                </Form>
                            </Drawer>
                        </div>
                        <div className="profile-clear"></div>
                        <div className="profile-body">
                            <Divider />
                            <div className="project-preference">
                                <div className="preference-header">
                                    PROJECT PREFERENCE
                                </div>
                                <div className="project-item">
                                    Desired Project: Backend
                                </div>
                                <div className="project-item">
                                    Project Search status: open
                                </div>
                                <div className="project-item">
                                    Expectation time: summer
                                </div>
                            </div>
                        </div>
                        <div className="profile-clear"></div>
                        <div className="profile-body">
                            <Divider />
                            <div className="project-preference">
                                <div className="preference-header">
                                    RESUME
                                </div>
                                    {resume ? (
                                        <div className="project-item">
                                            <a href={this.state.resumeURL} className="resume-font"><ContainerOutlined /> &nbsp; resume.pdf</a>
                                            <Popconfirm
                                                title="Are you sure delete this task?"
                                                onConfirm={this.confirm}
                                                okText="Yes"
                                                cancelText="No"
                                            >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <a href="#" className={"deleteButton"}><DeleteOutlined />Delete </a>
                                            </Popconfirm>
                                        </div>
                                    ):(
                                        <div className="project-item">
                                            You don't have resume yet, upload now!
                                        </div>
                                    )}
                                    <div className="project-item">
                                        <Upload {...props}>
                                            <Button type="primary"  size={64}>
                                                <UploadOutlined /> Click to Upload
                                            </Button>
                                        </Upload>
                                    </div>

                            </div>
                        </div>
                        <div className="profile-body">
                            <Divider />
                            <div className="project-preference">
                                <div className="preference-header">
                                    EDUCATION
                                </div>
                                <div className="project-item">
                                    May 2019 -May 2021
                                </div>
                                <div className="project-item">
                                    &nbsp;&nbsp; XXXXXXX University     Master     Computer Science
                                </div>
                                <div className="project-item">
                                    Aug 2014 -Jun 2018
                                </div>
                                <div className="project-item">
                                    &nbsp;&nbsp; XXXXXXX University    Bachelor     Computer Science
                                </div>

                            </div>
                        </div>
                        <div className="profile-body">
                            <Divider />
                            <div className="project-preference">
                                <div className="preference-header">
                                    EXPERIMENT
                                </div>
                                <div className="project-item">
                                    Project history: Backend
                                </div>
                                <div className="project-item">
                                    technology stack: JAVA, PYTHON, SPRING MVC, REACT.js
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default StudentProfileManagerComponent;