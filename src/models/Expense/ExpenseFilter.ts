import { StringFilter  } from '@react3l/advanced-filters';
import { IdFilter  } from '@react3l/advanced-filters';
import { NumberFilter  } from '@react3l/advanced-filters';
import { DateFilter  } from '@react3l/advanced-filters';
import { GuidFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class ExpenseFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public code?: StringFilter = new StringFilter();
  public title?: StringFilter = new StringFilter();
  public note?: StringFilter = new StringFilter();
  public organizationId?: IdFilter = new IdFilter();
  public expenseTypeId?: IdFilter = new IdFilter();
  public appUserId?: IdFilter = new IdFilter();
  public submitDate?: DateFilter = new DateFilter();
  public dueDate?: DateFilter = new DateFilter();
  public deadline?: NumberFilter = new NumberFilter();
  public monthId?: IdFilter = new IdFilter();
  public expenseMethodId?: IdFilter = new IdFilter();
  public beneficiaryTypeId?: IdFilter = new IdFilter();
  public supplierTaxCode?: StringFilter = new StringFilter();
  public supplierName?: StringFilter = new StringFilter();
  public supplierUpdate?: DateFilter = new DateFilter();
  public bankConfigId?: IdFilter = new IdFilter();
  public transferContent?: StringFilter = new StringFilter();
  public convertedSubTotal?: NumberFilter = new NumberFilter();
  public convertedTotal?: NumberFilter = new NumberFilter();
  public creatorId?: IdFilter = new IdFilter();
  public purchaseOrderId?: IdFilter = new IdFilter();
  public rowId?: GuidFilter = new GuidFilter();
}
