import { Model } from '@react3l/react3l/core';
import { Moment } from 'moment';

export class EventMessage extends Model
{
    public id?: number;

    public time?: Moment;

    public routingKey?: string;

    public rowId?: string;

    public entityName?: string;

    public content?: string;

}
