import React, {Component} from "react";
import CompanyService from "../service/CompanyService";
import {Button, Col, Form, Input, message, Modal, Row} from "antd";
import {InboxOutlined, PlusCircleOutlined} from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import Descriptions from "antd/es/descriptions";
import Badge from "antd/es/badge";
import ContainerOutlined from "@ant-design/icons/lib/icons/ContainerOutlined";
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";
import Popconfirm from "antd/es/popconfirm";

class CompanyStudentModal extends Component {
    constructor(props) {
        super(props);
        console.log(props.student.student.firstName)
        this.state = {
            ModalText: 'Content of the modal',
            visible: false,
            confirmLoading: false,
            fileList: [],
            firstName: this.props.student.student.firstName,
            lastName: this.props.student.student.lastName,
            institution: this.props.student.student.institution,
            studentId: this.props.student.student_id,
            phone: this.props.student.student_phone,
            resume: this.props.student.resume,
            email: this.props.student.email,
            status: this.props.student.status,
            letter: this.props.student.letter,
            letterId: this.props.student.letterId,
        };
        this.props = props;
    }

    componentDidMount() {
        this.forceUpdate()
    }


    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        const {studentId, fileList} = this.state;
        const formData = new FormData();
        fileList.forEach(file => {
            formData.append('file', file);
        });
        formData.append('studentId', studentId)
        CompanyService.issueLetter(formData).then(response => {
            message.success("upload successfully");
            this.setState({
                letter: response.data.letterUrl,
                letterId: response.data.id,
            })
        }).catch(error => {
            message.error("upload failed");
        })
        this.setState({
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                confirmLoading: false,
            });

        }, 500);


    };

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    };

    confirm = (e) => {
        CompanyService.deleteLetter(this.state.letterId).then(response => {
            this.setState({
                letter: undefined,
                letterId: '',
            })
            message.success("delete successfully")
        }).catch(error => {
            message.error("delete failed")
        })
    }



    render() {
        const { visible, confirmLoading, fileList, projectName, description, letterId } = this.state;


        const props = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList: [...state.fileList, file],
                }));
                return false;
            },
            fileList,
            accept: ".doc, .docx, .pdf"
        };

        let status;
        let resume;
        if (this.state.status === 'pending') {
            status = <Badge status="warning" text={this.state.status} />
        } else if (this.state.status === 'rejected') {
            status = <Badge status="error" text={this.state.status} />
        } else if (this.state.status === 'approved') {
            status= <Badge status="success" text={this.state.status} />
            resume = <>
                <Dragger {...props} >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                        band files
                    </p>
                </Dragger></>
        } else {
            status= <Badge status="default" text={this.state.status} />
            resume = <>
                <Dragger {...props} >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                        band files
                    </p>
                </Dragger></>
        }
        return (
            <div>
                <a  onClick={this.showModal}>
                    {this.state.firstName} {this.state.lastName}
                </a>
                <Modal
                    title="Add a new object"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                    okText="submit"
                    width={800}
                >
                    <Descriptions
                        title="User Info"
                        bordered>
                    <Descriptions.Item label="First Name">{this.state.firstName}</Descriptions.Item>
                    <Descriptions.Item label="Last Name">{this.state.lastName}</Descriptions.Item>
                    <Descriptions.Item label="email">{this.state.email}</Descriptions.Item>
                    <Descriptions.Item label="phone">{this.state.phone}</Descriptions.Item>
                    <Descriptions.Item label="institution" span={2}> {this.state.institution}</Descriptions.Item>
                    <Descriptions.Item label="Status" span={3}>
                        {status}
                    </Descriptions.Item>
                    <Descriptions.Item label="resume">{this.state.resume ? (
                            <a href={this.state.resume}><ContainerOutlined /> &nbsp; resume.pdf</a>
                    ):(
                        <span>None</span>
                    )}
                    </Descriptions.Item>
                    <Descriptions.Item label="recommendation">
                        {this.state.letter ? (
                            <>
                                <a href={this.state.letter}><ContainerOutlined /> &nbsp; letter.pdf</a> &nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;
                                <Popconfirm
                                    title="Are you sure delete this task?"
                                    onConfirm={this.confirm}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <a href="#" className={"deleteButton"}><DeleteOutlined />Delete </a>
                                </Popconfirm>
                            </>
                        ):(
                            <span>None</span>
                        )}
                    </Descriptions.Item>


                    </Descriptions>
                    <br/>
                    <Descriptions
                        title="Recommendation letter"/>

                    {resume}
                </Modal>
            </div>
        );
    }
}

export default CompanyStudentModal;