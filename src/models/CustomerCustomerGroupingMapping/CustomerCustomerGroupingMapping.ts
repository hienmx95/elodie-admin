import { Model } from '@react3l/react3l/core';
import { Customer } from 'models/Customer';
import { CustomerGrouping } from 'models/CustomerGrouping';

export class CustomerCustomerGroupingMapping extends Model
{
    public customerId?: number;

    public customerGroupingId?: number;


    public customer?: Customer;

    public customerGrouping?: CustomerGrouping;
}
