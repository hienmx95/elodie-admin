import { StringFilter } from '@react3l/advanced-filters';
import { IdFilter } from '@react3l/advanced-filters';
import { DateFilter } from '@react3l/advanced-filters';
import { GuidFilter } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class PrincipalContractFilter extends ModelFilter {
  public id?: IdFilter = new IdFilter();
  public name?: StringFilter = new StringFilter();
  public code?: StringFilter = new StringFilter();
  public description?: StringFilter = new StringFilter();
  public managerId?: IdFilter = new IdFilter();
  public supplierId?: IdFilter = new IdFilter();
  public supplierAddress?: StringFilter = new StringFilter();
  public supplierEmail?: StringFilter = new StringFilter();
  public supplierTaxCode?: StringFilter = new StringFilter();
  public organizationId?: IdFilter = new IdFilter();
  public organizationAddress?: StringFilter = new StringFilter();
  public organizationEmail?: StringFilter = new StringFilter();
  public organizationTaxCode?: StringFilter = new StringFilter();
  public statusId?: IdFilter = new IdFilter();
  public startedAt?: DateFilter = new DateFilter();
  public remindedAt?: DateFilter = new DateFilter();
  public endedAt?: DateFilter = new DateFilter();
  public creatorId?: IdFilter = new IdFilter();
  public rowId?: GuidFilter = new GuidFilter();
  public search?: string;
}
