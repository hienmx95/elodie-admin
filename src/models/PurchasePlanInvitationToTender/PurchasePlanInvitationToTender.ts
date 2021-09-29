import { Model } from '@react3l/react3l/core';
import { Moment } from 'moment';
import { AppUser } from 'models/AppUser';
import { PurchasePlan } from 'models/PurchasePlan';
import { PurchasePlanInvitationToTenderFileMapping } from 'models/PurchasePlanInvitationToTenderFileMapping';
import { File } from 'models/File';

export class PurchasePlanInvitationToTender extends Model
{
    public id?: number;

    public purchasePlanId?: number;

    public tenderJoiningDeadlineAt?: Moment;

    public documentSubmitingDeadlineAt?: Moment;

    public contactorId?: number;

    public phone?: string;

    public tenderRequirements?: string;

    public tenderFormat?: string;




    public rowId?: string;

    public used?: boolean;


    public contactor?: AppUser;

    public purchasePlan?: PurchasePlan;

    public purchasePlanInvitationToTenderFileMappings?: PurchasePlanInvitationToTenderFileMapping[];
}
