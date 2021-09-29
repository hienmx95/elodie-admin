import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_ROLE_PREFIX } from "config/api-consts";
import { Role, RoleFilter } from 'models/Role';
import { Status, StatusFilter } from 'models/Status';
import { AppUser, AppUserFilter } from 'models/AppUser';
import { Organization, OrganizationFilter } from 'models/Organization';
import { Permission, PermissionFilter } from 'models/Permission';
import { Menu, MenuFilter } from 'models/Menu';
import { Field, FieldFilter } from 'models/Field';
import { PermissionOperator, PermissionOperatorFilter } from 'models/PermissionOperator';
export interface ApiOption {
    id: number,
    fieldName: string,
    _API: string,
}
export class RoleRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_ROLE_PREFIX);
    }

    public count = (roleFilter?: RoleFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), roleFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (roleFilter?: RoleFilter): Observable<Role[]> => {
        return this.httpObservable.post<Role[]>(kebabCase(nameof(this.list)), roleFilter)
            .pipe(map((response: AxiosResponse<Role[]>) => response.data));
    };

    public get = (id: number | string): Observable<Role> => {
        return this.httpObservable.post<Role>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<Role>) => response.data));
    };

    public create = (role: Role): Observable<Role> => {
        return this.httpObservable.post<Role>(kebabCase(nameof(this.create)), role)
            .pipe(map((response: AxiosResponse<Role>) => response.data));
    };

    public update = (role: Role): Observable<Role> => {
        return this.httpObservable.post<Role>(kebabCase(nameof(this.update)), role)
            .pipe(map((response: AxiosResponse<Role>) => response.data));
    };

    public delete = (role: Role): Observable<Role> => {
        return this.httpObservable.post<Role>(kebabCase(nameof(this.delete)), role)
            .pipe(map((response: AxiosResponse<Role>) => response.data));
    };

    public save = (role: Role): Observable<Role> => {
        return role.id ? this.update(role) : this.create(role);
    };

    // perrmision role 
    public countPermission = (permissonFilter?: PermissionFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.countPermission)), permissonFilter)
            .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public listPermission = (permissonFilter?: PermissionFilter): Observable<Permission[]> => {
        return this.httpObservable.post<Permission[]>(kebabCase(nameof(this.listPermission)), permissonFilter)
            .pipe(map((response: AxiosResponse<Permission[]>) => response.data));
    };

    public getPermission = (id: number | string): Observable<Permission> => {
        return this.httpObservable.post<Permission>
            (kebabCase(nameof(this.getPermission)), { id })
            .pipe(map((response: AxiosResponse<Permission>) => response.data));
    };

    public createPermission = (permission: Permission): Observable<Permission> => {
        return this.httpObservable.post<Permission>(kebabCase(nameof(this.createPermission)), permission)
            .pipe(map((response: AxiosResponse<Permission>) => response.data));
    };

    public updatePermission = (permission: Permission): Observable<Permission> => {
        return this.httpObservable.post<Permission>(kebabCase(nameof(this.updatePermission)), permission)
            .pipe(map((response: AxiosResponse<Permission>) => response.data));
    };

    public deletePermission = (permision: Permission): Observable<Permission> => {
        return this.httpObservable.post<Role>(kebabCase(nameof(this.deletePermission)), permision)
            .pipe(map((response: AxiosResponse<Permission>) => response.data));
    };

    public savePermission = (permission: Permission): Observable<Permission> => {
        return permission.id ? this.updatePermission(permission) : this.createPermission(permission);
    };

    public clone = (id: number | string): Observable<Role> => {
        return this.httpObservable.post<Role>
            (kebabCase(nameof(this.clone)), { id })
            .pipe(map((response: AxiosResponse<Role>) => response.data));
    };

    public singleListStatus = (): Observable<Status[]> => {
        return this.httpObservable.post<Status[]>(kebabCase(nameof(this.singleListStatus)), new StatusFilter())
            .pipe(map((response: AxiosResponse<Status[]>) => response.data));
    };
    public singleListOrganization = (organizationFilter: OrganizationFilter): Observable<Organization[]> => {
        return this.httpObservable.post<Organization[]>(kebabCase(nameof(this.singleListOrganization)), organizationFilter)
            .pipe(map((response: AxiosResponse<Organization[]>) => response.data));
    };
    public singleListMenu = (menuFilter: MenuFilter): Observable<Menu[]> => {
        return this.httpObservable.post<Menu[]>(kebabCase(nameof(this.singleListMenu)), menuFilter)
            .pipe(map((response: AxiosResponse<Menu[]>) => response.data));
    };

    public singleListField = (fieldFilter: FieldFilter): Observable<Field[]> => {
        return this.httpObservable.post<Field[]>(kebabCase(nameof(this.singleListField)), fieldFilter)
            .pipe(map((response: AxiosResponse<Field[]>) => response.data));
    };
    public singleListPermissionOperator = (permissionOperatorFilter: PermissionOperatorFilter): Observable<PermissionOperator[]> => {
        return this.httpObservable.post<PermissionOperator[]>(kebabCase(nameof(this.singleListPermissionOperator)), permissionOperatorFilter)
            .pipe(map((response: AxiosResponse<PermissionOperator[]>) => response.data));
    };
    public getSingleListApi = (model: any): Observable<ApiOption> => {
        return this.httpObservable.post<ApiOption>
            (kebabCase(nameof(this.getSingleListApi)), model )
            .pipe(map((response: AxiosResponse<ApiOption>) => response.data));
    };
    public countAppUser = (appUserFilter?: AppUserFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.countAppUser)), appUserFilter)
            .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public listAppUser = (appUserFilter?: AppUserFilter): Observable<AppUser[]> => {
        return this.httpObservable.post<AppUser[]>(kebabCase(nameof(this.listAppUser)), appUserFilter)
            .pipe(map((response: AxiosResponse<AppUser[]>) => response.data));
    };

    public assignAppUser = (role: Role): Observable<Role> => {
        return this.httpObservable.post<Role>(kebabCase(nameof(this.assignAppUser)), role)
            .pipe(map((response: AxiosResponse<Role>) => response.data));
    };

    public getMenu = (id: number | string): Observable<Menu> => {
        return this.httpObservable.post<Menu>
            (kebabCase(nameof(this.getMenu)), { id })
            .pipe(map((response: AxiosResponse<Menu>) => response.data));
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

export const roleRepository = new RoleRepository();
