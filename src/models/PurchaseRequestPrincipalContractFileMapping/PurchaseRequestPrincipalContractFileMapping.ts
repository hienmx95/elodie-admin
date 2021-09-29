import { Model } from '@react3l/react3l/core';
import { File } from 'models/File';
import { PurchaseRequestPrincipalContract } from '../PurchaseRequestPrincipalContract/PurchaseRequestPrincipalContract';

export class PurchaseRequestPrincipalContractFileMapping extends Model
{
    public purchaseRequestId?: number;

    public fileId?: number;

    public file?: File;

    public purchaseRequestPrincipalContract?: PurchaseRequestPrincipalContract;
}
