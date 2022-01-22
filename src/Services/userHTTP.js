import axios from "axios";

export const UserHttp = () => {

  const customFetch = (endpoint, options) => {
        
    const defaultHeader = {
      accept: "application/json",
    };

    const controller = new AbortController();
    options.signal = controller.signal;

    options.method = options.method || "GET";
    options.headers = options.headers
      ? { ...defaultHeader, ...options.headers }
      : defaultHeader;

    options.body = JSON.stringify(options.body) || false;
    if (!options.body) delete options.body;

    setTimeout(() => controller.abort(), 3000);

    return axios(endpoint, options)
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject({
            err: true,
            status: res.status || "00",
            statusText: res.statusText || "Fatal error",
          })
      )
      .catch((err) => err);
  };

  const getUsers = (url, options = {}) => customFetch(url, options);

  const postUsers = (url, options = {}) => {
    options.method = "POST";
    return customFetch(url, options);
  };

  const putUsers = (url, options = {}) => {
    options.method = "PUT";
    return customFetch(url, options);
  };

  const delUsers = (url, options = {}) => {
    options.method = "DELETE";
    return customFetch(url, options);
  };

  return {
    getUsers,
    postUsers,
    putUsers,
    delUsers,
  };
};

UserHttp()