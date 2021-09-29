import { Model } from '@react3l/react3l/core';
import { Currency } from 'models/Currency';
import { Item } from 'models/Item';
import { PrincipalContract } from 'models/PrincipalContract';
import { TaxType } from 'models/TaxType';
import { UnitOfMeasure } from 'models/UnitOfMeasure';

export class PrincipalContractContent extends Model
{
    public id?: number;

    public itemId?: number;

    public principalContractId?: number;

    public unitOfMeasureId?: number;

    public unitPrice?: number;

    public taxTypeId?: number;

    public taxAmount?: number;

    public price?: number;

    public mainCurrencyId?: number;

    public exchangeCurrencyId?: number;

    public exchangeRate?: number;

    public exchangedUnitPrice?: number;

    public exchangedTaxAmount?: number;

    public exchangedPrice?: number;


    public exchangeCurrency?: Currency;

    public item?: Item;

    public mainCurrency?: Currency;

    public principalContract?: PrincipalContract;

    public taxType?: TaxType;

    public unitOfMeasure?: UnitOfMeasure;
}
