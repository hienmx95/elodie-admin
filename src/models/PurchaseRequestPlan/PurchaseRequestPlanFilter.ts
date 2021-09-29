import { StringFilter } from '@react3l/advanced-filters';
import { IdFilter } from '@react3l/advanced-filters';
import { GuidFilter } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class PurchaseRequestPlanFilter extends ModelFilter {
  public id?: IdFilter = new IdFilter();
  public name?: StringFilter = new StringFilter();
  public code?: StringFilter = new StringFilter();
  public description?: StringFilter = new StringFilter();
  public organizationId?: IdFilter = new IdFilter();
  public creatorId?: IdFilter = new IdFilter();
  public mainCurrencyId?: IdFilter = new IdFilter();
  public yearKeyId?: IdFilter = new IdFilter();
  public statusId?: IdFilter = new IdFilter();
  public rowId?: GuidFilter = new GuidFilter();
  public search?: string;
}
