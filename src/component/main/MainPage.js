import React, { Component } from "react";
import TopNavBar from "../TopNavBar";
import Carousel from "antd/es/carousel";
import slider1 from "../../assets/images/slider1.png"
import slider2 from "../../assets/images/slider2.png"
import slider3 from "../../assets/images/slider3.png"
import MainProjectList from "./MainProjectList";

class MainPage extends Component {

    constructor(props) {
        super(props);

    }
    render() {

        return (
            <div>
                <TopNavBar />

                <div className="slides">
                    <Carousel  autoplay >
                        <div>
                            <img src={slider1}  width="100%" height="100%" alt=''/>
                        </div>
                        <div>
                            <img src={slider2}  width="100%" height="100%" alt=''/>
                        </div>
                        <div>
                            <img src={slider3}  width="100%" height="100%" alt=''/>
                        </div>
                    </Carousel>

                </div>
                <div className="MainProjectList">
                    <MainProjectList />
                </div>
            </div>
        )
    }

}

export default MainPage;