import React, {Component} from "react";
import CompanyService from "../service/CompanyService";
import {Button, Col, Form, Input, message, Row} from "antd";
import {InboxOutlined, PlusCircleOutlined} from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import Divider from "antd/es/divider";
import ContainerOutlined from "@ant-design/icons/lib/icons/ContainerOutlined";
import List from "antd/es/list";
import Skeleton from "antd/es/skeleton";
import Avatar from "antd/es/avatar";
import CompanyStudentModal from "./CompanyStudentModal";

class CompanyProjectComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            description: '',
            fileList: '',
            projectUrl: '',
            projectName:'',
            status:'',
            applicants: [],
            newFile:[],
            refresh: '',
            uploading: false,
        }

    }

    finishProject =() => {
        CompanyService.finishCompany(this.state.id).then(response => {
            message.success("finished")
            this.setState({
                status:'finished'
            })
        }).catch(error => {
            message.error("failed")
        })
    }

    refresh= () => {
        CompanyService.getProjectsById(this.state.id).then(response => {
            this.setState({
                description: response.data.description,
                projectUrl:response.data.projectUrl,
                projectName: response.data.projectName,
                status: response.data.status,
            })
        })

        CompanyService.getAppliedStudentsOfProject(this.state.id).then(response => {
            this.setState({
                applicants: response.data
            })
        });
    }
    componentDidMount() {
        this.refresh();
    }

    handelNameChange = (e) => {
        this.setState({
            projectName: e.target.value
        })
    }

    handelDescriptionChange = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    update = () => {
        const {projectName, description, newFile} = this.state;
        const formData = new FormData();
        newFile.forEach(file => {
            formData.append('file', file);
        });
        this.setState({
            uploading: true,
        });
        formData.append('projectName', projectName);
        formData.append('description', description);
        formData.append('projectId', this.state.id);
        CompanyService.updateProject(formData).then(response => {
            message.success("update successfully")
            this.setState({
                newFile: [],
                uploading: false,
            });
            this.refresh();
        }).catch(error => {
            this.setState({
                uploading: false,
            })
            message.error('upload failed.');
        })
        this.refresh();
    };

    render() {

        const {newFile, description,projectName, status, id, uploading} = this.state;
        const props = {

            onRemove: file => {
                this.setState(state => {
                    const index = state.newFile.indexOf(file);
                    const newFileList = state.newFile.slice();
                    newFileList.splice(index, 1);
                    return {
                        newFile: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    newFile: [...state.newFile, file],
                }));
                return false;
            },
            newFile,
            accept: ".doc, .docx, .pdf"
        };

        return (
            <div className="ant-card-bordered project-detail-container">
                <br/><br/>
                <div>
                        <Form
                            layout="vertical"
                        >
                            <Row gutter={16}>
                                <Col span={12}>

                                    <Form.Item
                                        name="Project Name"
                                        label="Project Name"
                                        rules={[
                                            { required: true, message: 'Please enter project name' }
                                        ]}
                                    >

                                        <Input placeholder="Please enter project name" value={projectName} onChange={this.handelNameChange.bind(this)}/>
                                    </Form.Item>
                                </Col>
                                <Col span={12} push={4}>
                                    status: {status} &nbsp;
                                    <br/>
                                    <br/>
                                    <Button type="primary"  size="small" onClick={this.finishProject}>
                                        finish project
                                    </Button>
                                </Col>

                            </Row>
                            <Row gutter={16}>
                                <Col span={24}>
                                    <Form.Item
                                        name="description"
                                        label="Description"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'description of the project',
                                            },
                                        ]}
                                    >
                                        <Input.TextArea rows={4} placeholder="please enter the description" value={description}
                                                        onChange={this.handelDescriptionChange.bind(this)}/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={[0, 30]}>
                                <a href={this.state.projectUrl} className="resume-font"><ContainerOutlined /> &nbsp; detail.pdf</a>
                            </Row>
                            <Row gutter={30}>
                                <Col span={24}>
                                    <Dragger {...props} >
                                        <p className="ant-upload-drag-icon">
                                            <InboxOutlined />
                                        </p>
                                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                        <p className="ant-upload-hint">
                                            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                                            band files
                                        </p>
                                    </Dragger>
                                </Col>

                            </Row>
                            <Row gutter={30}>
                                <Col push={20}>
                                    <Form.Item
                                    >
                                        <br/>
                                        <br/>
                                    <Button type="primary" size="large" onClick={this.update}>
                                        {uploading ? 'Uploading' : 'Start Upload'}
                                    </Button>
                                </Form.Item>
                                </Col>
                            </Row>

                        </Form>
                </div>
                <Divider />

                <List
                    className="demo-loadmore-list"
                    itemLayout="horizontal"
                    dataSource={this.state.applicants.sort((a,b) => a.student_id - b.student_id)}
                    renderItem={item => (

                            <List.Item

                                actions={[<a>status: {item.status}</a>,
                                    <a onClick={e => {
                                        CompanyService.approveApplication(this.state.id, item.student_id).then(response => {
                                            message.success("success")
                                            this.refresh();
                                        }).catch(error => {
                                            message.error("failed")
                                        })
                                    }} >accept</a>, <a
                                    onClick={e =>{
                                        if (item.status == "pending") {
                                            CompanyService.rejectApplication(this.state.id, item.student_id).then(response => {
                                                message.success("success")
                                                this.refresh()
                                            }).catch(error => {
                                                message.error("failed")
                                            })
                                        } else {
                                            message.error("You can't decline a already approved or declined student")
                                        }
                                    }}>decline</a>]}
                            >

                            <Skeleton avatar title={false} loading={item.loading} active>
                                <List.Item.Meta
                                    avatar={
                                        <Avatar src={item.student.iconUrl} />
                                    }
                                    title={<CompanyStudentModal student={item} />}
                                    description={item.student.institution}
                                />

                            </Skeleton>
                        </List.Item>
                    )}
                    />
            </div>
        );
    }
}

export default CompanyProjectComponent;