import {
  convertSetToArray,
  findInSetByKey,
  findInSetByKeyValuePairs,
  getUUIDV4,
  log,
} from "../../utils";
import { PermissionID } from "../permission/types";
import AppController from "../app.controller";
import {
  PermissionVONQHAPIPath,
  PermissionVONQHAPIPathID,
  PermissionVONQHAPIPathRequestMethod,
} from "./types";

export default class PermissionVONQHAPIPathController {
  constructor(private appController: AppController) {}

  log = (...args: any[]) => {
    log("[PermissionVONQHAPIPathController]", ...args);
  };

  findByID = (id: PermissionVONQHAPIPathID) => {
    const { db } = this.appController;
    const { permissionVONQHAPIPath } = db;

    return findInSetByKey<PermissionVONQHAPIPath>(
      permissionVONQHAPIPath,
      "id",
      id
    );
  };
  findByPermissionID = (permissionID: PermissionID) => {
    const { db } = this.appController;
    const { permissionVONQHAPIPath } = db;

    return findInSetByKey<PermissionVONQHAPIPath>(
      permissionVONQHAPIPath,
      "permissionId",
      permissionID
    );
  };
  findByVONQHAPIPath = (path: string) => {
    const { db } = this.appController;
    const { permissionVONQHAPIPath } = db;

    return findInSetByKey<PermissionVONQHAPIPath>(
      permissionVONQHAPIPath,
      "vonqHAPIPath",
      path
    );
  };
  findByVONQHAPIPathAndRequestMethod = (
    path: string,
    requestMethod: PermissionVONQHAPIPathRequestMethod
  ) => {
    const { db } = this.appController;
    const { permissionVONQHAPIPath } = db;

    return findInSetByKeyValuePairs<PermissionVONQHAPIPath>(
      permissionVONQHAPIPath,
      {
        vonqHAPIPath: path,
        requestMethod,
      }
    );
  };

  findAll = () => {
    const { db } = this.appController;
    const { permissionVONQHAPIPath } = db;

    return convertSetToArray<PermissionVONQHAPIPath>(permissionVONQHAPIPath);
  };

  seedDatabase = () => {
    const { db, permissionController } = this.appController;
    const { permissionVONQHAPIPath } = db;
    const { findByType: findPermissionByType, findByID: findPermissionByID } =
      permissionController;

    const walletViewPermission = findPermissionByType("hapi.wallet.view");
    if (walletViewPermission) {
      permissionVONQHAPIPath.add({
        id: getUUIDV4(),
        permissionId: walletViewPermission.id,
        vonqHAPIPath: "/wallet",
        requestMethod: "get",
      });
    }

    const walletManagePermission = findPermissionByType("hapi.wallet.manage");
    if (walletManagePermission) {
      permissionVONQHAPIPath.add({
        id: getUUIDV4(),
        permissionId: walletManagePermission.id,
        vonqHAPIPath: "/wallet/payment-intent",
        requestMethod: "post",
      });
      permissionVONQHAPIPath.add({
        id: getUUIDV4(),
        permissionId: walletManagePermission.id,
        vonqHAPIPath: "/wallet/billing-portal",
        requestMethod: "post",
      });
      permissionVONQHAPIPath.add({
        id: getUUIDV4(),
        permissionId: walletManagePermission.id,
        vonqHAPIPath: "/wallet",
        requestMethod: "post",
      });
      permissionVONQHAPIPath.add({
        id: getUUIDV4(),
        permissionId: walletManagePermission.id,
        vonqHAPIPath: "/wallet",
        requestMethod: "put",
      });
      permissionVONQHAPIPath.add({
        id: getUUIDV4(),
        permissionId: walletManagePermission.id,
        vonqHAPIPath: "/wallet",
        requestMethod: "patch",
      });
      permissionVONQHAPIPath.add({
        id: getUUIDV4(),
        permissionId: walletManagePermission.id,
        vonqHAPIPath: "/wallet",
        requestMethod: "delete",
      });
    }

    const contractViewPermission = findPermissionByType("hapi.contract.view");
    if (contractViewPermission) {
      permissionVONQHAPIPath.add({
        id: getUUIDV4(),
        permissionId: contractViewPermission.id,
        vonqHAPIPath: "/contracts/single",
        requestMethod: "get",
      });
      permissionVONQHAPIPath.add({
        id: getUUIDV4(),
        permissionId: contractViewPermission.id,
        vonqHAPIPath: "/contracts",
        requestMethod: "get",
      });
      permissionVONQHAPIPath.add({
        id: getUUIDV4(),
        permissionId: contractViewPermission.id,
        vonqHAPIPath: "/contracts/multiple",
        requestMethod: "get",
      });
      permissionVONQHAPIPath.add({
        id: getUUIDV4(),
        permissionId: contractViewPermission.id,
        vonqHAPIPath: "/igb/contracts/groups",
        requestMethod: "get",
      });
    }

    const contractManagePermission = findPermissionByType(
      "hapi.contract.manage"
    );
    if (contractManagePermission) {
      permissionVONQHAPIPath.add({
        id: getUUIDV4(),
        permissionId: contractManagePermission.id,
        vonqHAPIPath: "/contracts",
        requestMethod: "post",
      });
      permissionVONQHAPIPath.add({
        id: getUUIDV4(),
        permissionId: contractManagePermission.id,
        vonqHAPIPath: "/igb/contracts/groups",
        requestMethod: "post",
      });
      permissionVONQHAPIPath.add({
        id: getUUIDV4(),
        permissionId: contractManagePermission.id,
        vonqHAPIPath: "/igb/contracts/groups",
        requestMethod: "post",
      });
      permissionVONQHAPIPath.add({
        id: getUUIDV4(),
        permissionId: contractManagePermission.id,
        vonqHAPIPath: "/contracts",
        requestMethod: "delete",
      });
      permissionVONQHAPIPath.add({
        id: getUUIDV4(),
        permissionId: contractManagePermission.id,
        vonqHAPIPath: "/igb/contracts/groups",
        requestMethod: "delete",
      });
      permissionVONQHAPIPath.add({
        id: getUUIDV4(),
        permissionId: contractManagePermission.id,
        vonqHAPIPath: "/contracts/single",
        requestMethod: "patch",
      });
      permissionVONQHAPIPath.add({
        id: getUUIDV4(),
        permissionId: contractManagePermission.id,
        vonqHAPIPath: "/igb/contracts/groups",
        requestMethod: "put",
      });
    }

    const campaignManagePermission = findPermissionByType(
      "hapi.campaign.manage"
    );
    if (campaignManagePermission) {
      permissionVONQHAPIPath.add({
        id: getUUIDV4(),
        permissionId: campaignManagePermission.id,
        vonqHAPIPath: "/campaigns",
        requestMethod: "put",
      });
    }

    const campaignOrderPermission = findPermissionByType("hapi.campaign.order");
    if (campaignOrderPermission) {
      permissionVONQHAPIPath.add({
        id: getUUIDV4(),
        permissionId: campaignOrderPermission.id,
        vonqHAPIPath: "/campaigns/order",
        requestMethod: "post",
      });
    }

    this.log("Seeded to database:");
    const readablePermissions = this.findAll().map((permission) => {
      return {
        permission: findPermissionByID(permission.permissionId)?.type,
        vonqHAPIPath: permission.vonqHAPIPath,
        requestMethod: permission.requestMethod,
      };
    });
    console.table(readablePermissions, [
      "permission",
      "vonqHAPIPath",
      "requestMethod",
    ]);
  };
}
