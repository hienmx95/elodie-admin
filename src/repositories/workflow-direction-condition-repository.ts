import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_WORKFLOW_DIRECTION_CONDITION_PREFIX } from "config/api-consts";
import { WorkflowDirectionCondition, WorkflowDirectionConditionFilter } from 'models/WorkflowDirectionCondition';
import { WorkflowDirection, WorkflowDirectionFilter } from 'models/WorkflowDirection';
import { WorkflowOperator, WorkflowOperatorFilter } from 'models/WorkflowOperator';
import { WorkflowParameter, WorkflowParameterFilter } from 'models/WorkflowParameter';

export class WorkflowDirectionConditionRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_WORKFLOW_DIRECTION_CONDITION_PREFIX);
    }

    public count = (workflowDirectionConditionFilter?: WorkflowDirectionConditionFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), workflowDirectionConditionFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (workflowDirectionConditionFilter?: WorkflowDirectionConditionFilter): Observable<WorkflowDirectionCondition[]> => {
        return this.httpObservable.post<WorkflowDirectionCondition[]>(kebabCase(nameof(this.list)), workflowDirectionConditionFilter)
            .pipe(map((response: AxiosResponse<WorkflowDirectionCondition[]>) => response.data));
    };

    public get = (id: number | string): Observable<WorkflowDirectionCondition> => {
        return this.httpObservable.post<WorkflowDirectionCondition>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<WorkflowDirectionCondition>) => response.data));
    };

    public create = (workflowDirectionCondition: WorkflowDirectionCondition): Observable<WorkflowDirectionCondition> => {
        return this.httpObservable.post<WorkflowDirectionCondition>(kebabCase(nameof(this.create)), workflowDirectionCondition)
            .pipe(map((response: AxiosResponse<WorkflowDirectionCondition>) => response.data));
    };

    public update = (workflowDirectionCondition: WorkflowDirectionCondition): Observable<WorkflowDirectionCondition> => {
        return this.httpObservable.post<WorkflowDirectionCondition>(kebabCase(nameof(this.update)), workflowDirectionCondition)
            .pipe(map((response: AxiosResponse<WorkflowDirectionCondition>) => response.data));
    };

    public delete = (workflowDirectionCondition: WorkflowDirectionCondition): Observable<WorkflowDirectionCondition> => {
        return this.httpObservable.post<WorkflowDirectionCondition>(kebabCase(nameof(this.delete)), workflowDirectionCondition)
            .pipe(map((response: AxiosResponse<WorkflowDirectionCondition>) => response.data));
    };

    public save = (workflowDirectionCondition: WorkflowDirectionCondition): Observable<WorkflowDirectionCondition> => {
        return workflowDirectionCondition.id ? this.update(workflowDirectionCondition) : this.create(workflowDirectionCondition);
    };

    public singleListWorkflowDirection = (workflowDirectionFilter: WorkflowDirectionFilter): Observable<WorkflowDirection[]> => {
        return this.httpObservable.post<WorkflowDirection[]>(kebabCase(nameof(this.singleListWorkflowDirection)), workflowDirectionFilter)
            .pipe(map((response: AxiosResponse<WorkflowDirection[]>) => response.data));
    };
    public singleListWorkflowOperator = (workflowOperatorFilter: WorkflowOperatorFilter): Observable<WorkflowOperator[]> => {
        return this.httpObservable.post<WorkflowOperator[]>(kebabCase(nameof(this.singleListWorkflowOperator)), workflowOperatorFilter)
            .pipe(map((response: AxiosResponse<WorkflowOperator[]>) => response.data));
    };
    public singleListWorkflowParameter = (workflowParameterFilter: WorkflowParameterFilter): Observable<WorkflowParameter[]> => {
        return this.httpObservable.post<WorkflowParameter[]>(kebabCase(nameof(this.singleListWorkflowParameter)), workflowParameterFilter)
            .pipe(map((response: AxiosResponse<WorkflowParameter[]>) => response.data));
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

export const workflowDirectionConditionRepository = new WorkflowDirectionConditionRepository();
