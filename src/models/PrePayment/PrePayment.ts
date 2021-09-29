import { Model } from '@react3l/react3l/core';
import { Moment } from 'moment';
import { Currency } from 'models/Currency';
import { Expense } from 'models/Expense';
import { Organization } from 'models/Organization';
import { Project } from 'models/Project';
import { ProjectBudget } from 'models/ProjectBudget';

export class PrePayment extends Model
{
    public id?: number;

    public expenseId?: number;

    public title?: string;

    public authorizedPayment?: boolean;

    public organizationId?: number;

    public projectId?: number;

    public projectBudgetId?: number;

    public price?: number;

    public exchangeRate?: number;

    public exchangeTime?: Moment;

    public exchangeCurrencyId?: number;

    public mainCurrencyId?: number;

    public contractDate?: Moment;

    public contractNumber?: string;

    public contractAmount?: number;

    public subTotal?: number;

    public total?: number;

    public convertedSubTotal?: number;

    public convertedTotal?: number;





    public exchangeCurrency?: Currency;

    public expense?: Expense;

    public mainCurrency?: Currency;

    public organization?: Organization;

    public project?: Project;

    public projectBudget?: ProjectBudget;

}
