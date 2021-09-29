import { IdFilter  } from '@react3l/advanced-filters';
import { NumberFilter  } from '@react3l/advanced-filters';
import { GuidFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class ProjectBudgetEntryFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public projectBudgetId?: IdFilter = new IdFilter();
  public monthId?: IdFilter = new IdFilter();
  public inPeriod?: NumberFilter = new NumberFilter();
  public accumulated?: NumberFilter = new NumberFilter();
  public rowId?: GuidFilter = new GuidFilter();
}
