import { StringFilter  } from '@react3l/advanced-filters';
import { IdFilter  } from '@react3l/advanced-filters';
import { NumberFilter  } from '@react3l/advanced-filters';
import { DateFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class PrePaymentFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public expenseId?: IdFilter = new IdFilter();
  public title?: StringFilter = new StringFilter();
  public organizationId?: IdFilter = new IdFilter();
  public projectId?: IdFilter = new IdFilter();
  public projectBudgetId?: IdFilter = new IdFilter();
  public price?: NumberFilter = new NumberFilter();
  public exchangeRate?: NumberFilter = new NumberFilter();
  public exchangeTime?: DateFilter = new DateFilter();
  public exchangeCurrencyId?: IdFilter = new IdFilter();
  public mainCurrencyId?: IdFilter = new IdFilter();
  public contractDate?: DateFilter = new DateFilter();
  public contractNumber?: StringFilter = new StringFilter();
  public contractAmount?: NumberFilter = new NumberFilter();
  public subTotal?: NumberFilter = new NumberFilter();
  public total?: NumberFilter = new NumberFilter();
  public convertedSubTotal?: NumberFilter = new NumberFilter();
  public convertedTotal?: NumberFilter = new NumberFilter();
}
