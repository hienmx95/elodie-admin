import { Model } from '@react3l/react3l/core';
import { Moment } from 'moment';
import { Category } from 'models/Category';
import { Currency } from 'models/Currency';
import { Item } from 'models/Item';
import { TaxType } from 'models/TaxType';
import { UnitOfMeasure } from 'models/UnitOfMeasure';
import { PurchaseRequestPrincipalContract } from '../PurchaseRequestPrincipalContract';

export class PurchaseRequestPrincipalContractContent extends Model
{
    public id?: number;

    public purchaseRequestId?: number;

    public categoryId?: number;

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

    public exchangedTaxAmount?: number;

    public exchangedSubTotal?: number;

    public exchangedTotal?: number;

    public exchangedUnitPrice?: number;

    public otherRequest?: string;

    public rowId?: string;

    public used?: boolean;

    public category?: Category;

    public exchangeCurrency?: Currency;

    public item?: Item;

    public mainCurrency?: Currency;

    public purchaseRequestPrincipalContract?: PurchaseRequestPrincipalContract;

    public taxType?: TaxType;

    public unitOfMeasure?: UnitOfMeasure;

}
