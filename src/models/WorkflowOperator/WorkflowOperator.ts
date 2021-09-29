import { Model } from '@react3l/react3l/core';
import { WorkflowParameterType } from 'models/WorkflowParameterType';

export class WorkflowOperator extends Model
{
    public id?: number;

    public code?: string;

    public name?: string;

    public workflowParameterTypeId?: number;


    public workflowParameterType?: WorkflowParameterType;

}
