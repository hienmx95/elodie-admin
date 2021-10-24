import { DateFilter, IdFilter } from "@react3l/advanced-filters";
import { ModelFilter } from "@react3l/react3l/core";

export class CustomerSalesOrderItemReportFilter extends ModelFilter {
  public id?: IdFilter = new IdFilter();
  public organizationId?: IdFilter = new IdFilter();
  public date?: DateFilter = new DateFilter();
  public itemId?: IdFilter = new IdFilter();
}
