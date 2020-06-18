import React, {Component} from "react";
import CompanyService from "../service/CompanyService";
import CompanyAddProjectModal from "./CompanyAddProjectModal";
class CompanyProjectManagerComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: [],
        }
    }

    refreshProject = () => {
        CompanyService.retrieveALLCourse().then(response => {
            this.setState({
                projects: response.data
            })
            console.log(response.data)
        })

    }


    deleteProjectClicked = (id) => {
        CompanyService.deleteProjectClicked(id).then(response => {
            this.refreshProject()
        })
    }

    updateProjectClicked = (id) => {
        this.props.history.push(`/company/projects/${id}`)
    }
    componentDidMount() {
        this.refreshProject();
    }

    render() {
        const projects = this.state.projects.sort((a, b) => a.id - b.id)
        return (
            <div className="ant-card-bordered student-profile-container">
                <div className="add-project-button">
                    <CompanyAddProjectModal refresh={this.refreshProject}/>
                </div>
                <table className="table">
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>Description</th>
                        <th>delete</th>
                        <th>update</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        projects.map(
                        project =>
                            <tr key={project.id}>
                                <td>{project.id}</td>
                               <td><a href={project.projectUrl}> {project.projectName}</a></td>
                                <td>{project.description}</td>
                                <td><button className="btn btn-warning"
                                            onClick={() => this.deleteProjectClicked(project.id)}>
                                    Delete
                                </button>
                                </td>
                                <td><button className="btn btn-warning"
                                            onClick={() => this.updateProjectClicked(project.id)}>
                                    Manage
                                </button>
                                </td>
                            </tr>

                    )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default CompanyProjectManagerComponent
