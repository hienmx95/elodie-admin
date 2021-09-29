import { IdFilter  } from '@react3l/advanced-filters';
import { NumberFilter  } from '@react3l/advanced-filters';
import { DateFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class DateKeyFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public year?: NumberFilter = new NumberFilter();
  public month?: NumberFilter = new NumberFilter();
  public day?: NumberFilter = new NumberFilter();
  public date?: DateFilter = new DateFilter();
}
