/* begin general import */
/* end individual import */
import { CaretRightOutlined } from "@ant-design/icons";
import { Badge, Col, Collapse, Row, Steps, Table, Tooltip } from "antd";
import { ColumnProps } from "antd/lib/table";
import { AppStoreContext } from "app/app-context";
import { AppAction, AppState } from "app/app-store";
import classNames from "classnames";
import AppFooter from "components/AppFooter/AppFooter";
import ChatBox from "components/Utility/ChatBox/ChatBox";
import FormItem from "components/Utility/FormItem/FormItem";
import { PURCHASE_PLAN_ROUTE } from "config/route-consts";
import { formatDate } from "helpers/date-time";
import { Category } from "models/Category";
import { PurchasePlan } from "models/PurchasePlan";
import { PurchasePlanContent } from "models/PurchasePlanContent";
import { QuotationHistory } from "models/QuotationHistory";
import { UnitOfMeasure } from "models/UnitOfMeasure";
import React, { Dispatch, useContext } from "react";
import { useTranslation } from "react-i18next";
import { appUserRepository } from "repositories/app-user-repository";
import { discussionRepository } from "repositories/discussion-repository";
import { purchasePlanRepository } from "repositories/purchase-plan-repository";
import nameof from "ts-nameof.macro";
import {
  FileMappingModal,
  useFileMapping,
} from "../PurchasePlanDetailHook/FileMappingHook";
import {
  useDetail,
  useDetailModal,
} from "../PurchasePlanDetailHook/PurchasePlanDetailHook";
import { usePurchasePlanApproveFooter } from "../PurchasePlanDetailHook/PurchasePlanFooterHook";
import {
  PurchasePlanWorkflowHistoryModal,
  useWorkflowHistoryHook,
} from "../PurchasePlanDetailHook/WorkflowHistoryHook";
import "./PurchasePlanPriceComparisionApprove.scss";
import { useQuotation } from "./PurchasePlanPriceComparisionHook/PurchasePlanApproveHook";
import PurchasePlanQuotationModal from "./Quotation/PurchasePlanQuotationModal";
import QuotationDetailModal from "./Quotation/QuotationDetailModal";

const { Step } = Steps;

function PurchasePlanPriceComparisionApprove() {
  const [translate] = useTranslation();

  const [state] = useContext<[AppState, Dispatch<AppAction>]>(AppStoreContext);

  const { model, handleUpdateNewModel, handleGoBase } = useDetail<PurchasePlan>(
    PurchasePlan,
    purchasePlanRepository.get,
    purchasePlanRepository.save,
    PURCHASE_PLAN_ROUTE
  );

  const {
    model: quotationHistory,
    isOpenDetailModal,
    handleOpenDetailModal,
    handleCloseDetailModal,
    handleChangeSimpleField,
    handleChangeObjectField,
  } = useDetailModal(
    QuotationHistory,
    purchasePlanRepository.getQuotationHistory,
    purchasePlanRepository.updateClosing
  );

  const {
    files,
    openFileModal,
    handleCloseFileModal,
    handleOpenFileModal,
  } = useFileMapping(model, nameof("purchasePlanFileMappings"));

  /* app footer */

  const {
    isOpen,
    handleCloseHistory,
    handleOpenHistory,
  } = useWorkflowHistoryHook(model);

  const { childrenAction } = usePurchasePlanApproveFooter(
    translate,
    model,
    handleGoBase
  );

  const childrenStep = React.useMemo(() => {
    return (
      <div className="d-flex justify-content-between">
        <Steps current={model?.requestStateId === 2 ? 5 : 6} size="small">
          <Steps.Step title={"Khởi tạo"} />
          <Steps.Step title={"Chờ báo giá"} />
          <Steps.Step title={"Đã báo giá"} />
          <Steps.Step title={"Đã chọn NCC"} />
          <Steps.Step title={"Chờ duyệt"} />
          <Steps.Step
            title={model?.requestState?.id === 4 ? "Từ chối" : "Đã duyệt"}
          />
        </Steps>
        <Tooltip title={translate("purchaseRequests.history")}>
          <i
            className="tio-history purchase-request-icon_history"
            onClick={handleOpenHistory}
          />
        </Tooltip>
      </div>
    );
  }, [handleOpenHistory, model, translate]);

  const purchasePlanContentColumns: ColumnProps<
    PurchasePlanContent
  >[] = React.useMemo(() => {
    return [
      {
        title: (
          <div className="table-cell__header">
            {translate("purchasePlans.purchasePlanContent.item")}
          </div>
        ),
        width: 180,
        key: nameof(model.purchasePlanContents[0].item),
        dataIndex: nameof(model.purchasePlanContents[0].item),
        render: (...params: [Category, PurchasePlanContent, number]) => {
          return (
            <div className="table-cell__item">
              <div className="item-code__image">
                {params[0]?.image?.url && (
                  <img src={params[0]?.image?.url} alt="" />
                )}
                {!params[0]?.image?.url && (
                  <img
                    src={require("../../../../assets/images/default-category.svg")}
                    alt=""
                  />
                )}
              </div>
              <div className="ml-3">
                <span className="item-code__text">{params[0]?.name}</span>
                {/* <span className="item-name__text">{params[0].code}</span> */}
                <span className="item-description__text">
                  {params[0]?.description}
                </span>
              </div>
            </div>
          );
        },
      },
      {
        title: (
          <div className="table-cell__header">
            {translate("purchasePlans.purchasePlanContent.quantity")}
          </div>
        ),
        width: 150,
        key: nameof(model.purchasePlanContents[0].quantity),
        dataIndex: nameof(model.purchasePlanContents[0].quantity),
        render: (...params: [number, PurchasePlanContent, number]) => {
          return (
            <div className="table-cell__container">
              <div className="result-cell">
                <span className="cell-number">{params[1].quantity}</span>
              </div>
            </div>
          );
        },
      },
      {
        title: (
          <div className="table-cell__header">
            {translate("purchasePlans.purchasePlanContent.unitOfMeasure")}
          </div>
        ),
        width: 170,
        key: nameof(model.purchasePlanContents[0].quota),
        dataIndex: nameof(model.purchasePlanContents[0].quota),
        align: "right",
        render: (...params: [UnitOfMeasure, PurchasePlanContent, number]) => {
          return (
            <div className="table-cell__container">
              <div className="result-cell">
                <span className="cell-number">
                  {params[1]?.unitOfMeasure?.name}{" "}
                </span>
              </div>
            </div>
          );
        },
      },
      {
        title: (
          <div className="table-cell__header">
            {translate("purchasePlans.purchasePlanContent.note")}
          </div>
        ),
        width: 170,
        key: nameof(model.purchasePlanContents[0].note),
        dataIndex: nameof(model.purchasePlanContents[0].note),
        align: "right",
        render: (...params: [string, PurchasePlanContent, number]) => {
          return (
            <div className="table-cell__container">
              <div className="result-cell">
                <span className="cell-number">{params[1]?.note}</span>
              </div>
            </div>
          );
        },
      },
    ];
  }, [model, translate]);

  const { handleGetSupplierQuotation, listQuotation } = useQuotation(
    model,
    purchasePlanRepository.listQuotationHistoryBySupplier,
    handleUpdateNewModel
  );

  const {
    model: selectedSupplierModal,
    isOpenDetailModal: isOpenSelectedSupplier,
    handleOpenDetailModal: handleOpenSelectedSupplier,
    handleCloseDetailModal: handleCloseSelectedSupplier,
  } = useDetailModal(
    QuotationHistory,
    purchasePlanRepository.getClosing,
    purchasePlanRepository.updateClosing
  );

  return (
    <>
      <div className="page page__detail purchase-plan__container purchase-plan__approve">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col lg={18} className="gutter-row">
            <div className="page__header d-flex align-items-center">
              <div className="page__header-title d-flex align-items-center">
                <div className="page__title mr-1">
                  {model?.code}
                </div>
              </div>

              <div className="page__header-go-back d-flex align-items-center">
                <div className="page__title mr-3">
                  {translate("purchasePlans.comparision")}
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <div className="w-100 page__detail-tabs">
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col lg={18} className="gutter-row">
              <Collapse
                defaultActiveKey={["1"]}
                onChange={() => { }}
                expandIcon={({ isActive }) => (
                  <CaretRightOutlined rotate={isActive ? 90 : 0} />
                )}
                className="site-collapse-custom-collapse pb-1 "
                expandIconPosition="right"
              >
                <Collapse.Panel
                  header={"Thông tin chi tiết"}
                  key="1"
                  className="site-collapse-custom-panel "
                >
                  <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col lg={8} className="gutter-row mt-3">
                      <FormItem label={translate("purchasePlans.creator")}>
                        <div className="general-field__second-row mt-1">
                          <img
                            src={model.creator?.avatar}
                            className="general-field__circle-image"
                            alt="IMG"
                          />
                          <span>{model.creator?.displayName}</span>
                        </div>
                      </FormItem>
                    </Col>
                    <Col lg={16} className="gutter-row mt-3">
                      <FormItem label={translate("purchasePlans.description")}>
                        <span>{model?.description}</span>
                      </FormItem>
                    </Col>
                    <Col lg={8} className="gutter-row mt-3">
                      <FormItem
                        label={translate("purchasePlans.quotationExpectedAt")}
                      >
                        <span>{formatDate(model.quotationExpectedAt)}</span>
                      </FormItem>
                    </Col>

                    <Col lg={16} className="gutter-row mt-3">
                      <div className="general-field__container">
                        <div className="general-field__second-row mt-2">
                          <Badge
                            count={
                              model.purchasePlanFileMappings
                                ? model.purchasePlanFileMappings.length
                                : 0
                            }
                          >
                            <div
                              className="attach-file__button disabled-for-preview"
                              onClick={handleOpenFileModal}
                            >
                              <span>
                                <i className="tio-attachment_diagonal"></i>{" "}
                                {translate("purchasePlans.fileMappings")}
                              </span>
                            </div>
                          </Badge>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col lg={24}>
                      <Table
                        rowKey={nameof(model.purchasePlanContents[0].itemId)}
                        pagination={false}
                        dataSource={model.purchasePlanContents}
                        columns={purchasePlanContentColumns}
                        scroll={{ y: 500 }}
                      ></Table>
                    </Col>
                    <Col lg={24} className="purchase-plan__category">
                      <span className="mr-2 category-title">
                        {translate("purchasePlans.category")}:{" "}
                      </span>
                      {model?.categoryAncestors &&
                        model?.categoryAncestors?.length > 0 &&
                        model?.categoryAncestors.map(
                          (categoryAncestor: any, index) => (
                            <span className="mr-2 category-level" key={index}>
                              {categoryAncestor?.name}{" "}
                              {index < model?.categoryAncestors?.length - 1 && (
                                <i className="tio-chevron_right ml-1" />
                              )}
                            </span>
                          )
                        )}
                    </Col>
                  </Row>
                </Collapse.Panel>
              </Collapse>

              <Collapse
                defaultActiveKey={["1"]}
                onChange={() => { }}
                expandIcon={({ isActive }) => (
                  <CaretRightOutlined rotate={isActive ? 90 : 0} />
                )}
                className="site-collapse-custom-collapse"
                expandIconPosition="right"
              >
                <Collapse.Panel
                  header={"Nhà cung cấp"}
                  key="1"
                  className="site-collapse-custom-panel"
                >
                  <Row>
                    <Col lg={7} className="gutter-row row-supplier pl-3 pr-3">
                      <div className="row-supplier_container">
                        {model?.purchasePlanSupplierMappings?.length > 0 &&
                          model?.purchasePlanSupplierMappings.map(
                            (purchasePlanSupplierMapping: any, index) => (
                              <button
                                className={classNames("supplier-mapping", {
                                  "supplier-mapping__active":
                                    purchasePlanSupplierMapping.active,
                                  "supplier-mapping__inactive": !purchasePlanSupplierMapping.active,
                                })}
                                key={index}
                                onClick={handleGetSupplierQuotation(
                                  purchasePlanSupplierMapping?.supplierId,
                                  index
                                )}
                              >
                                <div className="supplier-mapping__name d-flex align-items-center">
                                  <div className="d-flex align-items-center">
                                    {purchasePlanSupplierMapping?.supplier
                                      ?.avatar && (
                                        <div className="supplier-mapping__image mr-3">
                                          <img
                                            src={
                                              purchasePlanSupplierMapping
                                                ?.supplier?.avatar
                                            }
                                            alt=""
                                          />
                                        </div>
                                      )}

                                    <div className="supplier__name">
                                      {
                                        purchasePlanSupplierMapping?.supplier
                                          ?.name
                                      }
                                      <div className="supplier__tax-code">
                                        <span className="mr-1">MST:</span>
                                        <span>
                                          {
                                            purchasePlanSupplierMapping
                                              ?.supplier?.taxCode
                                          }
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="d-flex align-items-center">
                                    <img
                                      src={require("../../../../assets/images/award.svg")}
                                      alt=""
                                      className="mr-1"
                                    />
                                    {purchasePlanSupplierMapping?.rank}
                                  </div>
                                </div>
                              </button>
                            )
                          )}
                      </div>
                    </Col>
                    <Col lg={11} className="gutter-row row-supplier pl-3 pr-3">
                      <div className="quotation">
                        {listQuotation &&
                          listQuotation?.length > 0 &&
                          listQuotation.map(
                            (quotation: QuotationHistory, index) => (
                              <div
                                className="quotation-content mt-3"
                                key={index}
                                onClick={() =>
                                  handleOpenDetailModal(quotation?.id)
                                }
                              >
                                <div className="quotation-content__left">
                                  <div className="quotation-content__left-icon">
                                    <i className="tio-document_outlined" />
                                  </div>
                                  <div className="quotation-content__left-name">
                                    <div className="name">
                                      {quotation?.name}
                                    </div>
                                    <div className="total">
                                      {" "}
                                      {quotation?.total}{" "}
                                      {quotation?.mainCurrency?.name}
                                    </div>
                                  </div>
                                </div>
                                <div className="quotation-content__right">
                                  {formatDate(quotation?.savedAt)}
                                </div>
                              </div>
                            )
                          )}
                        {(!listQuotation || listQuotation?.length === 0) && (
                          <div className="supplier-quotation">
                            <img
                              src={require("../../../../assets/images/illutration-image/seo.jpg")}
                              alt=""
                              width="240"
                              height="179"
                            />
                            {/* <div className="supplier-quotation__title">
                              Chấm điểm Nhà cung cấp
                            </div> */}
                            <div className="supplier-quotation__des mt-3">
                              <div>Bạn chưa nhận được báo giá nào!</div>
                              <div>Hãy chắc chắn là NCC đã được thông báo</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </Col>
                    <Col lg={6} className="gutter-row pl-3 pr-3">
                      <div className="supplier-quotation">
                        <img
                          src={require("../../../../assets/images/bestseller.svg")}
                          alt=""
                          width="60"
                          height="60"
                        />
                        <div className="selected-supplier__title">
                          {model?.selectedSupplier?.name}
                        </div>
                        <div className="supplier-quotation__des mt-3">
                          MST: {model?.selectedSupplier?.taxCode}
                        </div>
                        <div className="text-center">
                          Xem chi tiết về Nhà cung cấp được chọn tại đây
                        </div>
                        <button
                          className="btn btn-sm component__btn-primary mt-4"
                          onClick={() => handleOpenSelectedSupplier(model?.id)}
                        >
                          <i className="tio-format_points mr-2" />
                          <span>Chi tiết</span>
                        </button>
                      </div>
                    </Col>
                  </Row>
                </Collapse.Panel>
              </Collapse>
            </Col>

            <Col lg={6} className="gutter-row ">
              <Row>
                <Col lg={24}>
                  <Collapse
                    defaultActiveKey={["1"]}
                    onChange={() => { }}
                    className="site-collapse-custom-collapse pb-1"
                    expandIconPosition="right"
                    expandIcon={({ isActive }) => (
                      <CaretRightOutlined rotate={isActive ? 90 : 0} />
                    )}
                  >
                    <Collapse.Panel
                      header={"Đề nghị mua sắm"}
                      key="1"
                      className="site-collapse-custom-panel mr-3 "
                    >
                      <Row>
                        <Col lg={24} className="mb-3">
                          <FormItem
                            label={translate("purchasePlans.purchaseRequest")}
                          >
                            <span>{model?.purchaseRequest?.code}</span>
                          </FormItem>
                        </Col>
                        <Col lg={24} className="mb-3">
                          <FormItem
                            label={translate(
                              "purchasePlans.purchaseRequestCreator"
                            )}
                          >
                            <div className="general-field__second-row mt-1">
                              {model?.purchaseRequest?.requestor?.avatar && (
                                <img
                                  src={
                                    model?.purchaseRequest?.requestor?.avatar
                                  }
                                  className="general-field__circle-image"
                                  alt="IMG"
                                />
                              )}

                              <span>
                                {model?.purchaseRequest?.requestor?.displayName}
                              </span>
                            </div>
                          </FormItem>
                        </Col>
                        <Col lg={24} className="mb-3">
                          <FormItem
                            label={translate(
                              "purchasePlans.purchaseRequestAddress"
                            )}
                          >
                            <span>
                              {model?.purchaseRequest?.recipientAddress}
                            </span>
                          </FormItem>
                        </Col>
                      </Row>
                    </Collapse.Panel>
                  </Collapse>
                </Col>
              </Row>
              <Row>
                <Col lg={24}>
                  <Collapse
                    defaultActiveKey={["1"]}
                    onChange={() => { }}
                    className="site-collapse-custom-collapse pb-1"
                    expandIconPosition="right"
                    expandIcon={({ isActive }) => (
                      <CaretRightOutlined rotate={isActive ? 90 : 0} />
                    )}
                  >
                    <Collapse.Panel
                      header={"Lịch sử"}
                      key="1"
                      className="site-collapse-custom-panel mr-3 "
                    >
                      <Row>
                        <Steps direction="vertical" size="small" current={1}>
                          <Step
                            title="Finished"
                            description="This is a description."
                          />
                          <Step
                            title="In Progress"
                            description="This is a description."
                          />
                          <Step
                            title="Waiting"
                            description="This is a description."
                          />
                        </Steps>
                      </Row>
                    </Collapse.Panel>
                  </Collapse>
                </Col>
              </Row>
              <Row>
                <Col lg={24}>
                  <Collapse
                    defaultActiveKey={["1"]}
                    onChange={() => { }}
                    className="site-collapse-custom-collapse"
                    expandIconPosition="right"
                    expandIcon={({ isActive }) => (
                      <CaretRightOutlined rotate={isActive ? 90 : 0} />
                    )}
                  >
                    <Collapse.Panel
                      header={"Bình luận"}
                      key="1"
                      className="site-collapse-custom-panel mr-3"
                    >
                      <Row>
                        <div style={{ minHeight: "300px", width: "100%" }}>
                          <ChatBox
                            getMessages={discussionRepository.list}
                            countMessages={discussionRepository.count}
                            postMessage={discussionRepository.create}
                            deleteMessage={discussionRepository.delete}
                            attachFile={discussionRepository.import}
                            suggestList={appUserRepository.list}
                            discussionId={model.rowId}
                            userInfo={state.user}
                          />
                        </div>
                      </Row>
                    </Collapse.Panel>
                  </Collapse>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
      <AppFooter
        childrenAction={childrenAction}
        childrenStep={childrenStep}
      ></AppFooter>
      <FileMappingModal
        visibleDialog={openFileModal}
        files={files}
        onCancelDialog={handleCloseFileModal}
      />

      <QuotationDetailModal
        model={quotationHistory?.content}
        onChangeSimpleField={handleChangeSimpleField}
        onChangeObjectField={handleChangeObjectField}
        visible={isOpenDetailModal}
        handleCancel={handleCloseDetailModal}
      />

      {isOpenSelectedSupplier && (
        <PurchasePlanQuotationModal
          model={selectedSupplierModal}
          visible={isOpenSelectedSupplier}
          handleCancel={handleCloseSelectedSupplier}
          mode="preview"
        />
      )}
      {isOpen && (
        <PurchasePlanWorkflowHistoryModal
          isOpen={isOpen}
          handleCloseHistory={handleCloseHistory}
          model={model}
        />
      )}
    </>
  );
}

export default PurchasePlanPriceComparisionApprove;
