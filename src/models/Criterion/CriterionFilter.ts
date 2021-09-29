import { StringFilter } from '@react3l/advanced-filters';
import { IdFilter } from '@react3l/advanced-filters';
import { NumberFilter } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class CriterionFilter extends ModelFilter {
  public id?: IdFilter = new IdFilter();
  public code?: StringFilter = new StringFilter();
  public name?: StringFilter = new StringFilter();
  public criterionGroupingId?: IdFilter = new IdFilter();
  public criterionTypeId?: IdFilter = new IdFilter();
  public description?: StringFilter = new StringFilter();
  public maxScore?: NumberFilter = new NumberFilter();
  public statusId?: IdFilter = new IdFilter();
  public search?: string;
}
