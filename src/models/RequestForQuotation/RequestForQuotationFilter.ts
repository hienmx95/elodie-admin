import { StringFilter  } from '@react3l/advanced-filters';
import { IdFilter  } from '@react3l/advanced-filters';
import { DateFilter  } from '@react3l/advanced-filters';
import { GuidFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class RequestForQuotationFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public code?: StringFilter = new StringFilter();
  public description?: StringFilter = new StringFilter();
  public quotationExpectedAt?: DateFilter = new DateFilter();
  public requestorId?: IdFilter = new IdFilter();
  public requestDepartmentName?: StringFilter = new StringFilter();
  public requestOrganizationId?: IdFilter = new IdFilter();
  public recipientAddress?: StringFilter = new StringFilter();
  public statusId?: IdFilter = new IdFilter();
  public buyerId?: IdFilter = new IdFilter();
  public note?: StringFilter = new StringFilter();
  public rowId?: GuidFilter = new GuidFilter();
}
