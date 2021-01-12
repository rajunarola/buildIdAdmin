import axios from 'axios';
const userId = localStorage.getItem('userID') ? localStorage.getItem('userID') : '';

export function getAllBuildingType(pageNumber) {
    return axios.get(process.env.REACT_APP_API_URL + `api/projects/getBuildingTypes/10/${pageNumber}`).then(response => {
        return response
    }).catch(error => {
        return error
    });
}

// export function getAllBuildingTypeGlobal(pageNumber) {
//     let url = `projects/getBuildingTypes/10/${pageNumber}`;
//     var options = GenerateOptions(url, "GET");
//     return MakeTheApiCall(options)
// };

export function getBuildTypeById(buildingId) {
    return axios.get(process.env.REACT_APP_API_URL + `api/projects/getBuildingType/${buildingId}`).then(response => {
        return response
    }).catch(error => {
        return error
    });
}

export function getSearchedBuildingType(pageNumber, searchString) {
    return axios.get(process.env.REACT_APP_API_URL + `api/projects/getBuildingTypes/10/${pageNumber}/${searchString}`).then(response => {
        return response
    }).catch(error => {
        return error
    });
}

export function postBuildingType(data) {
    return axios.post(process.env.REACT_APP_API_URL + `api/projects/saveBuildingTypes`, data).then(response => {
        return response
    }).catch(error => {
        return error
    });
}

export function deleteBuildingType(recordId) {
    return axios.delete(process.env.REACT_APP_API_URL + `api/projects/deleteBuildingType/${recordId}/${userId}`).then(response => {
        return response
    }).catch(error => {
        return error
    });
}

export function recordStatusForManufacturers() {
    return axios.get(process.env.REACT_APP_API_URL + `api/projects/getrecordstatuslistforBuildingTypes`).then(response => {
        return response
    }).catch(error => {
        return error
    });
}