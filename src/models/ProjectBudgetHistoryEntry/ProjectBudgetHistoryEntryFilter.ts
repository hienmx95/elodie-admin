import { IdFilter  } from '@react3l/advanced-filters';
import { NumberFilter  } from '@react3l/advanced-filters';
import { GuidFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class ProjectBudgetHistoryEntryFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public projectBudgetHistoryId?: IdFilter = new IdFilter();
  public monthId?: IdFilter = new IdFilter();
  public amount?: NumberFilter = new NumberFilter();
  public rowId?: GuidFilter = new GuidFilter();
}
