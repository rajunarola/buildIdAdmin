import axios from 'axios';

const userId = localStorage.getItem('userID') ? localStorage.getItem('userID') : '';

export function getAllProjects(pageNumber) {
    return axios.get(`https://bimiscwebapi-test.azurewebsites.net/api/projects/GetProjects/10/${pageNumber}`).then(response => {
        return response
    }).catch(error => {
        return error
    });
}

export function getSearchedProject(pageNumber, searchString) {
    return axios.get(`https://bimiscwebapi-test.azurewebsites.net/api/projects/getprojects/10/${pageNumber}/${searchString}`).then(response => {
        return response
    }).catch(error => {
        return error
    });
}

export function postProject(data) {
    return axios.post(`https://bimiscwebapi-test.azurewebsites.net/api/projects/saveProjects`, data).then(response => {
        return response
    }).catch(error => {
        return error
    });
}

export function deleteProject(recordId) {
    return axios.delete(`https://bimiscwebapi-test.azurewebsites.net/api/projects/deleteproject/${recordId}/${userId}`).then(response => {
        return response
    }).catch(error => {
        return error
    });
}

export function getRecordStatusForProject() {
    return axios.get(`https://bimiscwebapi-test.azurewebsites.net/api/projects/getrecordstatuslistforProjects`).then(response => {
        return response
    }).catch(error => {
        return error
    });
}