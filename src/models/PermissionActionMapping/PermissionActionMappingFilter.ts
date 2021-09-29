import { IdFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class PermissionActionMappingFilter extends ModelFilter  {
  public actionId?: IdFilter = new IdFilter();
  public permissionId?: IdFilter = new IdFilter();
}
