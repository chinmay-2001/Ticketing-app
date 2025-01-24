import axios from "axios";
import { parse } from "cookie";

const createApiClient = (baseURL, headers = {}) => {
  const api = axios.create({
    baseURL,
    headers,
    withCredentials: true, // Ensure credentials like cookies are sent with the request
  });
  const { accessToken } = parse(headers.cookie);

  // Response Interceptor
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        try {
          const { data } = await axios.post(
            "/api/auth/refresh-token",
            {},
            { withCredentials: true }
          );

          error.config.headers.Authorization = `Bearer ${data.accessToken}`;
          return axios.request(error.config);
        } catch (err) {
          console.error("Refresh token failed", err);
          window.location.href = "/"; // Redirect to login page
        }
      }
      return Promise.reject(error);
    }
  );

  // Request Interceptor
  api.interceptors.request.use((config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  return api;
};

export default ({ req }) => {
  // Determine if we are on the server or the browser
  // Server-side API client
  return createApiClient(
    "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
    req.headers // Pass headers from the incoming request,
  );
};
