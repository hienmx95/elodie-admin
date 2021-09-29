import { TFunction } from "i18next";
import { UnitOfMeasureGrouping } from "models/UnitOfMeasureGrouping";
import React from "react";

export function useUnitOfMeasureGroupingFooterHook(
  translate: TFunction,
  model?: UnitOfMeasureGrouping,
  handleGoBase?: () => void,
  handleSave?: (item: UnitOfMeasureGrouping) => () => void
) {
  const childrenAction = React.useMemo(() => {
    return (
      <>
        <button
          className="btn btn-sm component__btn-primary mr-2"
          onClick={handleSave(model)}
        >
          <span>
            <i className="tio-save mr-2" /> {translate("general.actions.save")}
          </span>
        </button>

        <button
          className="btn btn-sm component__btn-cancel mr-2"
          onClick={handleGoBase}
        >
          <span>
            <i className="tio-clear_circle_outlined"></i>{" "}
            {translate("general.button.cancel")}
          </span>
        </button>
      </>
    );
  }, [handleGoBase, handleSave, model, translate]);

  return {
    childrenAction,
  };
}
