import { Model } from '@react3l/react3l/core';
import { PurchasePlan } from 'models/PurchasePlan';
import { AppUser } from 'models/AppUser';
import { Supplier } from 'models/Supplier';
import { PurchasePlanPassCriterionEvaluationContent } from 'models/PurchasePlanPassCriterionEvaluationContent';
import { Criterion } from 'models/Criterion';
import { File } from 'models/File';

export class PurchasePlanPassCriterionEvaluation extends Model
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

    public purchasePlanPassCriterionEvaluationContents?: PurchasePlanPassCriterionEvaluationContent[];
}
