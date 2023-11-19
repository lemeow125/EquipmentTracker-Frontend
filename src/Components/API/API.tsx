/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { ActivationType, LoginType, RegisterType } from "../Types/Types";

const instance = axios.create({
  baseURL: "http://localhost:8000/",
});
// Token Handling
export async function getAccessToken() {
  const accessToken = await localStorage.getItem("access_token");
  return accessToken;
}

export async function getRefreshToken() {
  const refreshToken = await localStorage.getItem("refresh_token");
  return refreshToken;
}

export async function setAccessToken(access: string) {
  await localStorage.setItem("access_token", access);
  return true;
}

export async function setRefreshToken(refresh: string) {
  await localStorage.setItem("refresh_token", refresh);
  return true;
}

// Header Config Template for REST
export async function GetConfig() {
  const accessToken = await getAccessToken();
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
}

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

export function LoginAPI(user: LoginType, remember_session: boolean) {
  return instance
    .post("api/v1/accounts/jwt/create/", user)
    .then(async (response) => {
      console.log(response.data);
      setAccessToken(response.data.access);
      if (remember_session) {
        setRefreshToken(response.data.refresh);
      }

      console.log("Login Success ");
      return true;
    })
    .catch(() => {
      console.log("Login Failed");
      return false;
    });
}

export async function JWTRefreshAPI() {
  const refresh = await getRefreshToken();
  return instance
    .post("api/v1/accounts/jwt/refresh/", {
      refresh: refresh,
    })
    .then(async (response) => {
      setAccessToken(response.data.access);
      return true;
    })
    .catch(() => {
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
