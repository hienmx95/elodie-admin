import { Model } from '@react3l/react3l/core';
import { PurchasePlan } from 'models/PurchasePlan';
import { Supplier } from 'models/Supplier';

export class PurchasePlanSupplierMapping extends Model
{
    public purchasePlanId?: number;

    public supplierId?: number;

    public hasPassedRoundOne?: boolean;


    public purchasePlan?: PurchasePlan;

    public supplier?: Supplier;
}
