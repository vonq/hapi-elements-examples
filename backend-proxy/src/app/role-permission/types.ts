import { RoleID } from "../role/types";

import { PermissionID } from "../permission/types";

export type RolePermission = {
  roleId: RoleID;
  permissionIds: PermissionID[];
};
