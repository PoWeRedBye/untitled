const axios = require('axios');

class AxiosService {
  AxiosInstance;
  AccessToken;

  constructor(config) {
    this.AxiosInstance = axios.create(config);
  }

  setAccessToken(token) {
    this.AccessToken = token;
  }

  addAccessTokenHeader(requestConfig = {}) {
    return {
      ...requestConfig,
      headers: {
        ...requestConfig.headers,
        'X-access-token': this.AccessToken || '',
      },
    };
  }

  get(endpoint, requestConfig = {}) {
    this.AxiosInstance.get(endpoint, this.addAccessTokenHeader(requestConfig));
  }

  post(endpoint, requestPayload, requestConfig = {}) {
    this.AxiosInstance.post(endpoint, requestPayload, this.addAccessTokenHeader(requestConfig));
  }

  put(endpoint, requestPayload, requestConfig = {}) {
    this.AxiosInstance.put(endpoint, requestPayload, this.addAccessTokenHeader(requestConfig));
  }

  patch(endpoint, requestPayload, requestConfig = {}) {
    this.AxiosInstance.patch(endpoint, requestPayload, this.addAccessTokenHeader(requestConfig));
  }

  delete(endpoint, requestConfig = {}) {
    this.AxiosInstance.delete(endpoint, this.addAccessTokenHeader(requestConfig));
  }
}

const DefaultAxios = new AxiosService({ baseURL: process.env.BASE_URL });
const DataBaseAxios = new AxiosService({ baseURL: 'http://sfsdf' });

exports = {
  DefaultAxios,
  DataBaseAxios,
};
