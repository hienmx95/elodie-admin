import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_WORKFLOW_PARAMETER_TYPE_PREFIX } from "config/api-consts";
import { WorkflowParameterType, WorkflowParameterTypeFilter } from 'models/WorkflowParameterType';

export class WorkflowParameterTypeRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_WORKFLOW_PARAMETER_TYPE_PREFIX);
    }

    public count = (workflowParameterTypeFilter?: WorkflowParameterTypeFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), workflowParameterTypeFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (workflowParameterTypeFilter?: WorkflowParameterTypeFilter): Observable<WorkflowParameterType[]> => {
        return this.httpObservable.post<WorkflowParameterType[]>(kebabCase(nameof(this.list)), workflowParameterTypeFilter)
            .pipe(map((response: AxiosResponse<WorkflowParameterType[]>) => response.data));
    };

    public get = (id: number | string): Observable<WorkflowParameterType> => {
        return this.httpObservable.post<WorkflowParameterType>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<WorkflowParameterType>) => response.data));
    };

    public create = (workflowParameterType: WorkflowParameterType): Observable<WorkflowParameterType> => {
        return this.httpObservable.post<WorkflowParameterType>(kebabCase(nameof(this.create)), workflowParameterType)
            .pipe(map((response: AxiosResponse<WorkflowParameterType>) => response.data));
    };

    public update = (workflowParameterType: WorkflowParameterType): Observable<WorkflowParameterType> => {
        return this.httpObservable.post<WorkflowParameterType>(kebabCase(nameof(this.update)), workflowParameterType)
            .pipe(map((response: AxiosResponse<WorkflowParameterType>) => response.data));
    };

    public delete = (workflowParameterType: WorkflowParameterType): Observable<WorkflowParameterType> => {
        return this.httpObservable.post<WorkflowParameterType>(kebabCase(nameof(this.delete)), workflowParameterType)
            .pipe(map((response: AxiosResponse<WorkflowParameterType>) => response.data));
    };

    public save = (workflowParameterType: WorkflowParameterType): Observable<WorkflowParameterType> => {
        return workflowParameterType.id ? this.update(workflowParameterType) : this.create(workflowParameterType);
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

export const workflowParameterTypeRepository = new WorkflowParameterTypeRepository();
