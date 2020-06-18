import axios from 'axios'
import AuthenticationService from "./AuthenticationService";

const LOCALHOST = 'http://localhost:8080'
const STUDENT_URL = `${LOCALHOST}/students`


class StudentService {
    getStudentProjects() {
        const token = AuthenticationService.authHeader();
        const header =  {
            Authorization: token,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH',
        }
        return axios({
            method: 'get',
            headers: header,
            url: `${STUDENT_URL}/projects/applied`
        });
    }
    getStudentFinished() {
        const token = AuthenticationService.authHeader();
        const header =  {
            Authorization: token,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH',
        }
        return axios({
            method: 'get',
            headers: header,
            url: `${STUDENT_URL}/projects/finished`
        });
    }
    applyProjectById(id) {
        const token = AuthenticationService.authHeader();
        const header =  {
            Authorization: token,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH',
        }
        return axios({
            method: 'post',
            data: {
                id: id
            },
            headers: header,
            url: `${STUDENT_URL}/projects/application`
        });
    }

    getUserProfile() {
        const token = AuthenticationService.authHeader();
        const header =  {
            Authorization: token,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH',
        }
        return axios({
            method: 'get',
            headers: header,
            url: `${STUDENT_URL}/info`
        });
    }

    updateStudentProfile(values) {
        const token = AuthenticationService.authHeader();
        const header =  {
            Authorization: token,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH',
        }

        const phone = values.phone;

        const data = {
            firstName: values.first_name,
            lastName: values.last_name,
            institution: values.university,
            phone: phone,
        }
        return axios({
            method: 'patch',
            headers: header,
            url: `${STUDENT_URL}/info`,
            data: data
        });
    }

    getResumeURL() {
        const token = AuthenticationService.authHeader();
        const header =  {
            Authorization: token,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH',
        }
        return axios({
            method: 'get',
            headers: header,
            url: `${STUDENT_URL}/resumes/download`,
        });
    }

    deleteResume() {
        const token = AuthenticationService.authHeader();
        const header =  {
            Authorization: token,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH',
        }
        return axios({
            method: 'patch',
            headers: header,
            url: `${STUDENT_URL}/resumes/delete`,
        });
    }
    rateCompany(companyID, rate) {
        const token = AuthenticationService.authHeader();
        const header =  {
            Authorization: token,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH',
        }
        return axios({
            method: 'post',
            headers: header,
            url: `${STUDENT_URL}/projects/ratestar`,
            params: {
                id: companyID,
                star: rate,
            }
        });
    }

    isRateCompany(companyID) {
        const token = AuthenticationService.authHeader();
        const header =  {
            Authorization: token,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH',
        }
        return axios({
            method: 'get',
            headers: header,
            url: `${STUDENT_URL}/projects/ratestar`,
            params: {
                id: companyID,
            }
        });
    }


}

export default new StudentService();