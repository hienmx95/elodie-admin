import { DateFilter, IdFilter, StringFilter } from "@react3l/advanced-filters";
import { ModelFilter } from "@react3l/react3l/core";

export class GeneralCustomerSalesOrderReportFilter extends ModelFilter {
  public id?: IdFilter = new IdFilter();
  public organizationId?: IdFilter = new IdFilter();
  public creatorId?: IdFilter = new IdFilter();
  public purchaseOrderCode?: StringFilter = new StringFilter();
  public orderedAt?: DateFilter = new DateFilter();
  public purchaseRequestCode?: StringFilter = new StringFilter();
  public itemId?: IdFilter = new IdFilter();
}
