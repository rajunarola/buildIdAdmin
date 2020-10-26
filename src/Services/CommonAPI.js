import axios from 'axios';

export function userLogin(data) {
    return axios.post(`https://bimiscwebapi-test.azurewebsites.net/api/users/SignIn`, data).then(response => {
        return response
    }).catch(error => {
        return error
    });
};