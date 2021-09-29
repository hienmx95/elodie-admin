import { Model } from "@react3l/react3l/core";
import { Moment } from "moment";
import { Status } from "models/Status";
import { TradeConditionType } from "models/TradeConditionType";

export class TradeCondition extends Model {
  public id?: number;

  public code?: string;

  public name?: string;

  public description?: string;

  public statusId?: number = 1;

  public tradeConditionTypeId?: number;

  public date?: Moment;

  public status?: Status;

  public isOpenDate?: boolean;

  public tradeConditionType?: TradeConditionType;
}
