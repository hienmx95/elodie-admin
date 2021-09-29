import { Model } from "@react3l/react3l/core";
import { Moment } from "moment";
import { Currency } from "models/Currency";
import { Quotation } from "models/Quotation";
import { RequestForQuotationContent } from "models/RequestForQuotationContent";
import { TaxType } from "models/TaxType";
import { UnitOfMeasure } from "models/UnitOfMeasure";

export class QuotationContent extends Model {
  public id?: number;

  public requestForQuotationContentId?: number;

  public quotationId?: number;

  public description?: string;

  public itemId?: number;

  public unitOfMeasureId?: number;

  public unitPrice?: number;

  public quantity?: number;

  public subTotal?: number;

  public taxTypeId?: number;

  public taxAmount?: number;

  public total?: number;

  public mainCurrencyId?: number;

  public exchangeCurrencyId?: number;

  public exchangeRate?: number;

  public exchangedAt?: Moment;

  public exchangedSubTotal?: number;

  public exchangedTaxAmount?: number;

  public exchangedTotal?: number;

  public note?: string;

  public noteForSupplier?: string;

  public supplierNote?: string;

  public rowId?: string;

  public used?: boolean;

  public exchangeCurrency?: Currency;

  public mainCurrency?: Currency;

  public quotation?: Quotation;

  public requestForQuotationContent?: RequestForQuotationContent;

  public taxType?: TaxType;

  public unitOfMeasure?: UnitOfMeasure;
}
