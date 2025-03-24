import { RoleID } from "../role/types";
import { UUIDV4 } from "../../types";
import { TenantID } from "../tenant/types";

export type UserID = UUIDV4;
export type UserAccessToken = string;
export type User = {
  id: UserID;
  tenantId: TenantID;
  name: string;
  roleId: RoleID;
  accessToken: UserAccessToken;
};
