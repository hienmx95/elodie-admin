import { StringFilter  } from '@react3l/advanced-filters';
import { IdFilter  } from '@react3l/advanced-filters';
import { NumberFilter  } from '@react3l/advanced-filters';
import { GuidFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class RequestForQuotationContentFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public description?: StringFilter = new StringFilter();
  public requestForQuotationId?: IdFilter = new IdFilter();
  public categoryId?: IdFilter = new IdFilter();
  public itemId?: IdFilter = new IdFilter();
  public unitOfMeasureId?: IdFilter = new IdFilter();
  public quantity?: NumberFilter = new NumberFilter();
  public note?: StringFilter = new StringFilter();
  public noteForSupplier?: StringFilter = new StringFilter();
  public rowId?: GuidFilter = new GuidFilter();
}
