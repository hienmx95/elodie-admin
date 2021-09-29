import { IdFilter  } from '@react3l/advanced-filters';
import { NumberFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class PurchasePlanCriterionMappingFilter extends ModelFilter  {
  public purchasePlanId?: IdFilter = new IdFilter();
  public criterionId?: IdFilter = new IdFilter();
  public weight?: NumberFilter = new NumberFilter();
}
