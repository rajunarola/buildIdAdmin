import axios from 'axios';

const userId = localStorage.getItem('userID') ? localStorage.getItem('userID') : '';

export function getAllItems(pageNumber) {
    return axios.get(`https://bimiscwebapi-test.azurewebsites.net/api/misc/getitems/10/${pageNumber}`).then(response => {
        return response
    }).catch(error => {
        return error
    });
};

export function getItemById(itemId) {
    return axios.get(`https://bimiscwebapi-test.azurewebsites.net/api/misc/getitem/${itemId}`).then(response => {
        return response
    }).catch(error => {
        return error
    });
};

export function getSearchedItems(pageNumber, searchString) {
    return axios.get(`https://bimiscwebapi-test.azurewebsites.net/api/misc/getitems/10/${pageNumber}/${searchString}`).then(response => {
        return response
    }).catch(error => {
        return error
    });
};

export function postItem(data) {
    return axios.post(`https://bimiscwebapi-test.azurewebsites.net/api/misc/saveitems`, data).then(response => {
        return response
    }).catch(error => {
        return error
    });
}

export function deleteItem(recordId) {
    return axios.delete(`https://bimiscwebapi-test.azurewebsites.net/api/misc/deleteitem/${recordId}/${userId}`).then(response => {
        return response
    }).catch(error => {
        return error
    });
}

export function getRecordStatusListForItems() {
    return axios.get(`https://bimiscwebapi-test.azurewebsites.net/api/misc/getrecordstatuslistforitems`).then(response => {
        return response
    }).catch(error => {
        return error
    });
}

export function getItemPicture(itemId) {
    return axios.get(`https://bimiscwebapi-test.azurewebsites.net/api/misc/getitempictures/${itemId}`).then(response => {
        return response
    }).catch(error => {
        return error
    });
}


export function saveItemPicture(data) {
    return axios.post(`https://bimiscwebapi-test.azurewebsites.net/api/misc/saveitempicture`, data, {
        headers: {
            "Accept": "application/json",
            "Content-Type": "multipart/form data"
        }
    }).then(response => {
        return response
    }).catch(error => {
        return error
    });
}