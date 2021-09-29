import { Model } from '@react3l/react3l/core';
import { Currency } from 'models/Currency';
import { ProjectBudget } from 'models/ProjectBudget';
import { Status } from 'models/Status';

export class ProjectBudgetHistory extends Model
{
    public id?: number;

    public projectBudgetId?: number;

    public title?: string;

    public type?: string;

    public currencyId?: number;

    public exchangeRate?: number;

    public statusId?: number;

    public rowId?: string;





    public currency?: Currency;

    public projectBudget?: ProjectBudget;

    public status?: Status;

}
