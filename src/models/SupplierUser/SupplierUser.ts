import { Model } from "@react3l/react3l/core";
import { Status } from "models/Status";
import { Supplier } from "models/Supplier";

export class SupplierUser extends Model {
  public id?: number;

  public username?: string;

  public displayName?: string;

  public description?: string;

  public password?: string;

  public supplierId?: number;

  public statusId?: number;

  public rowId?: string;

  public used?: boolean;

  public status?: Status;

  public supplier?: Supplier;
}
