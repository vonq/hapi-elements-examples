import { UUIDV4 } from "../../types";

export type TenantID = UUIDV4;
export type Tenant = {
  id: TenantID;
  name: string;
  hapiAccessToken: string | null;
};
