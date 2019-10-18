const axios = require('axios');

const AxiosService = (() => {
    let AccessToken = '';
    const AxiosInstance = axios.create({
        baseURL: process.env.BASE_URL,
        headers: {
            common: {
                Accept: 'application/json, text/plain',
                'Content-Type': 'application/json',
            }
        }
    });

    const setAccessToken = token => {
        AccessToken = token || '';
    };

    const addHeaders = userConfig => {
        const globalHeaders = {
            // Set headers that will be used on every request
            Accept: 'application/json, text/plain',
            'Content-Type': 'application/json',
        };

        if (AccessToken) {
            globalHeaders['X-access-token'] = AccessToken;
        }

        const { headers = {}, ...restConfigs } = userConfig;

        // Return extended config
        return {
            headers: {
                ...globalHeaders,
                ...headers,
            },
            ...restConfigs,
        };
    };

    const GET = (endpoint, config = {}) => {
        return AxiosInstance.get(endpoint, addHeaders(config));
    };

    const POST = (endpoint, params = {}, config = {}) => {
        return AxiosInstance.post(endpoint, params, addHeaders(config));
    };

    const PUT = (endpoint, params = {}, config = {}) => {
        return AxiosInstance.put(endpoint, params, addHeaders(config));
    };

    const PATCH = (endpoint, params = {}, config = {}) => {
        return AxiosInstance.patch(endpoint, params, addHeaders(config));
    };

    const DELETE = (endpoint, config = {}) => {
        return AxiosInstance.delete(endpoint, addHeaders(config));
    };

    return {
        setAccessToken,
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