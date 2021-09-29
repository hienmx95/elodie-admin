import { StringFilter  } from '@react3l/advanced-filters';
import { IdFilter  } from '@react3l/advanced-filters';
import { NumberFilter  } from '@react3l/advanced-filters';
import { GuidFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class ProjectFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public code?: StringFilter = new StringFilter();
  public name?: StringFilter = new StringFilter();
  public organizationId?: IdFilter = new IdFilter();
  public currencyId?: IdFilter = new IdFilter();
  public exchangeRate?: NumberFilter = new NumberFilter();
  public level?: NumberFilter = new NumberFilter();
  public parentId?: IdFilter = new IdFilter();
  public path?: StringFilter = new StringFilter();
  public startMonthId?: IdFilter = new IdFilter();
  public endMonthId?: IdFilter = new IdFilter();
  public rowId?: GuidFilter = new GuidFilter();
}
