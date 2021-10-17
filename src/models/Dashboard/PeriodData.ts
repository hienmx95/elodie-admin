import { Model } from '@react3l/react3l/core';

export class MonthData extends Model {
    public revenue?: number = 0;
    public day?: number;
}
export class QuarterData extends Model {
    public revenue?: number = 0;
    public month?: number;
}
export class YearData extends Model {
    public revenue?: number = 0;
    public month?: number;
}
export class ContentRevenueBySaleStage {
    public saleStageId?: number = 0;
    public saleStageName?: string;
    public revenue?: number = 0;
    public rate?: number = 0;
}
export class ContentLostByReason {
    public opportunityResultTypeId?: number = 0;
    public opportunityResultTypeName?: string;
    public revenue?: number = 0;
    public rate?: number = 0;
}