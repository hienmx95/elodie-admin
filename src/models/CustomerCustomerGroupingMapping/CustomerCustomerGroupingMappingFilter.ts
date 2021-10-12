import { IdFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class CustomerCustomerGroupingMappingFilter extends ModelFilter  {
  public customerId?: IdFilter = new IdFilter();
  public customerGroupingId?: IdFilter = new IdFilter();
}
