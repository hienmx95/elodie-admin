import { StringFilter } from '@react3l/advanced-filters';
import { IdFilter } from '@react3l/advanced-filters';
import { DateFilter } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class TradeConditionFilter extends ModelFilter {
  public id?: IdFilter = new IdFilter();
  public code?: StringFilter = new StringFilter();
  public name?: StringFilter = new StringFilter();
  public description?: StringFilter = new StringFilter();
  public statusId?: IdFilter = new IdFilter();
  public tradeConditionTypeId?: IdFilter = new IdFilter();
  public date?: DateFilter = new DateFilter();
  public search?: string;
}
