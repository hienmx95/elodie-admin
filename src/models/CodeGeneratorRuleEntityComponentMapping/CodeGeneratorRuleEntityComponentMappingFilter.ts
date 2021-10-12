import { StringFilter  } from '@react3l/advanced-filters';
import { IdFilter  } from '@react3l/advanced-filters';
import { NumberFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class CodeGeneratorRuleEntityComponentMappingFilter extends ModelFilter  {
  public codeGeneratorRuleId?: IdFilter = new IdFilter();
  public entityComponentId?: IdFilter = new IdFilter();
  public sequence?: NumberFilter = new NumberFilter();
  public value?: StringFilter = new StringFilter();
}
