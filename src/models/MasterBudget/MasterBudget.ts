import { Model } from '@react3l/react3l/core';

export class MasterBudget extends Model
{
    public id?: number;

    public organizationId?: number;

    public code?: string;

    public name?: string;

    public level?: number;

    public parentId?: number;

    public path?: string;

    public strict?: boolean;

    public statusId?: number;




}
