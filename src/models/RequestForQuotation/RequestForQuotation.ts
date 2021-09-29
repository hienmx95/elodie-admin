import { Model } from '@react3l/react3l/core';
import { AppUser } from 'models/AppUser';
import { Organization } from 'models/Organization';
import { RequestForQuotationContent } from 'models/RequestForQuotationContent';
import { RequestForQuotationFileMapping } from 'models/RequestForQuotationFileMapping';
import { RequestForQuotationSupplierMapping } from 'models/RequestForQuotationSupplierMapping';
import { Status } from 'models/Status';
import { Moment } from 'moment';

export class RequestForQuotation extends Model
{
    public id?: number;

    public code?: string;

    public description?: string;

    public quotationExpectedAt?: Moment;

    public requestorId?: number;

    public requestDepartmentName?: string;

    public requestOrganizationId?: number;

    public recipientAddress?: string;

    public statusId?: number;

    public sendToPRC?: boolean;

    public buyerId?: number;

    public note?: string;




    public used?: boolean;

    public rowId?: string;


    public buyer?: AppUser;

    public requestOrganization?: Organization;

    public requestor?: AppUser;

    public status?: Status;


    public requestForQuotationContents?: RequestForQuotationContent[];

    public requestForQuotationFileMappings?: RequestForQuotationFileMapping[];

    public requestForQuotationSupplierMappings?: RequestForQuotationSupplierMapping[];
}
