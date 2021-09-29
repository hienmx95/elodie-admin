import { Model } from "@react3l/react3l/core";
import { Moment } from "moment";
import { Quotation } from "models/Quotation";
import { SupplierUser } from "models/SupplierUser";

export class QuotationHistory extends Model {
  public id?: number;

  public quotationId?: number;

  public savedAt?: Moment;

  public supplierUserId?: number;

  public content?: Quotation;

  public supplierUser?: SupplierUser;
}
