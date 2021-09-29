import { Model } from '@react3l/react3l/core';
import { Category } from 'models/Category';
import { Currency } from 'models/Currency';
import { Item } from 'models/Item';
import { PurchaseOrder } from 'models/PurchaseOrder';
import { TaxType } from 'models/TaxType';
import { UnitOfMeasure } from 'models/UnitOfMeasure';

export class PurchaseOrderContent extends Model
{
    public id?: number;

    public purchaseOrderId?: number;

    public description?: string;

    public isReceiveAll?: boolean;

    public categoryId?: number;

    public itemId?: number;

    public unitOfMeasureId?: number;

    public unitPrice?: number;

    public quantity?: number;

    public price?: number;

    public taxTypeId?: number;

    public taxAmount?: number;

    public total?: number;

    public mainCurrencyId?: number;

    public exchangeCurrencyId?: number;

    public exchangeRate?: number;

    public exchangedPrice?: number;

    public exchangedTaxAmount?: number;

    public exchangedTotal?: number;


    public category?: Category;

    public exchangeCurrency?: Currency;

    public item?: Item;

    public mainCurrency?: Currency;

    public purchaseOrder?: PurchaseOrder;

    public taxType?: TaxType;

    public unitOfMeasure?: UnitOfMeasure;
}
