import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_WORKFLOW_OPERATOR_PREFIX } from "config/api-consts";
import { WorkflowOperator, WorkflowOperatorFilter } from 'models/WorkflowOperator';
import { WorkflowParameterType, WorkflowParameterTypeFilter } from 'models/WorkflowParameterType';

export class WorkflowOperatorRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_WORKFLOW_OPERATOR_PREFIX);
    }

    public count = (workflowOperatorFilter?: WorkflowOperatorFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), workflowOperatorFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (workflowOperatorFilter?: WorkflowOperatorFilter): Observable<WorkflowOperator[]> => {
        return this.httpObservable.post<WorkflowOperator[]>(kebabCase(nameof(this.list)), workflowOperatorFilter)
            .pipe(map((response: AxiosResponse<WorkflowOperator[]>) => response.data));
    };

    public get = (id: number | string): Observable<WorkflowOperator> => {
        return this.httpObservable.post<WorkflowOperator>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<WorkflowOperator>) => response.data));
    };

    public create = (workflowOperator: WorkflowOperator): Observable<WorkflowOperator> => {
        return this.httpObservable.post<WorkflowOperator>(kebabCase(nameof(this.create)), workflowOperator)
            .pipe(map((response: AxiosResponse<WorkflowOperator>) => response.data));
    };

    public update = (workflowOperator: WorkflowOperator): Observable<WorkflowOperator> => {
        return this.httpObservable.post<WorkflowOperator>(kebabCase(nameof(this.update)), workflowOperator)
            .pipe(map((response: AxiosResponse<WorkflowOperator>) => response.data));
    };

    public delete = (workflowOperator: WorkflowOperator): Observable<WorkflowOperator> => {
        return this.httpObservable.post<WorkflowOperator>(kebabCase(nameof(this.delete)), workflowOperator)
            .pipe(map((response: AxiosResponse<WorkflowOperator>) => response.data));
    };

    public save = (workflowOperator: WorkflowOperator): Observable<WorkflowOperator> => {
        return workflowOperator.id ? this.update(workflowOperator) : this.create(workflowOperator);
    };

    public singleListWorkflowParameterType = (workflowParameterTypeFilter: WorkflowParameterTypeFilter): Observable<WorkflowParameterType[]> => {
        return this.httpObservable.post<WorkflowParameterType[]>(kebabCase(nameof(this.singleListWorkflowParameterType)), workflowParameterTypeFilter)
            .pipe(map((response: AxiosResponse<WorkflowParameterType[]>) => response.data));
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

export const workflowOperatorRepository = new WorkflowOperatorRepository();
