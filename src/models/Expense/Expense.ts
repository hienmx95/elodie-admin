import { Model } from '@react3l/react3l/core';
import { AdvancePayment } from 'models/AdvancePayment';
import { AppUser } from 'models/AppUser';
import { BankingTransaction } from 'models/BankingTransaction';
import { BeneficiaryType } from 'models/BeneficiaryType';
import { ExpenseMethod } from 'models/ExpenseMethod';
import { ExpenseTransaction } from 'models/ExpenseTransaction';
import { ExpenseType } from 'models/ExpenseType';
import { Invoice } from 'models/Invoice';
import { Organization } from 'models/Organization';
import { PrePayment } from 'models/PrePayment';
import { Moment } from 'moment';

export class Expense extends Model
{
    public id?: number;

    public code?: string;

    public title?: string;

    public note?: string;

    public organizationId?: number;

    public expenseTypeId?: number;

    public appUserId?: number;

    public submitDate?: Moment;

    public dueDate?: Moment;

    public deadline?: number;

    public monthId?: number;

    public expenseMethodId?: number;

    public beneficiaryTypeId?: number;

    public supplierTaxCode?: string;

    public supplierName?: string;

    public supplierUpdate?: Moment;

    public bankConfigId?: number;

    public transferContent?: string;

    public convertedSubTotal?: number;

    public convertedTotal?: number;

    public creatorId?: number;

    public purchaseOrderId?: number;




    public rowId?: string;


    public appUser?: AppUser;

    public beneficiaryType?: BeneficiaryType;

    public creator?: AppUser;

    public expenseMethod?: ExpenseMethod;

    public expenseType?: ExpenseType;

    public organization?: Organization;


    public advancePayments?: AdvancePayment[];

    public bankingTransactions?: BankingTransaction[];

    public expenseTransactions?: ExpenseTransaction[];

    public invoices?: Invoice[];


    public prePayments?: PrePayment[];
}
