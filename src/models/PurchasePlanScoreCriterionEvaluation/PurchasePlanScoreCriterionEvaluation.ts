import { Model } from '@react3l/react3l/core';
import { PurchasePlan } from 'models/PurchasePlan';
import { AppUser } from 'models/AppUser';
import { Supplier } from 'models/Supplier';
import { PurchasePlanScoreCriterionEvaluationContent } from 'models/PurchasePlanScoreCriterionEvaluationContent';
import { Criterion } from 'models/Criterion';

export class PurchasePlanScoreCriterionEvaluation extends Model
{
    public id?: number;

    public purchasePlanId?: number;

    public reviewerId?: number;

    public supplierId?: number;




    public used?: boolean;

    public rowId?: string;


    public purchasePlan?: PurchasePlan;

    public reviewer?: AppUser;

    public supplier?: Supplier;

    public purchasePlanScoreCriterionEvaluationContents?: PurchasePlanScoreCriterionEvaluationContent[];
}
