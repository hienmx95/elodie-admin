import { StringFilter  } from '@react3l/advanced-filters';
import { IdFilter  } from '@react3l/advanced-filters';
import { NumberFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class CustomerSalesOrderPaymentHistoryFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public customerSalesOrderId?: IdFilter = new IdFilter();
  public paymentMilestone?: StringFilter = new StringFilter();
  public paymentPercentage?: NumberFilter = new NumberFilter();
  public paymentAmount?: NumberFilter = new NumberFilter();
  public paymentTypeId?: IdFilter = new IdFilter();
  public description?: StringFilter = new StringFilter();
}
