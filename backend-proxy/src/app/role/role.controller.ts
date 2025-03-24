import {
  convertSetToArray,
  filterInSetByKey,
  findInSetByKey,
  getUUIDV4,
  log,
} from "../../utils";
import { Role, RoleID, RoleType } from "./types";
import AppController from "../app.controller";

export default class RoleController {
  constructor(private appController: AppController) {}

  log = (...args: any[]) => {
    log("[RoleController]", ...args);
  };

  findByID = (id: RoleID) => {
    const { db } = this.appController;
    const { role } = db;

    return findInSetByKey<Role>(role, "id", id);
  };

  filterByID = (id: RoleID) => {
    const { db } = this.appController;
    const { role } = db;

    return filterInSetByKey<Role>(role, "id", id);
  };
  findByType = (type: RoleType) => {
    const { db } = this.appController;
    const { role } = db;

    return findInSetByKey<Role>(role, "type", type);
  };

  findAll = () => {
    const { db } = this.appController;
    const { role } = db;

    return convertSetToArray<Role>(role);
  };

  seedDatabase = () => {
    const { db } = this.appController;
    const { role } = db;

    role.add({
      id: getUUIDV4(),
      type: "admin",
    });

    role.add({
      id: getUUIDV4(),
      type: "recruiter-manager",
    });

    role.add({
      id: getUUIDV4(),
      type: "recruiter",
    });

    this.log("Seeded to database:");
    console.table(this.findAll(), ["id", "type"]);
  };
}
