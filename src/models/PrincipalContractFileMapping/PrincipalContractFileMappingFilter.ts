import { IdFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class PrincipalContractFileMappingFilter extends ModelFilter  {
  public fileId?: IdFilter = new IdFilter();
  public principalContractId?: IdFilter = new IdFilter();
}
