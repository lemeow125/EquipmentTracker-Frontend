export type RegisterType = {
  email: string;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
};

export type LoginType = {
  username: string;
  password: string;
};

export type ActivationType = {
  uid: string;
  token: string;
};

export type ResetPasswordConfirmType = {
  uid: string;
  token: string;
  new_password: string;
};

export type AddEquipmentType = {
  name: string;
  description: string;
  category?: string;
};

export type PatchEquipmentType = {
  name: string;
  description: string;
  category?: string;
};

export type EquipmentType = {
  id: number;
  name: string;
  description: string;
  last_updated: string;
  last_updated_by: string;
  date_added: string;
  category: string;
};

export type EquipmentListType = Array<EquipmentType>;

export type AddEquipmentInstanceType = {
  equipment: number;
  status: string;
  remarks?: string;
};

export type PatchEquipmentInstanceType = {
  status: string;
  remarks?: string;
};

export type EquipmentInstanceType = {
  id: number;
  equipment: string;
  equipment_name: string;
  status: string;
  remarks: string;
  last_updated: string;
  last_updated_by: string;
  date_added: string;
  category: string;
};

export type EquipmentInstanceListType = Array<EquipmentInstanceType>;
