import { Model } from '@react3l/react3l/core';
import { Item } from 'models/Item';
import { DeliveryOrder } from 'models/DeliveryOrder';

export class DeliveryOrderContent extends Model
{
    public id?: number;

    public purchaseOrderReceiveId?: number;

    public itemId?: number;

    public description?: string;

    public unitOfMeasureId?: number;

    public receivedQuantity?: number;


    public item?: Item;

    public purchaseOrderReceive?: DeliveryOrder;
}
