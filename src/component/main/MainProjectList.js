import React, {Component} from "react";
import MainPageService from "./MainPageService";
import Row from "antd/es/descriptions/Row";
import Col from "antd/es/grid/col";
import Card from "antd/es/card";
import Meta from "antd/es/card/Meta";
import Avatar from "antd/es/avatar";
import {withRouter} from 'react-router-dom';
class MainProjectList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectList: []
        }
        this.showProjectDetail = this.showProjectDetail.bind(this);

    }
    componentDidMount() {
        MainPageService.getAllProjects().then(response => {
            this.setState({
                projectList: response.data
            });
            console.log(this.state.projectList)
        })
    }

    showProjectDetail(id) {
        this.props.history.push(`/projects/${id}`)
    }

    render() {
        return (

            <div className="site-card-wrapper">

                    {

                        this.state.projectList.map(
                            project  =>
                                <>
                                <div className="card-item"/>
                                    <Card
                                        onClick={()=>this.showProjectDetail(project.id)}
                                        hoverable
                                        style={{ width: 300 }}
                                        className="mycard"
                                    >
                                        <Meta
                                            avatar={<Avatar src="https://assets.laioffer.com/public/companyLogo/9b7556fe-3187-4f58-b290-b9a1348db9a3.png" />}
                                            title={project.projectName}
                                            description="Learn Python like a Professional! Start from the basics and go all the way to creating your own applications and games!"


                                        />
                                        <br/>
                                        <span className='time'>Create Time: {project.createTime} </span>

                                    </Card>
                                <div/>
                                </>

                        )

                    }

            </div>
        )
    }

}

export default withRouter(MainProjectList);