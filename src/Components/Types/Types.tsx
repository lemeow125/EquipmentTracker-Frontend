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
  remarks: string;
};

export type EquipmentType = {
  id: number;
  name: string;
  description: string;
  last_updated: string;
  last_updated_by: string;
  date_added: string;
};

export type EquipmentListType = Array<EquipmentType>;

export type EquipmentInstanceType = {
  id: number;
  equipment: string;
  status: string;
  remarks: string;
  last_updated: string;
  last_updated_by: string;
  date_added: string;
};

export type EquipmentInstanceListType = Array<EquipmentInstanceType>;
