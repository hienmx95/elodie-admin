import { Model } from '@react3l/react3l/core';
import { Criterion } from 'models/Criterion';
import { PurchasePlan } from 'models/PurchasePlan';

export class PurchasePlanCriterionMapping extends Model
{
    public purchasePlanId?: number;

    public criterionId?: number;

    public weight?: number;


    public criterion?: Criterion;

    public purchasePlan?: PurchasePlan;
}
