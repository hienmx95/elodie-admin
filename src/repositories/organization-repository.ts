import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_ORGANIZATION_PREFIX } from "config/api-consts";
import { Organization, OrganizationFilter } from 'models/Organization';
import { Status, StatusFilter } from 'models/Status';
import { AppUser, AppUserFilter } from 'models/AppUser';
export interface SelectOption {
    id: number,
    code: string,
    name: string
}
export class OrganizationRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_ORGANIZATION_PREFIX);
    }

    public count = (organizationFilter?: OrganizationFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), organizationFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (organizationFilter?: OrganizationFilter): Observable<Organization[]> => {
        return this.httpObservable.post<Organization[]>(kebabCase(nameof(this.list)), organizationFilter)
            .pipe(map((response: AxiosResponse<Organization[]>) => response.data));
    };

    public get = (id: number | string, filterType: number,): Observable<Organization> => {
        return this.httpObservable.post<Organization>
            (kebabCase(nameof(this.get)), { id, filterType})
            .pipe(map((response: AxiosResponse<Organization>) => response.data));
    };

    public create = (organization: Organization): Observable<Organization> => {
        return this.httpObservable.post<Organization>(kebabCase(nameof(this.create)), organization)
            .pipe(map((response: AxiosResponse<Organization>) => response.data));
    };

    public update = (organization: Organization): Observable<Organization> => {
        return this.httpObservable.post<Organization>(kebabCase(nameof(this.update)), organization)
            .pipe(map((response: AxiosResponse<Organization>) => response.data));
    };
    public updateIsDisplay = (organization: Organization): Observable<Organization> => {
        return this.httpObservable.post<Organization>(kebabCase(nameof(this.updateIsDisplay)), organization)
            .pipe(map((response: AxiosResponse<Organization>) => response.data));
    };

    public delete = (organization: Organization): Observable<Organization> => {
        return this.httpObservable.post<Organization>(kebabCase(nameof(this.delete)), organization)
            .pipe(map((response: AxiosResponse<Organization>) => response.data));
    };

    public save = (organization: Organization): Observable<Organization> => {
        return organization.id ? this.update(organization) : this.create(organization);
    };

    public singleListOrganization = (organizationFilter: OrganizationFilter): Observable<Organization[]> => {
        return this.httpObservable.post<Organization[]>(kebabCase(nameof(this.singleListOrganization)), organizationFilter)
            .pipe(map((response: AxiosResponse<Organization[]>) => response.data));
    };
    public singleListStatus = (): Observable<Status[]> => {
        return this.httpObservable.post<Status[]>(kebabCase(nameof(this.singleListStatus)), new StatusFilter())
            .pipe(map((response: AxiosResponse<Status[]>) => response.data));
    };
    public singleListTreeSelectOption = (filter?: any): Observable<SelectOption[]> => {
        return this.httpObservable
            .post<SelectOption[]>(kebabCase(nameof(this.singleListTreeSelectOption)), filter)
            .pipe(map((response: AxiosResponse<SelectOption[]>) => response.data));
    };
    public countAppUser = (appuserFilter?: AppUserFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.countAppUser)), appuserFilter)
            .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public listAppUser = (appuserFilter?: AppUserFilter): Observable<AppUser[]> => {
        return this.httpObservable.post<AppUser[]>(kebabCase(nameof(this.listAppUser)), appuserFilter)
            .pipe(map((response: AxiosResponse<AppUser[]>) => response.data));
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
    public exportAppUser = (filter: any): Observable<AxiosResponse<any>> => {
        return this.httpObservable.post('export-app-user', filter, {
            responseType: 'arraybuffer',
        });
    };

    public exportTemplate = (): Observable<AxiosResponse<any>> => {
        return this.httpObservable.post('export-template', {}, {
          responseType: 'arraybuffer',
        });
    };
    
}

export const organizationRepository = new OrganizationRepository();
