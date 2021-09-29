import { Model } from '@react3l/react3l/core';
import { Moment } from 'moment';
import { Currency } from 'models/Currency';
import { Item } from 'models/Item';
import { PurchaseRequest } from 'models/PurchaseRequest';
import { TaxType } from 'models/TaxType';
import { UnitOfMeasure } from 'models/UnitOfMeasure';

export class PurchaseRequestContent extends Model
{
    public id?: number;

    public purchaseRequestId?: number;

    public itemId?: number;

    public description?: string;

    public unitOfMeasureId?: number;

    public quantity?: number;

    public mainCurrencyId?: number;

    public unitPrice?: number;

    public taxTypeId?: number;

    public taxAmount?: number;

    public subTotal?: number;

    public total?: number;

    public note?: string;

    public exchangeCurrencyId?: number;

    public exchangeRate?: number;

    public exchangedAt?: Moment;

    public exchangedUnitPrice?: number;

    public exchangedSubTotal?: number;

    public exchangedTaxAmount?: number;

    public exchangedTotal?: number;

    public otherRequest?: string;




    public rowId?: string;

    public used?: boolean;


    public exchangeCurrency?: Currency;

    public item?: Item;

    public mainCurrency?: Currency;

    public purchaseRequest?: PurchaseRequest;

    public taxType?: TaxType;

    public unitOfMeasure?: UnitOfMeasure;
}
