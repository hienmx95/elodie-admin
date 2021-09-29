import { commonService } from "@react3l/react3l/services";
import { AxiosError } from "axios";
import { PurchaseRequest } from "models/PurchaseRequest";
import React from "react";
import { purchaseRequestRepository } from "repositories/purchase-request-repository";
import appMessageService from "services/app-message-service";

export function usePurchaseRequestWorkflow(
    model: PurchaseRequest,
    handleGoBase: () => void,
) {

    const [subscription] = commonService.useSubscription();

    const {
        notifyUpdateItemSuccess,
        notifyUpdateItemError,
    } = appMessageService.useCRUDMessage();
    const handleApprove = React.useCallback(() => {
        subscription.add(
            purchaseRequestRepository
                .approve(model)

                .subscribe(
                    (item: PurchaseRequest) => {

                        handleGoBase();
                        notifyUpdateItemSuccess();
                    },
                    (error: AxiosError<PurchaseRequest>) => {
                        notifyUpdateItemError();
                    }
                )
        );



    }, [handleGoBase, model, notifyUpdateItemError, notifyUpdateItemSuccess, subscription]);
    const handleReject = React.useCallback(() => {
        subscription.add(
            purchaseRequestRepository
                .reject(model)
                .subscribe(
                    (item: PurchaseRequest) => {
                        // handleUpdateNewModel(item);
                        handleGoBase();
                        notifyUpdateItemSuccess();
                    },
                    (error: AxiosError<PurchaseRequest>) => {
                        notifyUpdateItemError();
                    }
                )
        );

    }, [handleGoBase, model, notifyUpdateItemError, notifyUpdateItemSuccess, subscription]);
    const handleRedo = React.useCallback(() => {
        subscription.add(
            purchaseRequestRepository
                .redo(model)
                .subscribe(
                    (item: PurchaseRequest) => {
                        // handleUpdateNewModel(item);
                        handleGoBase();
                        notifyUpdateItemSuccess();
                    },
                    (error: AxiosError<PurchaseRequest>) => {
                        notifyUpdateItemError();
                    }
                )
        );

    }, [handleGoBase, model, notifyUpdateItemError, notifyUpdateItemSuccess, subscription]);
    return {
        handleApprove,
        handleReject,
        handleRedo,
    };
}