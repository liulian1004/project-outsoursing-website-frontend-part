import axios from 'axios'
import AuthenticationService from "./AuthenticationService";

const LOCALHOST = 'http://localhost:8080'
const COMPANY_URL = `${LOCALHOST}/enterprises`


class CompanyService {
    retrieveALLCourse() {
        const token = AuthenticationService.authHeader();
        const header =  {
            Authorization: token,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH',
        }
        return axios({
            method: 'get',
            headers: header,
            url: `${COMPANY_URL}/projects`,
        });
    }

    createProject(formData) {
        const token = AuthenticationService.authHeader();
        const header =  {
            Authorization: token,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH',
        }
        return axios({
            method: 'post',
            headers: header,
            url: `${COMPANY_URL}/projects/upload`,
            data: formData
        });
    }
    updateProject(formData) {
        const token = AuthenticationService.authHeader();
        const header =  {
            Authorization: token,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH',
        }
        return axios({
            method: 'patch',
            headers: header,
            url: `${COMPANY_URL}/projects/update`,
            data: formData
        });
    }

    deleteProjectClicked(id) {
        const token = AuthenticationService.authHeader();
        const header =  {
            Authorization: token,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH',
        }
        return axios({
            method: 'PATCH',
            headers: header,
            url: `${COMPANY_URL}/projects/deletion`,
            params : {
                id: id
            }
        });
    }

    getProjectsById(id) {
        const token = AuthenticationService.authHeader();
        const header =  {
            Authorization: token,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH',
        }
        return axios({
            method: 'get',
            headers: header,
            url: `${COMPANY_URL}/projects/${id}`,

        });
    }
    getAppliedStudentsOfProject(proId) {
        const token = AuthenticationService.authHeader();
        const header =  {
            Authorization: token,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH',
        }
        return axios({
            method: 'get',
            headers: header,
            params: {
                projectId: proId,
            },
            url: `${COMPANY_URL}/projects/students`,

        });
    }

    approveApplication(projectId, studentId) {
        const token = AuthenticationService.authHeader();
        const header =  {
            Authorization: token,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH',
        }
        return axios({
            method: 'put',
            headers: header,
            params: {
                projectId: projectId,
                studentId: studentId,
            },
            url: `${COMPANY_URL}/projects/approval`,

        });
    }

    rejectApplication(projectId, studentId) {
        const token = AuthenticationService.authHeader();
        const header =  {
            Authorization: token,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH',
        }
        return axios({
            method: 'put',
            headers: header,
            params: {
                projectId: projectId,
                studentId: studentId,
            },
            url: `${COMPANY_URL}/projects/rejection`,

        });
    }

    getCompanyInfo() {
        const token = AuthenticationService.authHeader();
        const header =  {
            Authorization: token,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH',
        }
        return axios({
            method: 'get',
            headers: header,
            url: `${COMPANY_URL}/info`,

        });

    }

    updateStudentProfile(values) {
        const token = AuthenticationService.authHeader();
        const header =  {
            Authorization: token,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH',
        }

        const data = {
            firstName: values.first_name,
            institution: values.institution,
            address: values.address,
            phone: values.phone,
        }
        return axios({
            method: 'patch',
            headers: header,
            url: `${COMPANY_URL}/info`,
            data: data
        });
    }

    issueLetter(formData) {
        const token = AuthenticationService.authHeader();
        const header =  {
            Authorization: token,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH',
        }
        return axios({
            method: 'post',
            headers: header,
            url: `${COMPANY_URL}/uploadRecommendationLetter/upload`,
            data: formData
        });
    }

    deleteLetter(id) {
        const token = AuthenticationService.authHeader();
        const header =  {
            Authorization: token,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH',
        }
        return axios({
            method: 'patch',
            headers: header,
            url: `${COMPANY_URL}/uploadRecommendationLetter/deletion`,
            params: {
                recommendationLetterId: id,
            }
        });
    }

    finishCompany(id) {
        const token = AuthenticationService.authHeader();
        const header =  {
            Authorization: token,
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH',
        }
        return axios({
            method: 'patch',
            headers: header,
            url: `${COMPANY_URL}/projects/finish`,
            params: {
                proId: id,
            }
        });
    }

}

export default new CompanyService();