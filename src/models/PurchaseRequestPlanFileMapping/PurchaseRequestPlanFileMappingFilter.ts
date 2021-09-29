import { IdFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class PurchaseRequestPlanFileMappingFilter extends ModelFilter  {
  public purchaseRequestPlanId?: IdFilter = new IdFilter();
  public fileId?: IdFilter = new IdFilter();
}
