import { Model } from '@react3l/react3l/core';
import { EntityType } from 'models/EntityType';
import { Status } from 'models/Status';

export class CodeGeneratorRule extends Model
{
    public id?: number;

    public entityTypeId?: number;

    public autoNumberLenth?: number;

    public statusId?: number;




    public rowId?: string;

    public used?: boolean;


    public entityType?: EntityType;

    public status?: Status;



}
