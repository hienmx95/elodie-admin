import { commonService } from "@react3l/react3l/services/common-service";
import { Steps, Modal } from "antd";
import { AxiosError } from "axios";
import { TFunction } from "i18next";
import { PurchaseRequestPlan } from "models/PurchaseRequestPlan";
import React from "react";
import { purchaseRequestPlanRepository } from "repositories/purchase-request-plan-repository";
import { finalize } from "rxjs/operators";
import appMessageService from "services/app-message-service";

export function usePurchaseRequestPlanFooter(
  translate: TFunction,
  model?: PurchaseRequestPlan,
  handleUpdateNewModel?: (item: PurchaseRequestPlan) => void,
  handleGoBase?: () => void
) {
  const [subscription] = commonService.useSubscription();

  const [loading, setLoading] = React.useState<boolean>(false);

  const {
    notifyUpdateItemSuccess,
    notifyUpdateItemError,
  } = appMessageService.useCRUDMessage();

  const send = React.useCallback(() => {
    const modelValue = { ...model };
    subscription.add(
      purchaseRequestPlanRepository
        .checkExist(modelValue)
        .subscribe((res: any) => {
          if (res === false) {
            purchaseRequestPlanRepository
              .save(modelValue)
              .pipe(finalize(() => setLoading(false)))
              .subscribe(
                (item: PurchaseRequestPlan) => {
                  handleUpdateNewModel(item); // setModel
                  handleGoBase(); // go master
                  notifyUpdateItemSuccess(); // global message service go here
                },
                (error: AxiosError<PurchaseRequestPlan>) => {
                  if (error.response && error.response.status === 400) {
                    handleUpdateNewModel(error.response?.data); // setModel for catching error
                  }
                  notifyUpdateItemError(); // global message service go here
                }
              );
          } else {
            Modal.confirm({
              title: translate("Xác nhận"),
              content: translate(
                "Đã tồn tại KHMS cho đơn vị, có muốn thêm mới không?"
              ),
              okType: "danger",
              onOk() {
                purchaseRequestPlanRepository
                  .save(modelValue)
                  .pipe(finalize(() => setLoading(false)))
                  .subscribe(
                    (item: PurchaseRequestPlan) => {
                      handleUpdateNewModel(item); // setModel
                      handleGoBase(); // go master
                      notifyUpdateItemSuccess(); // global message service go here
                    },
                    (error: AxiosError<PurchaseRequestPlan>) => {
                      if (error.response && error.response.status === 400) {
                        handleUpdateNewModel(error.response?.data); // setModel for catching error
                      }
                      notifyUpdateItemError(); // global message service go here
                    }
                  );
              },
            });
          }
        })
    );
  }, [
    model,
    subscription,
    handleUpdateNewModel,
    handleGoBase,
    notifyUpdateItemSuccess,
    notifyUpdateItemError,
    translate,
  ]);

  const childrenAction = React.useMemo(() => {
    return (
      <>
        <button className="btn btn__send mr-3" onClick={send}>
          <span>
            <i className="tio-send_outlined"></i>{" "}
            {translate("general.button.send")}
          </span>
        </button>
        <button className="btn btn__save mr-3" onClick={send}>
          <span>
            <i className="tio-save_outlined"></i>{" "}
            {translate("general.button.saveDraft")}
          </span>
        </button>
        <button className="btn btn__cancel mr-3" onClick={handleGoBase}>
          <span>
            <i className="tio-clear_circle_outlined"></i>{" "}
            {translate("general.button.cancel")}
          </span>
        </button>
      </>
    );
  }, [send, translate, handleGoBase]);

  const childrenStep = React.useMemo(() => {
    return (
      <>
        <Steps current={1} size="small">
          <Steps.Step title="Finished" />
          <Steps.Step />
          <Steps.Step />
          <Steps.Step />
          <Steps.Step />
          <Steps.Step />
          <Steps.Step />
        </Steps>
      </>
    );
  }, []);

  return {
    childrenAction,
    childrenStep,
    loading,
  };
}
