import { Model } from '@react3l/react3l/core';
import { Criterion } from 'models/Criterion';
import { CriterionType } from 'models/CriterionType';
import { PurchasePlan } from 'models/PurchasePlan';

export class PurchasePlanCriterionScore extends Model
{
    public id?: number;

    public purchasePlanId?: number;

    public criterionId?: number;

    public criterionTypeId?: number;

    public supplierId?: number;

    public score?: number;

    public appUserId?: number;


    public criterion?: Criterion;

    public criterionType?: CriterionType;

    public purchasePlan?: PurchasePlan;
}
