import { IdFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class RequestForQuotationFileMappingFilter extends ModelFilter  {
  public requestForQuotationId?: IdFilter = new IdFilter();
  public fileId?: IdFilter = new IdFilter();
}
