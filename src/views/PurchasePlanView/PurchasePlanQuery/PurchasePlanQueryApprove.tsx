/* begin general import */
/* end individual import */
import { PURCHASE_PLAN_ROUTE } from "config/route-consts";
import React from "react";
import PurchasePlanContractorAppointmentApprove from "../PurchasePlanDetail/PurchasePlanContractorAppointment/PurchasePlanContractorAppointmentApprove";
import { usePurchasePlanQuery } from "../PurchasePlanDetail/PurchasePlanDetailHook/PurchasePlanDetailHook";
import PurchasePlanPriceComparisionApprove from "../PurchasePlanDetail/PurchasePlanPriceComparision/PurchasePlanPriceComparisionApprove";

function PurchasePlanQueryApprove() {
  const { purchasePlanTypeId } = usePurchasePlanQuery(PURCHASE_PLAN_ROUTE);

  return (
    <>
      {purchasePlanTypeId === "1" && <PurchasePlanPriceComparisionApprove />}
      {purchasePlanTypeId === "3" && (
        <PurchasePlanContractorAppointmentApprove />
      )}
    </>
  );
}

export default PurchasePlanQueryApprove;
