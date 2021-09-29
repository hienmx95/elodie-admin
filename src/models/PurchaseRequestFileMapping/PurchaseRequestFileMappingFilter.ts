import { IdFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class PurchaseRequestFileMappingFilter extends ModelFilter  {
  public purchaseRequestId?: IdFilter = new IdFilter();
  public fileId?: IdFilter = new IdFilter();
}
