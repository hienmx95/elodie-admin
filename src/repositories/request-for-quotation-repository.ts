import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_REQUEST_FOR_QUOTATION_PREFIX } from "config/api-consts";
import { RequestForQuotation, RequestForQuotationFilter } from 'models/RequestForQuotation';
import { AppUser, AppUserFilter } from 'models/AppUser';
import { Organization, OrganizationFilter } from 'models/Organization';
import { Status, StatusFilter } from 'models/Status';
import { RequestForQuotationContent, RequestForQuotationContentFilter } from 'models/RequestForQuotationContent';
import { Category, CategoryFilter } from 'models/Category';
import { Item, ItemFilter } from 'models/Item';
import { UnitOfMeasure, UnitOfMeasureFilter } from 'models/UnitOfMeasure';
import { RequestForQuotationFileMapping, RequestForQuotationFileMappingFilter } from 'models/RequestForQuotationFileMapping';
import { File, FileFilter } from 'models/File';
import { RequestForQuotationSupplierMapping, RequestForQuotationSupplierMappingFilter } from 'models/RequestForQuotationSupplierMapping';
import { Supplier, SupplierFilter } from 'models/Supplier';

export class RequestForQuotationRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_REQUEST_FOR_QUOTATION_PREFIX);
    }

    public count = (requestForQuotationFilter?: RequestForQuotationFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), requestForQuotationFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (requestForQuotationFilter?: RequestForQuotationFilter): Observable<RequestForQuotation[]> => {
        return this.httpObservable.post<RequestForQuotation[]>(kebabCase(nameof(this.list)), requestForQuotationFilter)
            .pipe(map((response: AxiosResponse<RequestForQuotation[]>) => response.data));
    };

    public get = (id: number | string): Observable<RequestForQuotation> => {
        return this.httpObservable.post<RequestForQuotation>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<RequestForQuotation>) => response.data));
    };

    public create = (requestForQuotation: RequestForQuotation): Observable<RequestForQuotation> => {
        return this.httpObservable.post<RequestForQuotation>(kebabCase(nameof(this.create)), requestForQuotation)
            .pipe(map((response: AxiosResponse<RequestForQuotation>) => response.data));
    };

    public update = (requestForQuotation: RequestForQuotation): Observable<RequestForQuotation> => {
        return this.httpObservable.post<RequestForQuotation>(kebabCase(nameof(this.update)), requestForQuotation)
            .pipe(map((response: AxiosResponse<RequestForQuotation>) => response.data));
    };

    public delete = (requestForQuotation: RequestForQuotation): Observable<RequestForQuotation> => {
        return this.httpObservable.post<RequestForQuotation>(kebabCase(nameof(this.delete)), requestForQuotation)
            .pipe(map((response: AxiosResponse<RequestForQuotation>) => response.data));
    };

    public save = (requestForQuotation: RequestForQuotation): Observable<RequestForQuotation> => {
        return requestForQuotation.id ? this.update(requestForQuotation) : this.create(requestForQuotation);
    };

    public singleListAppUser = (appUserFilter: AppUserFilter): Observable<AppUser[]> => {
        return this.httpObservable.post<AppUser[]>(kebabCase(nameof(this.singleListAppUser)), appUserFilter)
            .pipe(map((response: AxiosResponse<AppUser[]>) => response.data));
    };
    public singleListOrganization = (organizationFilter: OrganizationFilter): Observable<Organization[]> => {
        return this.httpObservable.post<Organization[]>(kebabCase(nameof(this.singleListOrganization)), organizationFilter)
            .pipe(map((response: AxiosResponse<Organization[]>) => response.data));
    };
    public singleListStatus = (): Observable<Status[]> => {
        return this.httpObservable.post<Status[]>(kebabCase(nameof(this.singleListStatus)), new StatusFilter())
            .pipe(map((response: AxiosResponse<Status[]>) => response.data));
    };
    public singleListRequestForQuotationContent = (requestForQuotationContentFilter: RequestForQuotationContentFilter): Observable<RequestForQuotationContent[]> => {
        return this.httpObservable.post<RequestForQuotationContent[]>(kebabCase(nameof(this.singleListRequestForQuotationContent)), requestForQuotationContentFilter)
            .pipe(map((response: AxiosResponse<RequestForQuotationContent[]>) => response.data));
    };
    public singleListCategory = (categoryFilter: CategoryFilter): Observable<Category[]> => {
        return this.httpObservable.post<Category[]>(kebabCase(nameof(this.singleListCategory)), categoryFilter)
            .pipe(map((response: AxiosResponse<Category[]>) => response.data));
    };
    public singleListItem = (itemFilter: ItemFilter): Observable<Item[]> => {
        return this.httpObservable.post<Item[]>(kebabCase(nameof(this.singleListItem)), itemFilter)
            .pipe(map((response: AxiosResponse<Item[]>) => response.data));
    };
    public singleListUnitOfMeasure = (unitOfMeasureFilter: UnitOfMeasureFilter): Observable<UnitOfMeasure[]> => {
        return this.httpObservable.post<UnitOfMeasure[]>(kebabCase(nameof(this.singleListUnitOfMeasure)), unitOfMeasureFilter)
            .pipe(map((response: AxiosResponse<UnitOfMeasure[]>) => response.data));
    };
    public singleListRequestForQuotationFileMapping = (requestForQuotationFileMappingFilter: RequestForQuotationFileMappingFilter): Observable<RequestForQuotationFileMapping[]> => {
        return this.httpObservable.post<RequestForQuotationFileMapping[]>(kebabCase(nameof(this.singleListRequestForQuotationFileMapping)), requestForQuotationFileMappingFilter)
            .pipe(map((response: AxiosResponse<RequestForQuotationFileMapping[]>) => response.data));
    };
    public singleListFile = (fileFilter: FileFilter): Observable<File[]> => {
        return this.httpObservable.post<File[]>(kebabCase(nameof(this.singleListFile)), fileFilter)
            .pipe(map((response: AxiosResponse<File[]>) => response.data));
    };
    public singleListRequestForQuotationSupplierMapping = (requestForQuotationSupplierMappingFilter: RequestForQuotationSupplierMappingFilter): Observable<RequestForQuotationSupplierMapping[]> => {
        return this.httpObservable.post<RequestForQuotationSupplierMapping[]>(kebabCase(nameof(this.singleListRequestForQuotationSupplierMapping)), requestForQuotationSupplierMappingFilter)
            .pipe(map((response: AxiosResponse<RequestForQuotationSupplierMapping[]>) => response.data));
    };
    public singleListSupplier = (supplierFilter: SupplierFilter): Observable<Supplier[]> => {
        return this.httpObservable.post<Supplier[]>(kebabCase(nameof(this.singleListSupplier)), supplierFilter)
            .pipe(map((response: AxiosResponse<Supplier[]>) => response.data));
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
    
    public countSupplier = (supplierFilter: SupplierFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.countSupplier)), supplierFilter)
            .pipe(map((response: AxiosResponse<number>) => response.data));
    };
    public listSupplier = (supplierFilter: SupplierFilter): Observable<Supplier[]> => {
        return this.httpObservable.post<Supplier[]>(kebabCase(nameof(this.listSupplier)), supplierFilter)
            .pipe(map((response: AxiosResponse<Supplier[]>) => response.data));
    };
    public importSupplier = (file: File, name: string = nameof(file)): Observable<void> => {
        const formData: FormData = new FormData();
        formData.append(name, file as Blob);
            return this.httpObservable.post<void>(kebabCase(nameof(this.importSupplier)), formData)
                .pipe(map((response: AxiosResponse<void>) => response.data));
    };
    public exportSupplier = (filter: any): Observable<AxiosResponse<any>> => {
        return this.httpObservable.post(kebabCase(nameof(this.exportSupplier)), filter, {
          responseType: 'arraybuffer',
        });
    };
    public exportTemplateSupplier = (): Observable<AxiosResponse<any>> => {
        return this.httpObservable.post(kebabCase(nameof(this.exportTemplateSupplier)), {}, {
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
    
}

export const requestForQuotationRepository = new RequestForQuotationRepository();
