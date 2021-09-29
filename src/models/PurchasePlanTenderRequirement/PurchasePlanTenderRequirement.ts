import { Model } from '@react3l/react3l/core';
import { PurchasePlan } from 'models/PurchasePlan';

export class PurchasePlanTenderRequirement extends Model
{
    public id?: number;

    public purchasePlanId?: number;

    public name?: string;

    public isMandatory?: boolean;




    public rowId?: string;

    public used?: boolean;


    public purchasePlan?: PurchasePlan;

}
