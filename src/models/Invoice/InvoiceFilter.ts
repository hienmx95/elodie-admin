import { StringFilter  } from '@react3l/advanced-filters';
import { IdFilter  } from '@react3l/advanced-filters';
import { NumberFilter  } from '@react3l/advanced-filters';
import { DateFilter  } from '@react3l/advanced-filters';
import { GuidFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class InvoiceFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public expenseId?: IdFilter = new IdFilter();
  public invoiceTypeId?: IdFilter = new IdFilter();
  public supplierTaxCode?: StringFilter = new StringFilter();
  public supplierName?: StringFilter = new StringFilter();
  public supplierUpdate?: DateFilter = new DateFilter();
  public content?: StringFilter = new StringFilter();
  public description?: StringFilter = new StringFilter();
  public createdDate?: DateFilter = new DateFilter();
  public signs?: StringFilter = new StringFilter();
  public number?: StringFilter = new StringFilter();
  public seri?: StringFilter = new StringFilter();
  public exchangeRate?: NumberFilter = new NumberFilter();
  public exchangeTime?: DateFilter = new DateFilter();
  public exchangeCurrencyId?: IdFilter = new IdFilter();
  public mainCurrencyId?: IdFilter = new IdFilter();
  public taxTypeId?: IdFilter = new IdFilter();
  public taxAmount?: NumberFilter = new NumberFilter();
  public subTotal?: NumberFilter = new NumberFilter();
  public total?: NumberFilter = new NumberFilter();
  public convertedTotal?: NumberFilter = new NumberFilter();
  public converterdSubTotal?: NumberFilter = new NumberFilter();
  public statusId?: IdFilter = new IdFilter();
  public rowId?: GuidFilter = new GuidFilter();
}
