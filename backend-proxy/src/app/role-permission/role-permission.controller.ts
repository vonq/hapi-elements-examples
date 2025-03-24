import {
  convertSetToArray,
  filterInSetByKey,
  findInSetByKey,
  log,
} from "../../utils";
import { RoleID } from "../role/types";
import { PermissionID } from "../permission/types";
import AppController from "../app.controller";
import { RolePermission } from "./types";

export default class RolePermissionController {
  constructor(private appController: AppController) {}

  log = (...args: any[]) => {
    log("[RolePermissionController]", ...args);
  };

  findByRoleID = (id: RoleID) => {
    const { db } = this.appController;
    const { rolePermission } = db;

    return findInSetByKey<RolePermission>(rolePermission, "roleId", id);
  };
  filterByPermissionID = (permissionID: PermissionID) => {
    const { db } = this.appController;
    const { rolePermission } = db;

    return filterInSetByKey<RolePermission>(
      rolePermission,
      "permissionIds",
      permissionID
    );
  };

  findAll = () => {
    const { db } = this.appController;
    const { rolePermission } = db;

    return convertSetToArray<RolePermission>(rolePermission);
  };

  seedDatabase = () => {
    const { db, roleController, permissionController } = this.appController;
    const { rolePermission } = db;
    const { findByType: findRoleByType, findByID: findRoleByID } =
      roleController;
    const { findByType: findPermissionByType, findByID: findPermissionByID } =
      permissionController;

    const recruiterRole = findRoleByType("recruiter");
    const recruiterManagerRole = findRoleByType("recruiter-manager");
    const atsAdminRole = findRoleByType("admin");

    const recruiterPermissionIDs: PermissionID[] = [];
    const recruiterManagerPermissionIDs: PermissionID[] = [];
    const atsAdminPermissionIDs: PermissionID[] = [];

    if (recruiterRole) {
      const contractViewPermission = findPermissionByType("hapi.contract.view");
      if (contractViewPermission) {
        recruiterPermissionIDs.push(contractViewPermission.id);
      }

      const walletViewPermission = findPermissionByType("hapi.wallet.view");
      if (walletViewPermission) {
        recruiterPermissionIDs.push(walletViewPermission.id);
      }

      const campaignOrderPermission = findPermissionByType(
        "hapi.campaign.order"
      );
      if (campaignOrderPermission) {
        recruiterPermissionIDs.push(campaignOrderPermission.id);
      }

      rolePermission.add({
        roleId: recruiterRole.id,
        permissionIds: recruiterPermissionIDs,
      });
    }

    if (recruiterManagerRole) {
      // Recruiter Manager inherits permissions from Recruiter
      recruiterManagerPermissionIDs.push(...recruiterPermissionIDs);

      const contractManagePermission = findPermissionByType(
        "hapi.contract.manage"
      );
      if (contractManagePermission) {
        recruiterManagerPermissionIDs.push(contractManagePermission.id);
      }

      const walletManagePermission = findPermissionByType("hapi.wallet.manage");
      if (walletManagePermission) {
        recruiterManagerPermissionIDs.push(walletManagePermission.id);
      }

      const campaignManagePermission = findPermissionByType(
        "hapi.campaign.manage"
      );
      if (campaignManagePermission) {
        recruiterManagerPermissionIDs.push(campaignManagePermission.id);
      }

      rolePermission.add({
        roleId: recruiterManagerRole.id,
        permissionIds: recruiterManagerPermissionIDs,
      });
    }

    if (atsAdminRole) {
      // ATS Admin inherits permissions from Recruiter Manager which inherits permissions from Recruiter
      atsAdminPermissionIDs.push(...recruiterManagerPermissionIDs);

      const userCreatePermission = findPermissionByType("user.create");
      if (userCreatePermission) {
        atsAdminPermissionIDs.push(userCreatePermission.id);
      }

      const userManagePermission = findPermissionByType("user.manage");
      if (userManagePermission) {
        atsAdminPermissionIDs.push(userManagePermission.id);
      }

      rolePermission.add({
        roleId: atsAdminRole.id,
        permissionIds: atsAdminPermissionIDs,
      });
    }

    this.log("Seeded to database:");
    const readableRolePermissions = this.findAll().map((rolePermission) => {
      return {
        role: findRoleByID(rolePermission.roleId as RoleID)?.type,
        permissions: rolePermission.permissionIds
          .map((permissionId) => findPermissionByID(permissionId)?.type)
          .filter((p) => !!p)
          .join(`, `),
      };
    });
    console.table(readableRolePermissions, ["role", "permissions"]);
  };
}
