import { Model } from "@react3l/react3l/core";
import { File } from "models/File";
import { PurchasePlan } from "models/PurchasePlan";

export class PurchasePlanFileMapping extends Model {
  public purchasePlanId?: number;

  public fileId?: number;

  public file?: File;

  public purchasePlan?: PurchasePlan;
}
