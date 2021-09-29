import { Model } from '@react3l/react3l/core';
import { AppUser } from 'models/AppUser';
import { Item } from 'models/Item';
import { UnitOfMeasure } from 'models/UnitOfMeasure';

export class Inventory extends Model
{
    public id?: number;

    public itemId?: number;

    public unitOfMeasureId?: number;

    public quantity?: number;

    public editorId?: number;





    public editor?: AppUser;

    public item?: Item;

    public unitOfMeasure?: UnitOfMeasure;
}
