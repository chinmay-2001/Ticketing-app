import axios from "axios";
import { useState } from "react";
import { parse } from "cookie";

export default ({ url, method, body, onSuccess }) => {
  const api = axios.create({
    baseURL: "/", //base URL
    withCredentials: true,
  });

  const [errors, setErrors] = useState(null);
  let accessToken;
  if (typeof window !== "undefined") {
    accessToken = parse(document.cookie).accessToken;
  }

  if (url !== "/api/users/signup" && url !== "/api/users/signin") {
    api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response && error.response.status === 401) {
          try {
            const { data } = await axios.post(
              "/api/users/refresh-token",
              {},
              { withCredentials: true }
            );

            error.config.headers[
              "Authorization"
            ] = `Bearer ${data.accessToken}`;
            return axios.request(error.config);
          } catch (err) {
            console.error("Refresh token failed", err);
            window.location.href = "/"; //redirect to login
          }
        }
        return Promise.reject(error);
      }
    );

    api.interceptors.request.use((config) => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });
  }

  const doRequest = async (props = {}) => {
    try {
      const response = await api[method](url, { ...body, ...props });

      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (err) {
      setErrors(
        <div className="alert alert-danger">
          <h4>Ooops...</h4>
          <ul className="my-0">
            {err.response.data.errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}{" "}
          </ul>
        </div>
      );
    }
  };
  return { doRequest, errors };
};
