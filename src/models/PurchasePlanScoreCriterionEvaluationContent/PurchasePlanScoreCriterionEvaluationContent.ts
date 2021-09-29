import { Model } from '@react3l/react3l/core';
import { Criterion } from 'models/Criterion';
import { PurchasePlanScoreCriterionEvaluation } from 'models/PurchasePlanScoreCriterionEvaluation';

export class PurchasePlanScoreCriterionEvaluationContent extends Model
{
    public id?: number;

    public purchasePlanScoreCriterionEvaluationId?: number;

    public criterionId?: number;

    public score?: number;

    public reason?: string;


    public criterion?: Criterion;

    public purchasePlanScoreCriterionEvaluation?: PurchasePlanScoreCriterionEvaluation;
}
