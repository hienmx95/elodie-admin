import { TFunction } from "i18next";
import React from "react";
import { Warehouse } from "models/Warehouse";

export function useWarehouseFooter(
  translate: TFunction,
  model?: Warehouse,
  handleSave?: (item: Warehouse) => () => void,
  handleGoBase?: () => void,
  loading?: boolean
) {

  const childrenAction = React.useMemo(() => {
    return (
      <>
        <button
          className="btn btn-sm component__btn-primary mr-2"
          onClick={handleSave(model)}
          disabled={loading ? true : false}
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
  }, [handleGoBase, handleSave, loading, model, translate]);

  return {
    childrenAction,
  };
}
