import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import { httpConfig } from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_WORKFLOW_STEP_PREFIX } from "config/api-consts";
import { WorkflowStep, WorkflowStepFilter } from 'models/WorkflowStep';
import { Status, StatusFilter } from 'models/Status';
import { WorkflowDefinition, WorkflowDefinitionFilter } from 'models/WorkflowDefinition';
import { Role, RoleFilter } from 'models/Role';

export class WorkflowStepRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_WORKFLOW_STEP_PREFIX);
    }

    public count = (workflowStepFilter?: WorkflowStepFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), workflowStepFilter)
            .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (workflowStepFilter?: WorkflowStepFilter): Observable<WorkflowStep[]> => {
        return this.httpObservable.post<WorkflowStep[]>(kebabCase(nameof(this.list)), workflowStepFilter)
            .pipe(map((response: AxiosResponse<WorkflowStep[]>) => response.data));
    };

    public get = (id: number | string): Observable<WorkflowStep> => {
        return this.httpObservable.post<WorkflowStep>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<WorkflowStep>) => response.data));
    };

    public create = (workflowStep: WorkflowStep): Observable<WorkflowStep> => {
        return this.httpObservable.post<WorkflowStep>(kebabCase(nameof(this.create)), workflowStep)
            .pipe(map((response: AxiosResponse<WorkflowStep>) => response.data));
    };

    public update = (workflowStep: WorkflowStep): Observable<WorkflowStep> => {
        return this.httpObservable.post<WorkflowStep>(kebabCase(nameof(this.update)), workflowStep)
            .pipe(map((response: AxiosResponse<WorkflowStep>) => response.data));
    };

    public delete = (workflowStep: WorkflowStep): Observable<WorkflowStep> => {
        return this.httpObservable.post<WorkflowStep>(kebabCase(nameof(this.delete)), workflowStep)
            .pipe(map((response: AxiosResponse<WorkflowStep>) => response.data));
    };

    public save = (workflowStep: WorkflowStep): Observable<WorkflowStep> => {
        return workflowStep.id ? this.update(workflowStep) : this.create(workflowStep);
    };

    public singleListStatus = (): Observable<Status[]> => {
        return this.httpObservable.post<Status[]>(kebabCase(nameof(this.singleListStatus)), new StatusFilter())
            .pipe(map((response: AxiosResponse<Status[]>) => response.data));
    };
    public filterListStatus = (): Observable<Status[]> => {
        return this.httpObservable.post<Status[]>(kebabCase(nameof(this.filterListStatus)), new StatusFilter())
            .pipe(map((response: AxiosResponse<Status[]>) => response.data));
    };
    public singleListWorkflowDefinition = (workflowDefinitionFilter: WorkflowDefinitionFilter): Observable<WorkflowDefinition[]> => {
        return this.httpObservable.post<WorkflowDefinition[]>(kebabCase(nameof(this.singleListWorkflowDefinition)), workflowDefinitionFilter)
            .pipe(map((response: AxiosResponse<WorkflowDefinition[]>) => response.data));
    };
    public filterListWorkflowDefinition = (workflowDefinitionFilter: WorkflowDefinitionFilter): Observable<WorkflowDefinition[]> => {
        return this.httpObservable.post<WorkflowDefinition[]>(kebabCase(nameof(this.filterListWorkflowDefinition)), workflowDefinitionFilter)
            .pipe(map((response: AxiosResponse<WorkflowDefinition[]>) => response.data));
    };
    public singleListRole = (roleFilter: RoleFilter): Observable<Role[]> => {
        return this.httpObservable.post<Role[]>(kebabCase(nameof(this.singleListRole)), roleFilter)
            .pipe(map((response: AxiosResponse<Role[]>) => response.data));
    };
    public filterListRole = (roleFilter: RoleFilter): Observable<Role[]> => {
        return this.httpObservable.post<Role[]>(kebabCase(nameof(this.filterListRole)), roleFilter)
            .pipe(map((response: AxiosResponse<Role[]>) => response.data));
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

export const workflowStepRepository = new WorkflowStepRepository();
