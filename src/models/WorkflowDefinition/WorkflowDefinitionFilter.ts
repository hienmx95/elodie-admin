import { StringFilter  } from '@react3l/advanced-filters';
import { IdFilter  } from '@react3l/advanced-filters';
import { DateFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class WorkflowDefinitionFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public code?: StringFilter = new StringFilter();
  public name?: StringFilter = new StringFilter();
  public creatorId?: IdFilter = new IdFilter();
  public modifierId?: IdFilter = new IdFilter();
  public workflowTypeId?: IdFilter = new IdFilter();
  public organizationId?: IdFilter = new IdFilter();
  public startDate?: DateFilter = new DateFilter();
  public endDate?: DateFilter = new DateFilter();
  public statusId?: IdFilter = new IdFilter();
}
