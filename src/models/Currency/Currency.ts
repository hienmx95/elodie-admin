import { Model } from '@react3l/react3l/core';
import { Status } from 'models/Status';

export class Currency extends Model
{
    public id?: number;

    public code?: string;

    public name?: string;

    public exchangeRate?: number;

    public statusId?: number = 1;

    public status?: Status;
}
