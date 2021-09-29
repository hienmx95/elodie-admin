import { commonService } from "@react3l/react3l/services/common-service";
import { Steps, Tooltip } from "antd";
import { AxiosError } from "axios";
import { TFunction } from "i18next";
import { PrincipalContract } from "models/PrincipalContract";
import { PrincipalContractTemplate } from "models/PrincipalContractTemplate";
import React, { Dispatch, SetStateAction } from "react";
import { principalContractRepository } from "repositories/principal-contract-repository";
import { finalize } from "rxjs/operators";
import appMessageService from "services/app-message-service";

export function usePrincipalContractFooter(
  translate: TFunction,
  model?: PrincipalContract,
  handleUpdateNewModel?: (item: PrincipalContract) => void,
  handleGoBase?: () => void,
  handleSave?: (item: PrincipalContract) => () => void,
  principalContractTemplate?: PrincipalContractTemplate,
  setPrincipalContractTemplate?: Dispatch<
    SetStateAction<PrincipalContractTemplate>
  >
) {
  const [subscription] = commonService.useSubscription();

  const [isOpen, setIsOpen] = React.useState<boolean>(false);


  const [loading, setLoading] = React.useState<boolean>(false);
  const [
    visibleSaveTemplateComfirm,
    setVisibleSaveTemplateComfirm,
  ] = React.useState<boolean>(false);

  const {
    notifyUpdateItemSuccess,
    notifyUpdateItemError,
  } = appMessageService.useCRUDMessage();


  const handleOpenHistory = React.useCallback(() => {
    setIsOpen(true);
  }, []);
  const handleCloseHistory = React.useCallback(() => {
    setIsOpen(false);
  }, []);
  const create = React.useCallback(() => {
    const modelValue = { ...model };
    subscription.add(
      principalContractRepository
        .save(modelValue)
        .pipe(finalize(() => setLoading(false)))
        .subscribe(
          (item: PrincipalContract) => {
            handleUpdateNewModel(item); // setModel
            handleGoBase(); // go master
            notifyUpdateItemSuccess(); // global message service go here
          },
          (error: AxiosError<PrincipalContract>) => {
            if (error.response && error.response.status === 400) {
              handleUpdateNewModel(error.response?.data); // setModel for catching error
            }
            notifyUpdateItemError(); // global message service go here
          }
        )
    );
  }, [
    model,
    subscription,
    handleUpdateNewModel,
    handleGoBase,
    notifyUpdateItemSuccess,
    notifyUpdateItemError,
  ]);
  const send = React.useCallback(() => {
    const modelValue = { ...model };
    subscription.add(
      principalContractRepository
        .send(modelValue)
        .pipe(finalize(() => setLoading(false)))
        .subscribe(
          (item: PrincipalContract) => {
            handleUpdateNewModel(item); // setModel
            handleGoBase(); // go master
            notifyUpdateItemSuccess(); // global message service go here
          },
          (error: AxiosError<PrincipalContract>) => {
            if (error.response && error.response.status === 400) {
              handleUpdateNewModel(error.response?.data); // setModel for catching error
            }
            notifyUpdateItemError(); // global message service go here
          }
        )
    );
  }, [
    model,
    subscription,
    handleUpdateNewModel,
    handleGoBase,
    notifyUpdateItemSuccess,
    notifyUpdateItemError,
  ]);

  const handleOpenSaveTemplateConfirm = React.useCallback(() => {
    setVisibleSaveTemplateComfirm(true);
  }, []);

  const cancelSaveTemplateConfirm = React.useCallback(() => {
    setVisibleSaveTemplateComfirm(false);
  }, []);

  const confirmSaveTemplate = React.useCallback(() => {
    principalContractTemplate.content = model;
    subscription.add(
      principalContractRepository
        .saveTemplate(principalContractTemplate)
        .pipe(finalize(() => setLoading(false)))
        .subscribe(
          (item: any) => {
            // handleGoBase();
            notifyUpdateItemSuccess();
            setVisibleSaveTemplateComfirm(false);
          },
          (error: AxiosError<PrincipalContractTemplate>) => {
            if (error.response && error.response.status === 400) {
              setPrincipalContractTemplate(error.response?.data);
            }
          }
        )
    );
  }, [model, notifyUpdateItemSuccess, principalContractTemplate, setPrincipalContractTemplate, subscription]);

  const handleChangeNameTemplate = React.useCallback(
    (nameValue) => {
      setPrincipalContractTemplate({
        ...principalContractTemplate,
        name: nameValue,
      });
    },
    [principalContractTemplate, setPrincipalContractTemplate]
  );

  const childrenAction = React.useMemo(() => {
    return (
      <>
        <button className="btn btn__send mr-2" onClick={send}>
          <span>
            <i className="tio-send_outlined"></i>{" "}
            {translate("general.button.send")}
          </span>
        </button>
        <button className="btn btn__save mr-2" onClick={create}>
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
        <button className="btn btn__cancel mr-2" onClick={() => handleGoBase()}>
          <span>
            <i className="tio-clear_circle_outlined"></i>{" "}
            {translate("general.button.close")}
          </span>
        </button>
      </>
    );
  }, [
    handleGoBase,
    handleOpenSaveTemplateConfirm,
    create,
    send,
    translate,
  ]);

  const childrenStep = React.useMemo(() => {
    return (
      <div className="d-flex justify-content-between" style={{ width: '60%' }}>
        <Steps current={model?.requestStateId} size="small" >
          <Steps.Step title="Khởi tạo" />
          <Steps.Step title="Chờ duyệt" />
          <Steps.Step title="Đã duyệt" />
        </Steps>

        <Tooltip title={translate('principalContracts.history')}>
          <i className="tio-history purchase-request-icon_history "
            onClick={handleOpenHistory} />
        </Tooltip>

      </div>
    );
  }, [handleOpenHistory, model, translate]);

  return {
    childrenAction,
    childrenStep,
    loading,
    visibleSaveTemplateComfirm,
    handleChangeNameTemplate,
    cancelSaveTemplateConfirm,
    confirmSaveTemplate,
    isOpen,
    handleCloseHistory,
  };
}
