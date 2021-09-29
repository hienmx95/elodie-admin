import { StringFilter  } from '@react3l/advanced-filters';
import { IdFilter  } from '@react3l/advanced-filters';
import { DateFilter  } from '@react3l/advanced-filters';
import { GuidFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class PurchasePlanRequestForTenderClarificationFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public purchasePlanId?: IdFilter = new IdFilter();
  public supplierId?: IdFilter = new IdFilter();
  public tenderSubmittingDeadlineAt?: DateFilter = new DateFilter();
  public description?: StringFilter = new StringFilter();
  public rowId?: GuidFilter = new GuidFilter();
}
