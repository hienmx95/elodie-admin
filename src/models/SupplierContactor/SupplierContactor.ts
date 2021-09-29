import { Model } from '@react3l/react3l/core';
import { Supplier } from 'models/Supplier';

export class SupplierContactor extends Model
{
    public id?: number;

    public supplierId?: number;

    public name?: string;

    public phone?: string;

    public email?: string;




    public used?: boolean;

    public rowId?: string;


    public supplier?: Supplier;
}
