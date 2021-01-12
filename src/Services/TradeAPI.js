import axios from 'axios';

const userId = localStorage.getItem('userID') ? localStorage.getItem('userID') : '';

export function getAllTrades(pageNumber) {
    return axios.get(process.env.REACT_APP_API_URL + `api/misc/gettrades/10/${pageNumber}`).then(response => {
        return response
    }).catch(error => {
        return error
    });
}

export function getTradeById(tradeId) {
    return axios.get(process.env.REACT_APP_API_URL + `api/misc/gettrade/${tradeId}`).then(response => {
        return response
    }).catch(error => {
        return error
    });
}

export function getSearchedTrades(pageNumber, searchString) {
    return axios.get(process.env.REACT_APP_API_URL + `api/misc/gettrades/10/${pageNumber}/${searchString}`).then(response => {
        return response
    }).catch(error => {
        return error
    });
}

export function postTrades(data) {
    return axios.post(process.env.REACT_APP_API_URL + `api/misc/savetrade`, data).then(response => {
        return response
    }).catch(error => {
        return error
    });
}

export function deleteTrades(recordId) {
    return axios.delete(process.env.REACT_APP_API_URL + `api/misc/deletetrade/${recordId}/${userId}`).then(response => {
        return response
    }).catch(error => {
        return error
    });
}

export function getRecordStatusForTrades() {
    return axios.get(process.env.REACT_APP_API_URL + `api/misc/getrecordstatuslistfortrades`).then(response => {
        return response
    }).catch(error => {
        return error
    });
}

