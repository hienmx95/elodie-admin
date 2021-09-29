import { Model } from '@react3l/react3l/core';
import { Category } from 'models/Category';
import { Currency } from 'models/Currency';
import { PurchaseRequestPlan } from 'models/PurchaseRequestPlan';

export class PurchaseRequestPlanContent extends Model
{
    public id?: number;

    public purchaseRequestPlanId?: number;

    public categoryId?: number;

    public mainCurrencyId?: number;

    public quota?: number;




    public rowId?: string;

    public used?: boolean;


    public category?: Category;

    public mainCurrency?: Currency;

    public purchaseRequestPlan?: PurchaseRequestPlan;
}
