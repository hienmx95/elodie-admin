import { StringFilter  } from '@react3l/advanced-filters';
import { IdFilter  } from '@react3l/advanced-filters';
import { GuidFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class SupplierContactorFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public supplierId?: IdFilter = new IdFilter();
  public name?: StringFilter = new StringFilter();
  public phone?: StringFilter = new StringFilter();
  public email?: StringFilter = new StringFilter();
  public rowId?: GuidFilter = new GuidFilter();
}
