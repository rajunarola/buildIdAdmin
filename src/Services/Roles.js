import axios from 'axios';

const userId = localStorage.getItem('userID') ? localStorage.getItem('userID') : '';

export function getAllRoles(pageNumber) {
    return axios.get(`https://bimiscwebapi-test.azurewebsites.net/api/misc/getRoles/10/${pageNumber}`).then(response => {
        return response
    }).catch(error => {
        return error
    });
}

export function getSearchedRole(pageNumber, searchString) {
    return axios.get(`https://bimiscwebapi-test.azurewebsites.net/api/misc/getRoles/10/${pageNumber}/${searchString}`).then(response => {
        return response
    }).catch(error => {
        return error
    });
}

export function postRole(data) {
    return axios.post(`https://bimiscwebapi-test.azurewebsites.net/api/misc/saveRole`, data).then(response => {
        return response
    }).catch(error => {
        return error
    });
}

export function deleteRole(recordId) {
    return axios.delete(`https://bimiscwebapi-test.azurewebsites.net/api/misc/deleteRole/${recordId}/${userId}`).then(response => {
        return response
    }).catch(error => {
        return error
    });
}

export function getRecordStatusForCompanies() {
    return axios.get(`https://bimiscwebapi-test.azurewebsites.net/api/companies/getrecordstatuslistforcompanies`).then(response => {
        return response
    }).catch(error => {
        return error
    });
}