import { Model } from '@react3l/react3l/core';
import { CustomerSalesOrder } from 'models/CustomerSalesOrder';
import { EditedPriceStatus } from 'models/EditedPriceStatus';
import { UnitOfMeasure } from 'models/UnitOfMeasure';
import { TaxType } from 'models/TaxType';

export class CustomerSalesOrderContent extends Model
{
    public id?: number;

    public customerSalesOrderId?: number;

    public itemId?: number;

    public unitOfMeasureId?: number;

    public quantity?: number;

    public requestedQuantity?: number;

    public primaryUnitOfMeasureId?: number;

    public salePrice?: number;

    public primaryPrice?: number;

    public discountPercentage?: number;

    public discountAmount?: number;

    public generalDiscountPercentage?: number;

    public generalDiscountAmount?: number;

    public taxPercentage?: number;

    public taxAmount?: number;

    public taxPercentageOther?: number;

    public taxAmountOther?: number;

    public amount?: number;

    public factor?: number;

    public editedPriceStatusId?: number;

    public taxTypeId?: number;


    public customerSalesOrder?: CustomerSalesOrder;

    public editedPriceStatus?: EditedPriceStatus;

    public primaryUnitOfMeasure?: UnitOfMeasure;

    public taxType?: TaxType;

    public unitOfMeasure?: UnitOfMeasure;
}
