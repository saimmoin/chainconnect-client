/** @format */

export const interceptor = (instance) => {
  instance.interceptors.request.use(
    function (config) {
      config.headers["Content-Type"] = "application/json";
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    function (response) {
      return response.data.data;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
};
