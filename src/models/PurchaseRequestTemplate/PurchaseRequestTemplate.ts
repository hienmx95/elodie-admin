import { Model } from '@react3l/react3l/core';
import { PurchaseRequest } from 'models/PurchaseRequest';

export class PurchaseRequestTemplate extends Model {
    public id?: number;
    public name?: string;
    public content?: PurchaseRequest;
}
