import { StringFilter  } from '@react3l/advanced-filters';
import { IdFilter  } from '@react3l/advanced-filters';
import { GuidFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class SupplierUserFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public username?: StringFilter = new StringFilter();
  public displayName?: StringFilter = new StringFilter();
  public description?: StringFilter = new StringFilter();
  public password?: StringFilter = new StringFilter();
  public supplierId?: IdFilter = new IdFilter();
  public statusId?: IdFilter = new IdFilter();
  public rowId?: GuidFilter = new GuidFilter();
}
