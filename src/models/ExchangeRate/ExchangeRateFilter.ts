import { IdFilter  } from '@react3l/advanced-filters';
import { NumberFilter  } from '@react3l/advanced-filters';
import { DateFilter  } from '@react3l/advanced-filters';
import { GuidFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class ExchangeRateFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public fromCurrencyId?: IdFilter = new IdFilter();
  public toCurrencyId?: IdFilter = new IdFilter();
  public rate?: NumberFilter = new NumberFilter();
  public time?: DateFilter = new DateFilter();
  public rowId?: GuidFilter = new GuidFilter();
}
