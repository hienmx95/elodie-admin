import { Model } from '@react3l/react3l/core';
import { Criterion } from 'models/Criterion';
import { File } from 'models/File';
import { PurchasePlanPassCriterionEvaluation } from 'models/PurchasePlanPassCriterionEvaluation';

export class PurchasePlanPassCriterionEvaluationContent extends Model
{
    public id?: number;

    public purchasePlanPassCriterionEvaluationId?: number;

    public criterionId?: number;

    public isPassed?: boolean;

    public fileId?: number;


    public criterion?: Criterion;

    public file?: File;

    public purchasePlanPassCriterionEvaluation?: PurchasePlanPassCriterionEvaluation;
}
