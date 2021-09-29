import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_WORKFLOW_TYPE_PREFIX } from "config/api-consts";
import { WorkflowType, WorkflowTypeFilter } from 'models/WorkflowType';

export class WorkflowTypeRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_WORKFLOW_TYPE_PREFIX);
    }

    public count = (workflowTypeFilter?: WorkflowTypeFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), workflowTypeFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (workflowTypeFilter?: WorkflowTypeFilter): Observable<WorkflowType[]> => {
        return this.httpObservable.post<WorkflowType[]>(kebabCase(nameof(this.list)), workflowTypeFilter)
            .pipe(map((response: AxiosResponse<WorkflowType[]>) => response.data));
    };

    public get = (id: number | string): Observable<WorkflowType> => {
        return this.httpObservable.post<WorkflowType>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<WorkflowType>) => response.data));
    };

    public create = (workflowType: WorkflowType): Observable<WorkflowType> => {
        return this.httpObservable.post<WorkflowType>(kebabCase(nameof(this.create)), workflowType)
            .pipe(map((response: AxiosResponse<WorkflowType>) => response.data));
    };

    public update = (workflowType: WorkflowType): Observable<WorkflowType> => {
        return this.httpObservable.post<WorkflowType>(kebabCase(nameof(this.update)), workflowType)
            .pipe(map((response: AxiosResponse<WorkflowType>) => response.data));
    };

    public delete = (workflowType: WorkflowType): Observable<WorkflowType> => {
        return this.httpObservable.post<WorkflowType>(kebabCase(nameof(this.delete)), workflowType)
            .pipe(map((response: AxiosResponse<WorkflowType>) => response.data));
    };

    public save = (workflowType: WorkflowType): Observable<WorkflowType> => {
        return workflowType.id ? this.update(workflowType) : this.create(workflowType);
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

export const workflowTypeRepository = new WorkflowTypeRepository();
