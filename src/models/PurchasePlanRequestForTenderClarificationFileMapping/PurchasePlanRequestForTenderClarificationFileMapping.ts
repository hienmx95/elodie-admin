import { Model } from '@react3l/react3l/core';
import { File } from 'models/File';
import { PurchasePlanRequestForTenderClarification } from 'models/PurchasePlanRequestForTenderClarification';

export class PurchasePlanRequestForTenderClarificationFileMapping extends Model
{
    public requestForTenderClarificationId?: number;

    public fileId?: number;


    public file?: File;

    public requestForTenderClarification?: PurchasePlanRequestForTenderClarification;
}
