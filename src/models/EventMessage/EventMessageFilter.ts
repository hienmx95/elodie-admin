import { StringFilter  } from '@react3l/advanced-filters';
import { IdFilter  } from '@react3l/advanced-filters';
import { DateFilter  } from '@react3l/advanced-filters';
import { GuidFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class EventMessageFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public time?: DateFilter = new DateFilter();
  public routingKey?: StringFilter = new StringFilter();
  public rowId?: GuidFilter = new GuidFilter();
  public entityName?: StringFilter = new StringFilter();
  public content?: StringFilter = new StringFilter();
}
