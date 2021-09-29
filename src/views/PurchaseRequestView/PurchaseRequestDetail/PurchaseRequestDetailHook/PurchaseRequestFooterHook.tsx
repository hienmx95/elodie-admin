import { commonService } from "@react3l/react3l/services/common-service";
import { Modal, Steps, Tooltip } from "antd";
import { AxiosError } from "axios";
import { TFunction } from "i18next";
import { PurchaseRequest } from "models/PurchaseRequest";
import { PurchaseRequestTemplate } from "models/PurchaseRequestTemplate";
import React, { Dispatch, SetStateAction } from "react";
import { purchaseRequestRepository } from "repositories/purchase-request-repository";
import { finalize } from "rxjs/operators";
import appMessageService from "services/app-message-service";

export function usePurchaseRequestFooter(
  translate: TFunction,
  model?: PurchaseRequest,
  handleUpdateNewModel?: (item: PurchaseRequest) => void,
  handleSave?: (item: PurchaseRequest) => void,
  handleGoBase?: () => void,
  purchaseRequestTemplate?: PurchaseRequestTemplate,
  setPurchaseRequestTemplate?: Dispatch<SetStateAction<PurchaseRequestTemplate>>,
  handleOpenHistory?: () => void,
) {
  const [subscription] = commonService.useSubscription();

  const [loading, setLoading] = React.useState<boolean>(false);

  const { notifyUpdateItemSuccess } = appMessageService.useCRUDMessage();

  const send = React.useCallback(() => {
    const modelValue = { ...model };
    subscription.add(
      purchaseRequestRepository
        .send(modelValue)
        .pipe(finalize(() => setLoading(false)))
        .subscribe(
          (item: PurchaseRequest) => {
            handleUpdateNewModel(item);
            handleGoBase();
            notifyUpdateItemSuccess();
          },
          (error: AxiosError<PurchaseRequest>) => {
            if (error.response && error.response.status === 400) {
              handleUpdateNewModel(error.response?.data);
            }
          }
        )
    );
  }, [
    handleUpdateNewModel,
    handleGoBase,
    setLoading,
    notifyUpdateItemSuccess,
    model,
    subscription,
  ]);
  const create = React.useCallback(() => {
    const modelValue = { ...model };
    subscription.add(
      purchaseRequestRepository
        .save(modelValue)
        .pipe(finalize(() => setLoading(false)))
        .subscribe(
          (item: PurchaseRequest) => {
            handleUpdateNewModel(item);
            handleGoBase();
            notifyUpdateItemSuccess();
          },
          (error: AxiosError<PurchaseRequest>) => {
            if (error.response && error.response.status === 400) {
              handleUpdateNewModel(error.response?.data);
            }
          }
        )
    );
  }, [
    handleUpdateNewModel,
    handleGoBase,
    setLoading,
    notifyUpdateItemSuccess,
    model,
    subscription,
  ]);

  const [
    visibleSaveTemplateComfirm,
    setVisibleSaveTemplateComfirm,
  ] = React.useState<boolean>(false);

  const handleOpenSaveTemplateConfirm = React.useCallback(() => {
    setVisibleSaveTemplateComfirm(true);
  }, []);

  const cancelSaveTemplateConfirm = React.useCallback(() => {
    setVisibleSaveTemplateComfirm(false);
  }, []);

  const confirmSaveTemplate = React.useCallback(() => {
    purchaseRequestTemplate.content = model;
    subscription.add(
      purchaseRequestRepository
        .saveTemplate(purchaseRequestTemplate)
        .pipe(finalize(() => setLoading(false)))
        .subscribe(
          (item: any) => {
            cancelSaveTemplateConfirm();
            notifyUpdateItemSuccess();
          },
          (error: AxiosError<PurchaseRequest>) => {
            if (error.response && error.response.status === 400) {
              setPurchaseRequestTemplate(error.response?.data);
            }
          }
        )
    );
  }, [
    cancelSaveTemplateConfirm,
    model,
    notifyUpdateItemSuccess,
    purchaseRequestTemplate,
    setPurchaseRequestTemplate,
    subscription,
  ]);

  const handleChangeNameTemplate = React.useCallback(
    (nameValue) => {
      setPurchaseRequestTemplate({
        ...purchaseRequestTemplate,
        name: nameValue,
      });
    },
    [purchaseRequestTemplate, setPurchaseRequestTemplate]
  );
  const handleConfirmSend = React.useCallback(() => {
    if (model?.purchaseRequestContents?.length > 0) {
      purchaseRequestRepository.hasExceededQuota(model).subscribe(res => {
        if (res) {
          Modal.confirm({
            content: `Danh mục ${model?.category?.name} đã vượt mức, anh/chị có thêm mới ĐNMS tiếp không?`,
            okType: "danger",
            cancelText: 'Hủy',
            okText: "Đồng ý",
            onOk() {
              send();
            },
          });
        } else {
          send();
        }

      });
    } else {
      send();
    }

  }, [model, send]);

  const handleConfirmSave = React.useCallback(() => {
    if (model?.purchaseRequestContents?.length > 0) {
      purchaseRequestRepository.hasExceededQuota(model).subscribe(res => {
        if (res) {
          Modal.confirm({
            content: `Danh mục ${model?.category?.name} đã vượt mức, anh/chị có thêm mới ĐNMS tiếp không?`,
            okType: "danger",
            cancelText: 'Hủy',
            okText: "Đồng ý",
            onOk() {
              create();
            },
          });
        } else {
          create();
        }

      });
    } else {
      create();
    }
  }, [create, model]);

  const childrenAction = React.useMemo(() => {
    return (
      <>
        <button className="btn btn__send mr-2" onClick={handleConfirmSend}>
          <span>
            <i className="tio-send_outlined"></i>{" "}
            {translate("general.button.send")}
          </span>
        </button>
        <button className="btn btn__save mr-2" onClick={handleConfirmSave}>
          <span>
            <i className="tio-save_outlined"></i>{" "}
            {translate("general.button.saveDraft")}
          </span>
        </button>
        <button
          className="btn btn__save mr-2"
          onClick={handleOpenSaveTemplateConfirm}
        >
          <span>
            <i className="tio-document_outlined"></i>{" "}
            {translate("general.button.saveTemplate")}
          </span>
        </button>
        <button className="btn btn__cancel" onClick={handleGoBase}>
          <span>
            <i className="tio-clear_circle_outlined"></i>{" "}
            {translate("general.button.close")}
          </span>
        </button>
      </>
    );
  }, [handleConfirmSend, translate, handleConfirmSave, handleOpenSaveTemplateConfirm, handleGoBase]);

  const childrenStep = React.useMemo(() => {
    return (
      <div className="d-flex justify-content-between " style={{ width: '60%' }}>
        <Steps current={1} size="small" >
          <Steps.Step title="Khởi tạo" />
          <Steps.Step title="Chờ duyệt" />
          <Steps.Step title="Đã duyệt" />
          <Steps.Step title="Đã tạo PAMS" />
        </Steps>
        <Tooltip title={translate('purchaseRequests.history')} >
          <i className="tio-history purchase-request-icon_history "
            onClick={handleOpenHistory} />
        </Tooltip>
      </div>
    );
  }, [handleOpenHistory, translate]);

  return {
    childrenAction,
    childrenStep,
    loading,
    visibleSaveTemplateComfirm,
    handleChangeNameTemplate,
    cancelSaveTemplateConfirm,
    confirmSaveTemplate,
  };
}
