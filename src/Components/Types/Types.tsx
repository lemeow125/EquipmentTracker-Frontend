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

export type AddEquipmentType = {
  name: string;
  remarks: string;
};
