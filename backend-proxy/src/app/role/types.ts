import { UUIDV4 } from "../../types";

export type RoleID = UUIDV4;
export type RoleType = "admin" | "recruiter-manager" | "recruiter";
export type Role = {
  id: RoleID;
  type: RoleType;
};
