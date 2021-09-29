import { Model } from '@react3l/react3l/core';
import { Status } from 'models/Status';
import { WorkflowDefinition } from 'models/WorkflowDefinition';

export class WorkflowStep extends Model
{
    public id?: number;

    public workflowDefinitionId?: number;

    public code?: string;

    public name?: string;

    public roleId?: number;

    public subjectMailForReject?: string;

    public bodyMailForReject?: string;

    public statusId?: number;





    public status?: Status;

    public workflowDefinition?: WorkflowDefinition;




}
