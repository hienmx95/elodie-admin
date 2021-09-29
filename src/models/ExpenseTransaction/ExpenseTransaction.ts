import { Model } from '@react3l/react3l/core';
import { Moment } from 'moment';
import { Expense } from 'models/Expense';
import { Organization } from 'models/Organization';

export class ExpenseTransaction extends Model
{
    public id?: number;

    public expenseId?: number;

    public organizationId?: number;

    public projectId?: number;

    public projectBudgetId?: number;

    public userId?: number;

    public masterBudgetId?: number;

    public submitDate?: Moment;

    public expenseTypeId?: number;

    public expenseMethodId?: number;

    public monthId?: number;

    public title?: string;

    public description?: string;

    public amount?: number;

    public taxAmount?: number;

    public total?: number;

    public authorizedPayment?: boolean;

    public isRefunded?: boolean;




    public rowId?: string;


    public expense?: Expense;

    public organization?: Organization;
}
