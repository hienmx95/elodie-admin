import { AxiosResponse } from "axios";
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import { httpConfig } from "config/http";
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_PURCHASE_REQUEST_PLAN_PREFIX } from "config/api-consts";
import {
  PurchaseRequestPlan,
  PurchaseRequestPlanFilter,
} from "models/PurchaseRequestPlan";
import { AppUser, AppUserFilter } from "models/AppUser";
import { Currency, CurrencyFilter } from "models/Currency";
import { Organization, OrganizationFilter } from "models/Organization";
import { Status, StatusFilter } from "models/Status";
import {
  PurchaseRequestPlanContent,
  PurchaseRequestPlanContentFilter,
} from "models/PurchaseRequestPlanContent";
import { Category, CategoryFilter } from "models/Category";

export class PurchaseRequestPlanRepository extends Repository {
  constructor() {
    super(httpConfig);
    this.baseURL = url(BASE_API_URL, API_PURCHASE_REQUEST_PLAN_PREFIX);
  }

  public count = (
    purchaseRequestPlanFilter?: PurchaseRequestPlanFilter
  ): Observable<number> => {
    return this.httpObservable
      .post<number>(kebabCase(nameof(this.count)), purchaseRequestPlanFilter)
      .pipe(map((response: AxiosResponse<number>) => response.data));
  };

  public list = (
    purchaseRequestPlanFilter?: PurchaseRequestPlanFilter
  ): Observable<PurchaseRequestPlan[]> => {
    return this.httpObservable
      .post<PurchaseRequestPlan[]>(
        kebabCase(nameof(this.list)),
        purchaseRequestPlanFilter
      )
      .pipe(
        map((response: AxiosResponse<PurchaseRequestPlan[]>) => response.data)
      );
  };

  public get = (id: number | string): Observable<PurchaseRequestPlan> => {
    return this.httpObservable
      .post<PurchaseRequestPlan>(kebabCase(nameof(this.get)), { id })
      .pipe(
        map((response: AxiosResponse<PurchaseRequestPlan>) => response.data)
      );
  };

  public getDraft = (): Observable<PurchaseRequestPlan> => {
    return this.httpObservable
      .post<PurchaseRequestPlan>(kebabCase(nameof(this.getDraft)))
      .pipe(
        map((response: AxiosResponse<PurchaseRequestPlan>) => response.data)
      );
  };

  public create = (
    purchaseRequestPlan: PurchaseRequestPlan
  ): Observable<PurchaseRequestPlan> => {
    return this.httpObservable
      .post<PurchaseRequestPlan>(
        kebabCase(nameof(this.create)),
        purchaseRequestPlan
      )
      .pipe(
        map((response: AxiosResponse<PurchaseRequestPlan>) => response.data)
      );
  };

  public checkExist = (
    purchaseRequestPlan: PurchaseRequestPlan
  ): Observable<PurchaseRequestPlan> => {
    return this.httpObservable
      .post<PurchaseRequestPlan>(
        kebabCase(nameof(this.checkExist)),
        purchaseRequestPlan
      )
      .pipe(
        map((response: AxiosResponse<PurchaseRequestPlan>) => response.data)
      );
  };

  public update = (
    purchaseRequestPlan: PurchaseRequestPlan
  ): Observable<PurchaseRequestPlan> => {
    return this.httpObservable
      .post<PurchaseRequestPlan>(
        kebabCase(nameof(this.update)),
        purchaseRequestPlan
      )
      .pipe(
        map((response: AxiosResponse<PurchaseRequestPlan>) => response.data)
      );
  };

  public delete = (
    purchaseRequestPlan: PurchaseRequestPlan
  ): Observable<PurchaseRequestPlan> => {
    return this.httpObservable
      .post<PurchaseRequestPlan>(
        kebabCase(nameof(this.delete)),
        purchaseRequestPlan
      )
      .pipe(
        map((response: AxiosResponse<PurchaseRequestPlan>) => response.data)
      );
  };

  public save = (
    purchaseRequestPlan: PurchaseRequestPlan
  ): Observable<PurchaseRequestPlan> => {
    return purchaseRequestPlan.id
      ? this.update(purchaseRequestPlan)
      : this.create(purchaseRequestPlan);
  };

  public singleListAppUser = (
    appUserFilter: AppUserFilter
  ): Observable<AppUser[]> => {
    return this.httpObservable
      .post<AppUser[]>(kebabCase(nameof(this.singleListAppUser)), appUserFilter)
      .pipe(map((response: AxiosResponse<AppUser[]>) => response.data));
  };
  public singleListCurrency = (
    currencyFilter: CurrencyFilter
  ): Observable<Currency[]> => {
    return this.httpObservable
      .post<Currency[]>(
        kebabCase(nameof(this.singleListCurrency)),
        currencyFilter
      )
      .pipe(map((response: AxiosResponse<Currency[]>) => response.data));
  };
  public singleListOrganization = (
    organizationFilter: OrganizationFilter
  ): Observable<Organization[]> => {
    return this.httpObservable
      .post<Organization[]>(
        kebabCase(nameof(this.singleListOrganization)),
        organizationFilter
      )
      .pipe(map((response: AxiosResponse<Organization[]>) => response.data));
  };
  public singleListStatus = (): Observable<Status[]> => {
    return this.httpObservable
      .post<Status[]>(
        kebabCase(nameof(this.singleListStatus)),
        new StatusFilter()
      )
      .pipe(map((response: AxiosResponse<Status[]>) => response.data));
  };
  public singleListPurchaseRequestPlanContent = (
    purchaseRequestPlanContentFilter: PurchaseRequestPlanContentFilter
  ): Observable<PurchaseRequestPlanContent[]> => {
    return this.httpObservable
      .post<PurchaseRequestPlanContent[]>(
        kebabCase(nameof(this.singleListPurchaseRequestPlanContent)),
        purchaseRequestPlanContentFilter
      )
      .pipe(
        map(
          (response: AxiosResponse<PurchaseRequestPlanContent[]>) =>
            response.data
        )
      );
  };
  public singleListCategory = (
    categoryFilter: CategoryFilter
  ): Observable<Category[]> => {
    return this.httpObservable
      .post<Category[]>(
        kebabCase(nameof(this.singleListCategory)),
        categoryFilter
      )
      .pipe(map((response: AxiosResponse<Category[]>) => response.data));
  };

  public bulkDelete = (idList: number[] | string[]): Observable<void> => {
    return this.httpObservable
      .post(kebabCase(nameof(this.bulkDelete)), idList)
      .pipe(map((response: AxiosResponse<void>) => response.data));
  };

  public import = (
    file: File,
    name: string = nameof(file)
  ): Observable<void> => {
    const formData: FormData = new FormData();
    formData.append(name, file as Blob);
    return this.httpObservable
      .post<void>(kebabCase(nameof(this.import)), formData)
      .pipe(map((response: AxiosResponse<void>) => response.data));
  };

  public export = (filter: any): Observable<AxiosResponse<any>> => {
    return this.httpObservable.post("export", filter, {
      responseType: "arraybuffer",
    });
  };

  public exportTemplate = (): Observable<AxiosResponse<any>> => {
    return this.httpObservable.post(
      "export-template",
      {},
      {
        responseType: "arraybuffer",
      }
    );
  };

  public multiUpload = (files: File[]): Observable<any> => {
    const formData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i] as Blob);
    }
    return this.httpObservable
      .post<any>(kebabCase(nameof(this.multiUpload)), formData)
      .pipe(map((response: AxiosResponse<any>) => response.data));
  };

  public singleListYearKey = (): Observable<Status[]> => {
    return this.httpObservable
      .post<Status[]>(
        kebabCase(nameof(this.singleListYearKey)),
        new StatusFilter()
      )
      .pipe(map((response: AxiosResponse<Status[]>) => response.data));
  };

  public importContent = (file: File): Observable<void> => {
    const formData: FormData = new FormData();
    formData.append("file", file);
    return this.httpObservable
      .post<void>(kebabCase(nameof(this.importContent)), formData)
      .pipe(map((response: AxiosResponse<any>) => response.data));
  };

  public exportContent = (filter: any): Observable<AxiosResponse<any>> => {
    return this.httpObservable.post("export-content", filter, {
      responseType: "arraybuffer",
    });
  };

  public exportTemplateContent = (): Observable<AxiosResponse<any>> => {
    return this.httpObservable.post(
      "export-template-content",
      {},
      {
        responseType: "arraybuffer",
      }
    );
  };
}

export const purchaseRequestPlanRepository = new PurchaseRequestPlanRepository();
