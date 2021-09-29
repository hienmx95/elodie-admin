import { Model } from '@react3l/react3l/core';
import { Moment } from 'moment';

export class ExchangeRate extends Model
{
    public id?: number;

    public fromCurrencyId?: number;

    public toCurrencyId?: number;

    public rate?: number;

    public time?: Moment;

    public rowId?: string;




}
