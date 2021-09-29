import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_SUPPLIER_USER_PREFIX } from "config/api-consts";
import { SupplierUser, SupplierUserFilter } from 'models/SupplierUser';
import { Status, StatusFilter } from 'models/Status';
import { Supplier, SupplierFilter } from 'models/Supplier';

export class SupplierUserRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_SUPPLIER_USER_PREFIX);
    }

    public count = (supplierUserFilter?: SupplierUserFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), supplierUserFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (supplierUserFilter?: SupplierUserFilter): Observable<SupplierUser[]> => {
        return this.httpObservable.post<SupplierUser[]>(kebabCase(nameof(this.list)), supplierUserFilter)
            .pipe(map((response: AxiosResponse<SupplierUser[]>) => response.data));
    };

    public get = (id: number | string): Observable<SupplierUser> => {
        return this.httpObservable.post<SupplierUser>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<SupplierUser>) => response.data));
    };

    public create = (supplierUser: SupplierUser): Observable<SupplierUser> => {
        return this.httpObservable.post<SupplierUser>(kebabCase(nameof(this.create)), supplierUser)
            .pipe(map((response: AxiosResponse<SupplierUser>) => response.data));
    };

    public update = (supplierUser: SupplierUser): Observable<SupplierUser> => {
        return this.httpObservable.post<SupplierUser>(kebabCase(nameof(this.update)), supplierUser)
            .pipe(map((response: AxiosResponse<SupplierUser>) => response.data));
    };

    public delete = (supplierUser: SupplierUser): Observable<SupplierUser> => {
        return this.httpObservable.post<SupplierUser>(kebabCase(nameof(this.delete)), supplierUser)
            .pipe(map((response: AxiosResponse<SupplierUser>) => response.data));
    };

    public save = (supplierUser: SupplierUser): Observable<SupplierUser> => {
        return supplierUser.id ? this.update(supplierUser) : this.create(supplierUser);
    };

    public singleListStatus = (): Observable<Status[]> => {
        return this.httpObservable.post<Status[]>(kebabCase(nameof(this.singleListStatus)), new StatusFilter())
            .pipe(map((response: AxiosResponse<Status[]>) => response.data));
    };
    public singleListSupplier = (supplierFilter: SupplierFilter): Observable<Supplier[]> => {
        return this.httpObservable.post<Supplier[]>(kebabCase(nameof(this.singleListSupplier)), supplierFilter)
            .pipe(map((response: AxiosResponse<Supplier[]>) => response.data));
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

export const supplierUserRepository = new SupplierUserRepository();
