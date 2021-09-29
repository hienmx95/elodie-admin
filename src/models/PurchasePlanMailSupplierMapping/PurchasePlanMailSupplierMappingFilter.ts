import { IdFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class PurchasePlanMailSupplierMappingFilter extends ModelFilter  {
  public purchasePlanMailId?: IdFilter = new IdFilter();
  public supplierId?: IdFilter = new IdFilter();
}
