import { Model } from '@react3l/react3l/core';
import { CustomerSalesOrder } from 'models/CustomerSalesOrder';
import { PaymentType } from 'models/PaymentType';

export class CustomerSalesOrderPaymentHistory extends Model
{
    public id?: number;

    public customerSalesOrderId?: number;

    public paymentMilestone?: string;

    public paymentPercentage?: number;

    public paymentAmount?: number;

    public paymentTypeId?: number;

    public description?: string;

    public isPaid?: boolean;





    public customerSalesOrder?: CustomerSalesOrder;

    public paymentType?: PaymentType;
}
