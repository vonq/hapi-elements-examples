import { convertSetToArray, findInSetByKey, getUUIDV4 } from "../../utils";
import {
  TenantVONQResource,
  TenantVONQResourceID,
  TenantVONQResourceVONQID,
  TenantVONQResourceVONQType,
} from "./types";
import AppController from "../app.controller";
import { UserID } from "../user/types";

export default class TenantVONQResourceController {
  constructor(private appController: AppController) {}

  findByID = (id: TenantVONQResourceID) => {
    const { db } = this.appController;
    const { tenantVONQResource } = db;

    return findInSetByKey<TenantVONQResource>(tenantVONQResource, "id", id);
  };

  findByVONQID = (id: TenantVONQResourceVONQID) => {
    const { db } = this.appController;
    const { tenantVONQResource } = db;

    return findInSetByKey<TenantVONQResource>(
      tenantVONQResource,
      "vonqId",
      id,
      "notStrictEquality"
    );
  };

  findAll = () => {
    const { db } = this.appController;
    const { tenantVONQResource } = db;

    return convertSetToArray<TenantVONQResource>(tenantVONQResource);
  };

  upsertDataByVONQResourceID = (
    vonqResourceId: string,
    vonqType: TenantVONQResourceVONQType,
    requestMethod: string,
    actionBy: UserID
  ) => {
    const { db, userController, tenantController } = this.appController;
    const { tenantVONQResource } = db;

    const tenantId = userController.findByID(actionBy)?.tenantId;

    if (tenantId) {
      const existingData = this.findByVONQID(vonqResourceId);
      if (existingData) {
        tenantVONQResource.delete(existingData);
        if (requestMethod === "PUT" || requestMethod === "PATCH") {
          existingData.updatedBy = actionBy;
          existingData.updatedAt = new Date().toISOString();
        } else if (requestMethod === "DELETE") {
          existingData.deletedBy = actionBy;
          existingData.deletedAt = new Date().toISOString();
        }
        tenantVONQResource.add(existingData);
      } else if (requestMethod === "POST") {
        tenantVONQResource.add({
          id: getUUIDV4(),
          tenantId,
          vonqId: vonqResourceId,
          vonqType,
          createdBy: actionBy,
          createdAt: new Date().toISOString(),
          updatedAt: null,
          updatedBy: null,
          deletedAt: null,
          deletedBy: null,
        });
      }
    }
  };
}
