import { AxiosResponse } from "axios";
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import { httpConfig } from "config/http";
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_APP_USER_PREFIX } from "config/api-consts";
import { AppUser, AppUserFilter } from "models/AppUser";
import { Organization, OrganizationFilter } from "models/Organization";
import { Position, PositionFilter } from "models/Position";
import { Province, ProvinceFilter } from "models/Province";
import { Sex, SexFilter } from "models/Sex";
import { Status, StatusFilter } from "models/Status";
import { Role, RoleFilter } from "models/Role";

export class AppUserRepository extends Repository {
  constructor() {
    super(httpConfig);
    this.baseURL = url(BASE_API_URL, API_APP_USER_PREFIX);
  }

  public count = (appUserFilter?: AppUserFilter): Observable<number> => {
    return this.httpObservable
      .post<number>(kebabCase(nameof(this.count)), appUserFilter)
      .pipe(map((response: AxiosResponse<number>) => response.data));
  };

  public list = (appUserFilter?: AppUserFilter): Observable<AppUser[]> => {
    return this.httpObservable
      .post<AppUser[]>(kebabCase(nameof(this.list)), appUserFilter)
      .pipe(map((response: AxiosResponse<AppUser[]>) => response.data));
  };

  public get = (id: number | string): Observable<AppUser> => {
    return this.httpObservable
      .post<AppUser>(kebabCase(nameof(this.get)), { id })
      .pipe(map((response: AxiosResponse<AppUser>) => response.data));
  };

  public saveImage = (
    file: any,
    params?: { [key: string]: any }
  ): Observable<any> => {
    const formData: FormData = new FormData();
    formData.append("file", file);
    return this.httpObservable
      .post<void>(kebabCase(nameof(this.saveImage)), formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params,
      })
      .pipe(map((response: AxiosResponse<any>) => response.data));
  };

  public create = (appUser: AppUser): Observable<AppUser> => {
    return this.httpObservable
      .post<AppUser>(kebabCase(nameof(this.create)), appUser)
      .pipe(map((response: AxiosResponse<AppUser>) => response.data));
  };

  public update = (appUser: AppUser): Observable<AppUser> => {
    return this.httpObservable
      .post<AppUser>(kebabCase(nameof(this.update)), appUser)
      .pipe(map((response: AxiosResponse<AppUser>) => response.data));
  };

  public changePassword = (obj: any): Observable<any> => {
    return this.httpObservable
      .post<any>(kebabCase(nameof(this.changePassword)), obj)
      .pipe(map((response: AxiosResponse<any>) => response.data));
  };

  public delete = (appUser: AppUser): Observable<AppUser> => {
    return this.httpObservable
      .post<AppUser>(kebabCase(nameof(this.delete)), appUser)
      .pipe(map((response: AxiosResponse<AppUser>) => response.data));
  };

  public save = (appUser: AppUser): Observable<AppUser> => {
    return appUser.id ? this.update(appUser) : this.create(appUser);
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
  public singleListPosition = (
    positionFilter: PositionFilter
  ): Observable<Position[]> => {
    return this.httpObservable
      .post<Position[]>(
        kebabCase(nameof(this.singleListPosition)),
        positionFilter
      )
      .pipe(map((response: AxiosResponse<Position[]>) => response.data));
  };
  public singleListProvince = (
    provinceFilter: ProvinceFilter
  ): Observable<Province[]> => {
    return this.httpObservable
      .post<Province[]>(
        kebabCase(nameof(this.singleListProvince)),
        provinceFilter
      )
      .pipe(map((response: AxiosResponse<Province[]>) => response.data));
  };
  public singleListSex = (sexFilter: SexFilter): Observable<Sex[]> => {
    return this.httpObservable
      .post<Sex[]>(kebabCase(nameof(this.singleListSex)), sexFilter)
      .pipe(map((response: AxiosResponse<Sex[]>) => response.data));
  };
  public singleListStatus = (): Observable<Status[]> => {
    return this.httpObservable
      .post<Status[]>(
        kebabCase(nameof(this.singleListStatus)),
        new StatusFilter()
      )
      .pipe(map((response: AxiosResponse<Status[]>) => response.data));
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

  public listRole = (roleFilter?: RoleFilter): Observable<Role[]> => {
    return this.httpObservable
      .post<Role[]>(kebabCase(nameof(this.listRole)), roleFilter)
      .pipe(map((response: AxiosResponse<Role[]>) => response.data));
  };

  public updateRole = (role: Role): Observable<Role> => {
    return this.httpObservable
      .post<Role>(kebabCase(nameof(this.updateRole)), role)
      .pipe(map((response: AxiosResponse<Role>) => response.data));
  };
}

export const appUserRepository = new AppUserRepository();
