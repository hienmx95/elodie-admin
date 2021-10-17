import { Model } from '@react3l/react3l/core';

export class MonthWinLostData extends Model {
    public winCounter?: number = 0;
    public lostCounter?: number = 0;
    public day?: number;
}
export class QuarterWinLostData extends Model {
    public winCounter?: number = 0;
    public lostCounter?: number = 0;
    public month?: number;
}
export class YearWinLostData extends Model {
    public winCounter?: number = 0;
    public lostCounter?: number = 0;
    public month?: number;
}