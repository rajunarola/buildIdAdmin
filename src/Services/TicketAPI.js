import axios from 'axios';

const userId = localStorage.getItem('userID') ? localStorage.getItem('userID') : '';

export function getAllTickets(pageNumber) {
    return axios.get(`https://bimiscwebapi-test.azurewebsites.net/api/tickets/gettickettypes/10/${pageNumber}`).then(response => {
        return response
    }).catch(error => {
        return error
    });
}

export function getTicketById(ticketId) {
    return axios.get(`https://bimiscwebapi-test.azurewebsites.net/api/tickets/gettickettype/${ticketId}`).then(response => {
        return response
    }).catch(error => {
        return error
    });
}

export function getSearchedTicket(pageNumber, searchString) {
    return axios.get(`https://bimiscwebapi-test.azurewebsites.net/api/tickets/gettickettypes/10/${pageNumber}/${searchString}`).then(response => {
        return response
    }).catch(error => {
        return error
    });
}

export function postTicket(data) {
    return axios.post(`https://bimiscwebapi-test.azurewebsites.net/api/tickets/saveticketTypes`, data).then(response => {
        return response
    }).catch(error => {
        return error
    });
}

export function deleteTicket(recordId) {
    return axios.delete(`https://bimiscwebapi-test.azurewebsites.net/api/tickets/deleteTicketType/${recordId}/${userId}`).then(response => {
        return response
    }).catch(error => {
        return error
    });
}

export function getRecordStatusForTicket() {
    return axios.get(`https://bimiscwebapi-test.azurewebsites.net/api/misc/getrecordstatuslistfortickettypes`).then(response => {
        return response
    }).catch(error => {
        return error
    });
}