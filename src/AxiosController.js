const axios = require('axios');

const AxiosService = (() => {
    const AxiosInstance = axios.create({
        baseURL: process.env.BASE_URL,
        headers: {
            common: {
                Accept: 'application/json, text/plain',
                'Content-Type': 'application/json',
            }
        }
    });

    const setHeaders = request => {
        const accessToken = request.headers['x-access-token'];
        const extraHeaders = {};

        if (request.url !== '/login' && accessToken) {
            extraHeaders['X-access-token'] = accessToken;
        } else {
            extraHeaders.Referer = request.body.email;
        }

        return extraHeaders;
    };

    const GET = (endpoint, request) => {
        return AxiosInstance.get(endpoint, setHeaders(request));
    };

    const POST = (endpoint, data, request) => {
        return AxiosInstance.post(endpoint, data, setHeaders(request));
    };

    const PUT = (endpoint, data, request) => {
        return AxiosInstance.put(endpoint, data, setHeaders(request));
    };

    const PATCH = (endpoint, data, request) => {
        return AxiosInstance.patch(endpoint, data, setHeaders(request));
    };

    const DELETE = (endpoint, request) => {
        return AxiosInstance.delete(endpoint, setHeaders(request));
    };

    return {
        get: GET,
        post: POST,
        put: PUT,
        patch: PATCH,
        delete: DELETE,
    };
})();

exports = {
    AxiosService,
};
