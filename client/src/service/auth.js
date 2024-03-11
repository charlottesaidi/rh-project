import { useState } from 'react';
import {Core} from "./core";

const api = new Core();

export const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
};

export const isAdmin = (token) => {
  const parsedToken = parseJwt(token);
  if(parsedToken.roles.includes('ROLE_ADMIN')) {
    return true;
  } else {
    return false;
  }
}

export const routeAdminAccessible = (route, token) => {
  const admin = isAdmin(token);
  return !(route.path === '/admin' && !admin);
}

export const isTokenExpired = (token) => {
  const parsedToken = parseJwt(token);
  if (parsedToken.exp * 1000 < Date.now()) {
    logoutUser();
  }
}

export const useToken = () => {
  const getToken = () => {
    const userToken = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : null;
    return userToken;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    sessionStorage.setItem('token', userToken);
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token
  }
}

export const signup = async (params) => {
  const response = {};
  console.log(params)
  await api.create('/users/create', params).then((res) => {
    response['data'] = res.data;
  }).catch((err) => {
    response['error'] = err;
  });
  return response;
}

export const loginUser = async (params) => {
  const response = {};
  await api.create('/login_check', params).then((res) => {
    response['data'] = res.data.token;
  }).catch((err) => {
    err === undefined ? response['error'] = 'Une erreur est survenue lors de la connexion au serveur' : response['error'] = err.message ?? err;
  });
  return response;
}

export const resetPassword = async (url, params, token) => {
  const formData = new FormData();
  for(const k in params) {
    formData.append(k, params[k])
  }
  const parsedToken = parseJwt(token);
  formData.append('user_email', parsedToken.username);

  const response = {};
  await api.create(url, formData).then((res) => {
    response['data'] = res.data;
  }).catch((err) => {
    response['error'] = err;
  });
  return response;
}

export const logoutUser = () => {
  sessionStorage.removeItem('token');
  // eslint-disable-next-line no-restricted-globals
  location.reload();
}