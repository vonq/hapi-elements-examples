import { UUIDV4 } from "../../types";

export type PermissionID = UUIDV4;
export type PermissionType =
  | "user.create"
  | "user.manage"
  | `hapi.contract.view`
  | `hapi.contract.manage`
  | `hapi.wallet.view`
  | `hapi.wallet.manage`
  | `hapi.campaign.manage`
  | `hapi.campaign.order`;
export type Permission = {
  id: PermissionID;
  type: PermissionType;
};
