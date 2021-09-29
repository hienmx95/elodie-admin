import { Model } from '@react3l/react3l/core';
import { Criterion } from 'models/Criterion';
import { Point } from 'models/Point';
import { DeliveryOrder } from 'models/DeliveryOrder';
import { Image } from 'models/Image';
import { Supplier } from 'models/Supplier';

export class DeliveryOrderSupplierPoint extends Model
{
    public id?: number;

    public purchaseOrderReceiveId?: number;

    public description?: string;

    public supplierId?: number;

    public criterionId?: number;

    public pointId?: number;

    public review?: string;

    public reviewImageId?: number;




    public creatorId?: number;

    public used?: boolean;


    public criterion?: Criterion;

    public point?: Point;

    public purchaseOrderReceive?: DeliveryOrder;

    public reviewImage?: Image;

    public supplier?: Supplier;
}
