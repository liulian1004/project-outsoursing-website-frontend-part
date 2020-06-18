import axios from 'axios'
import md5 from 'md5'
const LOCALHOST = 'http://localhost:8080'
const LOGIN_URL = `${LOCALHOST}/auth`
const SIGN_UP_URL = `${LOCALHOST}/auth/registration`
class AuthenticationService {

    login(email, password) {
       return axios({
            method: 'post',
            url: LOGIN_URL,
            data: {
                email: email.toString().toLowerCase(), // This is the body part
                password: md5(md5(password) + md5(email.toString().toLowerCase())),
            }
        });
    }

    logout() {
        localStorage.removeItem('user');
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'))
    }

    authHeader() {
        const user = this.getCurrentUser();
        if (user && user.token) {
            return `Bearer ${user.token}`;
        } else {
            return {}
        }
    }

    signUp(values) {
        const password = values.password
        const email = values.email
        values.password = md5(md5(password) + md5(email.toString().toLowerCase()))
        values.email = values.email.toString().toLowerCase()
        console.log(values)
        return axios({
            method: 'post',
            url: SIGN_UP_URL,
            data: values
        });
    }
}

export default new AuthenticationService;