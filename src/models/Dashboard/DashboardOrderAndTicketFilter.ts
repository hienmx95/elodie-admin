import { IdFilter  } from '@react3l/advanced-filters';;
import { ModelFilter } from '@react3l/react3l/core';

export class DashboardOrderAndTicketFilter extends ModelFilter {
    public time?: IdFilter = new IdFilter();
    public organizationId?: IdFilter = new IdFilter();
    public appUserId?: IdFilter = new IdFilter();
    public provinceId?: IdFilter = new IdFilter();
}
