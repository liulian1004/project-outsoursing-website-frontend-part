import React, {Component} from 'react';
import StudentService from "../service/StudentService";

class ListProjectComponent extends Component {
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
            console.log(this.state.projectList)
        })
    }

    render() {
        return (
            <div className="container">
                <h3>All Projects</h3>
                <div className="container">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>ProjectName</th>
                            <th>S3key</th>
                            <th>Create time</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.projectList.map(
                                project =>
                                    <tr key={project.id}>
                                        <td>{project.id}</td>
                                        <td>{project.projectName}</td>
                                        <td>{project.s3key}</td>
                                        <td>{project.createTime}</td>
                                        {/*<td><button className="btn btn-warning"*/}
                                        {/*            onClick={() => this.deleteCourseClicked(course.id)}>*/}
                                        {/*    Delete*/}
                                        {/*</button>*/}
                                        {/*</td>*/}
                                        {/*<td>*/}
                                        {/*    <button className="btn btn-success" onClick={() => this.updateCourseClicked(course.id)}>Update</button>*/}
                                        {/*</td>*/}
                                    </tr>
                            )
                        }
                        </tbody>
                        <div className="row">
                            <button className="btn btn-success" onClick={this.addCourseClicked}>Add</button>
                        </div>
                    </table>
                </div>
            </div>
        )
    }
}

export default ListProjectComponent;