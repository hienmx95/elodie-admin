import { Model } from '@react3l/react3l/core';
import { File } from 'models/File';
import { PurchaseRequest } from 'models/PurchaseRequest';

export class PurchaseRequestFileMapping extends Model
{
    public purchaseRequestId?: number;

    public fileId?: number;


    public file?: File;

    public purchaseRequest?: PurchaseRequest;
}
