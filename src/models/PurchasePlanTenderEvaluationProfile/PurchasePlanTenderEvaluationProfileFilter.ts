import { IdFilter  } from '@react3l/advanced-filters';
import { NumberFilter  } from '@react3l/advanced-filters';
import { DateFilter  } from '@react3l/advanced-filters';
import { GuidFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class PurchasePlanTenderEvaluationProfileFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public purchasePlanId?: IdFilter = new IdFilter();
  public passedPercentageThreshold?: NumberFilter = new NumberFilter();
  public tenderEvaluationStartedAt?: DateFilter = new DateFilter();
  public passCriterionEvaluationDeadlineAt?: DateFilter = new DateFilter();
  public scoreCriterionEvaluationDeadlineAt?: DateFilter = new DateFilter();
  public rowId?: GuidFilter = new GuidFilter();
}
