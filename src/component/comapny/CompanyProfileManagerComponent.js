import React, {Component} from "react";
import {Col, Drawer, Form, Input, message, Row, Select} from "antd";
import MailOutlined from "@ant-design/icons/lib/icons/MailOutlined";
import WhatsAppOutlined from "@ant-design/icons/lib/icons/WhatsAppOutlined";
import EditOutlined from "@ant-design/icons/lib/icons/EditOutlined";
import Button from "antd/es/button";
import Divider from "antd/es/divider";
import CompanyService from "../service/CompanyService";
import AuthenticationService from "../service/AuthenticationService";
import Upload from "antd/es/upload";
import Avatar from "antd/es/avatar";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";

const { Option } = Select;

class CompanyProfileManagerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            icon: '',
            companyName: '',
            email: '',
            phone: '',
            id: '',
            institution: '',
            address: '',
        };
        this.showDrawer = this.showDrawer.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    refresh = () => {
        CompanyService.getCompanyInfo().then(response => {
            this.setState({
                companyName: response.data.companyInfo.firstName,
                icon: response.data.companyInfo.iconUrl,
                id : response.data.companyInfo.id,
                phone: response.data.phone,
                email: response.data.email,
                institution: response.data.companyInfo.institution,
                address:response.data.companyInfo.address,
            })
        })
    }

    componentDidMount() {
        this.refresh();

    }
    update = (values) => {
        CompanyService.updateStudentProfile(values).then(response=>{
            message.success("update successfully ");
            this.setState({
                visible: false
            })
            this.refresh();
        }).catch( error =>
            message.error("upload failed")
        )
    }

    render() {
        console.log(this.state)
        const prefixSelector = (
            <Form.Item name="prefix" noStyle>
                <Select style={{ width: 70 }}>
                    <Option value="1">+1</Option>
                    <Option value="86">+86</Option>
                </Select>
            </Form.Item>
        );
        const token = AuthenticationService.authHeader();
        const header =  {
            Authorization: token,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH',
        }
        const refresh = this.refresh;
        const uploadIcon = {
            name: "icon",
            listType: "picture",
            className: "avatar-uploader",
            showUploadList: false,
            headers: header,
            action: 'http://localhost:8080/enterprises/info/icon',
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
                                    {this.state.icon?(
                                        <Avatar src={this.state.icon} className="project-img" size={100}
                                                shape="square"/>
                                    ):(
                                        <Avatar icon={<UserOutlined/>}className="project-img" size={100}
                                                shape="square"/>
                                    )}
                                </Upload>
                            </div>
                            <div className="profile-title-right">
                                <div className="div-context">{this.state.companyName ? (
                                    <h2>{this.state.companyName} </h2>
                                    ): (
                                    <h2>please input your name</h2>
                                    )}</div>
                                <div className="div-context email-div"><span className="email-phone"><MailOutlined /> &nbsp; {this.state.email} &nbsp;
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
                                >
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item
                                                name="first_name"
                                                label="First Name"
                                                rules={[
                                                    { required: false, message: 'Please enter company name' }
                                                ]}
                                            >
                                                <Input placeholder="Please enter user name" defaultValue={this.state.fistName}/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                name="address"
                                                label="Address"
                                                rules={[
                                                    { required: false, message: 'Please enter your address' }
                                                ]}
                                            >
                                                <Input placeholder="Please enter your address" defaultValue={this.state.address}/>
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
                                                name="Institution"
                                                label="Institution"
                                                rules={[{ required: false, message: 'Please enter your Institution' }]}
                                            >
                                                <Input placeholder="Please enter user Institution" defaultValue={this.state.institution}/>
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
                                    DESCRIPTION
                                </div>
                                <div className="project-item">
                                   <span className="description"> Microsoft Corporation (/maɪkroʊ.sɒft/) is an American multinational technology company with headquarters in Redmond, Washington. It develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services. Its best known software products are the Microsoft Windows line of operating systems, the Microsoft Office suite, and the Internet Explorer and Edge web browsers. Its flagship hardware products are the Xbox video game consoles and the Microsoft Surface lineup of touchscreen personal computers. In 2016, it was the world's largest software maker by revenue (currently Alphabet/Google has more revenue).[3] The word "Microsoft" is a portmanteau of "microcomputer" and "software".[4] Microsoft is ranked No. 30 in the 2018 Fortune 500 rankings of the largest United States corporations by total revenue.[5] It is considered one of the Big Five technology companies alongside Amazon, Apple, Google, and Facebook.
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="profile-clear"></div>

                    </div>
                </div>
            </div>
        );
    }
}

export default CompanyProfileManagerComponent;