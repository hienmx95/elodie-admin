import { StringFilter } from '@react3l/advanced-filters';
import { IdFilter } from '@react3l/advanced-filters';
import { NumberFilter } from '@react3l/advanced-filters';
import { DateFilter } from '@react3l/advanced-filters';
import { GuidFilter } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class PurchaseRequestPrincipalContractFilter extends ModelFilter {
  public id?: IdFilter = new IdFilter();
  public code?: StringFilter = new StringFilter();
  public description?: StringFilter = new StringFilter();
  public purchaseRequestTypeId?: IdFilter = new IdFilter();
  public categoryId?: IdFilter = new IdFilter();
  public principalContractId?: IdFilter = new IdFilter();
  public principalContractManagerId?: IdFilter = new IdFilter();
  public statusId?: IdFilter = new IdFilter();
  public requestOrganizationId?: IdFilter = new IdFilter();
  public requestStateId?: IdFilter = new IdFilter();
  public requestDepartmentName?: StringFilter = new StringFilter();
  public requestorId?: IdFilter = new IdFilter();
  public requestorName?: StringFilter = new StringFilter();
  public requestorEmail?: StringFilter = new StringFilter();
  public requestOrganizationName?: StringFilter = new StringFilter();
  public requestorPhoneNumber?: StringFilter = new StringFilter();
  public receiveOrganizationId?: IdFilter = new IdFilter();
  public recipientId?: IdFilter = new IdFilter();
  public recipientAddress?: StringFilter = new StringFilter();
  public recipientPhoneNumber?: StringFilter = new StringFilter();
  public requestedAt?: DateFilter = new DateFilter();
  public expectedAt?: DateFilter = new DateFilter();
  public note?: StringFilter = new StringFilter();
  public mainCurrencyId?: IdFilter = new IdFilter();
  public total?: NumberFilter = new NumberFilter();
  public rowId?: GuidFilter = new GuidFilter();
  public search?: string;
}
