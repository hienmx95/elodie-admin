import { Model } from '@react3l/react3l/core';
import { Moment } from 'moment';
import { Currency } from 'models/Currency';
import { Invoice } from 'models/Invoice';
import { Organization } from 'models/Organization';
import { Project } from 'models/Project';
import { ProjectBudget } from 'models/ProjectBudget';

export class Payment extends Model
{
    public id?: number;

    public invoiceId?: number;

    public title?: string;

    public organizationId?: number;

    public projectId?: number;

    public projectBudgetId?: number;

    public authorizedPayment?: boolean;

    public unitPrice?: number;

    public quantity?: number;

    public exchangeRate?: number;

    public exchangeTime?: Moment;

    public exchangeCurrencyId?: number;

    public mainCurrencyId?: number;

    public taxAmount?: number;

    public taxTypeId?: number;

    public subTotal?: number;

    public total?: number;

    public convertedSubTotal?: number;

    public convertedTotal?: number;




    public rowId?: string;


    public exchangeCurrency?: Currency;

    public invoice?: Invoice;

    public mainCurrency?: Currency;

    public organization?: Organization;

    public project?: Project;

    public projectBudget?: ProjectBudget;
}
