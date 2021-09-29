import { Model } from '@react3l/react3l/core';
import { Category } from 'models/Category';
import { Item } from 'models/Item';
import { RequestForQuotation } from 'models/RequestForQuotation';
import { UnitOfMeasure } from 'models/UnitOfMeasure';

export class RequestForQuotationContent extends Model
{
    public id?: number;

    public description?: string;

    public requestForQuotationId?: number;

    public categoryId?: number;

    public itemId?: number;

    public unitOfMeasureId?: number;

    public quantity?: number;

    public note?: string;

    public noteForSupplier?: string;




    public rowId?: string;


    public category?: Category;

    public item?: Item;

    public requestForQuotation?: RequestForQuotation;

    public unitOfMeasure?: UnitOfMeasure;

}
