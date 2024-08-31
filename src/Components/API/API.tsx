/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import {
  ActivationType,
  EquipmentListType,
  LoginType,
  RegisterType,
  ResetPasswordConfirmType,
  EquipmentInstanceListType,
  EquipmentType,
  AddEquipmentType,
  AddEquipmentInstanceType,
  EquipmentInstanceType,
  PatchEquipmentInstanceType,
  PatchEquipmentType,
  EquipmentLogListType,
  EquipmentInstanceLogListType,
} from "../Types/Types";

const debug = false;
let backendURL;

if (debug) {
  backendURL = "http://localhost:8000/";
} else {
  backendURL = "https://api.equipment-tracker.06222001.xyz/";
}

const instance = axios.create({
  baseURL: backendURL,
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

export function ParseError(error: { response: { data: string } }) {
  if (error.response && error.response.data) {
    if (error.response.data.length > 50) {
      return "Error truncated (too long)";
    }
    return JSON.stringify(error.response.data)
      .replace(/[{}]/g, " ")
      .replace(/\(/g, " ")
      .replace(/\)/g, " ")
      .replace(/"/g, " ")
      .replace(/,/g, ",")
      .replace(/\[/g, "")
      .replace(/\]/g, "")
      .replace(/\./g, "")
      .replace(/non_field_errors/g, "")
      .trim();
  }
  return "Unable to reach server";
}
// User APIs

export function RegisterAPI(info: RegisterType) {
  return instance
    .post("api/v1/accounts/users/", info)
    .then(async (response) => {
      console.log(response.data);
      return [true, 0];
    })
    .catch((error) => {
      console.log("Registration failed");
      return [false, ParseError(error)];
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

      console.log("Login Success");
      return true;
    })
    .catch((error) => {
      console.log("Login Failed", error.response.data);
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
      console.log("Error refreshing token");
      return false;
    });
}

export async function UserAPI() {
  const config = await GetConfig();
  return instance
    .get("api/v1/accounts/users/me/", config)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      console.log("Error retrieving user data");
    });
}

export function ActivationAPI(activation: ActivationType) {
  return instance
    .post("api/v1/accounts/users/activation/", activation)
    .then(() => {
      console.log("Activation Success");
      return true;
    })
    .catch(() => {
      console.log("Activation failed");
      return false;
    });
}
export function ResetPasswordAPI(email: string) {
  return instance
    .post("api/v1/accounts/users/reset_password/", { email: email })
    .then(() => {
      console.log("Activation Success");
      return true;
    })
    .catch(() => {
      console.log("Activation failed");
      return false;
    });
}

export function ResetPasswordConfirmAPI(info: ResetPasswordConfirmType) {
  return instance
    .post("api/v1/accounts/users/reset_password_confirm/", info)
    .then(() => {
      console.log("Reset Success");
      return true;
    })
    .catch(() => {
      console.log("Reset failed");
      return false;
    });
}

// Equipment APIs

export async function EquipmentAPI(id: number) {
  const config = await GetConfig();
  return instance
    .get(`api/v1/equipments/equipments/${id}/`, config)
    .then((response) => {
      return response.data as EquipmentType;
    })
    .catch(() => {
      console.log("Error retrieving equipment");
    });
}

export async function EquipmentUpdateAPI(
  equipment: PatchEquipmentType,
  id: number
) {
  const config = await GetConfig();
  return instance
    .patch(`api/v1/equipments/equipments/${id}/`, equipment, config)
    .then((response) => {
      return [true, response.data as EquipmentType];
    })
    .catch((error) => {
      console.log("Error updating equipment instance");
      return [false, ParseError(error)];
    });
}

export async function EquipmentRemoveAPI(id: number) {
  const config = await GetConfig();
  return instance
    .delete(`api/v1/equipments/equipments/${id}/`, config)
    .then((response) => {
      return [true, response.data as EquipmentType];
    })
    .catch((error) => {
      console.log("Error deleting equipment instance");
      return [false, ParseError(error)];
    });
}

export async function EquipmentsAPI() {
  const config = await GetConfig();
  return instance
    .get("api/v1/equipments/equipments/", config)
    .then((response) => {
      return response.data as EquipmentListType;
    })
    .catch(() => {
      console.log("Error retrieving equipments");
    });
}

export async function EquipmentCreateAPI(equipment: AddEquipmentType) {
  const config = await GetConfig();
  return instance
    .post("api/v1/equipments/equipments/", equipment, config)
    .then((response) => {
      return [true, response.data as EquipmentType];
    })
    .catch((error) => {
      console.log("Error creating equipment");
      return [false, ParseError(error)];
    });
}

export async function EquipmentLogsAPI() {
  const config = await GetConfig();
  return instance
    .get("api/v1/equipments/equipments/logs", config)
    .then((response) => {
      return response.data as EquipmentLogListType;
    })
    .catch(() => {
      console.log("Error retrieving equipment logs");
    });
}

// Equipment Instances APIs

export async function EquipmentInstanceLogsAPI() {
  const config = await GetConfig();
  return instance
    .get("api/v1/equipments/equipment_instances/logs", config)
    .then((response) => {
      return response.data as EquipmentInstanceLogListType;
    })
    .catch(() => {
      console.log("Error retrieving equipment logs");
    });
}
export async function EquipmentInstanceAPI(id: number) {
  const config = await GetConfig();
  return instance
    .get(`api/v1/equipments/equipment_instances/${id}/`, config)
    .then((response) => {
      return response.data as EquipmentInstanceType;
    })
    .catch(() => {
      console.log("Error retrieving equipment");
    });
}

export async function EquipmentInstanceUpdateAPI(
  item: PatchEquipmentInstanceType,
  id: number
) {
  const config = await GetConfig();
  return instance
    .patch(`api/v1/equipments/equipment_instances/${id}/`, item, config)
    .then((response) => {
      return [true, response.data as EquipmentInstanceType];
    })
    .catch((error) => {
      console.log("Error updating equipment instance");
      return [false, ParseError(error)];
    });
}

export async function EquipmentInstanceRemoveAPI(id: number) {
  const config = await GetConfig();
  return instance
    .delete(`api/v1/equipments/equipment_instances/${id}/`, config)
    .then((response) => {
      return [true, response.data];
    })
    .catch((error) => {
      console.log("Error deleting equipment instance");
      return [false, ParseError(error)];
    });
}

export async function EquipmentInstancesAPI() {
  const config = await GetConfig();
  return instance
    .get("api/v1/equipments/equipment_instances/", config)
    .then((response) => {
      return response.data as EquipmentInstanceListType;
    })
    .catch(() => {
      console.log("Error retrieving equipments");
    });
}

export async function EquipmentInstanceCreateAPI(
  equipment_instance: AddEquipmentInstanceType
) {
  const config = await GetConfig();
  return instance
    .post("api/v1/equipments/equipment_instances/", equipment_instance, config)
    .then((response) => {
      return [true, response.data as EquipmentInstanceType];
    })
    .catch((error) => {
      console.log("Error creating equipment instance");
      return [false, ParseError(error)];
    });
}
