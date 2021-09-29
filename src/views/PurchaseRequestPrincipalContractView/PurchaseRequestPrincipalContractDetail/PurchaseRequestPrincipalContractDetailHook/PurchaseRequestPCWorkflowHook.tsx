import { commonService } from "@react3l/react3l/services";
import { AxiosError } from "axios";
import { PurchaseRequestPrincipalContract } from "models/PurchaseRequestPrincipalContract";
import React from "react";
import appMessageService from "services/app-message-service";
import { purchaseRequestPrincipalContractRepository } from "repositories/purchase-request-principal-contract-repository";
export function usePurchaseRequestPCWorkflow(
    model: PurchaseRequestPrincipalContract,
    handleGoBase: () => void,
) {

    const [subscription] = commonService.useSubscription();

    const {
        notifyUpdateItemSuccess,
        notifyUpdateItemError,
    } = appMessageService.useCRUDMessage();
    const handleApprove = React.useCallback(() => {
        subscription.add(
            purchaseRequestPrincipalContractRepository
                .approve(model)

                .subscribe(
                    (item: PurchaseRequestPrincipalContract) => {

                        handleGoBase();
                        notifyUpdateItemSuccess();
                    },
                    (error: AxiosError<PurchaseRequestPrincipalContract>) => {
                        notifyUpdateItemError();
                    }
                )
        );



    }, [handleGoBase, model, notifyUpdateItemError, notifyUpdateItemSuccess, subscription]);
    const handleReject = React.useCallback(() => {
        subscription.add(
            purchaseRequestPrincipalContractRepository
                .reject(model)
                .subscribe(
                    (item: PurchaseRequestPrincipalContract) => {
                        // handleUpdateNewModel(item);
                        handleGoBase();
                        notifyUpdateItemSuccess();
                    },
                    (error: AxiosError<PurchaseRequestPrincipalContract>) => {
                        notifyUpdateItemError();
                    }
                )
        );

    }, [handleGoBase, model, notifyUpdateItemError, notifyUpdateItemSuccess, subscription]);
    const handleRedo = React.useCallback(() => {
        subscription.add(
            purchaseRequestPrincipalContractRepository
                .redo(model)
                .subscribe(
                    (item: PurchaseRequestPrincipalContract) => {
                        // handleUpdateNewModel(item);
                        handleGoBase();
                        notifyUpdateItemSuccess();
                    },
                    (error: AxiosError<PurchaseRequestPrincipalContract>) => {
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