import { StringFilter  } from '@react3l/advanced-filters';
import { IdFilter  } from '@react3l/advanced-filters';
import { DateFilter  } from '@react3l/advanced-filters';
import { GuidFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class PurchasePlanTenderFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public purchasePlanId?: IdFilter = new IdFilter();
  public supplierId?: IdFilter = new IdFilter();
  public documentSubmittingDeadlineAt?: DateFilter = new DateFilter();
  public contactorId?: IdFilter = new IdFilter();
  public phone?: StringFilter = new StringFilter();
  public tenderRequirements?: StringFilter = new StringFilter();
  public tenderFormat?: StringFilter = new StringFilter();
  public submittedAt?: DateFilter = new DateFilter();
  public rowId?: GuidFilter = new GuidFilter();
}
