import { Model } from '@react3l/react3l/core';
import { ProductProductGroupingMapping } from 'models/ProductProductGroupingMapping';

export class ProductGrouping extends Model
{
    public id?: number;
    public code?: string;

    public name?: string;

    public description?: string;

    public parentId?: number;

    public path?: string;

    public level?: number;
    public rowId?: string;
    public parent?: ProductGrouping;
    public productProductGroupingMappings?: ProductProductGroupingMapping[] ;
}
