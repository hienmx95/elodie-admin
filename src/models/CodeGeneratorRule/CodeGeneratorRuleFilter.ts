import { IdFilter  } from '@react3l/advanced-filters';
import { NumberFilter  } from '@react3l/advanced-filters';
import { GuidFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class CodeGeneratorRuleFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public entityTypeId?: IdFilter = new IdFilter();
  public autoNumberLenth?: NumberFilter = new NumberFilter();
  public statusId?: IdFilter = new IdFilter();
  public rowId?: GuidFilter = new GuidFilter();
}
