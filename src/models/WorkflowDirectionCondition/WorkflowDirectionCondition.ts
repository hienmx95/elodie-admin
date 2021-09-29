import { Model } from '@react3l/react3l/core';
import { WorkflowDirection } from 'models/WorkflowDirection';
import { WorkflowOperator } from 'models/WorkflowOperator';
import { WorkflowParameter } from 'models/WorkflowParameter';

export class WorkflowDirectionCondition extends Model
{
    public id?: number;

    public workflowDirectionId?: number;

    public workflowParameterId?: number;

    public workflowOperatorId?: number;

    public value?: string;


    public workflowDirection?: WorkflowDirection;

    public workflowOperator?: WorkflowOperator;

    public workflowParameter?: WorkflowParameter;
}
