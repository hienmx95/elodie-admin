import { StringFilter  } from '@react3l/advanced-filters';
import { IdFilter  } from '@react3l/advanced-filters';
import { NumberFilter  } from '@react3l/advanced-filters';
import { DateFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class DeliveryOrderFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public receiveCode?: StringFilter = new StringFilter();
  public receiveNumber?: NumberFilter = new NumberFilter();
  public description?: StringFilter = new StringFilter();
  public purchaseOrderId?: IdFilter = new IdFilter();
  public recipientAddress?: StringFilter = new StringFilter();
  public recipientPhoneNumber?: StringFilter = new StringFilter();
  public receiveOrganizationId?: IdFilter = new IdFilter();
  public receivedAt?: DateFilter = new DateFilter();
  public creatorId?: IdFilter = new IdFilter();
  public statusId?: IdFilter = new IdFilter();
}
