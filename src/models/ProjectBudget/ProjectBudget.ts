import { Model } from '@react3l/react3l/core';
import { Project } from 'models/Project';
import { ProjectBudgetEntry } from 'models/ProjectBudgetEntry';
import { ProjectBudgetHistory } from 'models/ProjectBudgetHistory';

export class ProjectBudget extends Model
{
    public id?: number;

    public projectId?: number;

    public masterBudgetId?: number;

    public rowId?: string;

    public used?: boolean;


    public project?: Project;




    public projectBudgetEntries?: ProjectBudgetEntry[];

    public projectBudgetHistories?: ProjectBudgetHistory[];

}
