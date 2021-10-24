import { IdFilter, NumberFilter, StringFilter } from "@react3l/advanced-filters";
import { ModelFilter } from "@react3l/react3l/core";

export class CustomerSalesOrderPromotionFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public customerSalesOrderId?: IdFilter = new IdFilter();
  public itemId?: IdFilter = new IdFilter();
  public unitOfMeasureId?: IdFilter = new IdFilter();
  public quantity?: NumberFilter = new NumberFilter();
  public requestedQuantity?: NumberFilter = new NumberFilter();
  public primaryUnitOfMeasureId?: IdFilter = new IdFilter();
  public factor?: NumberFilter = new NumberFilter();
  public note?: StringFilter = new StringFilter();
}
