import { Model } from '@react3l/react3l/core';
import { WorkflowParameterType } from 'models/WorkflowParameterType';
import { WorkflowType } from 'models/WorkflowType';

export class WorkflowParameter extends Model
{
    public id?: number;

    public code?: string;

    public name?: string;

    public workflowTypeId?: number;

    public workflowParameterTypeId?: number;


    public workflowParameterType?: WorkflowParameterType;

    public workflowType?: WorkflowType;


}
