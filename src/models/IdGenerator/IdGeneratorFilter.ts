import { IdFilter  } from '@react3l/advanced-filters';
import { NumberFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class IdGeneratorFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public idGeneratorTypeId?: IdFilter = new IdFilter();
  public counter?: NumberFilter = new NumberFilter();
}
