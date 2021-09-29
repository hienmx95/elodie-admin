import { AxiosResponse } from "axios";
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import { httpConfig } from "config/http";
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_PURCHASE_REQUEST_PREFIX } from "config/api-consts";
import { PurchaseRequest, PurchaseRequestFilter } from "models/PurchaseRequest";
import { Currency, CurrencyFilter } from "models/Currency";
import {
  PrincipalContract,
  PrincipalContractFilter,
} from "models/PrincipalContract";
import { AppUser, AppUserFilter } from "models/AppUser";
import {
  PurchaseRequestType,
  PurchaseRequestTypeFilter,
} from "models/PurchaseRequestType";
import { Organization, OrganizationFilter } from "models/Organization";
import { Status, StatusFilter } from "models/Status";
import {
  PurchaseRequestContent,
  PurchaseRequestContentFilter,
} from "models/PurchaseRequestContent";
import { Category, CategoryFilter } from "models/Category";
import { Item, ItemFilter } from "models/Item";
import { TaxType, TaxTypeFilter } from "models/TaxType";
import { UnitOfMeasure, UnitOfMeasureFilter } from "models/UnitOfMeasure";
import {
  PurchaseRequestFileMapping,
  PurchaseRequestFileMappingFilter,
} from "models/PurchaseRequestFileMapping";
import { File, FileFilter } from "models/File";
import {
  PurchaseRequestTemplate,
  PurchaseRequestTemplateFilter,
} from "models/PurchaseRequestTemplate";
import { RequestState, RequestStateFilter } from "models/RequestState";
import { PurchasePlanFilter } from "models/PurchasePlan/PurchasePlanFilter";
import { PurchasePlan } from "models/PurchasePlan";

export interface ItemSelectOption {
  id: number,
  code: string,
  name: string
}

export class PurchaseRequestRepository extends Repository {
  constructor() {
    super(httpConfig);
    this.baseURL = url(BASE_API_URL, API_PURCHASE_REQUEST_PREFIX);
  }

  public count = (
    purchaseRequestFilter?: PurchaseRequestFilter
  ): Observable<number> => {
    return this.httpObservable
      .post<number>(kebabCase(nameof(this.count)), purchaseRequestFilter)
      .pipe(map((response: AxiosResponse<number>) => response.data));
  };

  public list = (
    purchaseRequestFilter?: PurchaseRequestFilter
  ): Observable<PurchaseRequest[]> => {
    return this.httpObservable
      .post<PurchaseRequest[]>(
        kebabCase(nameof(this.list)),
        purchaseRequestFilter
      )
      .pipe(map((response: AxiosResponse<PurchaseRequest[]>) => response.data));
  };
  public countPending = (
    purchaseRequestFilter?: PurchaseRequestFilter
  ): Observable<number> => {
    return this.httpObservable
      .post<number>(kebabCase(nameof(this.countPending)), purchaseRequestFilter)
      .pipe(map((response: AxiosResponse<number>) => response.data));
  };

  public listPending = (
    purchaseRequestFilter?: PurchaseRequestFilter
  ): Observable<PurchaseRequest[]> => {
    return this.httpObservable
      .post<PurchaseRequest[]>(
        kebabCase(nameof(this.listPending)),
        purchaseRequestFilter
      )
      .pipe(map((response: AxiosResponse<PurchaseRequest[]>) => response.data));
  };
  public countOwned = (
    purchaseRequestFilter?: PurchaseRequestFilter
  ): Observable<number> => {
    return this.httpObservable
      .post<number>(kebabCase(nameof(this.countOwned)), purchaseRequestFilter)
      .pipe(map((response: AxiosResponse<number>) => response.data));
  };

  public listOwned = (
    purchaseRequestFilter?: PurchaseRequestFilter
  ): Observable<PurchaseRequest[]> => {
    return this.httpObservable
      .post<PurchaseRequest[]>(
        kebabCase(nameof(this.listOwned)),
        purchaseRequestFilter
      )
      .pipe(map((response: AxiosResponse<PurchaseRequest[]>) => response.data));
  };
  public listPurchasePlan = (
    purchasePlanFilter?: PurchasePlanFilter
  ): Observable<PurchasePlan[]> => {
    return this.httpObservable
      .post<PurchasePlan[]>(
        kebabCase(nameof(this.listPurchasePlan)),
        purchasePlanFilter
      )
      .pipe(map((response: AxiosResponse<PurchasePlan[]>) => response.data));
  };
  public get = (id: number | string): Observable<PurchaseRequest> => {
    return this.httpObservable
      .post<PurchaseRequest>(kebabCase(nameof(this.get)), { id })
      .pipe(map((response: AxiosResponse<PurchaseRequest>) => response.data));
  };

  public create = (
    purchaseRequest: PurchaseRequest
  ): Observable<PurchaseRequest> => {
    return this.httpObservable
      .post<PurchaseRequest>(kebabCase(nameof(this.create)), purchaseRequest)
      .pipe(map((response: AxiosResponse<PurchaseRequest>) => response.data));
  };

  public update = (
    purchaseRequest: PurchaseRequest
  ): Observable<PurchaseRequest> => {
    return this.httpObservable
      .post<PurchaseRequest>(kebabCase(nameof(this.update)), purchaseRequest)
      .pipe(map((response: AxiosResponse<PurchaseRequest>) => response.data));
  };

  public delete = (
    purchaseRequest: PurchaseRequest
  ): Observable<PurchaseRequest> => {
    return this.httpObservable
      .post<PurchaseRequest>(kebabCase(nameof(this.delete)), purchaseRequest)
      .pipe(map((response: AxiosResponse<PurchaseRequest>) => response.data));
  };

  public save = (
    purchaseRequest: PurchaseRequest
  ): Observable<PurchaseRequest> => {
    return purchaseRequest.id
      ? this.update(purchaseRequest)
      : this.create(purchaseRequest);
  };
  public send = (
    purchaseRequest: PurchaseRequest
  ): Observable<PurchaseRequest> => {
    return this.httpObservable
      .post<PurchaseRequest>(kebabCase(nameof(this.send)), purchaseRequest)
      .pipe(map((response: AxiosResponse<PurchaseRequest>) => response.data));
  };
  public approve = (
    purchaseRequest: PurchaseRequest
  ): Observable<PurchaseRequest> => {
    return this.httpObservable
      .post<PurchaseRequest>(kebabCase(nameof(this.approve)), purchaseRequest)
      .pipe(map((response: AxiosResponse<PurchaseRequest>) => response.data));
  };
  public reject = (
    purchaseRequest: PurchaseRequest
  ): Observable<PurchaseRequest> => {
    return this.httpObservable
      .post<PurchaseRequest>(kebabCase(nameof(this.reject)), purchaseRequest)
      .pipe(map((response: AxiosResponse<PurchaseRequest>) => response.data));
  };
  public redo = (
    purchaseRequest: PurchaseRequest
  ): Observable<PurchaseRequest> => {
    return this.httpObservable
      .post<PurchaseRequest>(kebabCase(nameof(this.redo)), purchaseRequest)
      .pipe(map((response: AxiosResponse<PurchaseRequest>) => response.data));
  };
  public finish = (
    purchaseRequest: PurchaseRequest
  ): Observable<PurchaseRequest> => {
    return this.httpObservable
      .post<PurchaseRequest>(kebabCase(nameof(this.finish)), purchaseRequest)
      .pipe(map((response: AxiosResponse<PurchaseRequest>) => response.data));
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
  public singleListPrincipalContract = (
    principalContractFilter: PrincipalContractFilter
  ): Observable<PrincipalContract[]> => {
    return this.httpObservable
      .post<PrincipalContract[]>(
        kebabCase(nameof(this.singleListPrincipalContract)),
        principalContractFilter
      )
      .pipe(
        map((response: AxiosResponse<PrincipalContract[]>) => response.data)
      );
  };
  public singleListAppUser = (
    appUserFilter: AppUserFilter
  ): Observable<AppUser[]> => {
    return this.httpObservable
      .post<AppUser[]>(kebabCase(nameof(this.singleListAppUser)), appUserFilter)
      .pipe(map((response: AxiosResponse<AppUser[]>) => response.data));
  };
  public filterListAppUser = (
    appUserFilter: AppUserFilter
  ): Observable<AppUser[]> => {
    return this.httpObservable
      .post<AppUser[]>(kebabCase(nameof(this.filterListAppUser)), appUserFilter)
      .pipe(map((response: AxiosResponse<AppUser[]>) => response.data));
  };
  public singleListPurchaseRequestType = (): Observable<
    PurchaseRequestType[]
  > => {
    return this.httpObservable
      .post<PurchaseRequestType[]>(
        kebabCase(nameof(this.singleListPurchaseRequestType)),
        new PurchaseRequestTypeFilter()
      )
      .pipe(
        map((response: AxiosResponse<PurchaseRequestType[]>) => response.data)
      );
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
  public singleListStatus = (): Observable<Status[]> => {
    return this.httpObservable
      .post<Status[]>(
        kebabCase(nameof(this.singleListStatus)),
        new StatusFilter()
      )
      .pipe(map((response: AxiosResponse<Status[]>) => response.data));
  };
  public singleListPurchaseRequestContent = (
    purchaseRequestContentFilter: PurchaseRequestContentFilter
  ): Observable<PurchaseRequestContent[]> => {
    return this.httpObservable
      .post<PurchaseRequestContent[]>(
        kebabCase(nameof(this.singleListPurchaseRequestContent)),
        purchaseRequestContentFilter
      )
      .pipe(
        map(
          (response: AxiosResponse<PurchaseRequestContent[]>) => response.data
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
  public filterListRequestState = (
    requestStateFilter: RequestStateFilter
  ): Observable<RequestState[]> => {
    return this.httpObservable
      .post<RequestState[]>(
        kebabCase(nameof(this.filterListRequestState)),
        requestStateFilter
      )
      .pipe(map((response: AxiosResponse<RequestState[]>) => response.data));
  };
  public listItem = (itemFilter: ItemFilter): Observable<Item[]> => {
    return this.httpObservable
      .post<Item[]>(kebabCase(nameof(this.listItem)), itemFilter)
      .pipe(map((response: AxiosResponse<Item[]>) => response.data));
  };
  public countItem = (itemFilter: ItemFilter): Observable<number> => {
    return this.httpObservable
      .post<number>(kebabCase(nameof(this.countItem)), itemFilter)
      .pipe(map((response: AxiosResponse<number>) => response.data));
  };
  public singleListTaxType = (
    taxTypeFilter: TaxTypeFilter
  ): Observable<TaxType[]> => {
    return this.httpObservable
      .post<TaxType[]>(kebabCase(nameof(this.singleListTaxType)), taxTypeFilter)
      .pipe(map((response: AxiosResponse<TaxType[]>) => response.data));
  };
  public singleListUnitOfMeasure = (
    unitOfMeasureFilter: UnitOfMeasureFilter
  ): Observable<UnitOfMeasure[]> => {
    return this.httpObservable
      .post<UnitOfMeasure[]>(
        kebabCase(nameof(this.singleListUnitOfMeasure)),
        unitOfMeasureFilter
      )
      .pipe(map((response: AxiosResponse<UnitOfMeasure[]>) => response.data));
  };
  public singleListPurchaseRequestFileMapping = (
    purchaseRequestFileMappingFilter: PurchaseRequestFileMappingFilter
  ): Observable<PurchaseRequestFileMapping[]> => {
    return this.httpObservable
      .post<PurchaseRequestFileMapping[]>(
        kebabCase(nameof(this.singleListPurchaseRequestFileMapping)),
        purchaseRequestFileMappingFilter
      )
      .pipe(
        map(
          (response: AxiosResponse<PurchaseRequestFileMapping[]>) =>
            response.data
        )
      );
  };

  public singleListFile = (fileFilter: FileFilter): Observable<File[]> => {
    return this.httpObservable
      .post<File[]>(kebabCase(nameof(this.singleListFile)), fileFilter)
      .pipe(map((response: AxiosResponse<File[]>) => response.data));
  };

  public singleListItemSelectOption = (filter?: any): Observable<ItemSelectOption[]> => {
    return this.httpObservable
      .post<File[]>(kebabCase(nameof(this.singleListItemSelectOption)), filter)
      .pipe(map((response: AxiosResponse<ItemSelectOption[]>) => response.data));
  };

  public countFile = (fileFilter: FileFilter): Observable<number> => {
    return this.httpObservable
      .post<number>(kebabCase(nameof(this.countFile)), fileFilter)
      .pipe(map((response: AxiosResponse<number>) => response.data));
  };
  public listFile = (fileFilter: FileFilter): Observable<File[]> => {
    return this.httpObservable
      .post<File[]>(kebabCase(nameof(this.listFile)), fileFilter)
      .pipe(map((response: AxiosResponse<File[]>) => response.data));
  };
  public importFile = (
    file: File,
    name: string = nameof(file)
  ): Observable<void> => {
    const formData: FormData = new FormData();
    formData.append(name, file as Blob);
    return this.httpObservable
      .post<void>(kebabCase(nameof(this.importFile)), formData)
      .pipe(map((response: AxiosResponse<void>) => response.data));
  };
  public exportFile = (filter: any): Observable<AxiosResponse<any>> => {
    return this.httpObservable.post(
      kebabCase(nameof(this.exportFile)),
      filter,
      {
        responseType: "arraybuffer",
      }
    );
  };
  public exportTemplateFile = (): Observable<AxiosResponse<any>> => {
    return this.httpObservable.post(
      kebabCase(nameof(this.exportTemplateFile)),
      {},
      {
        responseType: "arraybuffer",
      }
    );
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

  // save template

  public countTemplate = (
    templateFilter?: PurchaseRequestTemplateFilter
  ): Observable<number> => {
    return this.httpObservable
      .post<number>(
        kebabCase(nameof(this.countTemplate)),
        templateFilter
      )
      .pipe(map((response: AxiosResponse<number>) => response.data));
  };

  public listTemplate = (
    templateFilter?: PurchaseRequestTemplateFilter
  ): Observable<PurchaseRequestTemplate[]> => {
    return this.httpObservable
      .post<PurchaseRequestTemplate[]>(
        kebabCase(nameof(this.listTemplate)),
        templateFilter
      )
      .pipe(
        map(
          (response: AxiosResponse<PurchaseRequestTemplate[]>) => response.data
        )
      );
  };

  public getTemplate = (
    id: number | string
  ): Observable<PurchaseRequestTemplate> => {
    return this.httpObservable
      .post<PurchaseRequestTemplate>(
        kebabCase(nameof(this.getTemplate)),
        { id }
      )
      .pipe(
        map((response: AxiosResponse<PurchaseRequestTemplate>) => response.data)
      );
  };

  public createTemplate = (
    model: PurchaseRequestTemplate
  ): Observable<PurchaseRequestTemplate> => {
    return this.httpObservable
      .post<PurchaseRequestTemplate>(
        kebabCase(nameof(this.createTemplate)),
        model
      )
      .pipe(map((response: AxiosResponse<any>) => response.data));
  };
  public updateTemplate = (
    model: PurchaseRequestTemplate
  ): Observable<PurchaseRequestTemplate> => {
    return this.httpObservable
      .post<PurchaseRequestTemplate>(
        kebabCase(nameof(this.updateTemplate)),
        model
      )
      .pipe(map((response: AxiosResponse<any>) => response.data));
  };

  public saveTemplate = (
    purchaseRequestTemplate: PurchaseRequestTemplate
  ): Observable<PurchaseRequestTemplate> => {
    return purchaseRequestTemplate.id
      ? this.updateTemplate(purchaseRequestTemplate)
      : this.createTemplate(purchaseRequestTemplate);
  };

  public hasExceededQuota = (
    model: PurchaseRequest
  ): Observable<boolean> => {
    return this.httpObservable
      .post<PurchaseRequest>(
        kebabCase(nameof(this.hasExceededQuota)),
        model
      )
      .pipe(map((response: AxiosResponse<any>) => response.data));
  };
  public print = (
    purchaseRequest: PurchaseRequest
  ): Observable<PurchaseRequest> => {
    return this.httpObservable
      .post<PurchaseRequest>(kebabCase(nameof(this.print)), purchaseRequest)
      .pipe(map((response: AxiosResponse<any>) => response.data));
  };
}

export const purchaseRequestRepository = new PurchaseRequestRepository();
