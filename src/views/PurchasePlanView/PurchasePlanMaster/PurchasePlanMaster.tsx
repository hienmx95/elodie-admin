/* begin general import */
import classNames from "classnames";
import { AppMainMasterTitle } from "components/AppMain/MasterPage/AppMainMasterTitle";
import { PURCHASE_PLAN_ROUTE } from "config/route-consts";
import { PurchasePlanFilter } from "models/PurchasePlan";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { UseMaster } from "services/pages/master-service";
import { queryStringService } from "services/query-string-service";
/* end individual import */
import "./PurchasePlanMaster.scss";
import PurchasePlanRequest from "./PurchasePlanRequest/PurchasePlanRequest";
import { usePurchaseMaster } from "./PurchasePlanRequest/PurchasePlanRequestHook/PurchasePlanRequestHook";
import PurchasePlanSelectType from "./PurchasePlanSelectType/PurchasePlanSelectType";
import PurchasePlanTracking from "./PurchasePlanTracking/PurchasePlanTracking";

function PurchasePlanMaster() {
  const [translate] = useTranslation();

  const master: UseMaster = usePurchaseMaster(PurchasePlanFilter);

  const history = useHistory();

  const baseRoute = React.useMemo(() => {
    let listPath = `${PURCHASE_PLAN_ROUTE}`.split("/");
    const baseRoute = "/" + listPath[listPath.length - 1];
    return baseRoute;
  }, []);

  const [loading, setLoading] = React.useState<boolean>(true);
  const { id: index }: any = queryStringService.useGetQueryString("viewIndex");
  const [viewIndex, setViewIndex] = React.useState<string>(null);
  const [isChangView, setIsChangeView] = React.useState<boolean>(false);

  const changeTab = useCallback(
    (key: string) => {
      setViewIndex(key);
      history.push(
        `${PURCHASE_PLAN_ROUTE}${baseRoute}-master?viewIndex=${key}`
      );
    },
    [baseRoute, history]
  );

  React.useEffect(() => {
    if (loading) {
      if (index) {
        setViewIndex(index);
      }
      setLoading(false);
    }
    if (isChangView) {
      changeTab(viewIndex);
      setIsChangeView(false);
    }
  }, [changeTab, index, isChangView, loading, viewIndex]);

  return (
    <>
      <div className="page page__master purchase-plan-container">
        {viewIndex === "3" ? (
          <>
            <div className="page__header d-flex align-items-center justify-content-between">
              <div className="page__title page__title-plan-type">
                {translate("purchasePlans.create.title")}
              </div>
            </div>

            <PurchasePlanSelectType
              setViewIndex={setViewIndex}
              setLoading={setIsChangeView}
            />
          </>
        ) : (
          <>
            <AppMainMasterTitle {...master}>
              {translate("purchasePlans.master.title")}
            </AppMainMasterTitle>
            <div className="page__navigation">
              <button
                className={classNames("view-tab", {
                  "view-tab--active": !viewIndex || viewIndex === "1",
                })}
                onClick={() => changeTab("1")}
              >
                {translate("purchasePlans.general.purchasePlanRequest")}
              </button>
              <button
                className={classNames("view-tab", {
                  "view-tab--active": viewIndex === "2",
                })}
                onClick={() => changeTab("2")}
              >
                {translate("purchasePlans.general.purchasePlanTracking")}
              </button>
            </div>
            {(!viewIndex || viewIndex === "1") && (
              <PurchasePlanRequest
                setViewIndex={setViewIndex}
                setLoading={setIsChangeView}
              />
            )}
            {viewIndex === "2" && (
              <PurchasePlanTracking
                setViewIndex={setViewIndex}
                setLoading={setIsChangeView}
              />
            )}
          </>
        )}
      </div>
    </>
  );
}

export default PurchasePlanMaster;
