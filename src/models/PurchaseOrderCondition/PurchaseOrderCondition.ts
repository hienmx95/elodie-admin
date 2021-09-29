import { Model } from '@react3l/react3l/core';
import { PurchaseOrder } from 'models/PurchaseOrder';

export class PurchaseOrderCondition extends Model
{
    public id?: number;

    public purchaseOrderId?: number;

    public code?: string;

    public description?: string;




    public rowId?: string;

    public used?: boolean;


    public purchaseOrder?: PurchaseOrder;
}
