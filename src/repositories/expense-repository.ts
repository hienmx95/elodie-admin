import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_EXPENSE_PREFIX } from "config/api-consts";
import { Expense, ExpenseFilter } from 'models/Expense';
import { AppUser, AppUserFilter } from 'models/AppUser';
import { BeneficiaryType, BeneficiaryTypeFilter } from 'models/BeneficiaryType';
import { ExpenseMethod, ExpenseMethodFilter } from 'models/ExpenseMethod';
import { ExpenseType, ExpenseTypeFilter } from 'models/ExpenseType';
import { Organization, OrganizationFilter } from 'models/Organization';
import { AdvancePayment, AdvancePaymentFilter } from 'models/AdvancePayment';
import { Currency, CurrencyFilter } from 'models/Currency';
import { Project, ProjectFilter } from 'models/Project';
import { ProjectBudget, ProjectBudgetFilter } from 'models/ProjectBudget';
import { BankingTransaction, BankingTransactionFilter } from 'models/BankingTransaction';
import { BankingTransactionStatus, BankingTransactionStatusFilter } from 'models/BankingTransactionStatus';
import { ExpenseTransaction, ExpenseTransactionFilter } from 'models/ExpenseTransaction';
import { Invoice, InvoiceFilter } from 'models/Invoice';
import { PrePayment, PrePaymentFilter } from 'models/PrePayment';

export class ExpenseRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_EXPENSE_PREFIX);
    }

    public count = (expenseFilter?: ExpenseFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), expenseFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (expenseFilter?: ExpenseFilter): Observable<Expense[]> => {
        return this.httpObservable.post<Expense[]>(kebabCase(nameof(this.list)), expenseFilter)
            .pipe(map((response: AxiosResponse<Expense[]>) => response.data));
    };

    public get = (id: number | string): Observable<Expense> => {
        return this.httpObservable.post<Expense>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<Expense>) => response.data));
    };

    public create = (expense: Expense): Observable<Expense> => {
        return this.httpObservable.post<Expense>(kebabCase(nameof(this.create)), expense)
            .pipe(map((response: AxiosResponse<Expense>) => response.data));
    };

    public update = (expense: Expense): Observable<Expense> => {
        return this.httpObservable.post<Expense>(kebabCase(nameof(this.update)), expense)
            .pipe(map((response: AxiosResponse<Expense>) => response.data));
    };

    public delete = (expense: Expense): Observable<Expense> => {
        return this.httpObservable.post<Expense>(kebabCase(nameof(this.delete)), expense)
            .pipe(map((response: AxiosResponse<Expense>) => response.data));
    };

    public save = (expense: Expense): Observable<Expense> => {
        return expense.id ? this.update(expense) : this.create(expense);
    };

    public singleListAppUser = (appUserFilter: AppUserFilter): Observable<AppUser[]> => {
        return this.httpObservable.post<AppUser[]>(kebabCase(nameof(this.singleListAppUser)), appUserFilter)
            .pipe(map((response: AxiosResponse<AppUser[]>) => response.data));
    };
    public singleListBeneficiaryType = (): Observable<BeneficiaryType[]> => {
        return this.httpObservable.post<BeneficiaryType[]>(kebabCase(nameof(this.singleListBeneficiaryType)), new BeneficiaryTypeFilter())
            .pipe(map((response: AxiosResponse<BeneficiaryType[]>) => response.data));
    };
    public singleListExpenseMethod = (): Observable<ExpenseMethod[]> => {
        return this.httpObservable.post<ExpenseMethod[]>(kebabCase(nameof(this.singleListExpenseMethod)), new ExpenseMethodFilter())
            .pipe(map((response: AxiosResponse<ExpenseMethod[]>) => response.data));
    };
    public singleListExpenseType = (): Observable<ExpenseType[]> => {
        return this.httpObservable.post<ExpenseType[]>(kebabCase(nameof(this.singleListExpenseType)), new ExpenseTypeFilter())
            .pipe(map((response: AxiosResponse<ExpenseType[]>) => response.data));
    };
    public singleListOrganization = (organizationFilter: OrganizationFilter): Observable<Organization[]> => {
        return this.httpObservable.post<Organization[]>(kebabCase(nameof(this.singleListOrganization)), organizationFilter)
            .pipe(map((response: AxiosResponse<Organization[]>) => response.data));
    };
    public singleListAdvancePayment = (advancePaymentFilter: AdvancePaymentFilter): Observable<AdvancePayment[]> => {
        return this.httpObservable.post<AdvancePayment[]>(kebabCase(nameof(this.singleListAdvancePayment)), advancePaymentFilter)
            .pipe(map((response: AxiosResponse<AdvancePayment[]>) => response.data));
    };
    public singleListCurrency = (currencyFilter: CurrencyFilter): Observable<Currency[]> => {
        return this.httpObservable.post<Currency[]>(kebabCase(nameof(this.singleListCurrency)), currencyFilter)
            .pipe(map((response: AxiosResponse<Currency[]>) => response.data));
    };
    public singleListProject = (projectFilter: ProjectFilter): Observable<Project[]> => {
        return this.httpObservable.post<Project[]>(kebabCase(nameof(this.singleListProject)), projectFilter)
            .pipe(map((response: AxiosResponse<Project[]>) => response.data));
    };
    public singleListProjectBudget = (projectBudgetFilter: ProjectBudgetFilter): Observable<ProjectBudget[]> => {
        return this.httpObservable.post<ProjectBudget[]>(kebabCase(nameof(this.singleListProjectBudget)), projectBudgetFilter)
            .pipe(map((response: AxiosResponse<ProjectBudget[]>) => response.data));
    };
    public singleListBankingTransaction = (bankingTransactionFilter: BankingTransactionFilter): Observable<BankingTransaction[]> => {
        return this.httpObservable.post<BankingTransaction[]>(kebabCase(nameof(this.singleListBankingTransaction)), bankingTransactionFilter)
            .pipe(map((response: AxiosResponse<BankingTransaction[]>) => response.data));
    };
    public singleListBankingTransactionStatus = (): Observable<BankingTransactionStatus[]> => {
        return this.httpObservable.post<BankingTransactionStatus[]>(kebabCase(nameof(this.singleListBankingTransactionStatus)), new BankingTransactionStatusFilter())
            .pipe(map((response: AxiosResponse<BankingTransactionStatus[]>) => response.data));
    };
    public singleListExpenseTransaction = (expenseTransactionFilter: ExpenseTransactionFilter): Observable<ExpenseTransaction[]> => {
        return this.httpObservable.post<ExpenseTransaction[]>(kebabCase(nameof(this.singleListExpenseTransaction)), expenseTransactionFilter)
            .pipe(map((response: AxiosResponse<ExpenseTransaction[]>) => response.data));
    };
    public singleListInvoice = (invoiceFilter: InvoiceFilter): Observable<Invoice[]> => {
        return this.httpObservable.post<Invoice[]>(kebabCase(nameof(this.singleListInvoice)), invoiceFilter)
            .pipe(map((response: AxiosResponse<Invoice[]>) => response.data));
    };
    public singleListPrePayment = (prePaymentFilter: PrePaymentFilter): Observable<PrePayment[]> => {
        return this.httpObservable.post<PrePayment[]>(kebabCase(nameof(this.singleListPrePayment)), prePaymentFilter)
            .pipe(map((response: AxiosResponse<PrePayment[]>) => response.data));
    };
    

    public bulkDelete = (idList: number[] | string[]): Observable<void> => {
        return this.httpObservable.post(kebabCase(nameof(this.bulkDelete)), idList)
            .pipe(map((response: AxiosResponse<void>) => response.data));
    };

    public import = (file: File, name: string = nameof(file)): Observable<void> => {
        const formData: FormData = new FormData();
        formData.append(name, file as Blob);
        return this.httpObservable.post<void>(kebabCase(nameof(this.import)), formData)
            .pipe(map((response: AxiosResponse<void>) => response.data));
    };

    public export = (filter: any): Observable<AxiosResponse<any>> => {
        return this.httpObservable.post('export', filter, {
          responseType: 'arraybuffer',
        });
    };

    public exportTemplate = (): Observable<AxiosResponse<any>> => {
        return this.httpObservable.post('export-template', {}, {
          responseType: 'arraybuffer',
        });
    };
    
}

export const expenseRepository = new ExpenseRepository();
