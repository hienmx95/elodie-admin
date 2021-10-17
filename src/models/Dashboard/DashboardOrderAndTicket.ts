import { Model } from '@react3l/react3l/core';
import { OATMonthData, OATQuarterData, OATYearData } from './DashboardOrderAndTicketFile';
export class RevenueBySource extends Model {
    public total?: 0;
    public contents?: ContentRevenueBySource[];
}
export class RevenueByTime extends Model {
    public month?: OATMonthData[];
    public quarter?: OATQuarterData[];
    public year?: OATYearData[];
}
export class RevenueByStatus extends Model {
    public total?: 0;
    public contents?: ContentRevenueByStatus[];
}
export class ContentRevenueBySource extends Model {
    public orderSourceId?: number;
    public revenue?: number = 0;
    public orderSourceName?: string;
    public rate?: number = 0;
}
export class ContentRevenueByStatus extends Model {
    public requestStateId?: number;
    public revenue?: number = 0;
    public requestStateName?: string;
    public rate?: number = 0;
}