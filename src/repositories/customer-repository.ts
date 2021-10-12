import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_CUSTOMER_PREFIX } from "config/api-consts";
import { Customer, CustomerFilter } from 'models/Customer';
import { AppUser, AppUserFilter } from 'models/AppUser';
import { CodeGeneratorRule, CodeGeneratorRuleFilter } from 'models/CodeGeneratorRule';
import { CustomerSource, CustomerSourceFilter } from 'models/CustomerSource';
import { District, DistrictFilter } from 'models/District';
import { Nation, NationFilter } from 'models/Nation';
import { Organization, OrganizationFilter } from 'models/Organization';
import { Profession, ProfessionFilter } from 'models/Profession';
import { Province, ProvinceFilter } from 'models/Province';
import { Sex, SexFilter } from 'models/Sex';
import { Status, StatusFilter } from 'models/Status';
import { Ward, WardFilter } from 'models/Ward';

export class CustomerRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_CUSTOMER_PREFIX);
    }

    public count = (customerFilter?: CustomerFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), customerFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (customerFilter?: CustomerFilter): Observable<Customer[]> => {
        return this.httpObservable.post<Customer[]>(kebabCase(nameof(this.list)), customerFilter)
            .pipe(map((response: AxiosResponse<Customer[]>) => response.data));
    };

    public get = (id: number | string): Observable<Customer> => {
        return this.httpObservable.post<Customer>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<Customer>) => response.data));
    };

    public create = (customer: Customer): Observable<Customer> => {
        return this.httpObservable.post<Customer>(kebabCase(nameof(this.create)), customer)
            .pipe(map((response: AxiosResponse<Customer>) => response.data));
    };

    public update = (customer: Customer): Observable<Customer> => {
        return this.httpObservable.post<Customer>(kebabCase(nameof(this.update)), customer)
            .pipe(map((response: AxiosResponse<Customer>) => response.data));
    };

    public delete = (customer: Customer): Observable<Customer> => {
        return this.httpObservable.post<Customer>(kebabCase(nameof(this.delete)), customer)
            .pipe(map((response: AxiosResponse<Customer>) => response.data));
    };

    public save = (customer: Customer): Observable<Customer> => {
        return customer.id ? this.update(customer) : this.create(customer);
    };

    public singleListAppUser = (appUserFilter: AppUserFilter): Observable<AppUser[]> => {
        return this.httpObservable.post<AppUser[]>(kebabCase(nameof(this.singleListAppUser)), appUserFilter)
            .pipe(map((response: AxiosResponse<AppUser[]>) => response.data));
    };
    public singleListCodeGeneratorRule = (codeGeneratorRuleFilter: CodeGeneratorRuleFilter): Observable<CodeGeneratorRule[]> => {
        return this.httpObservable.post<CodeGeneratorRule[]>(kebabCase(nameof(this.singleListCodeGeneratorRule)), codeGeneratorRuleFilter)
            .pipe(map((response: AxiosResponse<CodeGeneratorRule[]>) => response.data));
    };
    public singleListCustomerSource = (customerSourceFilter: CustomerSourceFilter): Observable<CustomerSource[]> => {
        return this.httpObservable.post<CustomerSource[]>(kebabCase(nameof(this.singleListCustomerSource)), customerSourceFilter)
            .pipe(map((response: AxiosResponse<CustomerSource[]>) => response.data));
    };
    public singleListDistrict = (districtFilter: DistrictFilter): Observable<District[]> => {
        return this.httpObservable.post<District[]>(kebabCase(nameof(this.singleListDistrict)), districtFilter)
            .pipe(map((response: AxiosResponse<District[]>) => response.data));
    };
    public singleListNation = (nationFilter: NationFilter): Observable<Nation[]> => {
        return this.httpObservable.post<Nation[]>(kebabCase(nameof(this.singleListNation)), nationFilter)
            .pipe(map((response: AxiosResponse<Nation[]>) => response.data));
    };
    public singleListOrganization = (organizationFilter: OrganizationFilter): Observable<Organization[]> => {
        return this.httpObservable.post<Organization[]>(kebabCase(nameof(this.singleListOrganization)), organizationFilter)
            .pipe(map((response: AxiosResponse<Organization[]>) => response.data));
    };
    public singleListProfession = (professionFilter: ProfessionFilter): Observable<Profession[]> => {
        return this.httpObservable.post<Profession[]>(kebabCase(nameof(this.singleListProfession)), professionFilter)
            .pipe(map((response: AxiosResponse<Profession[]>) => response.data));
    };
    public singleListProvince = (provinceFilter: ProvinceFilter): Observable<Province[]> => {
        return this.httpObservable.post<Province[]>(kebabCase(nameof(this.singleListProvince)), provinceFilter)
            .pipe(map((response: AxiosResponse<Province[]>) => response.data));
    };
    public singleListSex = (sexFilter: SexFilter): Observable<Sex[]> => {
        return this.httpObservable.post<Sex[]>(kebabCase(nameof(this.singleListSex)), sexFilter)
            .pipe(map((response: AxiosResponse<Sex[]>) => response.data));
    };
    public singleListStatus = (): Observable<Status[]> => {
        return this.httpObservable.post<Status[]>(kebabCase(nameof(this.singleListStatus)), new StatusFilter())
            .pipe(map((response: AxiosResponse<Status[]>) => response.data));
    };
    public singleListWard = (wardFilter: WardFilter): Observable<Ward[]> => {
        return this.httpObservable.post<Ward[]>(kebabCase(nameof(this.singleListWard)), wardFilter)
            .pipe(map((response: AxiosResponse<Ward[]>) => response.data));
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

export const customerRepository = new CustomerRepository();
