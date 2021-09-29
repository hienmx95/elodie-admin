import { Model } from "@react3l/react3l/core";
import { CriterionGrouping } from "models/CriterionGrouping";
import { CriterionType } from "models/CriterionType";
import { Status } from "models/Status";

export class Criterion extends Model {
  public id?: number;

  public code?: string;

  public name?: string;

  public criterionGroupingId?: number;

  public criterionTypeId?: number;

  public description?: string;

  public isDefault?: boolean;

  public maxScore?: number;

  public statusId?: number = 1;

  public criterionGrouping?: CriterionGrouping;

  public criterionType?: CriterionType;

  public status?: Status;
}
