import { StringFilter  } from '@react3l/advanced-filters';
import { IdFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class DeliveryOrderSupplierPointFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public purchaseOrderReceiveId?: IdFilter = new IdFilter();
  public description?: StringFilter = new StringFilter();
  public supplierId?: IdFilter = new IdFilter();
  public criterionId?: IdFilter = new IdFilter();
  public pointId?: IdFilter = new IdFilter();
  public review?: StringFilter = new StringFilter();
  public reviewImageId?: IdFilter = new IdFilter();
  public creatorId?: IdFilter = new IdFilter();
}
