import { StringFilter  } from '@react3l/advanced-filters';
import { IdFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class WorkflowStepFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public workflowDefinitionId?: IdFilter = new IdFilter();
  public code?: StringFilter = new StringFilter();
  public name?: StringFilter = new StringFilter();
  public roleId?: IdFilter = new IdFilter();
  public subjectMailForReject?: StringFilter = new StringFilter();
  public bodyMailForReject?: StringFilter = new StringFilter();
  public statusId?: IdFilter = new IdFilter();
}
