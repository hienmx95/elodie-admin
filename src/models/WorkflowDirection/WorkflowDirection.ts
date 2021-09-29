import { Model } from '@react3l/react3l/core';
import { WorkflowStep } from 'models/WorkflowStep';
import { Status } from 'models/Status';
import { WorkflowDefinition } from 'models/WorkflowDefinition';

export class WorkflowDirection extends Model
{
    public id?: number;

    public workflowDefinitionId?: number;

    public fromStepId?: number;

    public toStepId?: number;

    public subjectMailForCreator?: string;

    public subjectMailForCurrentStep?: string;

    public subjectMailForNextStep?: string;

    public bodyMailForCreator?: string;

    public bodyMailForCurrentStep?: string;

    public bodyMailForNextStep?: string;

    public statusId?: number;


    public rowId?: string;


    public fromStep?: WorkflowStep;

    public status?: Status;

    public toStep?: WorkflowStep;

    public workflowDefinition?: WorkflowDefinition;

}
