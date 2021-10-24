import { AxiosResponse } from "axios";
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import { httpConfig } from "config/http";
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_CUSTOMER_SALES_ORDER_ITEM_REPORT_PREFIX } from "config/api-consts";
import {
  GeneralCustomerSalesOrderReport,
  GeneralCustomerSalesOrderReportFilter,
} from "models/GeneralCustomerSalesOrderReport";
import { Menu, MenuFilter } from "models/Menu";
import { Organization, OrganizationFilter } from "models/Organization";
import { Item, ItemFilter } from "models/Item";
import { Supplier, SupplierFilter } from "models/Supplier";

export class CustomerSalesOrderItemReportRepository extends Repository {
  constructor() {
    super(httpConfig);
    this.baseURL = url(
      BASE_API_URL,
      API_CUSTOMER_SALES_ORDER_ITEM_REPORT_PREFIX
    );
  }

  public list = (
    filter?: GeneralCustomerSalesOrderReportFilter
  ): Observable<GeneralCustomerSalesOrderReport[]> => {
    return this.httpObservable
      .post<GeneralCustomerSalesOrderReport[]>(kebabCase(nameof(this.list)), filter)
      .pipe(
        map((response: AxiosResponse<GeneralCustomerSalesOrderReport[]>) => response.data)
      );
  };

  public count = (filter?: GeneralCustomerSalesOrderReportFilter): Observable<number> => {
    return this.httpObservable
      .post<number>(kebabCase(nameof(this.count)), filter)
      .pipe(map((response: AxiosResponse<number>) => response.data));
  };

  public singleListMenu = (menuFilter: MenuFilter): Observable<Menu[]> => {
    return this.httpObservable
      .post<Menu[]>(kebabCase(nameof(this.singleListMenu)), menuFilter)
      .pipe(map((response: AxiosResponse<Menu[]>) => response.data));
  };

  public export = (filter: any): Observable<AxiosResponse<any>> => {
    return this.httpObservable.post("export", filter, {
      responseType: "arraybuffer",
    });
  };

  public filterListOrganization = (
    organizationFilter: OrganizationFilter
  ): Observable<Organization[]> => {
    return this.httpObservable
      .post<Organization[]>(
        kebabCase(nameof(this.filterListOrganization)),
        organizationFilter
      )
      .pipe(map((response: AxiosResponse<Organization[]>) => response.data));
  };

  public filterListItem = (itemFilter: ItemFilter): Observable<Item[]> => {
    return this.httpObservable
      .post<Item[]>(kebabCase(nameof(this.filterListItem)), itemFilter)
      .pipe(map((response: AxiosResponse<Item[]>) => response.data));
  };

  public filterListSupplier = (
    filter: SupplierFilter
  ): Observable<Supplier[]> => {
    return this.httpObservable
      .post<Supplier[]>(kebabCase(nameof(this.filterListSupplier)), filter)
      .pipe(map((response: AxiosResponse<Supplier[]>) => response.data));
  };
}

export const customerSalesOrderItemReportRepository = new CustomerSalesOrderItemReportRepository();
