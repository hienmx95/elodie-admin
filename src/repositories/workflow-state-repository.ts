import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_WORKFLOW_STATE_PREFIX } from "config/api-consts";
import { WorkflowState, WorkflowStateFilter } from 'models/WorkflowState';

export class WorkflowStateRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_WORKFLOW_STATE_PREFIX);
    }

    public count = (workflowStateFilter?: WorkflowStateFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), workflowStateFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (workflowStateFilter?: WorkflowStateFilter): Observable<WorkflowState[]> => {
        return this.httpObservable.post<WorkflowState[]>(kebabCase(nameof(this.list)), workflowStateFilter)
            .pipe(map((response: AxiosResponse<WorkflowState[]>) => response.data));
    };

    public get = (id: number | string): Observable<WorkflowState> => {
        return this.httpObservable.post<WorkflowState>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<WorkflowState>) => response.data));
    };

    public create = (workflowState: WorkflowState): Observable<WorkflowState> => {
        return this.httpObservable.post<WorkflowState>(kebabCase(nameof(this.create)), workflowState)
            .pipe(map((response: AxiosResponse<WorkflowState>) => response.data));
    };

    public update = (workflowState: WorkflowState): Observable<WorkflowState> => {
        return this.httpObservable.post<WorkflowState>(kebabCase(nameof(this.update)), workflowState)
            .pipe(map((response: AxiosResponse<WorkflowState>) => response.data));
    };

    public delete = (workflowState: WorkflowState): Observable<WorkflowState> => {
        return this.httpObservable.post<WorkflowState>(kebabCase(nameof(this.delete)), workflowState)
            .pipe(map((response: AxiosResponse<WorkflowState>) => response.data));
    };

    public save = (workflowState: WorkflowState): Observable<WorkflowState> => {
        return workflowState.id ? this.update(workflowState) : this.create(workflowState);
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

export const workflowStateRepository = new WorkflowStateRepository();
