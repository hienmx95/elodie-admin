import { IdFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class ActionPageMappingFilter extends ModelFilter  {
  public actionId?: IdFilter = new IdFilter();
  public pageId?: IdFilter = new IdFilter();
}
