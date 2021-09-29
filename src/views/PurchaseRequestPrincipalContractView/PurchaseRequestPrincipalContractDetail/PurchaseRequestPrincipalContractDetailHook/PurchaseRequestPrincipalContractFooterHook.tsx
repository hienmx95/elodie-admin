import { commonService } from "@react3l/react3l/services/common-service";
import { Modal, Steps, Tooltip } from "antd";
import { AxiosError } from "axios";
import { TFunction } from "i18next";
import { PurchaseRequestPrincipalContractTemplate } from "models/PrincipalContractPurchaseRequestTemplate";
import { PurchaseRequest } from "models/PurchaseRequest";
import React, { Dispatch, SetStateAction } from "react";
import { finalize } from "rxjs/operators";
import appMessageService from "services/app-message-service";
import { purchaseRequestPrincipalContractRepository } from "../../../../repositories/purchase-request-principal-contract-repository";

export function usePurchaseRequestPrincipalContractFooter(
  translate: TFunction,
  model?: PurchaseRequest,
  totalItemValue?: any,
  handleUpdateNewModel?: (item: PurchaseRequest) => void,
  handleGoBase?: () => void,
  purchaseRequestPrincipalContractTemplate?: PurchaseRequestPrincipalContractTemplate,
  setPurchaseRequestPrincipalContractTemplate?: Dispatch<
    SetStateAction<PurchaseRequestPrincipalContractTemplate>
  >,
  handleOpenHistory?: () => void,
) {
  const [subscription] = commonService.useSubscription();

  const [loading, setLoading] = React.useState<boolean>(false);

  const {
    notifyUpdateItemSuccess,
    notifyUpdateItemError,
  } = appMessageService.useCRUDMessage();

  const create = React.useCallback(() => {
    const modelValue = { ...model };
    modelValue.total = totalItemValue.totalNumber;
    subscription.add(
      purchaseRequestPrincipalContractRepository
        .save(modelValue)
        .pipe(finalize(() => setLoading(false)))
        .subscribe(
          (item: PurchaseRequest) => {
            handleUpdateNewModel(item); // setModel
            handleGoBase(); // go master
            notifyUpdateItemSuccess(); // global message service go here
          },
          (error: AxiosError<PurchaseRequest>) => {
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
    totalItemValue,
    subscription,
  ]);
  const send = React.useCallback(() => {
    const modelValue = { ...model };
    modelValue.total = totalItemValue.totalNumber;
    subscription.add(
      purchaseRequestPrincipalContractRepository
        .send(modelValue)
        .pipe(finalize(() => setLoading(false)))
        .subscribe(
          (item: PurchaseRequest) => {
            handleUpdateNewModel(item); // setModel
            handleGoBase(); // go master
            notifyUpdateItemSuccess(); // global message service go here
          },
          (error: AxiosError<PurchaseRequest>) => {
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
    totalItemValue,
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
    purchaseRequestPrincipalContractTemplate.content = model;

    subscription.add(
      purchaseRequestPrincipalContractRepository
        .saveTemplate(purchaseRequestPrincipalContractTemplate)
        .pipe(finalize(() => setLoading(false)))
        .subscribe(
          (item: any) => {
            // handleUpdateNewModel(item); // setModel
            setVisibleSaveTemplateComfirm(false);
            notifyUpdateItemSuccess(); // global message service go here
          },
          (error: AxiosError<PurchaseRequest>) => {
            if (error.response && error.response.status === 400) {
              setPurchaseRequestPrincipalContractTemplate(error.response?.data); // setModel for catching error
            }
            notifyUpdateItemError(); // global message service go here
          }
        )
    );
  }, [
    model,
    notifyUpdateItemError,
    notifyUpdateItemSuccess,
    purchaseRequestPrincipalContractTemplate,
    setPurchaseRequestPrincipalContractTemplate,
    subscription,
  ]);
  const handleChangeNameTemplate = React.useCallback(
    (nameValue) => {
      setPurchaseRequestPrincipalContractTemplate({
        ...purchaseRequestPrincipalContractTemplate,
        name: nameValue,
      });
    },
    [
      purchaseRequestPrincipalContractTemplate,
      setPurchaseRequestPrincipalContractTemplate,
    ]
  );
  const handleConfirmSend = React.useCallback(() => {
    if (model?.purchaseRequestContents?.length > 0) {
      purchaseRequestPrincipalContractRepository.hasExceededQuota(model).subscribe(res => {
        if (res) {
          Modal.confirm({
            content: `Danh mục ${model?.category?.name} đã vượt mức, anh/chị có thêm mới ĐNMS theo HĐNT tiếp không?`,
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
      purchaseRequestPrincipalContractRepository.hasExceededQuota(model).subscribe(res => {
        if (res) {
          Modal.confirm({
            content: `Danh mục ${model?.category?.name} đã vượt mức, anh/chị có thêm mới ĐNMS theo HĐNT tiếp không?`,
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
