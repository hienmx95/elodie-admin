import { Model } from "@react3l/react3l/core";
import { Moment } from "moment";
import { Category } from "models/Category";
import { AppUser } from "models/AppUser";
import { Currency } from "models/Currency";
import { PurchasePlanStatus } from "models/PurchasePlanStatus";
import { PurchasePlanType } from "models/PurchasePlanType";
import { PurchaseRequest } from "models/PurchaseRequest";
import { Supplier } from "models/Supplier";
import { Status } from "models/Status";
import { PurchasePlanContent } from "models/PurchasePlanContent";
import { PurchasePlanTradeConditionMapping } from "models/PurchasePlanTradeConditionMapping";
import { PurchasePlanFileMapping } from "models/PurchasePlanFileMapping";
import { PurchasePlanSupplierMapping } from "models/PurchasePlanSupplierMapping";

export class PurchasePlan extends Model {
  public id?: number;

  public code?: string;

  public description?: string;

  public purchaseRequestCode?: string;

  public purchaseRequestId?: number;

  public categoryId?: number;

  public requestOrganization?: string;

  public requestOrganizationId?: number;

  public quotationExpectedAt?: Moment;

  public purchasePlanTypeId?: number;

  public createdAt?: Moment;

  public statusId?: number;

  public purchasePlanStatusId?: number;

  public mainCurrencyId?: number;

  public selectedSupplierId?: number;

  public used?: boolean;

  public creator?: AppUser;

  public subTotal?: number;

  public freightExpense?: number;

  public totalWithoutTax?: number;

  public total?: number;

  public creatorId?: number;

  public rowId?: string;

  public category?: Category;

  public mainCurrency?: Currency;

  public purchasePlanStatus?: PurchasePlanStatus;

  public purchasePlanContents?: PurchasePlanContent[];

  public purchasePlanType?: PurchasePlanType;

  public purchaseRequest?: PurchaseRequest;

  public selectedSupplier?: Supplier;

  public purchasePlanSupplierMappings?: PurchasePlanSupplierMapping[];

  public status?: Status;

  public purchasePlanTradeConditionMappings?: PurchasePlanTradeConditionMapping[];

  public purchasePlanFileMappings?: PurchasePlanFileMapping[];

  public reasonToChooseSupplier?: string;
}
