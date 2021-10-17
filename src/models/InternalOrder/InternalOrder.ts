import { Model } from "@react3l/react3l/core";
import { Moment } from "moment";
// import { AppUser } from "models/AppUser";
// import { InternalOrderStatus } from "models/InternalOrderStatus";
// import { Organization } from "models/Organization";
// import { RequestState } from "models/RequestState";
// import { Warehouse } from "models/Warehouse";
// import { InternalOrderContent } from "models/InternalOrderContent";

export class InternalOrder extends Model {
  public id?: number;

  public code?: string;

  public itemCode?: string;

  public itemName?: string;

  public orderDate?: Moment;

  public deliveryDate?: Moment;

  public warehouseId?: number;

  public appUserId?: number;

  public organizationId?: number;

  public internalOrderStatusId?: number;

  public requestStateId?: number;

  public rowId?: string;

  // public appUser?: AppUser;

  // public internalOrderStatus?: InternalOrderStatus;

  // public organization?: Organization;

  // public requestState?: RequestState;

  // public warehouse?: Warehouse;

  // public internalOrderContents?: InternalOrderContent[];
}
