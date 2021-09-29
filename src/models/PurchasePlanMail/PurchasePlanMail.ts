import { Model } from "@react3l/react3l/core";
import { PurchasePlanMailFileMapping } from "models/PurchasePlanMailFileMapping";
import { PurchasePlanMailSupplierMapping } from "models/PurchasePlanMailSupplierMapping";

export class PurchasePlanMail extends Model {
  public id?: number;

  public purchasePlanId?: number;

  public subject?: string;

  public body?: string;

  public purchasePlanMailFileMappings?: PurchasePlanMailFileMapping[];

  public purchasePlanMailSupplierMappings?: PurchasePlanMailSupplierMapping[];
}
