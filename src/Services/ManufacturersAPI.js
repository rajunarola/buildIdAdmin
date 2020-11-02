import axios from 'axios';

const userId = localStorage.getItem('userID') ? localStorage.getItem('userID') : '';

export function getAllManufacturers(pageNumber) {
    return axios.get(`https://bimiscwebapi-test.azurewebsites.net/api/misc/getmanufacturers/10/${pageNumber}`).then(response => {
        return response
    }).catch(error => {
        return error
    });
}

export function getManufacturersById(manufacturerId) {
    return axios.get(`https://bimiscwebapi-test.azurewebsites.net/api/misc/getManufacturer/${manufacturerId}`).then(response => {
        return response
    }).catch(error => {
        return error
    });
}

export function getSearchedManufacturers(pageNumber, searchString) {
    return axios.get(`https://bimiscwebapi-test.azurewebsites.net/api/misc/getmanufacturers/10/${pageNumber}/${searchString}`).then(response => {
        return response
    }).catch(error => {
        return error
    });
}

export function postManufacturers(data) {
    return axios.post(`https://bimiscwebapi-test.azurewebsites.net/api/misc/savemanufacturers`, data).then(response => {
        return response
    }).catch(error => {
        return error
    });
}

export function deleteManuFacturers(recordId) {
    return axios.delete(`https://bimiscwebapi-test.azurewebsites.net/api/misc/deleteManufacturer/${recordId}/${userId}`).then(response => {
        return response
    }).catch(error => {
        return error
    });
}

export function getRecordStatusForManufacturers() {
    return axios.get(`https://bimiscwebapi-test.azurewebsites.net/api/misc/getrecordstatuslistformanufacturers`).then(response => {
        return response
    }).catch(error => {
        return error
    });
}