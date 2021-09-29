import { StringFilter  } from '@react3l/advanced-filters';
import { IdFilter  } from '@react3l/advanced-filters';
import { NumberFilter  } from '@react3l/advanced-filters';
import { DateFilter  } from '@react3l/advanced-filters';
import { GuidFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class BankingTransactionFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public expenseId?: IdFilter = new IdFilter();
  public bankCreditAccountId?: IdFilter = new IdFilter();
  public bankDebitAccountId?: IdFilter = new IdFilter();
  public exchangeRate?: NumberFilter = new NumberFilter();
  public exchangeTime?: DateFilter = new DateFilter();
  public exchangeCurrencyId?: IdFilter = new IdFilter();
  public mainCurrencyId?: IdFilter = new IdFilter();
  public bankingTransactionStatusId?: IdFilter = new IdFilter();
  public amount?: NumberFilter = new NumberFilter();
  public error?: StringFilter = new StringFilter();
  public rowId?: GuidFilter = new GuidFilter();
}
