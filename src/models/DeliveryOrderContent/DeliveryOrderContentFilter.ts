import { StringFilter  } from '@react3l/advanced-filters';
import { IdFilter  } from '@react3l/advanced-filters';
import { NumberFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class DeliveryOrderContentFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public purchaseOrderReceiveId?: IdFilter = new IdFilter();
  public itemId?: IdFilter = new IdFilter();
  public description?: StringFilter = new StringFilter();
  public unitOfMeasureId?: IdFilter = new IdFilter();
  public receivedQuantity?: NumberFilter = new NumberFilter();
}
