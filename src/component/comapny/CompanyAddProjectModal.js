import {Modal, Button, Row, Col, Form, Input} from 'antd';
import React, {Component} from "react";
import { InboxOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import CompanyService from "../service/CompanyService";

const { Dragger } = Upload;

class CompanyAddProjectModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ModalText: 'Content of the modal',
            visible: false,
            confirmLoading: false,
            fileList: [],
            projectName: '',
            description: '',
        };
        this.props = props;
    }


    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = (values) => {
        const {projectName, description, fileList} = this.state;
        const formData = new FormData();
        fileList.forEach(file => {
            formData.append('file', file);
        });
        formData.append('projectName', projectName);
        formData.append('description', description);
        CompanyService.createProject(formData).then(response => {
            console.log(response.data)
            this.props.refresh();
        })
        this.setState({
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
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

    render() {
        const { visible, confirmLoading } = this.state;
        const { fileList, projectName, description } = this.state;
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
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    <PlusCircleOutlined />Add project
                </Button>
                <Modal
                    title="Add a new object"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                    okText="submit"
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
                                    name="Project Name"
                                    label="Project Name"
                                    rules={[
                                        { required: true, message: 'Please enter project name' }
                                    ]}
                                >
                                    <Input placeholder="Please enter project name" value={projectName}
                                           onChange={this.handelNameChange.bind(this)} />
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
                            <br/>
                        </Row>

                    </Form>
                </Modal>
            </div>
        );
    }
}

export default CompanyAddProjectModal;