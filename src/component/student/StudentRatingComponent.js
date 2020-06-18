import React, { Component } from "react";
import StudentService from "../service/StudentService";
import Button from "antd/es/button";
import Rate from "antd/es/rate";
import StudentRateItem from "./StudentRateItem";
import Empty from "antd/es/empty";

class StudentRatingComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            projectList: []
        }
    }
    componentDidMount() {
        StudentService.getStudentFinished().then(response => {
            this.setState({
                projectList: response.data
            });
            console.log(this.state.projectList);
        })
    }

    render() {
        let list = null;
        console.log(this.state.projectList.length)
        const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
        if (this.state.projectList.length === 0) {
            console.log(this.state.projectList.length)
            list = <div><Empty /></div>
        } else {
            list = this.state.projectList.map(
                project =>
                    <StudentRateItem project={project} />
            )
        }
        return list;

    }
}

export default StudentRatingComponent;