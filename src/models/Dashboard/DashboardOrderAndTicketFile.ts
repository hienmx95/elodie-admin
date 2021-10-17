import { Model } from '@react3l/react3l/core';

export class OATMonthData extends Model {
    public win?: number = 0;
    public lost?: number = 0;
    public day?: number;
}
export class OATQuarterData extends Model {
    public win?: number = 0;
    public lost?: number = 0;
    public month?: number;
}
export class OATYearData extends Model {
    public win?: number = 0;
    public lost?: number = 0;
    public month?: number;
}