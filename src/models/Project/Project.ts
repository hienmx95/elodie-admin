import { Model } from '@react3l/react3l/core';
import { Currency } from 'models/Currency';
import { MonthKey } from 'models/MonthKey';
import { Organization } from 'models/Organization';
import { ProjectBudget } from 'models/ProjectBudget';

export class Project extends Model
{
    public id?: number;

    public code?: string;

    public name?: string;

    public organizationId?: number;

    public currencyId?: number;

    public exchangeRate?: number;

    public level?: number;

    public parentId?: number;

    public path?: string;

    public startMonthId?: number;

    public endMonthId?: number;

    public rowId?: string;

    public used?: boolean;





    public currency?: Currency;

    public endMonth?: MonthKey;

    public organization?: Organization;

    public parent?: Project;

    public startMonth?: MonthKey;





    public projectBudgets?: ProjectBudget[];

}
