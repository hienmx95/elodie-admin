import { Model } from '@react3l/react3l/core';
import { AppUser } from 'models/AppUser';
import { CodeGeneratorRule } from 'models/CodeGeneratorRule';
import { Customer } from 'models/Customer';
import { CustomerSalesOrderContent } from 'models/CustomerSalesOrderContent';
import { CustomerSalesOrderPaymentHistory } from 'models/CustomerSalesOrderPaymentHistory';
import { CustomerSalesOrderPromotion } from "models/CustomerSalesOrderPromotion";
import { District } from 'models/District';
import { EditedPriceStatus } from 'models/EditedPriceStatus';
import { Nation } from 'models/Nation';
import { OrderPaymentStatus } from 'models/OrderPaymentStatus';
import { OrderSource } from 'models/OrderSource';
import { Organization } from 'models/Organization';
import { Province } from 'models/Province';
import { RequestState } from 'models/RequestState';
import { Ward } from 'models/Ward';
import { Moment } from 'moment';

export class CustomerSalesOrder extends Model
{
    public id?: number;

    public code?: string;

    public customerId?: number;

    public orderSourceId?: number;

    public requestStateId?: number;

    public orderPaymentStatusId?: number;

    public editedPriceStatusId?: number;

    public shippingName?: string;

    public orderDate?: Moment;

    public deliveryDate?: Moment;

    public salesEmployeeId?: number;

    public note?: string;

    public invoiceAddress?: string;

    public invoiceNationId?: number;

    public invoiceProvinceId?: number;

    public invoiceDistrictId?: number;

    public invoiceWardId?: number;

    public invoiceZIPCode?: string;

    public deliveryAddress?: string;

    public deliveryNationId?: number;

    public deliveryProvinceId?: number;

    public deliveryDistrictId?: number;

    public deliveryWardId?: number;

    public deliveryZIPCode?: string;

    public subTotal?: number;

    public generalDiscountPercentage?: number;

    public generalDiscountAmount?: number;

    public totalTaxOther?: number;

    public totalTax?: number;

    public total?: number;

    public creatorId?: number;

    public organizationId?: number;




    public rowId?: string;

    public codeGeneratorRuleId?: number;


    public codeGeneratorRule?: CodeGeneratorRule;

    public creator?: AppUser;

    public customer?: Customer;

    public deliveryDistrict?: District;

    public deliveryNation?: Nation;

    public deliveryProvince?: Province;

    public deliveryWard?: Ward;

    public editedPriceStatus?: EditedPriceStatus;

    public invoiceDistrict?: District;

    public invoiceNation?: Nation;

    public invoiceProvince?: Province;

    public invoiceWard?: Ward;

    public orderPaymentStatus?: OrderPaymentStatus;

    public orderSource?: OrderSource;

    public organization?: Organization;

    public requestState?: RequestState;

    public salesEmployee?: AppUser;

    public customerSalesOrderContents?: CustomerSalesOrderContent[];

    public customerSalesOrderPromotions?: CustomerSalesOrderPromotion[];

    public customerSalesOrderPaymentHistories?: CustomerSalesOrderPaymentHistory[];
}
