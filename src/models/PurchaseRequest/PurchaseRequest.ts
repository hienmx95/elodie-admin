import { Model } from '@react3l/react3l/core';
import { Moment } from 'moment';
import { Category } from 'models/Category';
import { Currency } from 'models/Currency';
import { PrincipalContract } from 'models/PrincipalContract';
import { AppUser } from 'models/AppUser';
import { PurchaseRequestType } from 'models/PurchaseRequestType';
import { Organization } from 'models/Organization';
import { Status } from 'models/Status';
import { PurchaseRequestContent } from 'models/PurchaseRequestContent';
import { PurchaseRequestFileMapping } from 'models/PurchaseRequestFileMapping';

export class PurchaseRequest extends Model
{
    public id?: number;

    public code?: string;

    public description?: string;

    public purchaseRequestTypeId?: number;

    public categoryId?: number;

    public principalContractId?: number;

    public principalContractManagerId?: number;

    public statusId?: number;

    public requestOrganizationId?: number;

    public requestDepartmentName?: string;

    public requestorId?: number;

    public recipientId?: number;

    public recipientAddress?: string;

    public recipientPhoneNumber?: string;

    public requestedAt?: Moment;

    public expectedAt?: Moment;

    public note?: string;

    public mainCurrencyId?: number;

    public total?: number;




    public used?: boolean;

    public rowId?: string;


    public category?: Category;

    public mainCurrency?: Currency;

    public principalContract?: PrincipalContract;

    public principalContractManager?: AppUser;

    public purchaseRequestType?: PurchaseRequestType;

    public recipient?: AppUser;

    public requestOrganization?: Organization;

    public requestor?: AppUser;

    public status?: Status;



    public purchaseRequestContents?: PurchaseRequestContent[];

    public purchaseRequestFileMappings?: PurchaseRequestFileMapping[];
}
