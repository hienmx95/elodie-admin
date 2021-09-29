import { Model } from '@react3l/react3l/core';
import { File } from 'models/File';
import { PurchaseRequestPlan } from 'models/PurchaseRequestPlan';

export class PurchaseRequestPlanFileMapping extends Model
{
    public purchaseRequestPlanId?: number;

    public fileId?: number;


    public file?: File;

    public purchaseRequestPlan?: PurchaseRequestPlan;
}
