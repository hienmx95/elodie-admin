import { Model } from '@react3l/react3l/core';
import { Moment } from 'moment';
import { PurchasePlan } from 'models/PurchasePlan';

export class PurchasePlanTenderingPlan extends Model
{
    public id?: number;

    public purchasePlanId?: number;

    public name?: string;

    public supplierSelectionMethod?: string;

    public tenderStartedAt?: Moment;

    public tenderEndedAt?: Moment;




    public rowId?: string;

    public used?: boolean;


    public purchasePlan?: PurchasePlan;
}
