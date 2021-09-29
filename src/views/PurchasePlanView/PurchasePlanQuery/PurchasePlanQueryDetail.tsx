/* begin general import */
/* end individual import */
import { PURCHASE_PLAN_ROUTE } from "config/route-consts";
import React from "react";
import PurchasePlanContractorAppointmentDetail from "../PurchasePlanDetail/PurchasePlanContractorAppointment/PurchasePlanContractorAppointmentDetail";
import { usePurchasePlanQuery } from "../PurchasePlanDetail/PurchasePlanDetailHook/PurchasePlanDetailHook";
import PurchasePlanPriceComparisionDetail from "../PurchasePlanDetail/PurchasePlanPriceComparision/PurchasePlanPriceComparisionDetail";

function PurchasePlanQueryDetail() {
  const { purchaseRequestId, purchasePlanTypeId } = usePurchasePlanQuery(
    PURCHASE_PLAN_ROUTE
  );

  return (
    <>
      {purchasePlanTypeId === "1" && (
        <PurchasePlanPriceComparisionDetail
          purchaseRequestId={purchaseRequestId}
          purchasePlanTypeId={purchasePlanTypeId}
        />
      )}
      {purchasePlanTypeId === "3" && (
        <PurchasePlanContractorAppointmentDetail
          purchaseRequestId={purchaseRequestId}
          purchasePlanTypeId={purchasePlanTypeId}
        />
      )}
    </>
  );
}

export default PurchasePlanQueryDetail;
