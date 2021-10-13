import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_CUSTOMER_SALES_ORDER_PREFIX } from "config/api-consts";
import { CustomerSalesOrder, CustomerSalesOrderFilter } from 'models/CustomerSalesOrder';
import { CodeGeneratorRule, CodeGeneratorRuleFilter } from 'models/CodeGeneratorRule';
import { AppUser, AppUserFilter } from 'models/AppUser';
import { Customer, CustomerFilter } from 'models/Customer';
import { District, DistrictFilter } from 'models/District';
import { Nation, NationFilter } from 'models/Nation';
import { Province, ProvinceFilter } from 'models/Province';
import { Ward, WardFilter } from 'models/Ward';
import { EditedPriceStatus, EditedPriceStatusFilter } from 'models/EditedPriceStatus';
import { OrderPaymentStatus, OrderPaymentStatusFilter } from 'models/OrderPaymentStatus';
import { OrderSource, OrderSourceFilter } from 'models/OrderSource';
import { Organization, OrganizationFilter } from 'models/Organization';
import { RequestState, RequestStateFilter } from 'models/RequestState';
import { CustomerSalesOrderContent, CustomerSalesOrderContentFilter } from 'models/CustomerSalesOrderContent';
import { UnitOfMeasure, UnitOfMeasureFilter } from 'models/UnitOfMeasure';
import { TaxType, TaxTypeFilter } from 'models/TaxType';
import { CustomerSalesOrderPaymentHistory, CustomerSalesOrderPaymentHistoryFilter } from 'models/CustomerSalesOrderPaymentHistory';
import { PaymentType, PaymentTypeFilter } from 'models/PaymentType';
import { Item, ItemFilter } from "models/Item";

export class CustomerSalesOrderRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_CUSTOMER_SALES_ORDER_PREFIX);
    }

    public count = (customerSalesOrderFilter?: CustomerSalesOrderFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), customerSalesOrderFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (customerSalesOrderFilter?: CustomerSalesOrderFilter): Observable<CustomerSalesOrder[]> => {
        return this.httpObservable.post<CustomerSalesOrder[]>(kebabCase(nameof(this.list)), customerSalesOrderFilter)
            .pipe(map((response: AxiosResponse<CustomerSalesOrder[]>) => response.data));
    };

    public get = (id: number | string): Observable<CustomerSalesOrder> => {
        return this.httpObservable.post<CustomerSalesOrder>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<CustomerSalesOrder>) => response.data));
    };

    public create = (customerSalesOrder: CustomerSalesOrder): Observable<CustomerSalesOrder> => {
        return this.httpObservable.post<CustomerSalesOrder>(kebabCase(nameof(this.create)), customerSalesOrder)
            .pipe(map((response: AxiosResponse<CustomerSalesOrder>) => response.data));
    };

    public update = (customerSalesOrder: CustomerSalesOrder): Observable<CustomerSalesOrder> => {
        return this.httpObservable.post<CustomerSalesOrder>(kebabCase(nameof(this.update)), customerSalesOrder)
            .pipe(map((response: AxiosResponse<CustomerSalesOrder>) => response.data));
    };

    public delete = (customerSalesOrder: CustomerSalesOrder): Observable<CustomerSalesOrder> => {
        return this.httpObservable.post<CustomerSalesOrder>(kebabCase(nameof(this.delete)), customerSalesOrder)
            .pipe(map((response: AxiosResponse<CustomerSalesOrder>) => response.data));
    };

    public save = (customerSalesOrder: CustomerSalesOrder): Observable<CustomerSalesOrder> => {
        return customerSalesOrder.id ? this.update(customerSalesOrder) : this.create(customerSalesOrder);
    };

    public singleListCodeGeneratorRule = (codeGeneratorRuleFilter: CodeGeneratorRuleFilter): Observable<CodeGeneratorRule[]> => {
        return this.httpObservable.post<CodeGeneratorRule[]>(kebabCase(nameof(this.singleListCodeGeneratorRule)), codeGeneratorRuleFilter)
            .pipe(map((response: AxiosResponse<CodeGeneratorRule[]>) => response.data));
    };
    public singleListAppUser = (appUserFilter: AppUserFilter): Observable<AppUser[]> => {
        return this.httpObservable.post<AppUser[]>(kebabCase(nameof(this.singleListAppUser)), appUserFilter)
            .pipe(map((response: AxiosResponse<AppUser[]>) => response.data));
    };
    public singleListCustomer = (customerFilter: CustomerFilter): Observable<Customer[]> => {
        return this.httpObservable.post<Customer[]>(kebabCase(nameof(this.singleListCustomer)), customerFilter)
            .pipe(map((response: AxiosResponse<Customer[]>) => response.data));
    };
    public singleListDistrict = (districtFilter: DistrictFilter): Observable<District[]> => {
        return this.httpObservable.post<District[]>(kebabCase(nameof(this.singleListDistrict)), districtFilter)
            .pipe(map((response: AxiosResponse<District[]>) => response.data));
    };
    public singleListNation = (nationFilter: NationFilter): Observable<Nation[]> => {
        return this.httpObservable.post<Nation[]>(kebabCase(nameof(this.singleListNation)), nationFilter)
            .pipe(map((response: AxiosResponse<Nation[]>) => response.data));
    };
    public singleListProvince = (provinceFilter: ProvinceFilter): Observable<Province[]> => {
        return this.httpObservable.post<Province[]>(kebabCase(nameof(this.singleListProvince)), provinceFilter)
            .pipe(map((response: AxiosResponse<Province[]>) => response.data));
    };
    public singleListWard = (wardFilter: WardFilter): Observable<Ward[]> => {
        return this.httpObservable.post<Ward[]>(kebabCase(nameof(this.singleListWard)), wardFilter)
            .pipe(map((response: AxiosResponse<Ward[]>) => response.data));
    };
    public singleListEditedPriceStatus = (): Observable<EditedPriceStatus[]> => {
        return this.httpObservable.post<EditedPriceStatus[]>(kebabCase(nameof(this.singleListEditedPriceStatus)), new EditedPriceStatusFilter())
            .pipe(map((response: AxiosResponse<EditedPriceStatus[]>) => response.data));
    };
    public singleListOrderPaymentStatus = (): Observable<OrderPaymentStatus[]> => {
        return this.httpObservable.post<OrderPaymentStatus[]>(kebabCase(nameof(this.singleListOrderPaymentStatus)), new OrderPaymentStatusFilter())
            .pipe(map((response: AxiosResponse<OrderPaymentStatus[]>) => response.data));
    };
    public singleListOrderSource = (orderSourceFilter: OrderSourceFilter): Observable<OrderSource[]> => {
        return this.httpObservable.post<OrderSource[]>(kebabCase(nameof(this.singleListOrderSource)), orderSourceFilter)
            .pipe(map((response: AxiosResponse<OrderSource[]>) => response.data));
    };
    public singleListOrganization = (organizationFilter: OrganizationFilter): Observable<Organization[]> => {
        return this.httpObservable.post<Organization[]>(kebabCase(nameof(this.singleListOrganization)), organizationFilter)
            .pipe(map((response: AxiosResponse<Organization[]>) => response.data));
    };
    public singleListRequestState = (): Observable<RequestState[]> => {
        return this.httpObservable.post<RequestState[]>(kebabCase(nameof(this.singleListRequestState)), new RequestStateFilter())
            .pipe(map((response: AxiosResponse<RequestState[]>) => response.data));
    };
    public singleListCustomerSalesOrderContent = (customerSalesOrderContentFilter: CustomerSalesOrderContentFilter): Observable<CustomerSalesOrderContent[]> => {
        return this.httpObservable.post<CustomerSalesOrderContent[]>(kebabCase(nameof(this.singleListCustomerSalesOrderContent)), customerSalesOrderContentFilter)
            .pipe(map((response: AxiosResponse<CustomerSalesOrderContent[]>) => response.data));
    };
    public singleListUnitOfMeasure = (unitOfMeasureFilter: UnitOfMeasureFilter): Observable<UnitOfMeasure[]> => {
        return this.httpObservable.post<UnitOfMeasure[]>(kebabCase(nameof(this.singleListUnitOfMeasure)), unitOfMeasureFilter)
            .pipe(map((response: AxiosResponse<UnitOfMeasure[]>) => response.data));
    };
    public singleListTaxType = (taxTypeFilter: TaxTypeFilter): Observable<TaxType[]> => {
        return this.httpObservable.post<TaxType[]>(kebabCase(nameof(this.singleListTaxType)), taxTypeFilter)
            .pipe(map((response: AxiosResponse<TaxType[]>) => response.data));
    };
    public singleListCustomerSalesOrderPaymentHistory = (customerSalesOrderPaymentHistoryFilter: CustomerSalesOrderPaymentHistoryFilter): Observable<CustomerSalesOrderPaymentHistory[]> => {
        return this.httpObservable.post<CustomerSalesOrderPaymentHistory[]>(kebabCase(nameof(this.singleListCustomerSalesOrderPaymentHistory)), customerSalesOrderPaymentHistoryFilter)
            .pipe(map((response: AxiosResponse<CustomerSalesOrderPaymentHistory[]>) => response.data));
    };
    public singleListPaymentType = (paymentTypeFilter: PaymentTypeFilter): Observable<PaymentType[]> => {
        return this.httpObservable.post<PaymentType[]>(kebabCase(nameof(this.singleListPaymentType)), paymentTypeFilter)
            .pipe(map((response: AxiosResponse<PaymentType[]>) => response.data));
    };

    public listItem = (itemFilter: ItemFilter): Observable<Item[]> => {
        return this.httpObservable.post<Item[]>(kebabCase(nameof(this.listItem)), itemFilter)
            .pipe(map((response: AxiosResponse<Item[]>) => response.data));
    };
    public countItem = (itemFilter: ItemFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.countItem)), itemFilter)
            .pipe(map((response: AxiosResponse<number>) => response.data));
    };
    
    public bulkDelete = (idList: number[] | string[]): Observable<void> => {
        return this.httpObservable.post(kebabCase(nameof(this.bulkDelete)), idList)
            .pipe(map((response: AxiosResponse<void>) => response.data));
    };

    public import = (file: File, name: string = nameof(file)): Observable<void> => {
        const formData: FormData = new FormData();
        formData.append(name, file as Blob);
        return this.httpObservable.post<void>(kebabCase(nameof(this.import)), formData)
            .pipe(map((response: AxiosResponse<void>) => response.data));
    };

    public export = (filter: any): Observable<AxiosResponse<any>> => {
        return this.httpObservable.post('export', filter, {
          responseType: 'arraybuffer',
        });
    };

    public exportTemplate = (): Observable<AxiosResponse<any>> => {
        return this.httpObservable.post('export-template', {}, {
          responseType: 'arraybuffer',
        });
    };
    
}

export const customerSalesOrderRepository = new CustomerSalesOrderRepository();
