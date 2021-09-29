import { StringFilter  } from '@react3l/advanced-filters';
import { IdFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class PurchasePlanMailFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public purchasePlanId?: IdFilter = new IdFilter();
  public subject?: StringFilter = new StringFilter();
  public body?: StringFilter = new StringFilter();
}
