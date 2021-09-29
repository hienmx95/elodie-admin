import { IdFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class PurchasePlanPassCriterionEvaluationContentFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public purchasePlanPassCriterionEvaluationId?: IdFilter = new IdFilter();
  public criterionId?: IdFilter = new IdFilter();
  public fileId?: IdFilter = new IdFilter();
}
