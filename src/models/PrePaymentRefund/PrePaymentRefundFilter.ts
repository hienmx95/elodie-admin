import { IdFilter  } from '@react3l/advanced-filters';
import { NumberFilter  } from '@react3l/advanced-filters';
import { DateFilter  } from '@react3l/advanced-filters';
import { GuidFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class PrePaymentRefundFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public prePaymentId?: IdFilter = new IdFilter();
  public amount?: NumberFilter = new NumberFilter();
  public refundExpenseId?: IdFilter = new IdFilter();
  public exchangeRate?: NumberFilter = new NumberFilter();
  public exchangeTime?: DateFilter = new DateFilter();
  public exchangeCurrencyId?: IdFilter = new IdFilter();
  public mainCurrencyId?: IdFilter = new IdFilter();
  public convertedAmount?: NumberFilter = new NumberFilter();
  public rowId?: GuidFilter = new GuidFilter();
}
