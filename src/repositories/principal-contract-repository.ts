import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import { httpConfig } from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_PRINCIPAL_CONTRACT_PREFIX } from "config/api-consts";
import { PrincipalContract, PrincipalContractFilter } from 'models/PrincipalContract';
import { AppUser, AppUserFilter } from 'models/AppUser';
import { Organization, OrganizationFilter } from 'models/Organization';
import { Status, StatusFilter } from 'models/Status';
import { Supplier, SupplierFilter } from 'models/Supplier';
import { PrincipalContractAppUserMapping, PrincipalContractAppUserMappingFilter } from 'models/PrincipalContractAppUserMapping';
import { PrincipalContractContent, PrincipalContractContentFilter } from 'models/PrincipalContractContent';
import { Currency, CurrencyFilter } from 'models/Currency';
import { Item, ItemFilter } from 'models/Item';
import { TaxType, TaxTypeFilter } from 'models/TaxType';
import { UnitOfMeasure, UnitOfMeasureFilter } from 'models/UnitOfMeasure';
import { PrincipalContractFileMapping, PrincipalContractFileMappingFilter } from 'models/PrincipalContractFileMapping';
import { File, FileFilter } from 'models/File';
import { Category, CategoryFilter } from 'models/Category';
import { PrincipalContractTemplate, PrincipalContractTemplateFilter } from 'models/PrincipalContractTemplate';
export interface ItemSelectOption {
    id: number,
    code: string,
    name: string
}
export class PrincipalContractRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_PRINCIPAL_CONTRACT_PREFIX);
    }

    public count = (principalContractFilter?: PrincipalContractFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), principalContractFilter)
            .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (principalContractFilter?: PrincipalContractFilter): Observable<PrincipalContract[]> => {
        return this.httpObservable.post<PrincipalContract[]>(kebabCase(nameof(this.list)), principalContractFilter)
            .pipe(map((response: AxiosResponse<PrincipalContract[]>) => response.data));
    };
    public countPending = (principalContractFilter?: PrincipalContractFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.countPending)), principalContractFilter)
            .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public listPending = (principalContractFilter?: PrincipalContractFilter): Observable<PrincipalContract[]> => {
        return this.httpObservable.post<PrincipalContract[]>(kebabCase(nameof(this.listPending)), principalContractFilter)
            .pipe(map((response: AxiosResponse<PrincipalContract[]>) => response.data));
    };
    public countOwned = (principalContractFilter?: PrincipalContractFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.countOwned)), principalContractFilter)
            .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public listOwned = (principalContractFilter?: PrincipalContractFilter): Observable<PrincipalContract[]> => {
        return this.httpObservable.post<PrincipalContract[]>(kebabCase(nameof(this.listOwned)), principalContractFilter)
            .pipe(map((response: AxiosResponse<PrincipalContract[]>) => response.data));
    };

    public get = (id: number | string): Observable<PrincipalContract> => {
        return this.httpObservable.post<PrincipalContract>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<PrincipalContract>) => response.data));
    };

    public create = (principalContract: PrincipalContract): Observable<PrincipalContract> => {
        return this.httpObservable.post<PrincipalContract>(kebabCase(nameof(this.create)), principalContract)
            .pipe(map((response: AxiosResponse<PrincipalContract>) => response.data));
    };

    public update = (principalContract: PrincipalContract): Observable<PrincipalContract> => {
        return this.httpObservable.post<PrincipalContract>(kebabCase(nameof(this.update)), principalContract)
            .pipe(map((response: AxiosResponse<PrincipalContract>) => response.data));
    };
    public send = (principalContract: PrincipalContract): Observable<PrincipalContract> => {
        return this.httpObservable.post<PrincipalContract>(kebabCase(nameof(this.send)), principalContract)
            .pipe(map((response: AxiosResponse<PrincipalContract>) => response.data));
    };
    public approve = (principalContract: PrincipalContract): Observable<PrincipalContract> => {
        return this.httpObservable.post<PrincipalContract>(kebabCase(nameof(this.approve)), principalContract)
            .pipe(map((response: AxiosResponse<PrincipalContract>) => response.data));
    };
      public reject = (principalContract: PrincipalContract): Observable<PrincipalContract> => {
          return this.httpObservable.post<PrincipalContract>(kebabCase(nameof(this.reject)), principalContract)
            .pipe(map((response: AxiosResponse<PrincipalContract>) => response.data));
    };
    public redo = (principalContract: PrincipalContract): Observable<PrincipalContract> => {
        return this.httpObservable.post<PrincipalContract>(kebabCase(nameof(this.redo)), principalContract)
            .pipe(map((response: AxiosResponse<PrincipalContract>) => response.data));
    };

    public delete = (principalContract: PrincipalContract): Observable<PrincipalContract> => {
        return this.httpObservable.post<PrincipalContract>(kebabCase(nameof(this.delete)), principalContract)
            .pipe(map((response: AxiosResponse<PrincipalContract>) => response.data));
    };

    public save = (principalContract: PrincipalContract): Observable<PrincipalContract> => {
        return principalContract.id ? this.update(principalContract) : this.create(principalContract);
    };

    public singleListAppUser = (appUserFilter: AppUserFilter): Observable<AppUser[]> => {
        return this.httpObservable.post<AppUser[]>(kebabCase(nameof(this.singleListAppUser)), appUserFilter)
            .pipe(map((response: AxiosResponse<AppUser[]>) => response.data));
    };
    public singleListOrganization = (organizationFilter: OrganizationFilter): Observable<Organization[]> => {
        return this.httpObservable.post<Organization[]>(kebabCase(nameof(this.singleListOrganization)), organizationFilter)
            .pipe(map((response: AxiosResponse<Organization[]>) => response.data));
    };

    public filterListOrganization = (organizationFilter: OrganizationFilter): Observable<Organization[]> => {
        return this.httpObservable.post<Organization[]>(kebabCase(nameof(this.filterListOrganization)), organizationFilter)
            .pipe(map((response: AxiosResponse<Organization[]>) => response.data));
    };
    public singleListStatus = (): Observable<Status[]> => {
        return this.httpObservable.post<Status[]>(kebabCase(nameof(this.singleListStatus)), new StatusFilter())
            .pipe(map((response: AxiosResponse<Status[]>) => response.data));
    };
    public singleListSupplier = (supplierFilter: SupplierFilter): Observable<Supplier[]> => {
        return this.httpObservable.post<Supplier[]>(kebabCase(nameof(this.singleListSupplier)), supplierFilter)
            .pipe(map((response: AxiosResponse<Supplier[]>) => response.data));
    };
    public filterListSupplier = (supplierFilter: SupplierFilter): Observable<Supplier[]> => {
        return this.httpObservable.post<Supplier[]>(kebabCase(nameof(this.filterListSupplier)), supplierFilter)
            .pipe(map((response: AxiosResponse<Supplier[]>) => response.data));
    };
    public singleListPrincipalContractAppUserMapping = (principalContractAppUserMappingFilter: PrincipalContractAppUserMappingFilter): Observable<PrincipalContractAppUserMapping[]> => {
        return this.httpObservable.post<PrincipalContractAppUserMapping[]>(kebabCase(nameof(this.singleListPrincipalContractAppUserMapping)), principalContractAppUserMappingFilter)
            .pipe(map((response: AxiosResponse<PrincipalContractAppUserMapping[]>) => response.data));
    };
    public singleListPrincipalContractContent = (principalContractContentFilter: PrincipalContractContentFilter): Observable<PrincipalContractContent[]> => {
        return this.httpObservable.post<PrincipalContractContent[]>(kebabCase(nameof(this.singleListPrincipalContractContent)), principalContractContentFilter)
            .pipe(map((response: AxiosResponse<PrincipalContractContent[]>) => response.data));
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
    public singleListPrincipalContractFileMapping = (principalContractFileMappingFilter: PrincipalContractFileMappingFilter): Observable<PrincipalContractFileMapping[]> => {
        return this.httpObservable.post<PrincipalContractFileMapping[]>(kebabCase(nameof(this.singleListPrincipalContractFileMapping)), principalContractFileMappingFilter)
            .pipe(map((response: AxiosResponse<PrincipalContractFileMapping[]>) => response.data));
    };
    public singleListFile = (fileFilter: FileFilter): Observable<File[]> => {
        return this.httpObservable.post<File[]>(kebabCase(nameof(this.singleListFile)), fileFilter)
            .pipe(map((response: AxiosResponse<File[]>) => response.data));
    };
    public singleListCategory = (categoryFilter: CategoryFilter): Observable<Category[]> => {
        return this.httpObservable.post<Category[]>(kebabCase(nameof(this.singleListCategory)), categoryFilter)
            .pipe(map((response: AxiosResponse<Category[]>) => response.data));
    };
    public singleListItemSelectOption = (filter?: any): Observable<ItemSelectOption[]> => {
        return this.httpObservable
            .post<File[]>(kebabCase(nameof(this.singleListItemSelectOption)), filter)
            .pipe(map((response: AxiosResponse<ItemSelectOption[]>) => response.data));
    };

    public listItem = (itemFilter: ItemFilter): Observable<Item[]> => {
        return this.httpObservable.post<Item[]>(kebabCase(nameof(this.listItem)), itemFilter)
            .pipe(map((response: AxiosResponse<Item[]>) => response.data));
    };
    public countItem = (itemFilter: ItemFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.countItem)), itemFilter)
            .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public countAppUser = (appUserFilter: AppUserFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.countAppUser)), appUserFilter)
            .pipe(map((response: AxiosResponse<number>) => response.data));
    };
    public listAppUser = (appUserFilter: AppUserFilter): Observable<AppUser[]> => {
        return this.httpObservable.post<AppUser[]>(kebabCase(nameof(this.listAppUser)), appUserFilter)
            .pipe(map((response: AxiosResponse<AppUser[]>) => response.data));
    };
    public importAppUser = (file: File, name: string = nameof(file)): Observable<void> => {
        const formData: FormData = new FormData();
        formData.append(name, file as Blob);
        return this.httpObservable.post<void>(kebabCase(nameof(this.importAppUser)), formData)
            .pipe(map((response: AxiosResponse<void>) => response.data));
    };
    public exportAppUser = (filter: any): Observable<AxiosResponse<any>> => {
        return this.httpObservable.post(kebabCase(nameof(this.exportAppUser)), filter, {
            responseType: 'arraybuffer',
        });
    };
    public exportTemplateAppUser = (): Observable<AxiosResponse<any>> => {
        return this.httpObservable.post(kebabCase(nameof(this.exportTemplateAppUser)), {}, {
            responseType: 'arraybuffer',
        });
    };

    public countFile = (fileFilter: FileFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.countFile)), fileFilter)
            .pipe(map((response: AxiosResponse<number>) => response.data));
    };
    public listFile = (fileFilter: FileFilter): Observable<File[]> => {
        return this.httpObservable.post<File[]>(kebabCase(nameof(this.listFile)), fileFilter)
            .pipe(map((response: AxiosResponse<File[]>) => response.data));
    };
    public importFile = (file: File, name: string = nameof(file)): Observable<void> => {
        const formData: FormData = new FormData();
        formData.append(name, file as Blob);
        return this.httpObservable.post<void>(kebabCase(nameof(this.importFile)), formData)
            .pipe(map((response: AxiosResponse<void>) => response.data));
    };
    public exportFile = (filter: any): Observable<AxiosResponse<any>> => {
        return this.httpObservable.post(kebabCase(nameof(this.exportFile)), filter, {
            responseType: 'arraybuffer',
        });
    };
    public exportTemplateFile = (): Observable<AxiosResponse<any>> => {
        return this.httpObservable.post(kebabCase(nameof(this.exportTemplateFile)), {}, {
            responseType: 'arraybuffer',
        });
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
    public multiUpload = (files: File[]): Observable<any> => {
        const formData: FormData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i] as Blob);
        }
        return this.httpObservable.post<any>(kebabCase(nameof(this.multiUpload)), formData)
            .pipe(map((response: AxiosResponse<any>) => response.data));
    }
    // save template

    public countTemplate = (templateFilter?: PrincipalContractTemplateFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.countTemplate)), templateFilter)
            .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public listTemplate = (templateFilter?: PrincipalContractTemplateFilter): Observable<PrincipalContractTemplate[]> => {
        return this.httpObservable.post<PrincipalContractTemplate[]>(kebabCase(nameof(this.listTemplate)), templateFilter)
            .pipe(map((response: AxiosResponse<PrincipalContractTemplate[]>) => response.data));
    };

    public getTemplate = (id: number | string): Observable<PrincipalContractTemplate> => {
        return this.httpObservable.post<PrincipalContractTemplate>
            (kebabCase(nameof(this.getTemplate)), { id })
            .pipe(map((response: AxiosResponse<PrincipalContractTemplate>) => response.data));
    };

    public createTemplate = (model: PrincipalContractTemplate): Observable<PrincipalContractTemplate> => {
        return this.httpObservable.post<PrincipalContractTemplate>(kebabCase(nameof(this.createTemplate)), model)
            .pipe(map((response: AxiosResponse<any>) => response.data));
    };
    public updateTemplate = (model: PrincipalContractTemplate): Observable<PrincipalContractTemplate> => {
        return this.httpObservable.post<PrincipalContractTemplate>(kebabCase(nameof(this.updateTemplate)), model)
            .pipe(map((response: AxiosResponse<any>) => response.data));
    };



    public saveTemplate = (principalContractTemplate: PrincipalContractTemplate): Observable<PrincipalContractTemplate> => {
        return principalContractTemplate.id ? this.updateTemplate(principalContractTemplate) : this.createTemplate(principalContractTemplate);
    };
    public print = (
        purchaseRequest: PrincipalContract
    ): Observable<PrincipalContract> => {
        return this.httpObservable
            .post<PrincipalContract>(kebabCase(nameof(this.print)), purchaseRequest)
            .pipe(map((response: AxiosResponse<any>) => response.data));
    };

}

export const principalContractRepository = new PrincipalContractRepository();
