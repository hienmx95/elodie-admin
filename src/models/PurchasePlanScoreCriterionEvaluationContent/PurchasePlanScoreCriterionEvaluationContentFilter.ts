import { StringFilter  } from '@react3l/advanced-filters';
import { IdFilter  } from '@react3l/advanced-filters';
import { NumberFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class PurchasePlanScoreCriterionEvaluationContentFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public purchasePlanScoreCriterionEvaluationId?: IdFilter = new IdFilter();
  public criterionId?: IdFilter = new IdFilter();
  public score?: NumberFilter = new NumberFilter();
  public reason?: StringFilter = new StringFilter();
}
