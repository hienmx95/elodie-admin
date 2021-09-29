import { Model } from '@react3l/react3l/core';
import { Quotation } from 'models/Quotation';

export class QuotationCondition extends Model
{
    public id?: number;

    public quotationId?: number;

    public code?: string;

    public description?: string;




    public rowId?: string;

    public used?: boolean;


    public quotation?: Quotation;
}
