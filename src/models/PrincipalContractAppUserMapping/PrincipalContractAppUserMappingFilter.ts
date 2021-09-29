import { IdFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class PrincipalContractAppUserMappingFilter extends ModelFilter  {
  public appUserId?: IdFilter = new IdFilter();
  public principalContractId?: IdFilter = new IdFilter();
}
