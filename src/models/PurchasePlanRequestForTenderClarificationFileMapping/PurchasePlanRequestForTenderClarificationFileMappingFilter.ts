import { IdFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class PurchasePlanRequestForTenderClarificationFileMappingFilter extends ModelFilter  {
  public requestForTenderClarificationId?: IdFilter = new IdFilter();
  public fileId?: IdFilter = new IdFilter();
}
