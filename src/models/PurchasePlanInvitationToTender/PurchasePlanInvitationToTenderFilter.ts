import { StringFilter  } from '@react3l/advanced-filters';
import { IdFilter  } from '@react3l/advanced-filters';
import { DateFilter  } from '@react3l/advanced-filters';
import { GuidFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class PurchasePlanInvitationToTenderFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public purchasePlanId?: IdFilter = new IdFilter();
  public tenderJoiningDeadlineAt?: DateFilter = new DateFilter();
  public documentSubmitingDeadlineAt?: DateFilter = new DateFilter();
  public contactorId?: IdFilter = new IdFilter();
  public phone?: StringFilter = new StringFilter();
  public tenderRequirements?: StringFilter = new StringFilter();
  public tenderFormat?: StringFilter = new StringFilter();
  public rowId?: GuidFilter = new GuidFilter();
}
