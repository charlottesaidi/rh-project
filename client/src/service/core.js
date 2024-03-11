import axios from "axios";

axios.defaults.baseURL = 'http://localhost:35391/api';
axios.defaults.headers.get['Content-type'] = 'application/json, application/epub+zip';

axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  const errorResponse = {
    message: '',
    code: 0
  };
  switch (error.response?.status) {
    case 400:
      errorResponse.code = 400;
      errorResponse.message = 'Une erreur est survenue';
      break;
    case 401:
      errorResponse.code = 401;
      errorResponse.message = 'Identifiants ou mot de passe invalide';
      break;
    case 403:
      errorResponse.code = 403;
      errorResponse.message = 'Accès refusé';
      break;
    case 404:
      errorResponse.code = 404;
      errorResponse.message = 'Not Found';
      break;
    default:
      errorResponse.code = 500;
      errorResponse.message = `${error.response && error.response.data ? error.response.data['message'] || error.response.data['detail']  : error.message || error} : ça déconne quelque part mdr appelle moi`;
  }
  return Promise.reject(errorResponse);
});

/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token) => {
  if (token) axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  else delete axios.defaults.headers.common['Authorization'];
};

class Core {
  /**
   * Fetches data from given url
   */
  get = (url, params) => {
    let response;
    if (params) {
      const queryString = params
        ? Object.keys(params)
          .map((key) => key + '=' + params[key])
          .join('&')
        : '';
      response = axios.get(`${url}?${queryString}`, params);
    } else {
      response = axios.get(`${url}`, params);
    }
    return response;
  };

  getMultiple = (urls, params) => {
    const reqs = [];
    let queryString = '';
    if (params) {
      queryString = params
        ? Object.keys(params)
          .map((key) => key + '=' + params[key])
          .join('&')
        : '';
    }

    for (const url of urls) {
      reqs.push(axios.get(`${url}?${queryString}`));
    }
    return axios.all(reqs);
  };

  /**
   * post given data to url
   */
  create = (url, data) => {
    return axios.post(url, data);
  };

  /**
   * Updates data
   */
  update = (url, data) => {
    return axios.put(url, data);
  };

  /**
   * Deletes data
   */
  delete = (url) => {
    return axios.delete(url);
  };

  /**
   * post given data to url with file
   */
  createWithFile = (url, data) => {
    const formData = new FormData();

    for (const k in data) {
      if(k === 'file') formData.append('file', data[k]);
      if(k === 'cover') formData.append('cover', data[k]);
      if(k !== 'file' && k !== 'cover') formData.append(k, data[k]);
    }

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    return axios.post(url, data, config);
  };
}

export { Core, setAuthorization };