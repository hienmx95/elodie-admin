import { StringFilter  } from '@react3l/advanced-filters';
import { IdFilter  } from '@react3l/advanced-filters';
import { GuidFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class WarehouseFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public code?: StringFilter = new StringFilter();
  public description?: StringFilter = new StringFilter();
  public statusId?: IdFilter = new IdFilter();
  public organizationId?: IdFilter = new IdFilter();
  public address?: StringFilter = new StringFilter();
  public provinceId?: IdFilter = new IdFilter();
  public districtId?: IdFilter = new IdFilter();
  public wardId?: IdFilter = new IdFilter();
  public rowId?: GuidFilter = new GuidFilter();
}
