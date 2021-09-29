import { StringFilter  } from '@react3l/advanced-filters';
import { IdFilter  } from '@react3l/advanced-filters';
import { NumberFilter  } from '@react3l/advanced-filters';
import { DateFilter  } from '@react3l/advanced-filters';
import { GuidFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class ExpenseTransactionFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public expenseId?: IdFilter = new IdFilter();
  public organizationId?: IdFilter = new IdFilter();
  public projectId?: IdFilter = new IdFilter();
  public projectBudgetId?: IdFilter = new IdFilter();
  public userId?: IdFilter = new IdFilter();
  public masterBudgetId?: IdFilter = new IdFilter();
  public submitDate?: DateFilter = new DateFilter();
  public expenseTypeId?: IdFilter = new IdFilter();
  public expenseMethodId?: IdFilter = new IdFilter();
  public monthId?: IdFilter = new IdFilter();
  public title?: StringFilter = new StringFilter();
  public description?: StringFilter = new StringFilter();
  public amount?: NumberFilter = new NumberFilter();
  public taxAmount?: NumberFilter = new NumberFilter();
  public total?: NumberFilter = new NumberFilter();
  public rowId?: GuidFilter = new GuidFilter();
}
