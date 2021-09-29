import { Model } from '@react3l/react3l/core';
import { PurchaseRequestPrincipalContract } from 'models/PurchaseRequestPrincipalContract';

export class PurchaseRequestPrincipalContractTemplate extends Model {
    public id?: number;
    public name?: string;
    public content?: PurchaseRequestPrincipalContract;
}
