import { StringFilter  } from '@react3l/advanced-filters';
import { IdFilter  } from '@react3l/advanced-filters';
import { GuidFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class WorkflowDirectionFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public workflowDefinitionId?: IdFilter = new IdFilter();
  public fromStepId?: IdFilter = new IdFilter();
  public toStepId?: IdFilter = new IdFilter();
  public subjectMailForCreator?: StringFilter = new StringFilter();
  public subjectMailForCurrentStep?: StringFilter = new StringFilter();
  public subjectMailForNextStep?: StringFilter = new StringFilter();
  public bodyMailForCreator?: StringFilter = new StringFilter();
  public bodyMailForCurrentStep?: StringFilter = new StringFilter();
  public bodyMailForNextStep?: StringFilter = new StringFilter();
  public statusId?: IdFilter = new IdFilter();
  public rowId?: GuidFilter = new GuidFilter();
}
