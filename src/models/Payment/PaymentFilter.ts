import { StringFilter  } from '@react3l/advanced-filters';
import { IdFilter  } from '@react3l/advanced-filters';
import { NumberFilter  } from '@react3l/advanced-filters';
import { DateFilter  } from '@react3l/advanced-filters';
import { GuidFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class PaymentFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public invoiceId?: IdFilter = new IdFilter();
  public title?: StringFilter = new StringFilter();
  public organizationId?: IdFilter = new IdFilter();
  public projectId?: IdFilter = new IdFilter();
  public projectBudgetId?: IdFilter = new IdFilter();
  public unitPrice?: NumberFilter = new NumberFilter();
  public quantity?: NumberFilter = new NumberFilter();
  public exchangeRate?: NumberFilter = new NumberFilter();
  public exchangeTime?: DateFilter = new DateFilter();
  public exchangeCurrencyId?: IdFilter = new IdFilter();
  public mainCurrencyId?: IdFilter = new IdFilter();
  public taxAmount?: NumberFilter = new NumberFilter();
  public taxTypeId?: IdFilter = new IdFilter();
  public subTotal?: NumberFilter = new NumberFilter();
  public total?: NumberFilter = new NumberFilter();
  public convertedSubTotal?: NumberFilter = new NumberFilter();
  public convertedTotal?: NumberFilter = new NumberFilter();
  public rowId?: GuidFilter = new GuidFilter();
}
