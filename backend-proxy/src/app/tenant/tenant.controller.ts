import { convertSetToArray, findInSetByKey, log } from "../../utils";
import { Tenant, TenantID } from "./types";
import AppController from "../app.controller";

export default class TenantController {
  exampleTenantIDForX: string = "tenant-x";
  constructor(private appController: AppController) {}

  log = (...args: any[]) => {
    log("[TenantController]", ...args);
  };

  findByID = (id: TenantID) => {
    const { db } = this.appController;
    const { tenant } = db;

    return findInSetByKey<Tenant>(tenant, "id", id);
  };

  findAll = () => {
    const { db } = this.appController;
    const { tenant } = db;

    return convertSetToArray<Tenant>(tenant);
  };

  updateByID = (id: TenantID, updateTenantDto: Partial<Tenant>) => {
    const { db } = this.appController;
    const { tenant: tenantDb } = db;

    let tenant = findInSetByKey<Tenant>(tenantDb, "id", id);

    if (tenant) {
      tenantDb.delete(tenant);
      tenantDb.add({
        ...tenant,
        ...updateTenantDto,
      });
    }

    tenant = this.findByID(id);

    return tenant;
  };

  seedDatabase = () => {
    const { db, roleController } = this.appController;
    const { tenant } = db;

    tenant.add({
      id: this.exampleTenantIDForX,
      name: "Tenant X",
      hapiAccessToken: null,
    });

    this.log("Seeded to database:");
    console.table(this.findAll(), ["id", "name"]);
  };
}
