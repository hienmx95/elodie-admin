import { Model } from '@react3l/react3l/core';
import { IdGeneratorType } from 'models/IdGeneratorType';

export class IdGenerator extends Model
{
    public id?: number;

    public idGeneratorTypeId?: number;

    public used?: boolean;

    public counter?: number;


    public idGeneratorType?: IdGeneratorType;
}
