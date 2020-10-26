import axios from 'axios';

const userId = localStorage.getItem('userID') ? localStorage.getItem('userID') : '';

export function getAllTrades(pageNumber) {
    return axios.get(`https://bimiscwebapi-test.azurewebsites.net/api/misc/gettrades/10/${pageNumber}`).then(response => {
        return response
    }).catch(error => {
        return error
    });
}

export function getSearchedTrades(pageNumber, searchString) {
    return axios.get(`https://bimiscwebapi-test.azurewebsites.net/api/misc/gettrades/10/${pageNumber}/${searchString}`).then(response => {
        return response
    }).catch(error => {
        return error
    });
}

export function postTrades(data) {
    return axios.post(`https://bimiscwebapi-test.azurewebsites.net/api/misc/savetrade`, data).then(response => {
        return response
    }).catch(error => {
        return error
    });
}

export function deleteTrades(recordId) {
    return axios.delete(`https://bimiscwebapi-test.azurewebsites.net/api/misc/deletetrade/${recordId}/${userId}`).then(response => {
        return response
    }).catch(error => {
        return error
    });
}

export function getRecordStatusForTrades() {
    return axios.get(`https://bimiscwebapi-test.azurewebsites.net/api/misc/getrecordstatuslistfortrades`).then(response => {
        return response
    }).catch(error => {
        return error
    });
}

