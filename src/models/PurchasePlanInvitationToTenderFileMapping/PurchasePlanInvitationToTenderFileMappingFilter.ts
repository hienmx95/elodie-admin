import { IdFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class PurchasePlanInvitationToTenderFileMappingFilter extends ModelFilter  {
  public purchasePlanInvitationToTenderId?: IdFilter = new IdFilter();
  public fileId?: IdFilter = new IdFilter();
}
