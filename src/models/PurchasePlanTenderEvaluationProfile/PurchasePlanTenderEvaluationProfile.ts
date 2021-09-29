import { Model } from '@react3l/react3l/core';
import { Moment } from 'moment';
import { PurchasePlan } from 'models/PurchasePlan';

export class PurchasePlanTenderEvaluationProfile extends Model
{
    public id?: number;

    public purchasePlanId?: number;

    public passedPercentageThreshold?: number;

    public tenderEvaluationStartedAt?: Moment;

    public passCriterionEvaluationDeadlineAt?: Moment;

    public scoreCriterionEvaluationDeadlineAt?: Moment;




    public rowId?: string;

    public used?: boolean;


    public purchasePlan?: PurchasePlan;
}
