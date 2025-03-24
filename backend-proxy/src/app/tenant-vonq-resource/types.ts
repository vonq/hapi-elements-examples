import { CreatedAt, DeletedAt, UpdatedAt, UUIDV4 } from "../../types";
import { TenantID } from "../tenant/types";
import { UserID } from "../user/types";

export type TenantVONQResourceID = UUIDV4;
export type TenantVONQResourceVONQID = string | number;
export type TenantVONQResourceVONQType =
  | "campaign"
  | "contract"
  | "contract-group"
  | "wallet";
export type TenantVONQResource = {
  id: TenantVONQResourceID;
  tenantId: TenantID;
  vonqId: TenantVONQResourceVONQID;
  vonqType: TenantVONQResourceVONQType;
  createdBy: UserID;
  createdAt: CreatedAt;
  updatedBy: UserID | null;
  updatedAt: UpdatedAt | null;
  deletedBy: UserID | null;
  deletedAt: DeletedAt | null;
};
