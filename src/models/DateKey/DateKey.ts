import { Model } from '@react3l/react3l/core';
import { Moment } from 'moment';

export class DateKey extends Model
{
    public id?: number;

    public year?: number;

    public month?: number;

    public day?: number;

    public date?: Moment;

}
