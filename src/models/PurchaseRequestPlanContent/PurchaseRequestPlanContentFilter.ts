import { IdFilter  } from '@react3l/advanced-filters';
import { NumberFilter  } from '@react3l/advanced-filters';
import { GuidFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class PurchaseRequestPlanContentFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public purchaseRequestPlanId?: IdFilter = new IdFilter();
  public categoryId?: IdFilter = new IdFilter();
  public mainCurrencyId?: IdFilter = new IdFilter();
  public quota?: NumberFilter = new NumberFilter();
  public rowId?: GuidFilter = new GuidFilter();
}
