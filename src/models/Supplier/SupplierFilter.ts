import { StringFilter } from '@react3l/advanced-filters';
import { IdFilter } from '@react3l/advanced-filters';
import { GuidFilter } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class SupplierFilter extends ModelFilter {
  public id?: IdFilter = new IdFilter();
  public code?: StringFilter = new StringFilter();
  public name?: StringFilter = new StringFilter();
  public taxCode?: StringFilter = new StringFilter();
  public phone?: StringFilter = new StringFilter();
  public email?: StringFilter = new StringFilter();
  public address?: StringFilter = new StringFilter();
  public provinceId?: IdFilter = new IdFilter();
  public districtId?: IdFilter = new IdFilter();
  public wardId?: IdFilter = new IdFilter();
  public ownerName?: StringFilter = new StringFilter();
  public personInChargeId?: IdFilter = new IdFilter();
  public statusId?: IdFilter = new IdFilter();
  public search?: string;
  public description?: StringFilter = new StringFilter();
  public nationId?: IdFilter = new IdFilter();
  public rowId?: GuidFilter = new GuidFilter();
}
