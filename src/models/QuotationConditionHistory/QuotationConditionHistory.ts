import { Model } from '@react3l/react3l/core';
import { QuotationHistory } from 'models/QuotationHistory';

export class QuotationConditionHistory extends Model
{
    public id?: number;

    public quotationHistoryId?: number;

    public name?: string;

    public description?: string;




    public rowId?: string;

    public used?: boolean;


    public quotationHistory?: QuotationHistory;
}
