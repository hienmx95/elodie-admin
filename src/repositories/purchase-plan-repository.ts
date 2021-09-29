import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import { AxiosResponse } from "axios";
import { API_PURCHASE_PLAN_PREFIX } from "config/api-consts";
import { BASE_API_URL } from "config/consts";
import { httpConfig } from "config/http";
import { AppUser, AppUserFilter } from "models/AppUser";
import { Category, CategoryFilter } from "models/Category";
import { Criterion, CriterionFilter } from "models/Criterion";
import { Currency, CurrencyFilter } from "models/Currency";
import { File } from "models/File";
import { Item, ItemFilter } from "models/Item";
import { Organization, OrganizationFilter } from "models/Organization";
import { PurchasePlan, PurchasePlanFilter } from "models/PurchasePlan";
import {
  PurchasePlanContent,
  PurchasePlanContentFilter,
} from "models/PurchasePlanContent";
import {
  PurchasePlanCriterionMapping,
  PurchasePlanCriterionMappingFilter,
} from "models/PurchasePlanCriterionMapping";
import { PurchasePlanMail } from "models/PurchasePlanMail";
import {
  PurchasePlanStatus,
  PurchasePlanStatusFilter,
} from "models/PurchasePlanStatus";
import {
  PurchasePlanSupplierMapping,
  PurchasePlanSupplierMappingFilter,
} from "models/PurchasePlanSupplierMapping";
import {
  PurchasePlanTradeConditionMapping,
  PurchasePlanTradeConditionMappingFilter,
} from "models/PurchasePlanTradeConditionMapping";
import {
  PurchasePlanType,
  PurchasePlanTypeFilter,
} from "models/PurchasePlanType";
import { PurchaseRequest, PurchaseRequestFilter } from "models/PurchaseRequest";
import {
  PurchaseRequestContent,
  PurchaseRequestContentFilter,
} from "models/PurchaseRequestContent";
import { Quotation } from "models/Quotation";
import { QuotationHistory } from "models/QuotationHistory";
import { SavingType, SavingTypeFilter } from "models/SavingType";
import { Status, StatusFilter } from "models/Status";
import { Supplier, SupplierFilter } from "models/Supplier";
import { TaxType, TaxTypeFilter } from "models/TaxType";
import { TradeCondition, TradeConditionFilter } from "models/TradeCondition";
import { UnitOfMeasure, UnitOfMeasureFilter } from "models/UnitOfMeasure";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

export interface ItemSelectOption {
  id: number;
  code: string;
  name: string;
}

export class PurchasePlanRepository extends Repository {
  constructor() {
    super(httpConfig);
    this.baseURL = url(BASE_API_URL, API_PURCHASE_PLAN_PREFIX);
  }

  public count = (
    purchasePlanFilter?: PurchasePlanFilter
  ): Observable<number> => {
    return this.httpObservable
      .post<number>(kebabCase(nameof(this.count)), purchasePlanFilter)
      .pipe(map((response: AxiosResponse<number>) => response.data));
  };

  public list = (
    purchasePlanFilter?: PurchasePlanFilter
  ): Observable<PurchasePlan[]> => {
    return this.httpObservable
      .post<PurchasePlan[]>(kebabCase(nameof(this.list)), purchasePlanFilter)
      .pipe(map((response: AxiosResponse<PurchasePlan[]>) => response.data));
  };

  public countPending = (
    purchasePlanFilter?: PurchasePlanFilter
  ): Observable<number> => {
    return this.httpObservable
      .post<number>(kebabCase(nameof(this.countPending)), purchasePlanFilter)
      .pipe(map((response: AxiosResponse<number>) => response.data));
  };

  public listPending = (
    purchasePlanFilter?: PurchasePlanFilter
  ): Observable<PurchasePlan[]> => {
    return this.httpObservable
      .post<PurchasePlan[]>(
        kebabCase(nameof(this.listPending)),
        purchasePlanFilter
      )
      .pipe(map((response: AxiosResponse<PurchasePlan[]>) => response.data));
  };
  public countOwned = (
    purchasePlanFilter?: PurchasePlanFilter
  ): Observable<number> => {
    return this.httpObservable
      .post<number>(kebabCase(nameof(this.countOwned)), purchasePlanFilter)
      .pipe(map((response: AxiosResponse<number>) => response.data));
  };

  public listOwned = (
    purchasePlanFilter?: PurchasePlanFilter
  ): Observable<PurchasePlan[]> => {
    return this.httpObservable
      .post<PurchasePlan[]>(
        kebabCase(nameof(this.listOwned)),
        purchasePlanFilter
      )
      .pipe(map((response: AxiosResponse<PurchasePlan[]>) => response.data));
  };

  public get = (id: number | string): Observable<PurchasePlan> => {
    return this.httpObservable
      .post<PurchasePlan>(kebabCase(nameof(this.get)), { id })
      .pipe(map((response: AxiosResponse<PurchasePlan>) => response.data));
  };

  public getQuotationHistory = (
    id: number | string
  ): Observable<PurchasePlan> => {
    return this.httpObservable
      .post<PurchasePlan>(kebabCase(nameof(this.getQuotationHistory)), { id })
      .pipe(map((response: AxiosResponse<PurchasePlan>) => response.data));
  };

  public create = (purchasePlan: PurchasePlan): Observable<PurchasePlan> => {
    return this.httpObservable
      .post<PurchasePlan>(kebabCase(nameof(this.create)), purchasePlan)
      .pipe(map((response: AxiosResponse<PurchasePlan>) => response.data));
  };

  public update = (purchasePlan: PurchasePlan): Observable<PurchasePlan> => {
    return this.httpObservable
      .post<PurchasePlan>(kebabCase(nameof(this.update)), purchasePlan)
      .pipe(map((response: AxiosResponse<PurchasePlan>) => response.data));
  };

  public updateClosing = (
    quotationHistory: QuotationHistory
  ): Observable<QuotationHistory> => {
    return this.httpObservable
      .post<QuotationHistory>(
        kebabCase(nameof(this.updateClosing)),
        quotationHistory
      )
      .pipe(map((response: AxiosResponse<QuotationHistory>) => response.data));
  };

  public delete = (purchasePlan: PurchasePlan): Observable<PurchasePlan> => {
    return this.httpObservable
      .post<PurchasePlan>(kebabCase(nameof(this.delete)), purchasePlan)
      .pipe(map((response: AxiosResponse<PurchasePlan>) => response.data));
  };

  public save = (purchasePlan: PurchasePlan): Observable<PurchasePlan> => {
    return purchasePlan.id
      ? this.update(purchasePlan)
      : this.create(purchasePlan);
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
  public singleListPurchasePlanStatus = (
    purchasePlanStatusFilter: PurchasePlanStatusFilter
  ): Observable<PurchasePlanStatus[]> => {
    return this.httpObservable
      .post<PurchasePlanStatus[]>(
        kebabCase(nameof(this.singleListPurchasePlanStatus)),
        purchasePlanStatusFilter
      )
      .pipe(
        map((response: AxiosResponse<PurchasePlanStatus[]>) => response.data)
      );
  };
  public filterListPurchasePlanType = (): Observable<PurchasePlanType[]> => {
    return this.httpObservable
      .post<PurchasePlanType[]>(
        kebabCase(nameof(this.filterListPurchasePlanType)),
        new PurchasePlanTypeFilter()
      )
      .pipe(
        map((response: AxiosResponse<PurchasePlanType[]>) => response.data)
      );
  };

  public singleListPurchasePlanType = (): Observable<PurchasePlanType[]> => {
    return this.httpObservable
      .post<PurchasePlanType[]>(
        kebabCase(nameof(this.singleListPurchasePlanType)),
        new PurchasePlanTypeFilter()
      )
      .pipe(
        map((response: AxiosResponse<PurchasePlanType[]>) => response.data)
      );
  };
  public singleListPurchaseRequest = (
    purchaseRequestFilter: PurchaseRequestFilter
  ): Observable<PurchaseRequest[]> => {
    return this.httpObservable
      .post<PurchaseRequest[]>(
        kebabCase(nameof(this.singleListPurchaseRequest)),
        purchaseRequestFilter
      )
      .pipe(map((response: AxiosResponse<PurchaseRequest[]>) => response.data));
  };
  public singleListSupplier = (
    supplierFilter: SupplierFilter
  ): Observable<Supplier[]> => {
    return this.httpObservable
      .post<Supplier[]>(
        kebabCase(nameof(this.singleListSupplier)),
        supplierFilter
      )
      .pipe(map((response: AxiosResponse<Supplier[]>) => response.data));
  };
  public singleListStatus = (): Observable<Status[]> => {
    return this.httpObservable
      .post<Status[]>(
        kebabCase(nameof(this.singleListStatus)),
        new StatusFilter()
      )
      .pipe(map((response: AxiosResponse<Status[]>) => response.data));
  };
  public singleListPurchasePlanContent = (
    purchasePlanContentFilter: PurchasePlanContentFilter
  ): Observable<PurchasePlanContent[]> => {
    return this.httpObservable
      .post<PurchasePlanContent[]>(
        kebabCase(nameof(this.singleListPurchasePlanContent)),
        purchasePlanContentFilter
      )
      .pipe(
        map((response: AxiosResponse<PurchasePlanContent[]>) => response.data)
      );
  };
  public singleListItem = (itemFilter: ItemFilter): Observable<Item[]> => {
    return this.httpObservable
      .post<Item[]>(kebabCase(nameof(this.singleListItem)), itemFilter)
      .pipe(map((response: AxiosResponse<Item[]>) => response.data));
  };
  public singleListSavingType = (): Observable<SavingType[]> => {
    return this.httpObservable
      .post<SavingType[]>(
        kebabCase(nameof(this.singleListSavingType)),
        new SavingTypeFilter()
      )
      .pipe(map((response: AxiosResponse<SavingType[]>) => response.data));
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
  public singleListPurchasePlanTradeConditionMapping = (
    purchasePlanTradeConditionMappingFilter: PurchasePlanTradeConditionMappingFilter
  ): Observable<PurchasePlanTradeConditionMapping[]> => {
    return this.httpObservable
      .post<PurchasePlanTradeConditionMapping[]>(
        kebabCase(nameof(this.singleListPurchasePlanTradeConditionMapping)),
        purchasePlanTradeConditionMappingFilter
      )
      .pipe(
        map(
          (response: AxiosResponse<PurchasePlanTradeConditionMapping[]>) =>
            response.data
        )
      );
  };
  public singleListTradeCondition = (
    tradeConditionFilter: TradeConditionFilter
  ): Observable<TradeCondition[]> => {
    return this.httpObservable
      .post<TradeCondition[]>(
        kebabCase(nameof(this.singleListTradeCondition)),
        tradeConditionFilter
      )
      .pipe(map((response: AxiosResponse<TradeCondition[]>) => response.data));
  };

  public countTradeCondition = (
    tradeConditionFilter: TradeConditionFilter
  ): Observable<number> => {
    return this.httpObservable
      .post<number>(
        kebabCase(nameof(this.countTradeCondition)),
        tradeConditionFilter
      )
      .pipe(map((response: AxiosResponse<number>) => response.data));
  };
  public listTradeCondition = (
    tradeConditionFilter: TradeConditionFilter
  ): Observable<TradeCondition[]> => {
    return this.httpObservable
      .post<TradeCondition[]>(
        kebabCase(nameof(this.listTradeCondition)),
        tradeConditionFilter
      )
      .pipe(map((response: AxiosResponse<TradeCondition[]>) => response.data));
  };
  public importTradeCondition = (
    file: File,
    name: string = nameof(file)
  ): Observable<void> => {
    const formData: FormData = new FormData();
    formData.append(name, file as Blob);
    return this.httpObservable
      .post<void>(kebabCase(nameof(this.importTradeCondition)), formData)
      .pipe(map((response: AxiosResponse<void>) => response.data));
  };
  public exportTradeCondition = (
    filter: any
  ): Observable<AxiosResponse<any>> => {
    return this.httpObservable.post(
      kebabCase(nameof(this.exportTradeCondition)),
      filter,
      {
        responseType: "arraybuffer",
      }
    );
  };
  public exportTemplateTradeCondition = (): Observable<AxiosResponse<any>> => {
    return this.httpObservable.post(
      kebabCase(nameof(this.exportTemplateTradeCondition)),
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

  public getDraft = (purchasePlan: PurchasePlan): Observable<PurchasePlan> => {
    return this.httpObservable
      .post<PurchasePlan>(kebabCase(nameof(this.getDraft)), purchasePlan)
      .pipe(map((response: AxiosResponse<PurchasePlan>) => response.data));
  };

  public getDraftClosing = (
    purchasePlan: PurchasePlan
  ): Observable<PurchasePlan> => {
    return this.httpObservable
      .post<PurchasePlan>(kebabCase(nameof(this.getDraftClosing)), purchasePlan)
      .pipe(map((response: AxiosResponse<PurchasePlan>) => response.data));
  };

  public createMail = (email?: PurchasePlanMail): Observable<any> => {
    return this.httpObservable
      .post<any>(kebabCase(nameof(this.createMail)), email)
      .pipe(map((response: AxiosResponse<PurchasePlanMail>) => response.data));
  };

  public singleListMailTemplate = (
    filter: StatusFilter
  ): Observable<Status[]> => {
    return this.httpObservable
      .post<Status[]>(kebabCase(nameof(this.singleListMailTemplate)), filter)
      .pipe(map((response: AxiosResponse<Status[]>) => response.data));
  };

  public countPurchaseRequest = (
    purchaseRequestFilter?: PurchaseRequestFilter
  ): Observable<number> => {
    return this.httpObservable
      .post<number>(
        kebabCase(nameof(this.countPurchaseRequest)),
        purchaseRequestFilter
      )
      .pipe(map((response: AxiosResponse<number>) => response.data));
  };

  public listPurchaseRequest = (
    purchaseRequestFilter?: PurchaseRequestFilter
  ): Observable<PurchaseRequest[]> => {
    return this.httpObservable
      .post<PurchaseRequest[]>(
        kebabCase(nameof(this.listPurchaseRequest)),
        purchaseRequestFilter
      )
      .pipe(map((response: AxiosResponse<PurchaseRequest[]>) => response.data));
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

  public singleListPurchasePlanCriterionMapping = (
    purchasePlanCriterionMappingFilter: PurchasePlanCriterionMappingFilter
  ): Observable<PurchasePlanCriterionMapping[]> => {
    return this.httpObservable
      .post<PurchasePlanCriterionMapping[]>(
        kebabCase(nameof(this.singleListPurchasePlanCriterionMapping)),
        purchasePlanCriterionMappingFilter
      )
      .pipe(
        map(
          (response: AxiosResponse<PurchasePlanCriterionMapping[]>) =>
            response.data
        )
      );
  };
  public singleListCriterion = (
    criterionFilter: CriterionFilter
  ): Observable<Criterion[]> => {
    return this.httpObservable
      .post<Criterion[]>(
        kebabCase(nameof(this.singleListCriterion)),
        criterionFilter
      )
      .pipe(map((response: AxiosResponse<Criterion[]>) => response.data));
  };
  public singleListPurchasePlanSupplierMapping = (
    purchasePlanSupplierMappingFilter: PurchasePlanSupplierMappingFilter
  ): Observable<PurchasePlanSupplierMapping[]> => {
    return this.httpObservable
      .post<PurchasePlanSupplierMapping[]>(
        kebabCase(nameof(this.singleListPurchasePlanSupplierMapping)),
        purchasePlanSupplierMappingFilter
      )
      .pipe(
        map(
          (response: AxiosResponse<PurchasePlanSupplierMapping[]>) =>
            response.data
        )
      );
  };

  public countCriterion = (
    criterionFilter: CriterionFilter
  ): Observable<number> => {
    return this.httpObservable
      .post<number>(kebabCase(nameof(this.countCriterion)), criterionFilter)
      .pipe(map((response: AxiosResponse<number>) => response.data));
  };
  public listCriterion = (
    criterionFilter: CriterionFilter
  ): Observable<Criterion[]> => {
    return this.httpObservable
      .post<Criterion[]>(kebabCase(nameof(this.listCriterion)), criterionFilter)
      .pipe(map((response: AxiosResponse<Criterion[]>) => response.data));
  };
  public importCriterion = (
    file: File,
    name: string = nameof(file)
  ): Observable<void> => {
    const formData: FormData = new FormData();
    formData.append(name, file as Blob);
    return this.httpObservable
      .post<void>(kebabCase(nameof(this.importCriterion)), formData)
      .pipe(map((response: AxiosResponse<void>) => response.data));
  };
  public exportCriterion = (filter: any): Observable<AxiosResponse<any>> => {
    return this.httpObservable.post(
      kebabCase(nameof(this.exportCriterion)),
      filter,
      {
        responseType: "arraybuffer",
      }
    );
  };
  public exportTemplateCriterion = (): Observable<AxiosResponse<any>> => {
    return this.httpObservable.post(
      kebabCase(nameof(this.exportTemplateCriterion)),
      {},
      {
        responseType: "arraybuffer",
      }
    );
  };

  public countSupplier = (
    supplierFilter: SupplierFilter
  ): Observable<number> => {
    return this.httpObservable
      .post<number>(kebabCase(nameof(this.countSupplier)), supplierFilter)
      .pipe(map((response: AxiosResponse<number>) => response.data));
  };
  public listSupplier = (
    supplierFilter: SupplierFilter
  ): Observable<Supplier[]> => {
    return this.httpObservable
      .post<Supplier[]>(kebabCase(nameof(this.listSupplier)), supplierFilter)
      .pipe(map((response: AxiosResponse<Supplier[]>) => response.data));
  };
  public importSupplier = (
    file: File,
    name: string = nameof(file)
  ): Observable<void> => {
    const formData: FormData = new FormData();
    formData.append(name, file as Blob);
    return this.httpObservable
      .post<void>(kebabCase(nameof(this.importSupplier)), formData)
      .pipe(map((response: AxiosResponse<void>) => response.data));
  };
  public exportSupplier = (filter: any): Observable<AxiosResponse<any>> => {
    return this.httpObservable.post(
      kebabCase(nameof(this.exportSupplier)),
      filter,
      {
        responseType: "arraybuffer",
      }
    );
  };
  public exportTemplateSupplier = (): Observable<AxiosResponse<any>> => {
    return this.httpObservable.post(
      kebabCase(nameof(this.exportTemplateSupplier)),
      {},
      {
        responseType: "arraybuffer",
      }
    );
  };

  public createMailTemplate = (
    purchasePlan: PurchasePlan
  ): Observable<PurchasePlan> => {
    return this.httpObservable
      .post<PurchasePlan>(
        kebabCase(nameof(this.createMailTemplate)),
        purchasePlan
      )
      .pipe(map((response: AxiosResponse<PurchasePlan>) => response.data));
  };

  public singleListItemSelectOption = (
    filter?: any
  ): Observable<ItemSelectOption[]> => {
    return this.httpObservable
      .post<File[]>(kebabCase(nameof(this.singleListItemSelectOption)), filter)
      .pipe(
        map((response: AxiosResponse<ItemSelectOption[]>) => response.data)
      );
  };

  public singleListPurchasePlanMailMarker = (
    filter?: any
  ): Observable<ItemSelectOption[]> => {
    return this.httpObservable
      .post<File[]>(
        kebabCase(nameof(this.singleListPurchasePlanMailMarker)),
        filter
      )
      .pipe(
        map((response: AxiosResponse<ItemSelectOption[]>) => response.data)
      );
  };

  public listQuotationHistoryBySupplier = (
    requestForQuotationId: number | string,
    supplierId: number | string
  ): Observable<Quotation[]> => {
    return this.httpObservable
      .post<Quotation>(kebabCase(nameof(this.listQuotationHistoryBySupplier)), {
        requestForQuotationId,
        supplierId,
      })
      .pipe(map((response: AxiosResponse<Quotation[]>) => response.data));
  };

  public getLowestPrice = (body: any): Observable<any> => {
    return this.httpObservable
      .post<any>(kebabCase(nameof(this.getLowestPrice)), body)
      .pipe(map((response: AxiosResponse<any>) => response.data));
  };

  public getSupplierRankingByPrice = (id: string | number): Observable<any> => {
    return this.httpObservable
      .post<any>(kebabCase(nameof(this.getSupplierRankingByPrice)), {
        id,
      })
      .pipe(map((response: AxiosResponse<any>) => response.data));
  };

  public getSupplier = (id: number | string): Observable<Supplier> => {
    return this.httpObservable
      .post<Supplier>(kebabCase(nameof(this.getSupplier)), { id })
      .pipe(map((response: AxiosResponse<Supplier>) => response.data));
  };

  public sendRequestForQuotation = (
    purchasePlan: PurchasePlan
  ): Observable<PurchasePlan> => {
    return this.httpObservable
      .post<PurchasePlan>(
        kebabCase(nameof(this.sendRequestForQuotation)),
        purchasePlan
      )
      .pipe(map((response: AxiosResponse<PurchasePlan>) => response.data));
  };

  public getClosing = (id: number | string): Observable<PurchasePlan> => {
    return this.httpObservable
      .post<PurchasePlan>(kebabCase(nameof(this.getClosing)), { id })
      .pipe(map((response: AxiosResponse<PurchasePlan>) => response.data));
  };
  public rechooseSupplier = (id: number | string): Observable<PurchasePlan> => {
    return this.httpObservable
      .post<PurchasePlan>(kebabCase(nameof(this.rechooseSupplier)), { id })
      .pipe(map((response: AxiosResponse<PurchasePlan>) => response.data));
  };
  public cancel = (id: number | string): Observable<PurchasePlan> => {
    return this.httpObservable
      .post<PurchasePlan>(kebabCase(nameof(this.cancel)), { id })
      .pipe(map((response: AxiosResponse<PurchasePlan>) => response.data));
  };

  public send = (purchasePlan: PurchasePlan): Observable<PurchasePlan> => {
    return this.httpObservable
      .post<PurchasePlan>(kebabCase(nameof(this.send)), purchasePlan)
      .pipe(map((response: AxiosResponse<PurchasePlan>) => response.data));
  };
  public approve = (purchasePlan: PurchasePlan): Observable<PurchasePlan> => {
    return this.httpObservable
      .post<PurchasePlan>(kebabCase(nameof(this.approve)), purchasePlan)
      .pipe(map((response: AxiosResponse<PurchasePlan>) => response.data));
  };
  public reject = (purchasePlan: PurchasePlan): Observable<PurchasePlan> => {
    return this.httpObservable
      .post<PurchasePlan>(kebabCase(nameof(this.reject)), purchasePlan)
      .pipe(map((response: AxiosResponse<PurchasePlan>) => response.data));
  };

  public redo = (purchasePlan: PurchasePlan): Observable<PurchasePlan> => {
    return this.httpObservable
      .post<PurchasePlan>(kebabCase(nameof(this.redo)), purchasePlan)
      .pipe(map((response: AxiosResponse<PurchasePlan>) => response.data));
  };
  public reset = (purchasePlan: PurchasePlan): Observable<PurchasePlan> => {
    return this.httpObservable
      .post<PurchasePlan>(kebabCase(nameof(this.reset)), purchasePlan)
      .pipe(map((response: AxiosResponse<PurchasePlan>) => response.data));
  };
  public filterListPurchasePlanStatus = (): Observable<Status[]> => {
    return this.httpObservable
      .post<Status[]>(
        kebabCase(nameof(this.filterListPurchasePlanStatus)),
        new StatusFilter()
      )
      .pipe(map((response: AxiosResponse<Status[]>) => response.data));
  };
}

export const purchasePlanRepository = new PurchasePlanRepository();
