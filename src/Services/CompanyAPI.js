import axios from 'axios';

const userId = localStorage.getItem('userID') ? localStorage.getItem('userID') : '';

export function getAllCompany(pageNumber) {
    return axios.get(`https://bimiscwebapi-test.azurewebsites.net/api/companies/getcompanies/10/${pageNumber}`).then(response => {
        return response
    }).catch(error => {
        return error
    });
}

export function getCompanyById(companyId) {
    return axios.get(`https://bimiscwebapi-test.azurewebsites.net/api/companies/GetCompany/${companyId}`).then(response => {
        return response
    }).catch(error => {
        return error
    });
}

export function getSearchedCompany(pageNumber, searchString) {
    return axios.get(`https://bimiscwebapi-test.azurewebsites.net/api/companies/getcompanies/10/${pageNumber}/${searchString}`).then(response => {
        return response
    }).catch(error => {
        return error
    });
}

export function postCompany(data) {
    return axios.post(`https://bimiscwebapi-test.azurewebsites.net/api/companies/savecompanies`, data).then(response => {
        return response
    }).catch(error => {
        return error
    });
}

export function deleteCompany(recordId) {
    return axios.delete(`https://bimiscwebapi-test.azurewebsites.net/api/companies/deleteCompany/${recordId}/${userId}`).then(response => {
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

export function getCompanyAddress(pageNumber) {
    return axios.get(`https://bimiscwebapi-test.azurewebsites.net/api/companies/getcompanyaddresses/com/10/${pageNumber}`).then(response => {
        return response
    }).catch(error => {
        return error
    })
}

export function getOnlyOneCompanyAddress(companyId) {
    return axios.get(`https://bimiscwebapi-test.azurewebsites.net/api/companies/getcompanyaddresses/${companyId}/10/1`).then(response => {
        return response
    }).catch(error => {
        return error
    })
}

export function getSearchedCompanyAddress(pageNumber, searchString) {
    return axios.get(`https://bimiscwebapi-test.azurewebsites.net/api/companies/getcompanyaddresses/20/10/${pageNumber}/${searchString}`).then(response => {
        return response
    }).catch(error => {
        return error
    })
}

export function postCompanyAddress(data) {
    return axios.post(`https://bimiscwebapi-test.azurewebsites.net/api/companies/savecompanyAddresses`, data).then(response => {
        return response
    }).catch(error => {
        return error
    });
}

export function deleteCompanyAddress(recordId) {
    return axios.delete(`https://bimiscwebapi-test.azurewebsites.net/api/companies/deleteCompanyAddress/${recordId}/${userId}`).then(response => {
        return response
    }).catch(error => {
        return error
    });
}