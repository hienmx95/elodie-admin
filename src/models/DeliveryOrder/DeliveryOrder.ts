import { Model } from '@react3l/react3l/core';
import { Moment } from 'moment';
import { AppUser } from 'models/AppUser';
import { PurchaseOrder } from 'models/PurchaseOrder';
import { Organization } from 'models/Organization';
import { Status } from 'models/Status';

export class DeliveryOrder extends Model
{
    public id?: number;

    public receiveCode?: string;

    public receiveNumber?: number;

    public description?: string;

    public purchaseOrderId?: number;

    public recipientAddress?: string;

    public recipientPhoneNumber?: string;

    public receiveOrganizationId?: number;

    public receivedAt?: Moment;

    public isEnough?: boolean;

    public isReturn?: boolean;




    public creatorId?: number;

    public statusId?: number;


    public creator?: AppUser;

    public purchaseOrder?: PurchaseOrder;

    public receiveOrganization?: Organization;

    public status?: Status;


}
