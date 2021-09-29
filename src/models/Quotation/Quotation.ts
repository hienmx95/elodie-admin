import { Model } from '@react3l/react3l/core';
import { PurchasePlan } from 'models/PurchasePlan';
import { QuotationCondition } from 'models/QuotationCondition';
import { QuotationContent } from 'models/QuotationContent';
import { QuotationHistory } from 'models/QuotationHistory';
import { RequestForQuotation } from 'models/RequestForQuotation';
import { Status } from 'models/Status';
import { Supplier } from 'models/Supplier';
import { SupplierUser } from 'models/SupplierUser';
import { Moment } from 'moment';

export class Quotation extends Model
{
    public id?: number;

    public requestForQuotationId?: number;

    public purchasePlanId?: number;

    public senderId?: number;

    public senderName?: string;

    public senderEmail?: string;

    public senderPhoneNumber?: string;

    public sentAt?: Moment;

    public supplierId?: number;

    public supplierTaxCode?: string;

    public supplierAddress?: string;

    public supplierPhone?: string;

    public statusId?: number;

    public expiredAt?: Moment;

    public mainCurrencyId?: number;

    public subTotal?: number;

    public discountAmount?: number;

    public total?: number;




    public used?: boolean;

    public rowId?: string;


    public purchasePlan?: PurchasePlan;

    public requestForQuotation?: RequestForQuotation;

    public sender?: SupplierUser;

    public status?: Status;

    public supplier?: Supplier;

    public quotationConditions?: QuotationCondition[];

    public quotationContents?: QuotationContent[];

    public quotationHistories?: QuotationHistory[];
}
