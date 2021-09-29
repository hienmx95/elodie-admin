/* begin general import */
/* end individual import */
import { PURCHASE_PLAN_ROUTE } from "config/route-consts";
import React from "react";
import PurchasePlanContractorAppointmentWaiting from "../PurchasePlanDetail/PurchasePlanContractorAppointment/PurchasePlanContractorAppointmentWaiting";
import { usePurchasePlanQuery } from "../PurchasePlanDetail/PurchasePlanDetailHook/PurchasePlanDetailHook";
import PurchasePlanPriceComparisionWaiting from "../PurchasePlanDetail/PurchasePlanPriceComparision/PurchasePlanPriceComparisionWaiting";

function PurchasePlanQueryWaiting() {
  const { purchasePlanTypeId } = usePurchasePlanQuery(PURCHASE_PLAN_ROUTE);

  return (
    <>
      {purchasePlanTypeId === "1" && <PurchasePlanPriceComparisionWaiting />}
      {purchasePlanTypeId === "3" && (
        <PurchasePlanContractorAppointmentWaiting />
      )}
    </>
  );
}

export default PurchasePlanQueryWaiting;
