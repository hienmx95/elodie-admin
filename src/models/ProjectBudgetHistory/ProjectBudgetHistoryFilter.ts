import { StringFilter  } from '@react3l/advanced-filters';
import { IdFilter  } from '@react3l/advanced-filters';
import { NumberFilter  } from '@react3l/advanced-filters';
import { GuidFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class ProjectBudgetHistoryFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public projectBudgetId?: IdFilter = new IdFilter();
  public title?: StringFilter = new StringFilter();
  public type?: StringFilter = new StringFilter();
  public currencyId?: IdFilter = new IdFilter();
  public exchangeRate?: NumberFilter = new NumberFilter();
  public statusId?: IdFilter = new IdFilter();
  public rowId?: GuidFilter = new GuidFilter();
}
