import React, {Component} from "react";
import {Rate} from "antd";
import Button from "antd/es/button";
import StudentService from "../service/StudentService";

class StudentProjectList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            projectList: []
        }
    }
    componentDidMount() {
        StudentService.getStudentProjects().then(response => {
            this.setState({
                projectList: response.data
            });
            console.log(this.state.projectList);
        })
    }
    
    render() {

        return (
        // companyName: "Sun"
        // project:
        //     createTime: "2020-06-05T09:47:17.578399-04:00"
        //     description: null
        //     id: 2
        //     projectName: "CloudBusiness.pdf"
        //     projectUrl: "456g67k34v9fd843o2345fd324.pdf"
        // status: "valid"
        // studentProjects: [{…}]
        // __proto__: Object
        // star: 3
        // status: "pending"
        // __proto__: Object
            this.state.projectList.map(
                project =>
                    <div className="ant-card-bordered student-detail-container">
                        <div className="project-detail">
                            <div className="project-detail-head">
                                <div className="project-detail-head-wrapper" >
                                    <div className="project-detail-head-title">
                                        <img src="https://assets.laioffer.com/public/companyLogo/9b7556fe-3187-4f58-b290-b9a1348db9a3.png" height="120px" width="120px" className="project-img"/>
                                        <div className="project-title-right">
                                            <h2>{project.project.projectName}</h2>
                                            <span>{project.companyName}</span><br/>
                                            <span><Rate disabled value={project.star} /></span><br/>
                                            <span>status: {project.status}</span>
                                        </div>
                                    </div>
                                    <div className="project-apply">
                                        <a href={project.project.projectUrl}>
                                            <Button type="primary" shape="round" size="large">
                                                Download for Detail
                                            </Button>
                                        </a>
                                    </div>
                                    <div className="project-clear"></div>
                                </div>
                            </div>

                        </div>
                    </div>
            )
        );
    }
}

export default StudentProjectList;