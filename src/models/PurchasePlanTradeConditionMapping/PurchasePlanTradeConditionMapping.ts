import { Model } from '@react3l/react3l/core';
import { PurchasePlan } from 'models/PurchasePlan';
import { TradeCondition } from 'models/TradeCondition';

export class PurchasePlanTradeConditionMapping extends Model
{
    public purchasePlanId?: number;

    public tradeConditionId?: number;


    public purchasePlan?: PurchasePlan;

    public tradeCondition?: TradeCondition;
}
