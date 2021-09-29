import { Model } from '@react3l/react3l/core';
import { Criterion } from 'models/Criterion';
import { PurchasePlan } from 'models/PurchasePlan';

export class PurchasePlanPassCriterionMapping extends Model
{
    public purchasePlanId?: number;

    public criterionId?: number;


    public criterion?: Criterion;

    public purchasePlan?: PurchasePlan;
}
