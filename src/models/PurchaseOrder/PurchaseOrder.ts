import { Model } from '@react3l/react3l/core';
import { AppUser } from 'models/AppUser';
import { Organization } from 'models/Organization';
import { Project } from 'models/Project';
import { ProjectBudget } from 'models/ProjectBudget';
import { PurchaseOrderCondition } from 'models/PurchaseOrderCondition';
import { PurchaseOrderContent } from 'models/PurchaseOrderContent';
import { PurchaseOrderType } from 'models/PurchaseOrderType';
import { PurchasePlan } from 'models/PurchasePlan';
import { PurchaseRequest } from 'models/PurchaseRequest';
import { Status } from 'models/Status';
import { Supplier } from 'models/Supplier';
import { Moment } from 'moment';

export class PurchaseOrder extends Model
{
    public id?: number;

    public description?: string;

    public pOCode?: string;

    public pONumber?: number;

    public statusId?: number;

    public creatorId?: number;

    public purchaseRequestId?: number;

    public purchasePlanId?: number;

    public purchaseOrderTypeId?: number;

    public purchaseOrganizationId?: number;

    public purchaserId?: number;

    public purchaserAddress?: string;

    public purchaserPhoneNumber?: string;

    public supplierId?: number;

    public supplierEmail?: string;

    public supplierPhoneNumber?: string;

    public receiveOrganizationId?: number;

    public recipientAddress?: string;

    public recipientPhoneNumber?: string;

    public recipientId?: number;

    public expectedAt?: Moment;

    public mainCurrencyId?: number;

    public subTotal?: number;

    public commission?: number;

    public generalDiscountPercentage?: number;

    public generalDiscountAmount?: number;

    public total?: number;

    public used?: boolean;




    public rowId?: string;

    public projectOrganizationId?: number;

    public projectId?: number;

    public projectBudgetId?: number;

    public expenseId?: number;


    public creator?: AppUser;

    public project?: Project;

    public projectBudget?: ProjectBudget;

    public projectOrganization?: Organization;

    public purchaseOrderType?: PurchaseOrderType;

    public purchaseOrganization?: Organization;

    public purchasePlan?: PurchasePlan;

    public purchaseRequest?: PurchaseRequest;

    public purchaser?: AppUser;

    public receiveOrganization?: Organization;

    public recipient?: AppUser;

    public status?: Status;

    public supplier?: Supplier;


    public purchaseOrderConditions?: PurchaseOrderCondition[];

    public purchaseOrderContents?: PurchaseOrderContent[];
}
