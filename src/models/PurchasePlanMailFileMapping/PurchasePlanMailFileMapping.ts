import { Model } from '@react3l/react3l/core';
import { File } from 'models/File';
import { PurchasePlanMail } from 'models/PurchasePlanMail';

export class PurchasePlanMailFileMapping extends Model
{
    public purchasePlanMailId?: number;

    public fileId?: number;


    public file?: File;

    public purchasePlanMail?: PurchasePlanMail;
}
