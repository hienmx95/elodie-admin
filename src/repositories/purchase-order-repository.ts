import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_PURCHASE_ORDER_PREFIX } from "config/api-consts";
import { PurchaseOrder, PurchaseOrderFilter } from 'models/PurchaseOrder';
import { AppUser, AppUserFilter } from 'models/AppUser';
import { Project, ProjectFilter } from 'models/Project';
import { ProjectBudget, ProjectBudgetFilter } from 'models/ProjectBudget';
import { Organization, OrganizationFilter } from 'models/Organization';
import { PurchaseOrderType, PurchaseOrderTypeFilter } from 'models/PurchaseOrderType';
import { PurchasePlan, PurchasePlanFilter } from 'models/PurchasePlan';
import { PurchaseRequest, PurchaseRequestFilter } from 'models/PurchaseRequest';
import { Status, StatusFilter } from 'models/Status';
import { Supplier, SupplierFilter } from 'models/Supplier';
import { PurchaseOrderCondition, PurchaseOrderConditionFilter } from 'models/PurchaseOrderCondition';
import { PurchaseOrderContent, PurchaseOrderContentFilter } from 'models/PurchaseOrderContent';
import { Category, CategoryFilter } from 'models/Category';
import { Currency, CurrencyFilter } from 'models/Currency';
import { Item, ItemFilter } from 'models/Item';
import { TaxType, TaxTypeFilter } from 'models/TaxType';
import { UnitOfMeasure, UnitOfMeasureFilter } from 'models/UnitOfMeasure';

export class PurchaseOrderRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_PURCHASE_ORDER_PREFIX);
    }

    public count = (purchaseOrderFilter?: PurchaseOrderFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), purchaseOrderFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (purchaseOrderFilter?: PurchaseOrderFilter): Observable<PurchaseOrder[]> => {
        return this.httpObservable.post<PurchaseOrder[]>(kebabCase(nameof(this.list)), purchaseOrderFilter)
            .pipe(map((response: AxiosResponse<PurchaseOrder[]>) => response.data));
    };

    public get = (id: number | string): Observable<PurchaseOrder> => {
        return this.httpObservable.post<PurchaseOrder>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<PurchaseOrder>) => response.data));
    };

    public create = (purchaseOrder: PurchaseOrder): Observable<PurchaseOrder> => {
        return this.httpObservable.post<PurchaseOrder>(kebabCase(nameof(this.create)), purchaseOrder)
            .pipe(map((response: AxiosResponse<PurchaseOrder>) => response.data));
    };

    public update = (purchaseOrder: PurchaseOrder): Observable<PurchaseOrder> => {
        return this.httpObservable.post<PurchaseOrder>(kebabCase(nameof(this.update)), purchaseOrder)
            .pipe(map((response: AxiosResponse<PurchaseOrder>) => response.data));
    };

    public delete = (purchaseOrder: PurchaseOrder): Observable<PurchaseOrder> => {
        return this.httpObservable.post<PurchaseOrder>(kebabCase(nameof(this.delete)), purchaseOrder)
            .pipe(map((response: AxiosResponse<PurchaseOrder>) => response.data));
    };

    public save = (purchaseOrder: PurchaseOrder): Observable<PurchaseOrder> => {
        return purchaseOrder.id ? this.update(purchaseOrder) : this.create(purchaseOrder);
    };

    public singleListAppUser = (appUserFilter: AppUserFilter): Observable<AppUser[]> => {
        return this.httpObservable.post<AppUser[]>(kebabCase(nameof(this.singleListAppUser)), appUserFilter)
            .pipe(map((response: AxiosResponse<AppUser[]>) => response.data));
    };
    public singleListProject = (projectFilter: ProjectFilter): Observable<Project[]> => {
        return this.httpObservable.post<Project[]>(kebabCase(nameof(this.singleListProject)), projectFilter)
            .pipe(map((response: AxiosResponse<Project[]>) => response.data));
    };
    public singleListProjectBudget = (projectBudgetFilter: ProjectBudgetFilter): Observable<ProjectBudget[]> => {
        return this.httpObservable.post<ProjectBudget[]>(kebabCase(nameof(this.singleListProjectBudget)), projectBudgetFilter)
            .pipe(map((response: AxiosResponse<ProjectBudget[]>) => response.data));
    };
    public singleListOrganization = (organizationFilter: OrganizationFilter): Observable<Organization[]> => {
        return this.httpObservable.post<Organization[]>(kebabCase(nameof(this.singleListOrganization)), organizationFilter)
            .pipe(map((response: AxiosResponse<Organization[]>) => response.data));
    };
    public singleListPurchaseOrderType = (): Observable<PurchaseOrderType[]> => {
        return this.httpObservable.post<PurchaseOrderType[]>(kebabCase(nameof(this.singleListPurchaseOrderType)), new PurchaseOrderTypeFilter())
            .pipe(map((response: AxiosResponse<PurchaseOrderType[]>) => response.data));
    };
    public singleListPurchasePlan = (purchasePlanFilter: PurchasePlanFilter): Observable<PurchasePlan[]> => {
        return this.httpObservable.post<PurchasePlan[]>(kebabCase(nameof(this.singleListPurchasePlan)), purchasePlanFilter)
            .pipe(map((response: AxiosResponse<PurchasePlan[]>) => response.data));
    };
    public singleListPurchaseRequest = (purchaseRequestFilter: PurchaseRequestFilter): Observable<PurchaseRequest[]> => {
        return this.httpObservable.post<PurchaseRequest[]>(kebabCase(nameof(this.singleListPurchaseRequest)), purchaseRequestFilter)
            .pipe(map((response: AxiosResponse<PurchaseRequest[]>) => response.data));
    };
    public singleListStatus = (): Observable<Status[]> => {
        return this.httpObservable.post<Status[]>(kebabCase(nameof(this.singleListStatus)), new StatusFilter())
            .pipe(map((response: AxiosResponse<Status[]>) => response.data));
    };
    public singleListSupplier = (supplierFilter: SupplierFilter): Observable<Supplier[]> => {
        return this.httpObservable.post<Supplier[]>(kebabCase(nameof(this.singleListSupplier)), supplierFilter)
            .pipe(map((response: AxiosResponse<Supplier[]>) => response.data));
    };
    public singleListPurchaseOrderCondition = (purchaseOrderConditionFilter: PurchaseOrderConditionFilter): Observable<PurchaseOrderCondition[]> => {
        return this.httpObservable.post<PurchaseOrderCondition[]>(kebabCase(nameof(this.singleListPurchaseOrderCondition)), purchaseOrderConditionFilter)
            .pipe(map((response: AxiosResponse<PurchaseOrderCondition[]>) => response.data));
    };
    public singleListPurchaseOrderContent = (purchaseOrderContentFilter: PurchaseOrderContentFilter): Observable<PurchaseOrderContent[]> => {
        return this.httpObservable.post<PurchaseOrderContent[]>(kebabCase(nameof(this.singleListPurchaseOrderContent)), purchaseOrderContentFilter)
            .pipe(map((response: AxiosResponse<PurchaseOrderContent[]>) => response.data));
    };
    public singleListCategory = (categoryFilter: CategoryFilter): Observable<Category[]> => {
        return this.httpObservable.post<Category[]>(kebabCase(nameof(this.singleListCategory)), categoryFilter)
            .pipe(map((response: AxiosResponse<Category[]>) => response.data));
    };
    public singleListCurrency = (currencyFilter: CurrencyFilter): Observable<Currency[]> => {
        return this.httpObservable.post<Currency[]>(kebabCase(nameof(this.singleListCurrency)), currencyFilter)
            .pipe(map((response: AxiosResponse<Currency[]>) => response.data));
    };
    public singleListItem = (itemFilter: ItemFilter): Observable<Item[]> => {
        return this.httpObservable.post<Item[]>(kebabCase(nameof(this.singleListItem)), itemFilter)
            .pipe(map((response: AxiosResponse<Item[]>) => response.data));
    };
    public singleListTaxType = (taxTypeFilter: TaxTypeFilter): Observable<TaxType[]> => {
        return this.httpObservable.post<TaxType[]>(kebabCase(nameof(this.singleListTaxType)), taxTypeFilter)
            .pipe(map((response: AxiosResponse<TaxType[]>) => response.data));
    };
    public singleListUnitOfMeasure = (unitOfMeasureFilter: UnitOfMeasureFilter): Observable<UnitOfMeasure[]> => {
        return this.httpObservable.post<UnitOfMeasure[]>(kebabCase(nameof(this.singleListUnitOfMeasure)), unitOfMeasureFilter)
            .pipe(map((response: AxiosResponse<UnitOfMeasure[]>) => response.data));
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

export const purchaseOrderRepository = new PurchaseOrderRepository();
