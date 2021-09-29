import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import { httpConfig } from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_WORKFLOW_DIRECTION_PREFIX } from "config/api-consts";
import { WorkflowDirection, WorkflowDirectionFilter } from 'models/WorkflowDirection';
import { WorkflowStep, WorkflowStepFilter } from 'models/WorkflowStep';
import { Status, StatusFilter } from 'models/Status';
import { WorkflowDefinition, WorkflowDefinitionFilter } from 'models/WorkflowDefinition';
import { WorkflowOperator, WorkflowOperatorFilter } from 'models/WorkflowOperator';
import { WorkflowParameter, WorkflowParameterFilter } from 'models/WorkflowParameter';
import { Organization, OrganizationFilter } from 'models/Organization';
import { AppUser, AppUserFilter } from 'models/AppUser';
import { RequestState, RequestStateFilter } from 'models/RequestState';
import { Category, CategoryFilter } from 'models/Category';

export interface ApiOption {
    id: number,
    fieldName: string,
    _API: string,
    filterTypeName: string,
}
export class WorkflowDirectionRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_WORKFLOW_DIRECTION_PREFIX);
    }

    public count = (workflowDirectionFilter?: WorkflowDirectionFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), workflowDirectionFilter)
            .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (workflowDirectionFilter?: WorkflowDirectionFilter): Observable<WorkflowDirection[]> => {
        return this.httpObservable.post<WorkflowDirection[]>(kebabCase(nameof(this.list)), workflowDirectionFilter)
            .pipe(map((response: AxiosResponse<WorkflowDirection[]>) => response.data));
    };

    public get = (id: number | string): Observable<WorkflowDirection> => {
        return this.httpObservable.post<WorkflowDirection>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<WorkflowDirection>) => response.data));
    };

    public create = (workflowDirection: WorkflowDirection): Observable<WorkflowDirection> => {
        return this.httpObservable.post<WorkflowDirection>(kebabCase(nameof(this.create)), workflowDirection)
            .pipe(map((response: AxiosResponse<WorkflowDirection>) => response.data));
    };

    public update = (workflowDirection: WorkflowDirection): Observable<WorkflowDirection> => {
        return this.httpObservable.post<WorkflowDirection>(kebabCase(nameof(this.update)), workflowDirection)
            .pipe(map((response: AxiosResponse<WorkflowDirection>) => response.data));
    };

    public delete = (workflowDirection: WorkflowDirection): Observable<WorkflowDirection> => {
        return this.httpObservable.post<WorkflowDirection>(kebabCase(nameof(this.delete)), workflowDirection)
            .pipe(map((response: AxiosResponse<WorkflowDirection>) => response.data));
    };

    public save = (workflowDirection: WorkflowDirection): Observable<WorkflowDirection> => {
        return workflowDirection.id ? this.update(workflowDirection) : this.create(workflowDirection);
    };

    public singleListWorkflowStep = (workflowStepFilter: WorkflowStepFilter): Observable<WorkflowStep[]> => {
        return this.httpObservable.post<WorkflowStep[]>(kebabCase(nameof(this.singleListWorkflowStep)), workflowStepFilter)
            .pipe(map((response: AxiosResponse<WorkflowStep[]>) => response.data));
    };
    public singleListStatus = (): Observable<Status[]> => {
        return this.httpObservable.post<Status[]>(kebabCase(nameof(this.singleListStatus)), new StatusFilter())
            .pipe(map((response: AxiosResponse<Status[]>) => response.data));
    };
    public singleListWorkflowDefinition = (workflowDefinitionFilter: WorkflowDefinitionFilter): Observable<WorkflowDefinition[]> => {
        return this.httpObservable.post<WorkflowDefinition[]>(kebabCase(nameof(this.singleListWorkflowDefinition)), workflowDefinitionFilter)
            .pipe(map((response: AxiosResponse<WorkflowDefinition[]>) => response.data));
    };
    public singleListWorkflowOperator = (workflowOperatorFilter: WorkflowOperatorFilter): Observable<WorkflowOperator[]> => {
        return this.httpObservable.post<WorkflowOperator[]>(kebabCase(nameof(this.singleListWorkflowOperator)), workflowOperatorFilter)
            .pipe(map((response: AxiosResponse<WorkflowOperator[]>) => response.data));
    };

    public singleListWorkflowParameter = (workflowParameterFilter: WorkflowParameterFilter): Observable<WorkflowParameter[]> => {
        return this.httpObservable.post<WorkflowParameter[]>(kebabCase(nameof(this.singleListWorkflowParameter)), workflowParameterFilter)
            .pipe(map((response: AxiosResponse<WorkflowParameter[]>) => response.data));
    };
    public singleListOrganization = (organizationFilter: OrganizationFilter): Observable<Organization[]> => {
        return this.httpObservable.post<Organization[]>(kebabCase(nameof(this.singleListOrganization)), organizationFilter)
            .pipe(map((response: AxiosResponse<Organization[]>) => response.data));
    };
    public singleListCategory = (categoryFilter: CategoryFilter): Observable<Category[]> => {
        return this.httpObservable.post<Category[]>(kebabCase(nameof(this.singleListCategory)), categoryFilter)
            .pipe(map((response: AxiosResponse<Category[]>) => response.data));
    };
    public singleListAppUser = (appUserFilter: AppUserFilter): Observable<AppUser[]> => {
        return this.httpObservable.post<AppUser[]>(kebabCase(nameof(this.singleListAppUser)), appUserFilter)
            .pipe(map((response: AxiosResponse<AppUser[]>) => response.data));
    };
    public singleListRequestState = (requestStateFilter: RequestStateFilter): Observable<RequestState[]> => {
        return this.httpObservable.post<RequestState[]>(kebabCase(nameof(this.singleListRequestState)), requestStateFilter)
            .pipe(map((response: AxiosResponse<RequestState[]>) => response.data));
    };
    public getSingleListApi = (model: any): Observable<ApiOption> => {
        return this.httpObservable.post<ApiOption>
            (kebabCase(nameof(this.getSingleListApi)), model)
            .pipe(map((response: AxiosResponse<ApiOption>) => response.data));
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

export const workflowDirectionRepository = new WorkflowDirectionRepository();
