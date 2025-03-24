import { Role } from "./role/types";
import { Permission } from "./permission/types";
import { RolePermission } from "./role-permission/types";
import { User } from "./user/types";
import PermissionController from "./permission/permission.controller";
import RoleController from "./role/role.controller";
import UserController from "./user/user.controller";
import AuthController from "./auth/auth.controller";
import RolePermissionController from "./role-permission/role-permission.controller";
import PermissionVONQHAPIPathController from "./permission-vonq-hapi-path/permission-vonq-hapi-path.controller";
import { PermissionVONQHAPIPath } from "./permission-vonq-hapi-path/types";
import { Tenant } from "./tenant/types";
import TenantController from "./tenant/tenant.controller";
import { TenantVONQResource } from "./tenant-vonq-resource/types";
import TenantVONQResourceController from "./tenant-vonq-resource/tenant-vonq-resource.controller";
import VONQHAPIController from "./vonq-hapi/vonq-hapi.controller";
import { AxiosError, AxiosResponse } from "axios";
import { Response } from "express";

export default class AppController {
  db = {
    role: new Set<Role>(),
    permission: new Set<Permission>(),
    rolePermission: new Set<RolePermission>(),
    permissionVONQHAPIPath: new Set<PermissionVONQHAPIPath>(),
    tenant: new Set<Tenant>(),
    tenantVONQResource: new Set<TenantVONQResource>(),
    user: new Set<User>(),
  };
  vonqHAPIController = new VONQHAPIController(this);
  permissionController = new PermissionController(this);
  roleController = new RoleController(this);
  rolePermissionController = new RolePermissionController(this);
  permissionVONQHAPIPathController = new PermissionVONQHAPIPathController(this);
  userController = new UserController(this);
  tenantController = new TenantController(this);
  tenantVONQResourceController = new TenantVONQResourceController(this);
  authController = new AuthController(this);

  constructor() {
    this.roleController.seedDatabase();
    this.permissionController.seedDatabase();
    this.rolePermissionController.seedDatabase();
    this.permissionVONQHAPIPathController.seedDatabase();
    this.tenantController.seedDatabase();
    this.userController.seedDatabase();
  }

  respondWithAxiosResponse = (
    res: Response,
    axiosResponse: AxiosResponse<any, any>
  ) => {
    return res
      .status(axiosResponse.status)
      .set(axiosResponse.headers)
      .send(axiosResponse.data);
  };
  respondWithData = (
    res: Response,
    status: number,
    data: Record<string, any>
  ) => {
    return res.status(status).send(data);
  };
  respondWithAxiosError = (res: Response, error: unknown) => {
    const axiosError = error as unknown as AxiosError;
    // Forward the error response (including status, headers, and body) as is
    if (axiosError.response) {
      // If the error contains a response, forward it to the client
      return res
        .status(axiosError.response.status)
        .set(axiosError.response.headers)
        .send(axiosError.response.data);
    } else {
      // If there is no response (e.g., network error), send a generic error message
      return res
        .status(500)
        .json({ message: "Error forwarding request to external API" });
    }
  };
}
