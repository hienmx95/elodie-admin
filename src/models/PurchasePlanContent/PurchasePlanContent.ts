import { Model } from "@react3l/react3l/core";
import { Currency } from "models/Currency";
import { Item } from "models/Item";
import { PurchasePlan } from "models/PurchasePlan";
import { SavingType } from "models/SavingType";
import { TaxType } from "models/TaxType";
import { Moment } from "moment";

export class PurchasePlanContent extends Model {
  public id?: number;

  public purchasePlanId?: number;

  public description?: string;

  public itemId?: number;

  public unitOfMeasureId?: number;

  public unitPrice?: number;

  public quantity?: number;

  public subTotal?: number;

  public taxTypeId?: number;

  public taxAmount?: number;

  public savingTypeId?: number;

  public savingCost?: number;

  public total?: number;

  public note?: string;

  public mainCurrencyId?: number;

  public exchangeCurrencyId?: number;

  public exchangeRate?: number;

  public exchangedAt?: Moment;

  public exchangedUnitPrice?: number;

  public exchangedTaxAmount?: number;

  public exchangedSavingCost?: number;

  public exchangedSubTotal?: number;

  public exchangedTotal?: number;

  public rowId?: string;

  public used?: boolean;

  public exchangeCurrency?: Currency;

  public item?: Item;

  public mainCurrency?: Currency;

  public purchasePlan?: PurchasePlan;

  public savingType?: SavingType;

  public taxType?: TaxType;
}
