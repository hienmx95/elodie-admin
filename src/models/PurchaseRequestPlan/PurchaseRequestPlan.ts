import { Model } from '@react3l/react3l/core';
import { AppUser } from 'models/AppUser';
import { Currency } from 'models/Currency';
import { Organization } from 'models/Organization';
import { Status } from 'models/Status';
import { YearKey } from 'models/YearKey';
import { PurchaseRequestPlanContent } from 'models/PurchaseRequestPlanContent';
import { PurchaseRequestPlanFileMapping } from 'models/PurchaseRequestPlanFileMapping';

export class PurchaseRequestPlan extends Model
{
    public id?: number;

    public name?: string;

    public code?: string;

    public description?: string;

    public organizationId?: number;

    public creatorId?: number;

    public mainCurrencyId?: number;

    public yearKeyId?: number;

    public statusId?: number;




    public rowId?: string;

    public used?: boolean;


    public creator?: AppUser;

    public mainCurrency?: Currency;

    public organization?: Organization;

    public status?: Status;

    public yearKey?: YearKey;

    public purchaseRequestPlanContents?: PurchaseRequestPlanContent[];

    public purchaseRequestPlanFileMappings?: PurchaseRequestPlanFileMapping[];
}
