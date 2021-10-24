import { Model } from "@react3l/react3l/core";
import { CustomerSalesOrder } from "models/CustomerSalesOrder/CustomerSalesOrder";
import { Item } from "models/Item";
import { UnitOfMeasure } from "models/UnitOfMeasure";


export class CustomerSalesOrderPromotion extends Model 
{
    public id?: number;
    
    public customerSalesOrderId?: number;
    
    public itemId?: number;
    
    public unitOfMeasureId?: number;
    
    public quantity?: number;
    
    public requestedQuantity?: number;
    public salePrice?: number;
    public primaryPrice?: number;
    
    public primaryUnitOfMeasureId?: number;
    
    public factor?: number;
    
    public note?: string;
    
    
    public customerSalesOrder?: CustomerSalesOrder;
    
    public item?: Item;
    
    public primaryUnitOfMeasure?: UnitOfMeasure;
    
    public unitOfMeasure?: UnitOfMeasure;
}
