/* begin general import */
import React, { Dispatch, useContext } from "react";
import ChatBox from "components/Utility/ChatBox/ChatBox";
import { AppAction, AppState } from "app/app-store";
import { AppStoreContext } from "app/app-context";
import { discussionRepository } from "repositories/discussion-repository";
import { appUserRepository } from "repositories/app-user-repository";
import "./PurchaseRequestApprove.scss";
/* end general import */

/* begin individual import */
import { PurchaseRequest } from "models/PurchaseRequest";
import nameof from "ts-nameof.macro";
import Table, { ColumnProps } from "antd/lib/table";
import { CaretRightOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Badge, Col, Collapse, Row, Steps, Tooltip } from "antd";
import { purchaseRequestRepository } from "repositories/purchase-request-repository";
import masterService from "services/pages/master-service";
import { formatDate } from "helpers/date-time";
import { PurchaseRequestContent } from "models/PurchaseRequestContent";
import { Item } from "models/Item";
import { formatNumber } from "helpers/number";
import { PurchaseRequestFileMappingModal, usePurchaseRequestFileMapping } from "./PurchaseRequestDetailHook/PurchaseRequestFileMappingHook";
import { routerService } from "services/route-service";
import { PURCHASE_REQUEST_ROUTE } from "config/route-consts";
import AppFooter from "components/AppFooter/AppFooter";
import { usePurchaseRequestWorkflow } from "./PurchaseRequestDetailHook/PurchaseRequestWorkflowHook";
import { PurchaseRequestWorkflowHistoryModal, usePurchaseRequestWorkflowHistory } from "./PurchaseRequestDetailHook/PurchaseRequestWorkflowHistoryHook";
/* end individual import */

function PurchaseRequestApprove() {
  const [translate] = useTranslation();

  const [, , , handleGoBase] = routerService.useMasterNavigation(
    PURCHASE_REQUEST_ROUTE
  );

  const { user } = useContext<[AppState, Dispatch<AppAction>]>(
    AppStoreContext
  )[0];

  const { model } = masterService.usePreviewPage(
    PurchaseRequest,
    purchaseRequestRepository.get
  );

  const {
    handleApprove,
    handleReject,
    handleRedo,
  } = usePurchaseRequestWorkflow(model, handleGoBase);


  const {
    files,
    openFileModal,
    handleCloseFileModal,
    handleOpenFileModal,
  } = usePurchaseRequestFileMapping(
    model,
    nameof("purchaseRequestFileMappings")
  );
  const {
    isOpen,
    handleCloseHistory,
    handleOpenHistory,
  } = usePurchaseRequestWorkflowHistory(model);
  const childrenAction = React.useMemo(() => {
    return (
      <>

        <button
          className="btn btn__approve  mr-3"
          onClick={handleApprove}
        >
          <span>
            <i className="tio-checkmark_circle_outlined mr-2"></i>
            {translate("general.button.approve")}
          </span>
        </button>
        <button
          className="btn btn__reject mr-3"
          onClick={handleReject}
        >
          <span>
            <i className="tio-pause_circle_outlined  mr-2"></i>
            {translate("general.button.reject")}
          </span>
        </button>
        <button
          className="btn btn__redo  mr-3"
          onClick={handleRedo}
        >
          <span>
            <i className="tio-replay mr-2"></i>
            {translate("general.button.redo")}
          </span>
        </button>
        <button className="btn btn__cancel mr-3" onClick={handleGoBase}>
          <span>
            <i className="tio-clear_circle_outlined mr-2"></i>
            {translate("general.button.close")}
          </span>
        </button>
      </>
    );
  }, [handleApprove, translate, handleReject, handleRedo, handleGoBase]);
  const childrenStep = React.useMemo(() => {
    return (
      <div className="d-flex justify-content-between" style={{ width: '60%' }}>
        <Steps current={2} size="small" >
          <Steps.Step title="Khởi tạo" />
          <Steps.Step title="Chờ duyệt" />
          <Steps.Step title="Đã duyệt" />
          <Steps.Step title="Đã tạo PAMS" />
        </Steps>

        <Tooltip title={translate('purchaseRequests.history')}>
          <i className="tio-history purchase-request-icon_history "
            onClick={handleOpenHistory} />
        </Tooltip>

      </div>
    );
  }, [handleOpenHistory, translate]);

  const purchaseRequestContentColumns: ColumnProps<
    PurchaseRequestContent
  >[] = React.useMemo(() => {
    return [
      {
        title: (
          <div className="table-cell__header">
            {translate("purchaseRequests.purchaseRequestContent.item")}
          </div>
        ),
        width: 180,
        key: nameof(model.purchaseRequestContents[0].item),
        dataIndex: nameof(model.purchaseRequestContents[0].item),
        render: (...params: [Item, PurchaseRequestContent, number]) => {
          return (
            <div className="table-cell__container table-cell__item">
              <span className="item-code__text">{params[0].name}</span>
              <span className="item-name__text">{params[0].code}</span>
              <span className="item-description__text">
                {params[0].description}
              </span>
            </div>
          );
        },
      },
      {
        title: (
          <div className="table-cell__header">
            {translate("purchaseRequests.purchaseRequestContent.quantity")}
          </div>
        ),
        width: 150,
        key: nameof(model.purchaseRequestContents[0].quantity),
        dataIndex: nameof(model.purchaseRequestContents[0].quantity),
        render: (...params: [number, PurchaseRequestContent, number]) => {
          return (
            <div className="table-cell__container">
              <div className="result-cell">
                <span className="cell-number">
                  {params[1].quantity} {params[1].unitOfMeasure?.name}
                </span>
              </div>
            </div>
          );
        },
      },
      {
        title: (
          <div className="table-cell__header">
            {translate("purchaseRequests.purchaseRequestContent.unitPrice")}
          </div>
        ),
        width: 170,
        key: nameof(model.purchaseRequestContents[0].unitPrice),
        dataIndex: nameof(model.purchaseRequestContents[0].unitPrice),
        render: (...params: [number, PurchaseRequestContent, number]) => {
          return (
            <div className="table-cell__container">
              <div className="table-cell__row">
                <div className="row__left">
                  <span>
                    {formatNumber(params[1].exchangedUnitPrice)}{" "}
                    {params[1].exchangeCurrency?.code}
                  </span>
                </div>
                <div className="row__right">
                  <span>~{formatNumber(params[1].exchangeRate)}</span>
                </div>
              </div>
              <div className="result-cell">
                <span className="cell-number">
                  {formatNumber(params[1].unitPrice)}{" "}
                  <span>{params[1].exchangeCurrency?.code}</span>
                </span>
              </div>
            </div>
          );
        },
      },
      {
        title: (
          <div className="table-cell__header">
            {translate("purchaseRequests.purchaseRequestContent.subTotal")}
          </div>
        ),
        width: 170,
        key: nameof(model.purchaseRequestContents[0].subTotal),
        dataIndex: nameof(model.purchaseRequestContents[0].subTotal),
        render: (...params: [number, PurchaseRequestContent, number]) => {
          return (
            <div className="table-cell__container">
              <div className="result-cell">
                <span className="cell-number">
                  {formatNumber(params[1].exchangedSubTotal)}{" "}
                  <span>{params[1].exchangeCurrency?.code}</span>
                </span>
              </div>
              <div className="result-cell">
                <span className="cell-number">
                  {formatNumber(params[1].subTotal)}{" "}
                  <span>{model.mainCurrency?.code}</span>
                </span>
              </div>
            </div>
          );
        },
      },
      {
        title: (
          <div className="table-cell__header">
            {translate("purchaseRequests.purchaseRequestContent.taxAmount")}
          </div>
        ),
        width: 170,
        key: nameof(model.purchaseRequestContents[0].taxAmount),
        dataIndex: nameof(model.purchaseRequestContents[0].taxAmount),
        render: (...params: [number, PurchaseRequestContent, number]) => {
          return (
            <div className="table-cell__header">
              <span>{params[1].taxType.name}</span>
              <div className="result-cell">
                <span className="cell-number">
                  {formatNumber(params[1].taxAmount)}{" "}
                  <span>{model.mainCurrency?.code}</span>
                </span>
              </div>
            </div>
          );
        },
      },
      {
        title: (
          <div className="table-cell__header">
            {translate("purchaseRequests.purchaseRequestContent.total")}
          </div>
        ),
        width: 180,
        key: nameof(model.purchaseRequestContents[0].total),
        dataIndex: nameof(model.purchaseRequestContents[0].total),
        render: (...params: [number, PurchaseRequestContent, number]) => {
          return (
            <div className="table-cell__container">
              <div className="result-cell">
                <span className="cell-number">
                  {formatNumber(params[1].exchangedTotal)}{" "}
                  <span>{params[1].mainCurrency?.code}</span>
                </span>
              </div>
              <div className="result-cell">
                <span className="cell-number">
                  {formatNumber(params[1].total)}{" "}
                  <span>{model.mainCurrency?.code}</span>
                </span>
              </div>
            </div>
          );
        },
      },
    ];
  }, [model, translate]);

  return (
    <>
      <div className="page page__detail page__detail--approve">
        <div className="page__header d-flex align-items-center">
          <div className="page__title mr-1">
            {/* {translate("purchaseRequests.detail.title")} */}
            {model.code}
          </div>
        </div>
        <div className="w-100 page__detail-tabs">
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col lg={18} className="gutter-row">
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
                  header={"Thông tin chi tiết"}
                  key="1"
                  className="site-collapse-custom-panel"
                >
                  <Row justify="space-between">
                    <Col span={6}>
                      <div className="general-field__container">
                        <div className="general-field__first-row">
                          <span>{translate("purchaseRequests.requestor")}</span>
                        </div>
                        <div className="general-field__second-row mt-1">
                          <img
                            src={model.requestor?.avatar}
                            className="general-field__circle-image"
                            alt="IMG"
                          />
                          <span>{model.requestor?.displayName}</span>
                        </div>
                      </div>
                    </Col>
                    <Col span={6}>
                      <div className="general-field__container">
                        <div className="general-field__first-row">
                          <span>
                            {translate("purchaseRequests.requestedAt")}
                          </span>
                        </div>
                        <div className="general-field__second-row mt-1">
                          <span>
                            {model.requestedAt
                              ? formatDate(model.requestedAt)
                              : null}
                          </span>
                        </div>
                      </div>
                    </Col>
                    <Col span={6}>
                      <div className="general-field__container">
                        <div className="general-field__first-row">
                          <span>
                            {translate("purchaseRequests.requestOrganization")}
                          </span>
                        </div>
                        <div className="general-field__second-row mt-1">
                          <span>{model.requestOrganization?.name}</span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={16}>
                      <div className="general-field__container">
                        <div className="general-field__first-row">
                          <span>
                            {translate("purchaseRequests.description")}
                          </span>
                        </div>
                        <div className="general-field__second-row mt-1">
                          <div>{model.description}</div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row justify="space-between">
                    <Col span={8}>
                      <div className="general-field__container">
                        <div className="general-field__first-row">
                          <span>
                            {translate(
                              "purchaseRequests.purchaseRequestFileMappings"
                            )}
                          </span>
                        </div>
                        <div className="general-field__second-row mt-2">
                          <Badge count={model.purchaseRequestFileMappings ? model.purchaseRequestFileMappings.length : 0}>
                            <div className="attach-file__button" onClick={handleOpenFileModal}>
                              <span>
                                <i className="tio-attachment_diagonal"></i>{" "}
                                {translate(
                                  "purchaseRequests.purchaseRequestFileMappings"
                                )}
                              </span>
                            </div>
                          </Badge>
                        </div>
                      </div>
                    </Col>
                    <Col span={5}>
                      <div className="total__container">
                        <div className="total__first-row">
                          <div className="row__title">Thành tiền:</div>
                          <div className="row__value">
                            {formatNumber(model.subTotal)}
                            <span>&nbsp;{model.mainCurrency?.code}</span>
                          </div>
                        </div>
                        <div className="total__second-row">
                          <div className="row__title">Thuế:</div>
                          <div className="row__value">
                            {formatNumber(model.taxAmount)}
                            <span>&nbsp;{model.mainCurrency?.code}</span>
                          </div>
                        </div>
                        <div className="total__third-row">
                          <div className="row__title">Tổng tiền:</div>
                          <div className="row__value">
                            {formatNumber(model.total)}
                            <span>&nbsp;{model.mainCurrency?.code}</span>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col span={24}>
                      <Table
                        rowKey={nameof(model.purchaseRequestContents[0].id)}
                        pagination={false}
                        dataSource={model.purchaseRequestContents}
                        columns={purchaseRequestContentColumns}
                        scroll={{ y: 500 }}
                      ></Table>
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col span={12}>
                      <div className="d-flex">
                        <div className="category__title">
                          {translate("purchaseRequests.category")}:{" "}
                        </div>
                        <div className="category__content ml-2 d-flex align-items-center">
                          {model.categoryAncestors &&
                            model.categoryAncestors.map(
                              (currentCategory, index) => (
                                <span className="category__item" key={index}>
                                  {currentCategory.name}
                                  {index <
                                    model.categoryAncestors.length - 1 && (
                                      <i className="tio-chevron_right"></i>
                                    )}
                                </span>
                              )
                            )}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Collapse.Panel>
              </Collapse>
              {/* <Collapse
                defaultActiveKey={["1"]}
                onChange={() => {}}
                expandIcon={({ isActive }) => (
                  <CaretRightOutlined rotate={isActive ? 90 : 0} />
                )}
                className="site-collapse-custom-collapse"
                expandIconPosition="right"
              >
                <Collapse.Panel
                  header={"Sản phẩm"}
                  key="1"
                  className="site-collapse-custom-panel"
                >
                  <Row>
                    <Col span={24}>
                      <div className="purchase-order__container">
                        <div className="purchase-order__item">
                          <div className="item__left-side">
                            <div className="left-side__icon mr-2">
                              <i className="tio-document_outlined"></i>
                            </div>
                            <div className="left-side__content">
                              <span className="content__first-row">
                                Phương án mua sắm
                              </span>
                              <span className="content__second-row">
                                PAMS-0000001
                              </span>
                            </div>
                          </div>
                          <div className="item__right-side">
                            <img src={model.requestor?.avatar} alt="IMG" className="mr-5" />
                            <Tag color="gold" className="mr-5">Chờ duyệt</Tag>
                            <span className="right-side__text">14/03/2021</span>
                          </div>
                        </div>
                        <div className="purchase-order__item">
                          <div className="item__left-side">
                            <div className="left-side__icon mr-2">
                              <i className="tio-document_outlined"></i>
                            </div>
                            <div className="left-side__content">
                              <span className="content__first-row">
                                Phương án mua sắm
                              </span>
                              <span className="content__second-row">
                                PAMS-0000001
                              </span>
                            </div>
                          </div>
                          <div className="item__right-side">
                            <img src={model.requestor?.avatar} alt="IMG" className="mr-5" />
                            <Tag color="green" className="mr-5">Hoàn thành</Tag>
                            <span className="right-side__text">14/03/2021</span>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Collapse.Panel>
              </Collapse> */}
            </Col>
            <Col lg={6} className="gutter-row">
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
                      header={"Thông tin nhận hàng"}
                      key="1"
                      className="site-collapse-custom-panel"
                    >
                      <Row>
                        <Col lg={24} className="mb-3">
                          <div className="general-field__container">
                            <div className="general-field__first-row">
                              <span>
                                {translate("purchaseRequests.recipient")}
                              </span>
                            </div>
                            <div className="general-field__second-row mt-1">
                              <img
                                src={model.recipient?.avatar}
                                className="general-field__circle-image"
                                alt="IMG"
                              />
                              <span>{model.recipient?.displayName}</span>
                            </div>
                          </div>
                        </Col>
                        <Col lg={24} className="mb-3">
                          <div className="general-field__container">
                            <div className="general-field__first-row">
                              <span>
                                {translate("purchaseRequests.expectedAt")}
                              </span>
                            </div>
                            <div className="general-field__second-row mt-1">
                              <span>
                                {model.expectedAt
                                  ? formatDate(model.expectedAt)
                                  : null}
                              </span>
                            </div>
                          </div>
                        </Col>
                        <Col lg={24} className="mb-3">
                          <div className="general-field__container">
                            <div className="general-field__first-row">
                              <span>
                                {translate("purchaseRequests.recipientAddress")}
                              </span>
                            </div>
                            <div className="general-field__second-row mt-1">
                              <span>{model.recipientAddress}</span>
                            </div>
                          </div>
                        </Col>
                        <Col lg={24} className="mb-3">
                          <div className="general-field__container">
                            <div className="general-field__first-row">
                              <span>
                                {translate(
                                  "purchaseRequests.recipientPhoneNumber"
                                )}
                              </span>
                            </div>
                            <div className="general-field__second-row mt-1">
                              <span>{model.recipientPhoneNumber}</span>
                            </div>
                          </div>
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
                    className="site-collapse-custom-collapse"
                    expandIconPosition="right"
                    expandIcon={({ isActive }) => (
                      <CaretRightOutlined rotate={isActive ? 90 : 0} />
                    )}
                  >
                    <Collapse.Panel
                      header={"Lịch sử"}
                      key="1"
                      className="site-collapse-custom-panel"
                    >
                      <Row>
                        <Steps direction="vertical" size="small" current={1}>
                          <Steps.Step
                            title="Finished"
                            description="This is a description."
                          />
                          <Steps.Step
                            title="In Progress"
                            description="This is a description."
                          />
                          <Steps.Step
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
                      className="site-collapse-custom-panel"
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
                            userInfo={user}
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
        childrenStep={childrenStep}
        childrenAction={childrenAction}
      ></AppFooter>
      <PurchaseRequestFileMappingModal
        visibleDialog={openFileModal}
        files={files}
        onCancelDialog={handleCloseFileModal}
        isViewMode={true}
      />
      {isOpen &&
        <PurchaseRequestWorkflowHistoryModal
          isOpen={isOpen}
          handleCloseHistory={handleCloseHistory}
          model={model}
        />
      }
    </>
  );
}

export default PurchaseRequestApprove;
