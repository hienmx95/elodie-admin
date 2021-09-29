import { commonService } from "@react3l/react3l/services/common-service";
import { Modal, Steps, Tooltip } from "antd";
import { AxiosError } from "axios";
import { PURCHASE_PLAN_ROUTE } from "config/route-consts";
import { TFunction } from "i18next";
import { PurchasePlan } from "models/PurchasePlan";
import React, { useCallback, useMemo } from "react";
import { useHistory } from "react-router";
import { purchasePlanRepository } from "repositories/purchase-plan-repository";
import { finalize } from "rxjs/operators";
import appMessageService from "services/app-message-service";
import "../PurchasePlanDetail.scss";

export function usePurchasePlanFooter(
  translate: TFunction,
  model?: PurchasePlan,
  handleUpdateNewModel?: (item: PurchasePlan) => void,
  handleGoBase?: () => void,
  handleOpenDetailModal?: (id: number) => void
) {
  const [subscription] = commonService.useSubscription();

  const [loading, setLoading] = React.useState<boolean>(false);

  const {
    notifyUpdateItemSuccess,
    notifyUpdateItemError,
  } = appMessageService.useCRUDMessage();

  const save = React.useCallback(() => {
    const modelValue = { ...model };
    subscription.add(
      purchasePlanRepository
        .save(modelValue)
        .pipe(finalize(() => setLoading(false)))
        .subscribe(
          (item: PurchasePlan) => {
            handleUpdateNewModel(item); // setModel
            handleGoBase(); // go master
            notifyUpdateItemSuccess(); // global message service go here
          },
          (error: AxiosError<PurchasePlan>) => {
            if (error.response && error.response.status === 400) {
              handleUpdateNewModel(error.response?.data); // setModel for catching error
            }
            notifyUpdateItemError(); // global message service go here
          }
        )
    );
  }, [
    handleUpdateNewModel,
    handleGoBase,
    setLoading,
    notifyUpdateItemSuccess,
    notifyUpdateItemError,
    model,
    subscription,
  ]);

  const history = useHistory();

  const baseRoute = useMemo(() => {
    let listPath = `${PURCHASE_PLAN_ROUTE}`.split("/");
    const baseRoute = "/" + listPath[listPath.length - 1];
    return baseRoute;
  }, []);

  const handleGoPreview = useCallback(() => {
    history.push(
      `${PURCHASE_PLAN_ROUTE}${baseRoute}-preview?id=${model?.id}&purchasePlanTypeId=${model?.purchasePlanTypeId}`
    );
  }, [baseRoute, history, model]);

  const send = React.useCallback(() => {
    const modelValue = { ...model };
    subscription.add(
      purchasePlanRepository
        .send(modelValue)
        .pipe(finalize(() => setLoading(false)))
        .subscribe(
          (item: PurchasePlan) => {
            Modal.warning({
              className: "purchase-plan__confirm",
              title: "",
              icon: "",
              content: (
                <>
                  <div className="d-flex align-items-center justify-content-center mt-3">
                    <div>
                      <img
                        alt=""
                        src={require("assets/images/illutration-image/sendmail.svg")}
                        width="150"
                      />
                      <div className="send-mail-success mt-3">
                        PAMS của bạn đã được gửi duyệt!
                      </div>
                    </div>
                  </div>
                </>
              ),
              okText: (
                <span>
                  <i className="tio-chevron_left" /> Quay lại
                </span>
              ),
              onOk() {
                handleGoPreview();
                notifyUpdateItemSuccess();
                handleUpdateNewModel(item);
              },
            });
          },
          (error: AxiosError<PurchasePlan>) => {
            if (error.response && error.response.status === 400) {
              handleUpdateNewModel(error.response?.data);
            }
          }
        )
    );
  }, [
    model,
    subscription,
    handleGoPreview,
    notifyUpdateItemSuccess,
    handleUpdateNewModel,
  ]);

  const childrenAction = React.useMemo(() => {
    return (
      <>
        {model?.purchasePlanStatusId !== 4 &&
          model?.purchasePlanStatusId !== 5 && (
            <button
              className="btn btn__send mr-3"
              onClick={() => handleOpenDetailModal(null)}
            >
              <span>
                <i className="tio-send_outlined"></i> {"Lấy báo giá"}
              </span>
            </button>
          )}
        {model?.purchasePlanStatusId === 4 && (
          <button className="btn btn__send mr-3" onClick={send}>
            <span>
              <i className="tio-send_outlined"></i> {"Gửi duyệt"}
            </span>
          </button>
        )}
        {model?.purchasePlanStatusId !== 5 && (
          <button className="btn btn__save mr-3" onClick={save}>
            <span>
              <i className="tio-documents_outlined"></i>{" "}
              {translate("general.actions.save")}
            </span>
          </button>
        )}

        <button className="btn btn__save mr-3" onClick={handleGoBase}>
          <span>
            <i className="tio-arrow_large_backward_outlined"></i>{" "}
            {translate("general.button.close")}
          </span>
        </button>
      </>
    );
  }, [model, send, save, translate, handleGoBase, handleOpenDetailModal]);

  const childrenStep = React.useMemo(() => {
    return (
      <>
        <Steps current={1} size="small">
          <Steps.Step title="Khởi tạo" />
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

export function usePurchasePlanApproveFooter(
  translate: TFunction,
  model?: PurchasePlan,
  handleGoBase?: () => void,
  handleOpenHistory?
) {
  const [subscription] = commonService.useSubscription();
  const [loading, setLoading] = React.useState<boolean>(false);

  const {
    notifyUpdateItemSuccess,
    notifyUpdateItemError,
  } = appMessageService.useCRUDMessage();
  const handleApprove = React.useCallback(() => {
    subscription.add(
      purchasePlanRepository
        .approve(model)
        .pipe(finalize(() => setLoading(false)))
        .subscribe(
          (item: PurchasePlan) => {
            handleGoBase();
            notifyUpdateItemSuccess();
          },
          (error: AxiosError<PurchasePlan>) => {
            notifyUpdateItemError();
          }
        )
    );
  }, [
    handleGoBase,
    model,
    notifyUpdateItemError,
    notifyUpdateItemSuccess,
    subscription,
  ]);

  const handleReject = React.useCallback(() => {
    Modal.confirm({
      className: "modal-comparision__confirm modal-cancel__confirm",
      icon: "",
      title: "",
      content: (
        <>
          <div className="modal-comparision__content d-flex align-items-center justify-content-center mt-3">
            <img
              alt=""
              src={require("assets/images/illutration-image/blogging1.svg")}
              width="168"
            />
            <div className="modal-comparision__content-title mt-3">
              Bạn có muốn từ chối duyệt Phương Án Mua Sắm này ?
            </div>
            <div className="modal-comparision__content-des mt-3">
              Hành động này không thể hoàn tác
            </div>
          </div>
        </>
      ),
      cancelText: (
        <span>
          <i className="tio-clear" /> Đóng
        </span>
      ),
      okText: (
        <span>
          <i className="tio-pause_circle_outlined" /> Từ chối
        </span>
      ),
      onOk() {
        purchasePlanRepository
          .getSupplierRankingByPrice(model?.id)
          .subscribe((res) => {
            subscription.add(
              purchasePlanRepository.reject(model).subscribe(
                (item: PurchasePlan) => {
                  handleGoBase();
                  notifyUpdateItemSuccess();
                },
                (error: AxiosError<PurchasePlan>) => {
                  notifyUpdateItemError();
                }
              )
            );
          });
      },
    });
  }, [
    handleGoBase,
    model,
    notifyUpdateItemError,
    notifyUpdateItemSuccess,
    subscription,
  ]);
  const handleRedo = React.useCallback(() => {
    Modal.confirm({
      className: "modal-comparision__confirm modal-replay__confirm",
      icon: "",
      title: "",
      content: (
        <>
          <div className="modal-comparision__content d-flex align-items-center justify-content-center mt-3">
            <img
              alt=""
              src={require("assets/images/illutration-image/blogging1.svg")}
              width="168"
            />
            <div className="modal-comparision__content-title mt-3">
              <div>Bạn có muốn yêu cầu Buyer làm lại</div>
              <div>Phương Án Mua Sắm này ?</div>
            </div>
            <div className="modal-comparision__content-des mt-3">
              Hành động này không thể hoàn tác
            </div>
          </div>
        </>
      ),
      cancelText: (
        <span>
          <i className="tio-clear" /> Đóng
        </span>
      ),
      okText: (
        <span>
          <i className="tio-replay" /> Chọn lại
        </span>
      ),
      onOk() {
        purchasePlanRepository.rechooseSupplier(model?.id).subscribe(
          (res) => {
            subscription.add(
              purchasePlanRepository.redo(model).subscribe(
                (item: PurchasePlan) => {
                  handleGoBase();
                  notifyUpdateItemSuccess();
                },
                (error: AxiosError<PurchasePlan>) => {
                  notifyUpdateItemError();
                }
              )
            );
          },
          () => {
            notifyUpdateItemError(); // global message service go here
          }
        );
      },
    });
  }, [
    handleGoBase,
    model,
    notifyUpdateItemError,
    notifyUpdateItemSuccess,
    subscription,
  ]);
  const childrenAction = React.useMemo(() => {
    return (
      <>
        <button className="btn btn__approve mr-3" onClick={handleApprove}>
          <span>
            <i className="tio-checkmark_circle_outlined"></i>{" "}
            {translate("general.button.approve")}
          </span>
        </button>
        <button className="btn btn__reject mr-3" onClick={handleReject}>
          <span>
            <i className="tio-restore"></i> {translate("general.button.reject")}
          </span>
        </button>
        <button className="btn btn__redo mr-3" onClick={handleRedo}>
          <span>
            <i className="tio-restore"></i> {translate("general.button.redo")}
          </span>
        </button>

        <button className="btn btn__save mr-3" onClick={handleGoBase}>
          <span>
            <i className="tio-arrow_large_backward_outlined"></i>{" "}
            {translate("general.button.close")}
          </span>
        </button>
      </>
    );
  }, [handleApprove, handleGoBase, handleRedo, handleReject, translate]);


  const current = React.useMemo(() => {
    if (model?.purchasePlanStatusId === 2 && model?.requestStateId === 1) return 2;
    if (model?.purchasePlanStatusId === 3 && model?.requestStateId === 1) return 3;
    if (model?.purchasePlanStatusId === 4 && model?.requestStateId === 1) return 4;
    if (model?.requestStateId === 2) return 5;
    if (model?.requestStateId === 3 || model?.requestStateId === 4) return 6;
  }, [model]);

  const childrenStep = React.useMemo(() => {
    return (
      <div className="d-flex justify-content-between">
        <Steps current={current} size="small" >
          <Steps.Step title={"Khởi tạo"} />
          <Steps.Step title={"Chờ báo giá"} />
          <Steps.Step title={"Đã báo giá"} />
          <Steps.Step title={"Đã chọn NCC"} />
          <Steps.Step title={"Chờ duyệt"} />
          {
            (model?.requestStateId === 3 || model?.requestStateId !== 4) &&
            <Steps.Step
              title={"Đã duyệt"}
            />
          }
          {
            model?.requestStateId === 4 &&
            <Steps.Step
              title={"Từ chối"} status="error"
            />
          }

        </Steps>
        <Tooltip title={translate("purchaseRequests.history")}>
          <i
            className="tio-history purchase-request-icon_history"
            onClick={handleOpenHistory}
          />
        </Tooltip>
      </div>
    );
  }, [model, current, handleOpenHistory, translate]);

  return {
    childrenAction,
    childrenStep,
    loading,
  };
}

export function usePurchasePlanContractorFooter(
  translate: TFunction,
  model?: PurchasePlan,
  handleUpdateNewModel?: (item: PurchasePlan) => void,
  handleGoBase?: () => void
) {
  const [subscription] = commonService.useSubscription();

  const [loading, setLoading] = React.useState<boolean>(false);

  const {
    notifyUpdateItemSuccess,
    notifyUpdateItemError,
  } = appMessageService.useCRUDMessage();

  const save = React.useCallback(() => {
    const modelValue = { ...model };
    subscription.add(
      purchasePlanRepository
        .save(modelValue)
        .pipe(finalize(() => setLoading(false)))
        .subscribe(
          (item: PurchasePlan) => {
            handleUpdateNewModel(item); // setModel
            handleGoBase(); // go master
            notifyUpdateItemSuccess(); // global message service go here
          },
          (error: AxiosError<PurchasePlan>) => {
            if (error.response && error.response.status === 400) {
              handleUpdateNewModel(error.response?.data); // setModel for catching error
            }
            notifyUpdateItemError(); // global message service go here
          }
        )
    );
  }, [
    handleUpdateNewModel,
    handleGoBase,
    setLoading,
    notifyUpdateItemSuccess,
    notifyUpdateItemError,
    model,
    subscription,
  ]);

  const history = useHistory();

  const baseRoute = useMemo(() => {
    let listPath = `${PURCHASE_PLAN_ROUTE}`.split("/");
    const baseRoute = "/" + listPath[listPath.length - 1];
    return baseRoute;
  }, []);

  const handleGoPreview = useCallback(() => {
    history.push(
      `${PURCHASE_PLAN_ROUTE}${baseRoute}-preview?id=${model?.id}&purchasePlanTypeId=${model?.purchasePlanTypeId}`
    );
  }, [baseRoute, history, model]);

  const send = React.useCallback(() => {
    const modelValue = { ...model };
    subscription.add(
      purchasePlanRepository
        .send(modelValue)
        .pipe(finalize(() => setLoading(false)))
        .subscribe(
          (item: PurchasePlan) => {
            Modal.warning({
              className: "purchase-plan__confirm",
              title: "",
              icon: "",
              content: (
                <>
                  <div className="d-flex align-items-center justify-content-center mt-3">
                    <div>
                      <img
                        alt=""
                        src={require("assets/images/illutration-image/sendmail.svg")}
                        width="150"
                      />
                      <div className="send-mail-success mt-3">
                        PAMS của bạn đã được gửi duyệt!
                      </div>
                    </div>
                  </div>
                </>
              ),
              okText: (
                <span>
                  <i className="tio-chevron_left" /> Quay lại
                </span>
              ),
              onOk() {
                handleGoPreview();
                notifyUpdateItemSuccess();
                handleUpdateNewModel(item);
              },
            });
          },
          (error: AxiosError<PurchasePlan>) => {
            if (error.response && error.response.status === 400) {
              handleUpdateNewModel(error.response?.data);
            }
          }
        )
    );
  }, [
    model,
    subscription,
    handleGoPreview,
    notifyUpdateItemSuccess,
    handleUpdateNewModel,
  ]);

  const childrenAction = React.useMemo(() => {
    return (
      <>
        <button className="btn btn__send mr-3" onClick={send}>
          <span>
            <i className="tio-send_outlined"></i> {"Gửi duyệt"}
          </span>
        </button>
        {model?.purchasePlanStatusId !== 5 && (
          <button className="btn btn__save mr-3" onClick={save}>
            <span>
              <i className="tio-documents_outlined"></i>{" "}
              {translate("general.actions.save")}
            </span>
          </button>
        )}

        <button className="btn btn__save mr-3" onClick={handleGoBase}>
          <span>
            <i className="tio-arrow_large_backward_outlined"></i>{" "}
            {translate("general.button.close")}
          </span>
        </button>
      </>
    );
  }, [model, send, save, translate, handleGoBase]);

  const childrenStep = React.useMemo(() => {
    return (
      <>
        <Steps current={1} size="small">
          <Steps.Step title="Khởi tạo" />
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
