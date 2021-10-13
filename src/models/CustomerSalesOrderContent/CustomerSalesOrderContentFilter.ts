import { IdFilter  } from '@react3l/advanced-filters';
import { NumberFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class CustomerSalesOrderContentFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public customerSalesOrderId?: IdFilter = new IdFilter();
  public itemId?: IdFilter = new IdFilter();
  public unitOfMeasureId?: IdFilter = new IdFilter();
  public quantity?: NumberFilter = new NumberFilter();
  public requestedQuantity?: NumberFilter = new NumberFilter();
  public primaryUnitOfMeasureId?: IdFilter = new IdFilter();
  public salePrice?: NumberFilter = new NumberFilter();
  public primaryPrice?: NumberFilter = new NumberFilter();
  public discountPercentage?: NumberFilter = new NumberFilter();
  public discountAmount?: NumberFilter = new NumberFilter();
  public generalDiscountPercentage?: NumberFilter = new NumberFilter();
  public generalDiscountAmount?: NumberFilter = new NumberFilter();
  public taxPercentage?: NumberFilter = new NumberFilter();
  public taxAmount?: NumberFilter = new NumberFilter();
  public taxPercentageOther?: NumberFilter = new NumberFilter();
  public taxAmountOther?: NumberFilter = new NumberFilter();
  public amount?: NumberFilter = new NumberFilter();
  public factor?: NumberFilter = new NumberFilter();
  public editedPriceStatusId?: IdFilter = new IdFilter();
  public taxTypeId?: IdFilter = new IdFilter();
}
