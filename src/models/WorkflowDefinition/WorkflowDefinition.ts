import { Model } from '@react3l/react3l/core';
import { Moment } from 'moment';
import { AppUser } from 'models/AppUser';
import { Organization } from 'models/Organization';
import { Status } from 'models/Status';
import { WorkflowType } from 'models/WorkflowType';

export class WorkflowDefinition extends Model
{
    public id?: number;

    public code?: string;

    public name?: string;

    public creatorId?: number;

    public modifierId?: number;

    public workflowTypeId?: number;

    public organizationId?: number;

    public startDate?: Moment;

    public endDate?: Moment;

    public statusId?: number;




    public used?: boolean;


    public creator?: AppUser;

    public modifier?: AppUser;

    public organization?: Organization;

    public status?: Status;

    public workflowType?: WorkflowType;




}
