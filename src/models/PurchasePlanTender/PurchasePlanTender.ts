import { Model } from '@react3l/react3l/core';
import { Moment } from 'moment';
import { AppUser } from 'models/AppUser';
import { PurchasePlan } from 'models/PurchasePlan';
import { Supplier } from 'models/Supplier';
import { PurchasePlanTenderContent } from 'models/PurchasePlanTenderContent';
import { File } from 'models/File';
import { PurchasePlanTenderRequirement } from 'models/PurchasePlanTenderRequirement';

export class PurchasePlanTender extends Model
{
    public id?: number;

    public purchasePlanId?: number;

    public supplierId?: number;

    public documentSubmittingDeadlineAt?: Moment;

    public contactorId?: number;

    public phone?: string;

    public tenderRequirements?: string;

    public tenderFormat?: string;

    public submittedAt?: Moment;

    public isQualified?: boolean;




    public rowId?: string;

    public used?: boolean;


    public contactor?: AppUser;

    public purchasePlan?: PurchasePlan;

    public supplier?: Supplier;

    public purchasePlanTenderContents?: PurchasePlanTenderContent[];
}
