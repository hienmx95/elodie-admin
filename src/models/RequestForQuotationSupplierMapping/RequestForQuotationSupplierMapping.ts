import { Model } from '@react3l/react3l/core';
import { RequestForQuotation } from 'models/RequestForQuotation';
import { Supplier } from 'models/Supplier';

export class RequestForQuotationSupplierMapping extends Model
{
    public requestForQuotationId?: number;

    public supplierId?: number;


    public requestForQuotation?: RequestForQuotation;

    public supplier?: Supplier;
}
