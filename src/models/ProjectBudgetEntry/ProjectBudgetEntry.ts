import { Model } from '@react3l/react3l/core';
import { MonthKey } from 'models/MonthKey';
import { ProjectBudget } from 'models/ProjectBudget';

export class ProjectBudgetEntry extends Model
{
    public id?: number;

    public projectBudgetId?: number;

    public monthId?: number;

    public inPeriod?: number;

    public accumulated?: number;

    public rowId?: string;





    public month?: MonthKey;

    public projectBudget?: ProjectBudget;
}
