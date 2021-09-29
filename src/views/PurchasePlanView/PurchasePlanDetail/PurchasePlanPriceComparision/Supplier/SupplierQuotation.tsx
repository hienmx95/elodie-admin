import { Badge, Col, notification, Row } from "antd";
import FormItem from "components/Utility/FormItem/FormItem";
import FroalaEditor from "components/Utility/FroalaEditor/FroalaEditor";
import InputText from "components/Utility/Input/InputText/InputText";
import Modal, { ModalProps } from "components/Utility/Modal/Modal";
import MultipleSelect from "components/Utility/Select/MultipleSelect/MultipleSelect";
import Select from "components/Utility/Select/Select";
import { ASSETS_SVG } from "config/consts";
import { PurchasePlanMail } from "models/PurchasePlanMail";
import { PurchasePlanMailFileMapping } from "models/PurchasePlanMailFileMapping";
import { PurchasePlanMailSupplierMapping } from "models/PurchasePlanMailSupplierMapping";
import { StatusFilter } from "models/Status";
import { Supplier, SupplierFilter } from "models/Supplier";
import React, { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { purchasePlanRepository } from "repositories/purchase-plan-repository";
import { FormDetailAction, formService } from "services/form-service";
import nameof from "ts-nameof.macro";
import {
  FileMappingModal,
  useFileMapping,
} from "../../PurchasePlanDetailHook/FileMappingHook";
import "./SupplierQuotation.scss";

interface PurchasePlanMailDetailModalProps extends ModalProps {
  model: PurchasePlanMail;
  handleChangeSimpleField: (fieldName: string) => (fieldValue: any) => void;
  handleChangeObjectField?: (
    fieldName: string
  ) => (fieldIdValue: number, fieldValue?: any) => void;
  handleChangeTreeObjectField?: (
    fieldName: string,
    callback?: (id: number) => void
  ) => (list: any[]) => void;
  dispatchModel?: React.Dispatch<FormDetailAction<PurchasePlanMail>>;
  loading?: boolean;
  recipients?: Supplier[];
  handleChangeMappingField?: (
    fieldName: string | number
  ) => (fieldValue: any) => void;
  filter?: SupplierFilter;
  handleUpdateNewModel: (data: PurchasePlanMail) => void;
  setFilter: Dispatch<SetStateAction<SupplierFilter>>;
}

function SupplierQuotationModal(props: PurchasePlanMailDetailModalProps) {
  const [translate] = useTranslation();
  const {
    model,
    handleChangeSimpleField,
    handleChangeMappingField,
    loading,
    filter,
    handleUpdateNewModel,
    recipients,
    setFilter,
  } = props;

  const {
    files,
    openFileModal,
    isLoadingFile,
    handleChangeFile,
    handleCloseFileModal,
    handleOpenFileModal,
    handleDeleteFile,
  } = useFileMapping(
    model,
    nameof("purchasePlanMailFileMappings"),
    purchasePlanRepository.multiUpload,
    handleChangeMappingField,
    handleChangeSimpleField,
    PurchasePlanMailFileMapping
  );

  const [loadingRecipients, setLoadingRecipients] = React.useState<boolean>(
    true
  );
  const [loadingTemplate, setLoadingTemplate] = React.useState<boolean>(true);

  // const [suppliers, setSuppliers] = React.useState<Supplier[]>([]);

  React.useEffect(() => {
    if (loadingRecipients) {
      if (recipients && recipients?.length > 0) {
        const newModel = { ...model };
        const mappings = recipients.map((recipient) => {
          const content = new PurchasePlanMailSupplierMapping();
          content.supplier = recipient;
          content.supplierId = recipient?.id;
          return content;
        });
        newModel.purchasePlanMailSupplierMappings = mappings;
        handleUpdateNewModel(newModel);

        setLoadingRecipients(false);
      }
    }
    if (loadingTemplate) {
      purchasePlanRepository
        .singleListMailTemplate(new StatusFilter())
        .subscribe((list) => {
          const newModel = { ...model };
          newModel.purchasePlanMailFileMappings =
            list[0]?.content?.purchasePlanMailFileMappings;
          newModel.subject = list[0]?.content?.subject;
          newModel.body = list[0]?.content?.body;
          newModel["template"] = list[0];
          if (list[0]) {
            handleUpdateNewModel(newModel);
          }
          setLoadingTemplate(false);
        });
    }
  }, [
    filter,
    handleUpdateNewModel,
    loadingRecipients,
    loadingTemplate,
    model,
    recipients,
    setFilter,
  ]);

  const handleChangeMailTemplate = React.useCallback(
    (...[, template]) => {
      const newModel = { ...model };
      newModel.purchasePlanMailFileMappings =
        template?.content?.purchasePlanMailFileMappings;
      newModel.subject = template?.content?.subject;
      newModel.body = template?.content?.body;
      newModel["template"] = template;
      if (template) {
        handleUpdateNewModel(newModel);
      }
    },
    [handleUpdateNewModel, model]
  );

  const handleSaveTemplate = React.useCallback(() => {
    const tmpObject = {
      name: model?.subject,
      content: model,
    };
    purchasePlanRepository.createMailTemplate(tmpObject).subscribe((res) => {
      if (res) {
        notification.success({
          message: translate("general.update.success"),
        });
      } else {
        notification.error({
          message: translate("general.update.error"),
        });
      }
    });
  }, [model, translate]);

  return (
    <Modal {...props} width={890} visibleFooter={false}>
      {loading ? (
        <div className="loading-block">
          <img src={ASSETS_SVG + "/spinner.svg"} alt="Loading..." />
        </div>
      ) : (
        <div className="page page__detail page-supplier-quotation">
          <div className="page__modal-header w-100">
            <div className="page__modal-header-block"></div>
            <Row className="d-flex">
              <Col lg={24} className="page__modal-header-title">
                {translate("purchasePlans.modal.title")}
              </Col>
            </Row>
          </div>
          <div className="w-100 page__detail-tabs">
            <Row className="d-flex">
              <Col lg={24}>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  <Col lg={20} className="mt-3 ml-2">
                    <FormItem label={translate("purchasePlans.mailTemplate")}>
                      <Select
                        isMaterial={true}
                        classFilter={StatusFilter}
                        placeHolder={translate(
                          "purchasePlans.placeholder.mailTemplate"
                        )}
                        getList={purchasePlanRepository.singleListMailTemplate}
                        onChange={handleChangeMailTemplate}
                        model={model?.template}
                      />
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col lg={20} className="pr-3 mt-3 ml-2">
                    <FormItem
                      label={translate("purchasePlans.recipients")}
                      validateStatus={formService.getValidationStatus<
                        PurchasePlanMail
                      >(
                        model.errors,
                        nameof(model.purchasePlanMailSupplierMappings)
                      )}
                      message={model.errors?.purchasePlanMailSupplierMappings}
                      isRequired={true}
                    >
                      <MultipleSelect
                        models={recipients}
                        isMaterial={true}
                        modelFilter={filter}
                        classFilter={SupplierFilter}
                        disabled
                      />
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col lg={20} className="pr-3 mt-3 ml-2">
                    <FormItem
                      label={translate("purchasePlans.subject")}
                      validateStatus={formService.getValidationStatus<
                        PurchasePlanMail
                      >(model.errors, nameof(model.subject))}
                      message={model.errors?.subject}
                    >
                      <InputText
                        isMaterial={true}
                        value={model.subject}
                        placeHolder={translate(
                          "purchasePlans.placeholder.subject"
                        )}
                        className={"tio-comment_text_outlined"}
                        onChange={handleChangeSimpleField(
                          nameof(model.subject)
                        )}
                      />
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col lg={24} className="mt-3 ml-2 quotation-body">
                    <FormItem
                      validateStatus={formService.getValidationStatus<
                        PurchasePlanMail
                      >(model.errors, nameof(model.body))}
                      message={model.errors?.body}
                    >
                      <FroalaEditor
                        value={model.body}
                        onChange={handleChangeSimpleField(nameof(model.body))}
                        placeholder={translate(
                          "purchasePlans.placeHolder.body"
                        )}
                        getList={
                          purchasePlanRepository.singleListPurchasePlanMailMarker
                        }
                        classFilter={StatusFilter}
                      />
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col lg={24} className="mt-3 ml-2 mb-3">
                    <Badge
                      count={
                        model?.purchasePlanMailFileMappings &&
                        model?.purchasePlanMailFileMappings?.length > 0
                          ? model?.purchasePlanMailFileMappings?.length
                          : 0
                      }
                    >
                      <div
                        className="attach-file__button"
                        onClick={handleOpenFileModal}
                      >
                        <span>
                          <i className="tio-attachment_diagonal"></i>{" "}
                          {translate("purchaseRequests.attachment")}
                        </span>
                      </div>
                    </Badge>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
          <div className="ant-modal-footer">
            <div className="d-flex justify-content-between">
              <div>
                <button
                  className="btn btn-sm component__btn-primary mr-2"
                  onClick={props.handleSave}
                >
                  <span>
                    <i className="tio-send" />{" "}
                    {translate("general.button.send")}
                  </span>
                </button>
                <button
                  className="btn btn-sm component__btn-cancel"
                  onClick={props.handleCancel}
                >
                  <i className="tio-clear" />{" "}
                  {translate("general.actions.cancel")}
                </button>
              </div>
              <button className="btn btn__save" onClick={handleSaveTemplate}>
                <span>
                  <i className="tio-save_outlined"></i>{" "}
                  {translate("general.button.saveTemplate")}
                </span>
              </button>
            </div>
          </div>

          <FileMappingModal
            visibleDialog={openFileModal}
            files={files}
            isLoadingFile={isLoadingFile}
            handleChangeFile={handleChangeFile}
            onCancelDialog={handleCloseFileModal}
            handleDeleteFile={handleDeleteFile}
          />
        </div>
      )}
    </Modal>
  );
}

export default SupplierQuotationModal;
