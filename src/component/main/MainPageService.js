import axios from 'axios'
import AuthenticationService from "../service/AuthenticationService";

const LOCALHOST = 'http://localhost:8080'


class MainPageService {
    getAllProjects() {
        return axios({
            method: 'get',
            url: `${LOCALHOST}/projects/all`
        });
    }

    getProjectsById(id) {
        return axios({
            method: 'get',
            params: {
                id: id,
            },
            header: AuthenticationService.authHeader(),
            url: `${LOCALHOST}/projects`
        })
    }

    getCompanyStarById(id) {
        const header =  {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH',
        }
        return axios({
            method: 'get',
            params: {
                id: id,
            },
            headers:header,
            url: `${LOCALHOST}/enterprises/ratestar`
        })
    }

}

export default new MainPageService();