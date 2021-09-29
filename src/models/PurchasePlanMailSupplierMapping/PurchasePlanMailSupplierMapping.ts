import { Model } from "@react3l/react3l/core";
import { PurchasePlanMail } from "models/PurchasePlanMail";
import { Supplier } from "models/Supplier";

export class PurchasePlanMailSupplierMapping extends Model {
  public purchasePlanMailId?: number;

  public supplierId?: number;

  public purchasePlanMail?: PurchasePlanMail;

  public supplier?: Supplier;
}
