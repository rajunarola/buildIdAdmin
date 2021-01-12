import axios from 'axios';

let apiUrl = process.env.REACT_APP_API_URL + `api/`


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
