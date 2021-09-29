import { Model } from '@react3l/react3l/core';
import { PurchasePlan } from 'models/PurchasePlan';
import { AppUser } from 'models/AppUser';

export class PurchasePlanReviewerMapping extends Model
{
    public purchasePlanId?: number;

    public reviewerId?: number;

    public reviewerRole?: string;


    public purchasePlan?: PurchasePlan;

    public reviewer?: AppUser;
}
