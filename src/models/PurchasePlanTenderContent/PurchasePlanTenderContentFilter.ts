import { IdFilter  } from '@react3l/advanced-filters';
import { GuidFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class PurchasePlanTenderContentFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public purchasePlanTenderId?: IdFilter = new IdFilter();
  public purchasePlanTenderRequirementId?: IdFilter = new IdFilter();
  public fileId?: IdFilter = new IdFilter();
  public rowId?: GuidFilter = new GuidFilter();
}
