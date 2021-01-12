import axios from 'axios';

export function userLogin(data) {
    return axios.post(process.env.REACT_APP_API_URL + `api/users/SignIn`, data).then(response => {
        return response
    }).catch(error => {
        return error
    });
};