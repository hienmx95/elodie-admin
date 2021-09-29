import { IdFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class PurchasePlanTradeConditionMappingFilter extends ModelFilter  {
  public purchasePlanId?: IdFilter = new IdFilter();
  public tradeConditionId?: IdFilter = new IdFilter();
}
