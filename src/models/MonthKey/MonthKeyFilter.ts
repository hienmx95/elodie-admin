import { IdFilter  } from '@react3l/advanced-filters';
import { NumberFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class MonthKeyFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public year?: NumberFilter = new NumberFilter();
  public month?: NumberFilter = new NumberFilter();
}
