import axios from 'axios';

let apiUrl = `https://bimiscwebapi-test.azurewebsites.net/api/`


export function MakeTheApiCall(apiOptions) {
    return axios(apiOptions)
}

export function GenerateOptions(url = '', method = 'GET', data) {
    let APIBaseUrl = apiUrl
    var options = {
        method: method,
        url: `${APIBaseUrl}/${url}`,
    };

    if (!data) {
        return options;
    }

    if (method === 'GET') {
        options.params = Object.assign({}, data);
    } else {
        options.data = data;
    }
    return options;
}
