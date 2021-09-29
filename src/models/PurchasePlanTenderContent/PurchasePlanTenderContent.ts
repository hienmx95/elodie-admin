import { Model } from '@react3l/react3l/core';
import { File } from 'models/File';
import { PurchasePlanTender } from 'models/PurchasePlanTender';
import { PurchasePlanTenderRequirement } from 'models/PurchasePlanTenderRequirement';

export class PurchasePlanTenderContent extends Model
{
    public id?: number;

    public purchasePlanTenderId?: number;

    public purchasePlanTenderRequirementId?: number;

    public fileId?: number;




    public rowId?: string;

    public used?: boolean;


    public file?: File;

    public purchasePlanTender?: PurchasePlanTender;

    public purchasePlanTenderRequirement?: PurchasePlanTenderRequirement;
}
