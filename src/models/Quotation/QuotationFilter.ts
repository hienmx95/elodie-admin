import { StringFilter  } from '@react3l/advanced-filters';
import { IdFilter  } from '@react3l/advanced-filters';
import { NumberFilter  } from '@react3l/advanced-filters';
import { DateFilter  } from '@react3l/advanced-filters';
import { GuidFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class QuotationFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public requestForQuotationId?: IdFilter = new IdFilter();
  public purchasePlanId?: IdFilter = new IdFilter();
  public senderId?: IdFilter = new IdFilter();
  public senderName?: StringFilter = new StringFilter();
  public senderEmail?: StringFilter = new StringFilter();
  public senderPhoneNumber?: StringFilter = new StringFilter();
  public sentAt?: DateFilter = new DateFilter();
  public supplierId?: IdFilter = new IdFilter();
  public supplierTaxCode?: StringFilter = new StringFilter();
  public supplierAddress?: StringFilter = new StringFilter();
  public supplierPhone?: StringFilter = new StringFilter();
  public statusId?: IdFilter = new IdFilter();
  public expiredAt?: DateFilter = new DateFilter();
  public mainCurrencyId?: IdFilter = new IdFilter();
  public subTotal?: NumberFilter = new NumberFilter();
  public discountAmount?: NumberFilter = new NumberFilter();
  public total?: NumberFilter = new NumberFilter();
  public rowId?: GuidFilter = new GuidFilter();
}
