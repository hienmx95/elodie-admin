import { StringFilter  } from '@react3l/advanced-filters';
import { IdFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class WorkflowDirectionConditionFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public workflowDirectionId?: IdFilter = new IdFilter();
  public workflowParameterId?: IdFilter = new IdFilter();
  public workflowOperatorId?: IdFilter = new IdFilter();
  public value?: StringFilter = new StringFilter();
}
