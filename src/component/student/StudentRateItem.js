import React, {Component} from "react";
import {message, Rate} from "antd";
import Button from "antd/es/button";
import {floor} from "lodash";
import StudentService from "../service/StudentService";
import Avatar from "antd/es/avatar";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import Upload from "antd/es/upload";
import ContainerOutlined from "@ant-design/icons/lib/icons/ContainerOutlined";

class StudentRateItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            companyID: this.props.project.companyID,
            canRate: true,
        };
        this.rateCompany = this.rateCompany.bind(this);
    }

    handleChange = value => {
        this.setState({ value });
        console.log(value)
    };

    rateCompany = () => {
        const id = this.state.companyID;
        const value = this.state.value;
        StudentService.rateCompany(id, value).then(response => {
            message.success("rating successfully")
            this.setState({
                canRate: false,
            })
        }).catch(error => {
            message.error("rating failed")
        })
    }

    componentDidMount() {
        StudentService.isRateCompany(this.state.companyID).then(response =>{
            if (response.data) {
                this.setState({
                    value: response.data.star,
                    canRate: false,
                })
            }

        })
    }

    render() {
        const project = this.props.project;
        console.log(project)
        const { value } = this.state;
        const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
        let rate = null;
        const canRate = this.state.canRate
        if (canRate) {
            rate = (<>
            <Rate tooltips={desc} onChange={this.handleChange} value={value} />
            {
                value ? <span className="ant-rate-text">{desc[floor(value - 0.1)]}</span> : ''
            } </>)

        } else {
            rate = (<>
                <Rate tooltips={desc} value={value}  disabled/>
                {
                    value ? <span className="ant-rate-text">{desc[floor(value - 0.1)]}</span> : ''
                } </>)
        }
        return (
            <div className="ant-card-bordered student-detail-container">
                <div className="project-detail">
                    <div className="project-detail-head">
                        <div className="project-detail-head-wrapper" >
                            <div className="project-detail-head-title">
                                { project.avatar?(
                                    <Avatar src={project.avatar} className="project-img" size={100}
                                            shape="square"/>
                                ):(
                                    <Avatar icon={<UserOutlined/>}className="project-img" size={100}
                                            shape="square"/>
                                )}
                                <div className="project-title-right">
                                    <h2>{project.companyName} </h2>
                                    <span>{project.project.projectName}</span><br/>
                                    <span>
                                        {rate}
                                    </span><br/>
                                    <span>status: {project.status}</span>
                                    <br/>
                                    <br/>
                                    {
                                        project.letter?(
                                            <a href={project.letter.letterURL}><ContainerOutlined /> letter.pdf</a>
                                        ):(
                                            <a></a>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="project-apply">
                                {canRate ? (
                                    <>
                                    <Button type="primary" shape="round" size="large" onClick={this.rateCompany}>
                                        Rate
                                    </Button>
                                    <br/>
                                    </>
                                ) : ('')
                                }

                            </div>
                            <div className="project-clear"></div>
                        </div>
                    </div>

                </div>
            </div>

        );
    }
}

export default StudentRateItem;