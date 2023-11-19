import axios from "axios";
import { ActivationType, LoginType, RegisterType } from "../Types/Types";

// Product APIs
const instance = axios.create({
  baseURL: "http://localhost:8000/",
});

// User APIs

export function RegisterAPI(register: RegisterType) {
  return instance
    .post("api/v1/accounts/users/", register)
    .then(async (response) => {
      console.log(response.data);
      return true;
    })
    .catch(() => {
      console.log("Registration failed");
      return false;
    });
}

export function LoginAPI(user: LoginType) {
  return instance
    .post("api/v1/accounts/jwt/create/", user)
    .then(async (response) => {
      localStorage.setItem("token", JSON.stringify(response.data.auth_token));
      console.log("Login Success ");
      return true;
    })
    .catch(() => {
      console.log("Login Failed");
      return false;
    });
}

export function UserAPI() {
  const token = JSON.parse(localStorage.getItem("token") || "{}");
  return instance
    .get("api/v1/accounts/users/me/", {
      headers: {
        Authorization: "Token " + token,
      },
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch(() => {
      console.log("Error retrieving user data");
      return false;
    });
}

export function ActivationAPI(activation: ActivationType) {
  return instance
    .post("api/v1/accounts/users/activation/", activation)
    .then(async () => {
      console.log("Activation Success");
      return true;
    })
    .catch(() => {
      console.log("Activation failed");
      return false;
    });
}
