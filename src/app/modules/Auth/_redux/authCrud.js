import axios from "axios";
import urlapi from "../../../config";

export const LOGIN_URL = urlapi + "/auth/";
export const REGISTER_URL = urlapi + "/user";
export const REQUEST_PASSWORD_URL = urlapi + "/auth/forgot-password";

export const ME_URL = urlapi + "/acl/users";

export function login(email, password) {
  return axios.post(LOGIN_URL, { email, password });
}

export function register(email, name, password, changepassword) {
  return axios.post(REGISTER_URL + "/create", {
    email,
    name,
    password,
    confirmPassword: changepassword,
  });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  var token = localStorage.getItem("token");
  // ;return axios.post(ME_URL, { token });
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    return [200, { ...user, password: undefined }];
  }
}
