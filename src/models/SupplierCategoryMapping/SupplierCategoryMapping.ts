import { Model } from '@react3l/react3l/core';
import { Supplier } from 'models/Supplier';
import { Category } from 'models/Category';

export class SupplierCategoryMapping extends Model {
    public supplierId?: number;

    public categoryId?: number;


    public supplier?: Supplier;

    public category?: Category;
}
