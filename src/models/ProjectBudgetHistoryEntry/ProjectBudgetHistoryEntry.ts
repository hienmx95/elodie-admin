import { Model } from '@react3l/react3l/core';
import { MonthKey } from 'models/MonthKey';
import { ProjectBudgetHistory } from 'models/ProjectBudgetHistory';

export class ProjectBudgetHistoryEntry extends Model
{
    public id?: number;

    public projectBudgetHistoryId?: number;

    public monthId?: number;

    public amount?: number;

    public rowId?: string;





    public month?: MonthKey;

    public projectBudgetHistory?: ProjectBudgetHistory;
}
