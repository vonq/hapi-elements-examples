import { PermissionID } from "../permission/types";
import { UUIDV4 } from "../../types";

export type PermissionVONQHAPIPathID = UUIDV4;

export type PermissionVONQHAPIPathRequestMethod =
  | "get"
  | "post"
  | "put"
  | "patch"
  | "delete";

export type PermissionVONQHAPIPath = {
  id: PermissionVONQHAPIPathID;
  permissionId: PermissionID;
  vonqHAPIPath: string;
  requestMethod: PermissionVONQHAPIPathRequestMethod;
};
