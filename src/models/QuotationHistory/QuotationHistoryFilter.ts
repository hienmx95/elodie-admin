import { StringFilter  } from '@react3l/advanced-filters';
import { IdFilter  } from '@react3l/advanced-filters';
import { DateFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class QuotationHistoryFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public quotationId?: IdFilter = new IdFilter();
  public content?: StringFilter = new StringFilter();
  public savedAt?: DateFilter = new DateFilter();
  public supplierUserId?: IdFilter = new IdFilter();
}
