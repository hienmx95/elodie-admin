import { IdFilter  } from '@react3l/advanced-filters';
import { GuidFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class PurchasePlanPassCriterionEvaluationFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public purchasePlanId?: IdFilter = new IdFilter();
  public reviewerId?: IdFilter = new IdFilter();
  public supplierId?: IdFilter = new IdFilter();
  public rowId?: GuidFilter = new GuidFilter();
}
