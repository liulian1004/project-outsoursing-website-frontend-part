import React, {Component} from "react";
import TopNavBar from "../TopNavBar";
import Divider from "antd/es/divider";
import Button from "antd/es/button";
import { Rate, message } from 'antd';
import PageHeader from "antd/es/page-header";
import MainPageService from "./MainPageService";
import {withRouter} from 'react-router-dom';
import AuthenticationService from "../service/AuthenticationService";
import StudentService from "../service/StudentService";
import jwt_decode from "jwt-decode";
import {Link} from "react-router-dom";

class ProjectDetailComponent extends Component{
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            project: '',
            companyName: '',
            companyID: '',
            companyRate: '',
            star: '',
        }
        this.applyProject = this.applyProject.bind(this);
        this.showDetail = this.showDetail.bind(this);

    }

    componentDidMount() {
        MainPageService.getProjectsById(this.props.match.params.id).then(response => {
            if (response.data) {
                this.setState({
                    project: response.data.project,
                    companyName: response.data.companyName,
                    companyID: response.data.companyID,
                    companyRate: response.data.companyRate,
                })
            }
            MainPageService.getCompanyStarById(response.data.companyID).then(response => {
                this.setState({
                  star: response.data.RateStar
                })
            })
        }).catch(error => {
            console.log(error)
            this.props.history.push(`/`)
        })
    }

    applyProject() {
        StudentService.applyProjectById(this.props.match.params.id).then(response => {
            message.success("applied successfully")
        }).catch(error => {
            console.log(error)
            if(error.response.status === 400) {
                message.error("Project application cannot be submitted again!")
            }
        })
    }

    showDetail() {

    }

    render() {

        const date = new Date() - new Date(this.state.project.createTime);
        const day = Math.floor(date/(24*3600*1000));
        const mSecond = date%(24*3600*1000);
        const hours=Math.floor(mSecond/(3600*1000))
        const user = AuthenticationService.getCurrentUser();
        let role = null
        if (user) {
            const decode = jwt_decode(user.token)
            role = decode.role
        }
        return (
            <div>
                <TopNavBar />
                <div className="project-container">
                    <div className="project-title">
                        <PageHeader
                            className="site-page-header"
                            onBack={() => window.history.back()}
                            title={this.state.project.projectName}
                            subTitle="click to back"

                        />

                    </div>
                    <div className="project-detail ant-card-bordered">
                        <div className="project-detail-head">
                            <div className="project-detail-head-wrapper" >
                                <div className="project-detail-head-title">
                                    <img src="https://assets.laioffer.com/public/companyLogo/9b7556fe-3187-4f58-b290-b9a1348db9a3.png" height="120px" width="120px" className="project-img"/>
                                    <div className="project-title-right">
                                        <h2>{this.state.project.projectName}</h2>
                                        <span>{this.state.companyName}</span><br/>
                                        {day === 0? (
                                            <span>
                                                {hours} hours ago
                                            </span>
                                        ) : (
                                            <span>
                                                {day} days ago
                                            </span>
                                        )
                                        }<br/>
                                        <Rate disabled value={this.state.star} />
                                    </div>
                                </div>
                                <div className="project-apply"> {
                                    user ?(
                                        role === "student" ? (
                                            <Button type="primary" shape="round" size="large" onClick={this.applyProject}>
                                                Apply
                                            </Button>
                                        ): (
                                            <div>

                                            </div>
                                        )
                                    ):(
                                        <Link to='/login'>
                                            <Button type="primary" shape="round" size="large">
                                                Login to Apply
                                            </Button>
                                        </Link>
                                    )
                                }
                                </div>
                                <div className="project-clear"></div>
                            </div>
                        </div>

                        <div className="project-detail-body">
                            <Divider />
                            <div className="project-detail-content">
                                <h4>Project description</h4>
                                {this.state.project.description}<br/>
                            </div>
                            <div className="button-detail">
                                {/*this.state.project.projectUrl*/}
                                <a href='https://psharingaccount.blob.core.windows.net/psp-resume-project-test/bd538225f4-ce8e-41a3-ac9c-9d4fdaa80bf3.txt
                                '>
                                   <Button type="primary" shape="round" size="large" onClick={this.showDetail}> Detail</Button>
                                </a>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}

export default withRouter(ProjectDetailComponent);