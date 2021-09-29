import { Model } from '@react3l/react3l/core';
import { Moment } from 'moment';
import { PurchasePlan } from 'models/PurchasePlan';
import { Supplier } from 'models/Supplier';
import { PurchasePlanRequestForTenderClarificationFileMapping } from 'models/PurchasePlanRequestForTenderClarificationFileMapping';
import { File } from 'models/File';

export class PurchasePlanRequestForTenderClarification extends Model
{
    public id?: number;

    public purchasePlanId?: number;

    public supplierId?: number;

    public tenderSubmittingDeadlineAt?: Moment;

    public description?: string;




    public rowId?: string;

    public used?: boolean;


    public purchasePlan?: PurchasePlan;

    public supplier?: Supplier;

    public purchasePlanRequestForTenderClarificationFileMappings?: PurchasePlanRequestForTenderClarificationFileMapping[];
}
