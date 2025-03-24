import { convertSetToArray, findInSetByKey, getUUIDV4, log } from "../../utils";
import { RoleID } from "../role/types";
import AppController from "../app.controller";
import { Permission, PermissionType } from "./types";

export default class PermissionController {
  constructor(private appController: AppController) {}

  log = (...args: any[]) => {
    log("[PermissionController]", ...args);
  };

  findByID = (id: RoleID) => {
    const { db } = this.appController;
    const { permission } = db;

    return findInSetByKey<Permission>(permission, "id", id);
  };
  findByType = (type: PermissionType) => {
    const { db } = this.appController;
    const { permission } = db;

    return findInSetByKey<Permission>(permission, "type", type);
  };

  findAll = () => {
    const { db } = this.appController;
    const { permission } = db;

    return convertSetToArray<Permission>(permission);
  };

  seedDatabase = () => {
    const { db } = this.appController;
    const { permission } = db;

    permission.add({
      id: getUUIDV4(),
      type: "user.create",
    });
    permission.add({
      id: getUUIDV4(),
      type: "user.manage",
    });
    permission.add({
      id: getUUIDV4(),
      type: "hapi.contract.view",
    });
    permission.add({
      id: getUUIDV4(),
      type: "hapi.contract.manage",
    });
    permission.add({
      id: getUUIDV4(),
      type: "hapi.wallet.view",
    });
    permission.add({
      id: getUUIDV4(),
      type: "hapi.wallet.manage",
    });
    permission.add({
      id: getUUIDV4(),
      type: "hapi.campaign.manage",
    });
    permission.add({
      id: getUUIDV4(),
      type: "hapi.campaign.order",
    });

    this.log("Seeded to database:");
    console.table(this.findAll(), ["id", "type"]);
  };
}
