import { StringFilter  } from '@react3l/advanced-filters';
import { IdFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class PurchasePlanReviewerMappingFilter extends ModelFilter  {
  public purchasePlanId?: IdFilter = new IdFilter();
  public reviewerId?: IdFilter = new IdFilter();
  public reviewerRole?: StringFilter = new StringFilter();
}
