import { Col, Row } from "antd";
import Table from "antd/lib/table";
import Modal, { ModalProps } from "components/Utility/Modal/Modal";
import { formatDate } from "helpers/date-time";
import { formatNumber } from "helpers/number";
import { PurchasePlan } from "models/PurchasePlan";
import React from "react";
import { useTranslation } from "react-i18next";
import { FormDetailAction } from "services/form-service";
import nameof from "ts-nameof.macro";
import "./QuotationDetailModal.scss";
import { usePurchasePlanQuotationContentTable } from "./QuotationContentModalHook";
import { FileType } from "components/Utility/FileType/FileType";

interface PurchasePlanQuotationModallProps extends ModalProps {
  model: PurchasePlan;
  onChangeSimpleField?: (fieldName: string) => (fieldValue: any) => void;
  onChangeObjectField?: (
    fieldName: string
  ) => (fieldIdValue: number, fieldValue?: any) => void;
  onChangeTreeObjectField?: (
    fieldName: string,
    callback?: (id: number) => void
  ) => (list: any[]) => void;
  dispatchModel?: React.Dispatch<FormDetailAction<PurchasePlan>>;
  loading?: boolean;
  handleUpdateNewModel?;
  mode?: string;
}

function PurchasePlanQuotationModal(props: PurchasePlanQuotationModallProps) {
  const [translate] = useTranslation();

  const { model, loading, handleUpdateNewModel, mode } = props;

  const {
    purchasePlanContentContentColumns,
    purchasePlanContentList,
  } = usePurchasePlanQuotationContentTable(model, handleUpdateNewModel, mode);

  return (
    <Modal
      {...props}
      visibleFooter={false}
      width={1416}
      className="quotation-history__container"
      closable={props?.mode === "preview" ? true : false}
      closeIcon={<i className="tio-clear_circle" />}
    >
      <div className="page page__detail">
        <div className="page__modal-header w-100">
          {model?.selectedSupplier?.avatar ? (
            <img
              className="supplier-avatar"
              src={model?.selectedSupplier?.avatar}
              alt=""
            />
          ) : (
            <img
              className="supplier-avatar"
              src={require("../../../../../assets/images/fpt.jpg")}
              alt=""
            />
          )}
          <div className="supplier-name">{model?.selectedSupplier?.name}</div>
          <div className="supplier-description">
            <span>MST: </span> {model?.selectedSupplier?.taxCode}
          </div>
          <div className="supplier-description">
            <span>SĐT: </span> {model?.selectedSupplier?.phone}
          </div>
          <div className="supplier-description">
            <span>Email: </span> {model?.selectedSupplier?.email}
          </div>
        </div>
        <div className="w-100 page__detail-tabs">
          <Row className="d-flex">
            <Col lg={24}>
              <div className="page__detail-tabs-title quotation-history__title d-flex align-items-center">
                <div className="quotation-history__detail">
                  {translate("purchasePlans.quotationHistory.detail")}
                </div>
                <div>
                  {translate("purchasePlans.quotationHistory.expiredAt")}:{" "}
                  {formatDate(model?.quotationExpectedAt)}
                </div>
              </div>
            </Col>
            <Col lg={24}>
              <div className="page__detail-tabs-table">
                <Table
                  tableLayout="fixed"
                  columns={purchasePlanContentContentColumns}
                  dataSource={purchasePlanContentList}
                  pagination={false}
                  rowKey={nameof(purchasePlanContentList[0].key)}
                  loading={loading}
                  scroll={{ y: 540 }}
                  className="mt-3"
                />
              </div>
            </Col>
            <Col lg={24}>
              <div className="page__detail-tabs-table">
                <Row>
                  <Col lg={14}>
                    <Row className="file-mapping">
                      <div className="file-modal__list">
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                          {model?.purchasePlanFileMappings &&
                            model?.purchasePlanFileMappings?.length > 0 &&
                            model?.purchasePlanFileMappings.map(
                              (quotationFileMapping: any, index) => (
                                <Col
                                  span={12}
                                  className="gutter-row mt-4"
                                  key={index}
                                >
                                  <FileType
                                    file={quotationFileMapping?.file}
                                    isShowClear={false}
                                    index={index}
                                  ></FileType>
                                </Col>
                              )
                            )}
                        </Row>
                      </div>
                    </Row>
                  </Col>
                  <Col lg={10} className="page__total-quotation">
                    <div className="page__total">
                      <div className="total__container">
                        <div className="total__first-row">
                          <div className="row__title">Thành tiền:</div>
                          <div className="row__value">
                            {formatNumber(model?.subTotal)}
                            <span>&nbsp;{model?.mainCurrency?.code}</span>
                          </div>
                        </div>
                        <div className="total__second-row">
                          <div className="row__title">Thuế:</div>
                          <div className="row__value">
                            {formatNumber(model?.taxAmount)}
                            <span>&nbsp;{model?.mainCurrency?.code}</span>
                          </div>
                        </div>
                        <div className="total__third-row">
                          <div className="row__title">Chi phí vận chuyển:</div>
                          <div className="row__value">
                            {formatNumber(model?.freightExpense)}
                            <span>&nbsp;{model?.mainCurrency?.code}</span>
                          </div>
                        </div>
                        <div className="total__fourth-row">
                          <div className="row__title">Tổng tiền:</div>
                          <div className="row__value">
                            {formatNumber(model?.total)}
                            <span>&nbsp;{model?.mainCurrency?.code}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      {props.mode === "edit" && (
        <div className="ant-modal-footer">
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-sm component__btn-primary mr-2"
              onClick={props.handleSave}
            >
              <span>
                <i className="tio-save" /> {translate("general.actions.save")}
              </span>
            </button>
            <button
              className="btn btn-sm component__btn-cancel"
              onClick={props.handleCancel}
            >
              <i className="tio-clear" /> {translate("general.actions.cancel")}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default PurchasePlanQuotationModal;
