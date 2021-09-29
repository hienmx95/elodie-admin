import { StringFilter  } from '@react3l/advanced-filters';
import { IdFilter  } from '@react3l/advanced-filters';
import { DateFilter  } from '@react3l/advanced-filters';
import { GuidFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class PurchasePlanTenderingPlanFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public purchasePlanId?: IdFilter = new IdFilter();
  public name?: StringFilter = new StringFilter();
  public supplierSelectionMethod?: StringFilter = new StringFilter();
  public tenderStartedAt?: DateFilter = new DateFilter();
  public tenderEndedAt?: DateFilter = new DateFilter();
  public rowId?: GuidFilter = new GuidFilter();
}
