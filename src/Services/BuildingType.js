import axios from 'axios';

const userId = localStorage.getItem('userID') ? localStorage.getItem('userID') : '';

export function getAllBuildingType(pageNumber) {
    return axios.get(`https://bimiscwebapi-test.azurewebsites.net/api/projects/getBuildingTypes/10/${pageNumber}`).then(response => {
        return response
    }).catch(error => {
        return error
    });
}

export function getBuildTypeById(buildingId) {
    return axios.get(`https://bimiscwebapi-test.azurewebsites.net/api/projects/getBuildingType/${buildingId}`).then(response => {
        return response
    }).catch(error => {
        return error
    });
}

export function getSearchedBuildingType(pageNumber, searchString) {
    return axios.get(`https://bimiscwebapi-test.azurewebsites.net/api/projects/getBuildingTypes/10/${pageNumber}/${searchString}`).then(response => {
        return response
    }).catch(error => {
        return error
    });
}

export function postBuildingType(data) {
    return axios.post(`https://bimiscwebapi-test.azurewebsites.net/api/projects/saveBuildingTypes`, data).then(response => {
        return response
    }).catch(error => {
        return error
    });
}

export function deleteBuildingType(recordId) {
    return axios.delete(`https://bimiscwebapi-test.azurewebsites.net/api/projects/deleteBuildingType/${recordId}/${userId}`).then(response => {
        return response
    }).catch(error => {
        return error
    });
}

export function recordStatusForManufacturers() {
    return axios.get(`https://bimiscwebapi-test.azurewebsites.net/api/projects/getrecordstatuslistforBuildingTypes`).then(response => {
        return response
    }).catch(error => {
        return error
    });
}