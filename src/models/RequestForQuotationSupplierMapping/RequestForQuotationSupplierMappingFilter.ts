import { IdFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class RequestForQuotationSupplierMappingFilter extends ModelFilter  {
  public requestForQuotationId?: IdFilter = new IdFilter();
  public supplierId?: IdFilter = new IdFilter();
}
