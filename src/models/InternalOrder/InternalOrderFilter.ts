import { StringFilter } from "@react3l/advanced-filters";
import { IdFilter } from "@react3l/advanced-filters";
import { DateFilter } from "@react3l/advanced-filters";
import { GuidFilter } from "@react3l/advanced-filters";
import { ModelFilter } from "@react3l/react3l/core";

export class InternalOrderFilter extends ModelFilter {
  public id?: IdFilter = new IdFilter();
  public code?: StringFilter = new StringFilter();
  public orderDate?: DateFilter = new DateFilter();
  public date?: DateFilter = new DateFilter();
  public deliveryDate?: DateFilter = new DateFilter();
  public warehouseId?: IdFilter = new IdFilter();
  public time?: IdFilter = new IdFilter();
  public item?: IdFilter = new IdFilter();
  public appUserId?: IdFilter = new IdFilter();
  public organizationId?: IdFilter = new IdFilter();
  public internalOrderStatusId?: IdFilter = new IdFilter();
  public requestStateId?: IdFilter = new IdFilter();
  public rowId?: GuidFilter = new GuidFilter();
}
