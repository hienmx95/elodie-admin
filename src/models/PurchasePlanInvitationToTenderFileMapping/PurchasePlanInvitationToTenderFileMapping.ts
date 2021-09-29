import { Model } from '@react3l/react3l/core';
import { File } from 'models/File';
import { PurchasePlanInvitationToTender } from 'models/PurchasePlanInvitationToTender';

export class PurchasePlanInvitationToTenderFileMapping extends Model
{
    public purchasePlanInvitationToTenderId?: number;

    public fileId?: number;


    public file?: File;

    public purchasePlanInvitationToTender?: PurchasePlanInvitationToTender;
}
