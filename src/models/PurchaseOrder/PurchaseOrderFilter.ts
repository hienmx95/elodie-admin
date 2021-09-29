import { StringFilter  } from '@react3l/advanced-filters';
import { IdFilter  } from '@react3l/advanced-filters';
import { NumberFilter  } from '@react3l/advanced-filters';
import { DateFilter  } from '@react3l/advanced-filters';
import { GuidFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class PurchaseOrderFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public description?: StringFilter = new StringFilter();
  public pOCode?: StringFilter = new StringFilter();
  public pONumber?: NumberFilter = new NumberFilter();
  public statusId?: IdFilter = new IdFilter();
  public creatorId?: IdFilter = new IdFilter();
  public purchaseRequestId?: IdFilter = new IdFilter();
  public purchasePlanId?: IdFilter = new IdFilter();
  public purchaseOrderTypeId?: IdFilter = new IdFilter();
  public purchaseOrganizationId?: IdFilter = new IdFilter();
  public purchaserId?: IdFilter = new IdFilter();
  public purchaserAddress?: StringFilter = new StringFilter();
  public purchaserPhoneNumber?: StringFilter = new StringFilter();
  public supplierId?: IdFilter = new IdFilter();
  public supplierEmail?: StringFilter = new StringFilter();
  public supplierPhoneNumber?: StringFilter = new StringFilter();
  public receiveOrganizationId?: IdFilter = new IdFilter();
  public recipientAddress?: StringFilter = new StringFilter();
  public recipientPhoneNumber?: StringFilter = new StringFilter();
  public recipientId?: IdFilter = new IdFilter();
  public expectedAt?: DateFilter = new DateFilter();
  public mainCurrencyId?: IdFilter = new IdFilter();
  public subTotal?: NumberFilter = new NumberFilter();
  public commission?: NumberFilter = new NumberFilter();
  public generalDiscountPercentage?: NumberFilter = new NumberFilter();
  public generalDiscountAmount?: NumberFilter = new NumberFilter();
  public total?: NumberFilter = new NumberFilter();
  public rowId?: GuidFilter = new GuidFilter();
  public projectOrganizationId?: IdFilter = new IdFilter();
  public projectId?: IdFilter = new IdFilter();
  public projectBudgetId?: IdFilter = new IdFilter();
  public expenseId?: IdFilter = new IdFilter();
}
