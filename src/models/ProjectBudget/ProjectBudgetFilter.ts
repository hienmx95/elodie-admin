import { IdFilter  } from '@react3l/advanced-filters';
import { GuidFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class ProjectBudgetFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public projectId?: IdFilter = new IdFilter();
  public masterBudgetId?: IdFilter = new IdFilter();
  public rowId?: GuidFilter = new GuidFilter();
}
