import { Model } from '@react3l/react3l/core';
import { Moment } from 'moment';
import { QuotationContent } from 'models/QuotationContent';
import { QuotationHistory } from 'models/QuotationHistory';

export class QuotationContentHistory extends Model
{
    public id?: number;

    public quotationHistoryId?: number;

    public quotationContentId?: number;

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


    public quotationContent?: QuotationContent;

    public quotationHistory?: QuotationHistory;
}
