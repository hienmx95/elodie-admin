import { IdFilter  } from '@react3l/advanced-filters';
import { NumberFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class PurchasePlanCriterionScoreFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public purchasePlanId?: IdFilter = new IdFilter();
  public criterionId?: IdFilter = new IdFilter();
  public criterionTypeId?: IdFilter = new IdFilter();
  public supplierId?: IdFilter = new IdFilter();
  public score?: NumberFilter = new NumberFilter();
  public appUserId?: IdFilter = new IdFilter();
}
