const axios = require('axios');

exports.AxiosService = () => {
    axios.defaults.baseURL = process.env.BASE_URL;
    axios.defaults.headers.common.Accept = 'application/json, text/plain,';
    const setHeaders = req => {
        if (req.url !== '/login') {
            const xAccessToken = req.headers['x-access-token'];
            if (xAccessToken !== undefined) {
                return {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-access-token': `${xAccessToken}`,
                    },
                };
            }
        } else {
            return {
                headers: {
                    'Content-Type': 'application/json',
                    Referer: `${req.body.email}`,
                },
            };
        }
    };

    const GET = (endpoint, request) => {
        return axios.get(endpoint, setHeaders(request));
    };

    const POST = (endpoint, data, request) => {
        return axios.post(endpoint, data, setHeaders(request));
    };

    const PUT = (endpoint, data, request) => {
        return axios.put(endpoint, data, setHeaders(request));
    };

    const PATCH = (endpoint, data, request) => {
        return axios.patch(endpoint, data, setHeaders(request));
    };

    const DELETE = (endpoint, request) => {
        return axios.delete(endpoint, setHeaders(request));
    };
    return {
        GET,
        POST,
        PUT,
        PATCH,
        DELETE,
    };
};
