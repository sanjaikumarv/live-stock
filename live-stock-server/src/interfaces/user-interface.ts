import { ObjectId } from "mongoose";

export interface PermissionObject {
  roleId: number;
  perms: Permission[];
}

export interface Permission {
  subject: string;
  actions: Array<Action | string>;
}

export interface Action {
  type: string;
  conditions: Conditions;
}

export interface Conditions {
  [key: string]: boolean;
}

export interface RoleObject {
  roleId: number;
  roleName: string;
}

export interface User {
  firstName: string;
  lastName: string;
  roles: number[];
  userType: string;
  email: string;
  password?: string;
  refreshTokens?: string[];
  phone: string;
  lastLogin: Date;
  createdBy: ObjectId;
  updatedBy: ObjectId;
  deleted: boolean;
  isActive: boolean;
  healthCenterType: string;
}
