import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import { httpConfig } from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_WORKFLOW_PARAMETER_PREFIX } from "config/api-consts";
import { WorkflowParameter, WorkflowParameterFilter } from 'models/WorkflowParameter';
import { WorkflowParameterType, WorkflowParameterTypeFilter } from 'models/WorkflowParameterType';
import { WorkflowType, WorkflowTypeFilter } from 'models/WorkflowType';

export class WorkflowParameterRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_WORKFLOW_PARAMETER_PREFIX);
    }

    public count = (workflowParameterFilter?: WorkflowParameterFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), workflowParameterFilter)
            .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (workflowParameterFilter?: WorkflowParameterFilter): Observable<WorkflowParameter[]> => {
        return this.httpObservable.post<WorkflowParameter[]>(kebabCase(nameof(this.list)), workflowParameterFilter)
            .pipe(map((response: AxiosResponse<WorkflowParameter[]>) => response.data));
    };

    public get = (id: number | string): Observable<WorkflowParameter> => {
        return this.httpObservable.post<WorkflowParameter>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<WorkflowParameter>) => response.data));
    };

    public create = (workflowParameter: WorkflowParameter): Observable<WorkflowParameter> => {
        return this.httpObservable.post<WorkflowParameter>(kebabCase(nameof(this.create)), workflowParameter)
            .pipe(map((response: AxiosResponse<WorkflowParameter>) => response.data));
    };

    public update = (workflowParameter: WorkflowParameter): Observable<WorkflowParameter> => {
        return this.httpObservable.post<WorkflowParameter>(kebabCase(nameof(this.update)), workflowParameter)
            .pipe(map((response: AxiosResponse<WorkflowParameter>) => response.data));
    };

    public delete = (workflowParameter: WorkflowParameter): Observable<WorkflowParameter> => {
        return this.httpObservable.post<WorkflowParameter>(kebabCase(nameof(this.delete)), workflowParameter)
            .pipe(map((response: AxiosResponse<WorkflowParameter>) => response.data));
    };

    public save = (workflowParameter: WorkflowParameter): Observable<WorkflowParameter> => {
        return workflowParameter.id ? this.update(workflowParameter) : this.create(workflowParameter);
    };

    public filterListWorkflowParameterType = (workflowParameterTypeFilter: WorkflowParameterTypeFilter): Observable<WorkflowParameterType[]> => {
        return this.httpObservable.post<WorkflowParameterType[]>(kebabCase(nameof(this.filterListWorkflowParameterType)), workflowParameterTypeFilter)
            .pipe(map((response: AxiosResponse<WorkflowParameterType[]>) => response.data));
    };
    public filterListWorkflowType = (workflowTypeFilter: WorkflowTypeFilter): Observable<WorkflowType[]> => {
        return this.httpObservable.post<WorkflowType[]>(kebabCase(nameof(this.filterListWorkflowType)), workflowTypeFilter)
            .pipe(map((response: AxiosResponse<WorkflowType[]>) => response.data));
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

export const workflowParameterRepository = new WorkflowParameterRepository();
