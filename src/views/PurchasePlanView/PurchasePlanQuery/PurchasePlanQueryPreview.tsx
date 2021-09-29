/* begin general import */
/* end individual import */
import { PURCHASE_PLAN_ROUTE } from "config/route-consts";
import React from "react";
import PurchasePlanContractorAppointmentPreview from "../PurchasePlanDetail/PurchasePlanContractorAppointment/PurchasePlanContractorAppointmentPreview";
import { usePurchasePlanQuery } from "../PurchasePlanDetail/PurchasePlanDetailHook/PurchasePlanDetailHook";
import PurchasePlanPriceComparisionPreview from "../PurchasePlanDetail/PurchasePlanPriceComparision/PurchasePlanPriceComparisionPreview";

function PurchasePlanQueryPreview() {
  const { purchasePlanTypeId } = usePurchasePlanQuery(PURCHASE_PLAN_ROUTE);

  return (
    <>
      {purchasePlanTypeId === "1" && <PurchasePlanPriceComparisionPreview />}
      {purchasePlanTypeId === "3" && (
        <PurchasePlanContractorAppointmentPreview />
      )}
    </>
  );
}

export default PurchasePlanQueryPreview;
