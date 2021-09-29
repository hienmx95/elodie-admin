import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import { AxiosResponse } from "axios";
import { API_SUPPLIER_PREFIX } from "config/api-consts";
import { BASE_API_URL } from "config/consts";
import { httpConfig } from "config/http";
import { AppUser, AppUserFilter } from "models/AppUser";
import { Category, CategoryFilter } from "models/Category";
import { District, DistrictFilter } from "models/District";
import { Nation, NationFilter } from "models/Nation";
import { Province, ProvinceFilter } from "models/Province";
import { Status, StatusFilter } from "models/Status";
import { Supplier, SupplierFilter } from "models/Supplier";
import { Ward, WardFilter } from "models/Ward";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

export class SupplierRepository extends Repository {
  constructor() {
    super(httpConfig);
    this.baseURL = url(BASE_API_URL, API_SUPPLIER_PREFIX);
  }

  public count = (supplierFilter?: SupplierFilter): Observable<number> => {
    return this.httpObservable
      .post<number>(kebabCase(nameof(this.count)), supplierFilter)
      .pipe(map((response: AxiosResponse<number>) => response.data));
  };

  public list = (supplierFilter?: SupplierFilter): Observable<Supplier[]> => {
    return this.httpObservable
      .post<Supplier[]>(kebabCase(nameof(this.list)), supplierFilter)
      .pipe(map((response: AxiosResponse<Supplier[]>) => response.data));
  };

  public get = (id: number | string): Observable<Supplier> => {
    return this.httpObservable
      .post<Supplier>(kebabCase(nameof(this.get)), { id })
      .pipe(map((response: AxiosResponse<Supplier>) => response.data));
  };

  public create = (supplier: Supplier): Observable<Supplier> => {
    return this.httpObservable
      .post<Supplier>(kebabCase(nameof(this.create)), supplier)
      .pipe(map((response: AxiosResponse<Supplier>) => response.data));
  };

  public quickCreate = (supplier: Supplier): Observable<Supplier> => {
    return this.httpObservable
      .post<Supplier>(kebabCase(nameof(this.quickCreate)), supplier)
      .pipe(map((response: AxiosResponse<Supplier>) => response.data));
  };

  public update = (supplier: Supplier): Observable<Supplier> => {
    return this.httpObservable
      .post<Supplier>(kebabCase(nameof(this.update)), supplier)
      .pipe(map((response: AxiosResponse<Supplier>) => response.data));
  };

  public delete = (supplier: Supplier): Observable<Supplier> => {
    return this.httpObservable
      .post<Supplier>(kebabCase(nameof(this.delete)), supplier)
      .pipe(map((response: AxiosResponse<Supplier>) => response.data));
  };

  public save = (supplier: Supplier): Observable<Supplier> => {
    return supplier.id ? this.update(supplier) : this.create(supplier);
  };

  public saveSupplier = (supplier: Supplier): Observable<Supplier> => {
    return supplier.id ? this.update(supplier) : this.quickCreate(supplier);
  };

  public singleListDistrict = (
    districtFilter: DistrictFilter
  ): Observable<District[]> => {
    return this.httpObservable
      .post<District[]>(
        kebabCase(nameof(this.singleListDistrict)),
        districtFilter
      )
      .pipe(map((response: AxiosResponse<District[]>) => response.data));
  };
  public filterListDistrict = (
    districtFilter: DistrictFilter
  ): Observable<District[]> => {
    return this.httpObservable
      .post<District[]>(
        kebabCase(nameof(this.filterListDistrict)),
        districtFilter
      )
      .pipe(map((response: AxiosResponse<District[]>) => response.data));
  };
  public singleListNation = (
    nationFilter: NationFilter
  ): Observable<Nation[]> => {
    return this.httpObservable
      .post<Nation[]>(kebabCase(nameof(this.singleListNation)), nationFilter)
      .pipe(map((response: AxiosResponse<Nation[]>) => response.data));
  };
  public singleListAppUser = (
    appUserFilter: AppUserFilter
  ): Observable<AppUser[]> => {
    return this.httpObservable
      .post<AppUser[]>(kebabCase(nameof(this.singleListAppUser)), appUserFilter)
      .pipe(map((response: AxiosResponse<AppUser[]>) => response.data));
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
  public filterListProvince = (
    provinceFilter: ProvinceFilter
  ): Observable<Province[]> => {
    return this.httpObservable
      .post<Province[]>(
        kebabCase(nameof(this.filterListProvince)),
        provinceFilter
      )
      .pipe(map((response: AxiosResponse<Province[]>) => response.data));
  };
  public singleListStatus = (): Observable<Status[]> => {
    return this.httpObservable
      .post<Status[]>(
        kebabCase(nameof(this.singleListStatus)),
        new StatusFilter()
      )
      .pipe(map((response: AxiosResponse<Status[]>) => response.data));
  };
  public filterListStatus = (): Observable<Status[]> => {
    return this.httpObservable
      .post<Status[]>(
        kebabCase(nameof(this.filterListStatus)),
        new StatusFilter()
      )
      .pipe(map((response: AxiosResponse<Status[]>) => response.data));
  };
  public singleListWard = (wardFilter: WardFilter): Observable<Ward[]> => {
    return this.httpObservable
      .post<Ward[]>(kebabCase(nameof(this.singleListWard)), wardFilter)
      .pipe(map((response: AxiosResponse<Ward[]>) => response.data));
  };
  public filterListWard = (wardFilter: WardFilter): Observable<Ward[]> => {
    return this.httpObservable
      .post<Ward[]>(kebabCase(nameof(this.filterListWard)), wardFilter)
      .pipe(map((response: AxiosResponse<Ward[]>) => response.data));
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
}

export const supplierRepository = new SupplierRepository();
