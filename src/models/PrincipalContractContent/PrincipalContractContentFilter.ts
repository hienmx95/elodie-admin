import { IdFilter  } from '@react3l/advanced-filters';
import { NumberFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class PrincipalContractContentFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public itemId?: IdFilter = new IdFilter();
  public principalContractId?: IdFilter = new IdFilter();
  public unitOfMeasureId?: IdFilter = new IdFilter();
  public unitPrice?: NumberFilter = new NumberFilter();
  public taxTypeId?: IdFilter = new IdFilter();
  public taxAmount?: NumberFilter = new NumberFilter();
  public price?: NumberFilter = new NumberFilter();
  public mainCurrencyId?: IdFilter = new IdFilter();
  public exchangeCurrencyId?: IdFilter = new IdFilter();
  public exchangeRate?: NumberFilter = new NumberFilter();
  public exchangedUnitPrice?: NumberFilter = new NumberFilter();
  public exchangedTaxAmount?: NumberFilter = new NumberFilter();
  public exchangedPrice?: NumberFilter = new NumberFilter();
}
