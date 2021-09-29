/* begin general import */
import { CaretRightOutlined } from "@ant-design/icons";
import { Badge, Col, Collapse, Row, Steps, Tag, Tooltip } from "antd";
import Table, { ColumnProps } from "antd/lib/table";
import { AppStoreContext } from "app/app-context";
import { AppAction, AppState } from "app/app-store";
import classNames from "classnames";
import AppFooter from "components/AppFooter/AppFooter";
import ChatBox from "components/Utility/ChatBox/ChatBox";
import { PURCHASE_REQUEST_PRINCIPAL_CONTRACT_ROUTE } from "config/route-consts";
import { formatDate } from "helpers/date-time";
import { formatNumber } from "helpers/number";
import { Item } from "models/Item";
import { PurchasePlan, PurchasePlanFilter } from "models/PurchasePlan";
/* end general import */
/* begin individual import */
import { PurchaseRequest } from "models/PurchaseRequest";
import { PurchaseRequestContent } from "models/PurchaseRequestContent";
import React, { Dispatch, useContext } from "react";
import { useTranslation } from "react-i18next";
import { appUserRepository } from "repositories/app-user-repository";
import { discussionRepository } from "repositories/discussion-repository";
import { purchaseRequestPrincipalContractRepository } from "repositories/purchase-request-principal-contract-repository";
import appMessageService from "services/app-message-service";
import masterService from "services/pages/master-service";
import { routerService } from "services/route-service";
import nameof from "ts-nameof.macro";
import { PurchaseRequestPCWorkflowHistoryModal, usePurchaseRequestPCWorkflowHistory } from "../PurchaseRequestPrincipalContractDetail/PurchaseRequestPrincipalContractDetailHook/PurchaseRequestPCWorkflowHistoryHook";
import { PurchaseRequestPrincipalContractFileMappingModal, usePurchaseRequestPrincipalContractFileMapping } from "../PurchaseRequestPrincipalContractDetail/PurchaseRequestPrincipalContractDetailHook/PurchaseRequestPrincipalContractFileMappingHook";
import "./PurchaseRequestPrincipalContractPreview.scss";
/* end individual import */

function PurchaseRequestPrincipalContractPreview() {
  const [translate] = useTranslation();
  const [listPurchasePlan, setListPurchasePlan] = React.useState<PurchasePlan[]>([]);


  const { user } = useContext<[AppState, Dispatch<AppAction>]>(
    AppStoreContext
  )[0];

  const [, , , handleGoBase] = routerService.useMasterNavigation(
    PURCHASE_REQUEST_PRINCIPAL_CONTRACT_ROUTE
  );

  const { model } = masterService.usePreviewPage(
    PurchaseRequest,
    purchaseRequestPrincipalContractRepository.get
  );

  const {
    files,
    openFileModal,
    handleCloseFileModal,
    handleOpenFileModal,
  } = usePurchaseRequestPrincipalContractFileMapping(
    model,
    nameof("purchaseRequestFileMappings")
  );
  const {
    notifyUpdateItemSuccess,
    notifyUpdateItemError,
  } = appMessageService.useCRUDMessage();
  React.useEffect(() => {
    if (model.purchaseRequestStatusId === 2) {
      const purchasePlanFilter = new PurchasePlanFilter();
      purchasePlanFilter.purchaseRequestId.equal = model.id;
      purchaseRequestPrincipalContractRepository.listPurchasePlan(purchasePlanFilter)
        .subscribe(res => { setListPurchasePlan(res); });
    }
  }, [setListPurchasePlan, model.id, model.purchaseRequestStatusId]);
  const currentStep = React.useMemo(() => {
    if (model.purchaseRequestStatusId === 2) {
      return 4;

    } else {
      if (model.requestStateId === 4) return 1;
      else return model.requestStateId;
    }

  }, [model]);
  const handlePrint = React.useCallback(() => {
    purchaseRequestPrincipalContractRepository.print(model).subscribe(
      () => {
        notifyUpdateItemSuccess();
      },
      (err) => {
        notifyUpdateItemError();
      }
    );

  }, [model, notifyUpdateItemError, notifyUpdateItemSuccess]);
  const renderColor = React.useMemo(() => {
    return (purchasePlanStatusId) => {
      switch (purchasePlanStatusId) {
        case 1: return 'default';
        case 2: return 'gold';
        case 3: return 'green';
        case 4: return 'geekblue';
      };
    };

  }, []);
  const {
    isOpen,
    handleCloseHistory,
    handleOpenHistory,
  } = usePurchaseRequestPCWorkflowHistory(model);

  const childrenAction = React.useMemo(() => {
    return (
      <>

        {model.requestStateId === 3 &&
          <button
            className="btn btn__cancel mr-3"
            onClick={handlePrint}
          >
            <span>
              <i className="tio-print mr-2"></i>
              {translate("general.button.print")}
            </span>
          </button>
        }
        <button className="btn btn__cancel" onClick={handleGoBase}>
          <span>
            <i className="tio-clear_circle_outlined"></i>{" "}
            {translate("general.button.close")}
          </span>
        </button>
      </>
    );
  }, [model, translate, handlePrint, handleGoBase]);
  const childrenStep = React.useMemo(() => {
    return (
      <div className="d-flex justify-content-between" style={{ width: '60%' }}>
        <Steps current={currentStep} size="small" >
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
  }, [currentStep, handleOpenHistory, translate]);
  const purchaseRequestContentColumns: ColumnProps<
    PurchaseRequestContent
  >[] = React.useMemo(() => {
    return [
      {
        title: (
          <div className="table-cell__header">
            {translate("purchaseRequestPrincipalContracts.purchaseRequestContent.item")}
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
            {translate("purchaseRequestPrincipalContracts.purchaseRequestContent.quantity")}
          </div>
        ),
        width: 150,
        key: nameof(model.purchaseRequestContents[0].quantity),
        dataIndex: nameof(model.purchaseRequestContents[0].quantity),
        render: (...params: [number, PurchaseRequestContent, number]) => {
          return (
            <div className="table-cell__container">
              <div className="result-cell">
                <span className={classNames('cell-number',
                  { 'text-danger': !params[1].isPrincipalContractUnitOfMeasure }
                )
                }>
                  {params[1].quantity} {params[1].unitOfMeasure?.name}
                </span>
              </div>
            </div >
          );
        },
      },
      {
        title: (
          <div className="table-cell__header">
            {translate("purchaseRequestPrincipalContracts.purchaseRequestContent.unitPrice")}
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
                  <span className={!params[1]?.isPrincipalContractPrice ? 'text-danger' : ''}>
                    {formatNumber(params[1].exchangedUnitPrice)} {params[1].exchangeCurrency?.code}
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
            {translate("purchaseRequestPrincipalContracts.purchaseRequestContent.subTotal")}
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
            {translate("purchaseRequestPrincipalContracts.purchaseRequestContent.taxAmount")}
          </div>
        ),
        width: 170,
        key: nameof(model.purchaseRequestContents[0].taxAmount),
        dataIndex: nameof(model.purchaseRequestContents[0].taxAmount),
        render: (...params: [number, PurchaseRequestContent, number]) => {
          return (
            <div className="table-cell__header">
              <span className={!params[1].isPrincipalContractTaxType ? 'text-danger' : ''}>{params[1].taxType.name}</span>
              <div className="result-cell">
                <span className="cell-number">
                  {formatNumber(params[1].taxAmount)}{" "}
                  <span>{model.mainCurrency?.code}</span>
                </span>
              </div>
            </div >
          );
        },
      },
      {
        title: (
          <div className="table-cell__header">
            {translate("purchaseRequestPrincipalContracts.purchaseRequestContent.total")}
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
                  <span>{params[1].exchangeCurrency?.code}</span>
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
      <div className="page page__detail page__detail--preview">
        <div className="page__header d-flex align-items-center">
          <div className="page__title mr-1">
            {translate("purchaseRequestPrincipalContracts.detail.title")}
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
                          <span>{translate("purchaseRequestPrincipalContracts.requestor")}</span>
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
                            {translate("purchaseRequestPrincipalContracts.requestedAt")}
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
                            {translate("purchaseRequestPrincipalContracts.requestOrganization")}
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
                            {translate("purchaseRequestPrincipalContracts.description")}
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
                          <Badge
                            count={
                              model.purchaseRequestFileMappings
                                ? model.purchaseRequestFileMappings.length
                                : 0
                            }
                          >
                            <div
                              className="attach-file__button"
                              onClick={handleOpenFileModal}
                            >
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
                          {translate("purchaseRequestPrincipalContracts.category")}:{" "}
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
              {model.purchaseRequestStatusId === 2 &&
                <Row>
                  <Col lg={24}>
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
                        header="Phương án mua sắm"
                        key="1"
                        className="site-collapse-custom-panel"
                      >
                        <Row className="purchase-plan__list">
                          {listPurchasePlan && listPurchasePlan.length > 0 && listPurchasePlan.map(item =>
                            <Col span={24} key={item.id}>
                              <div className="purchase-plan__container">
                                <div className="purchase-plan__item">
                                  <div className="item__left-side">
                                    <div className="left-side__icon mr-2">
                                      <i className="tio-document_outlined"></i>
                                    </div>
                                    <div className="left-side__content">
                                      <span className="content__first-row">
                                        Phương án mua sắm
                                    </span>
                                      <span className="content__second-row">
                                        {item?.code}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="item__right-side">
                                    <img src={item?.creator?.avatar} alt="IMG" className="mr-5" />
                                    <Tag color={renderColor(item?.purchasePlanStatusId)} className="mr-3">{item?.purchasePlanStatus && item?.purchasePlanStatus?.name}</Tag>
                                    <span className="right-side__text">{item?.quotationExpectedAt && formatDate(item?.quotationExpectedAt)}</span>
                                  </div>
                                </div>

                              </div>
                            </Col>

                          )}
                        </Row>
                      </Collapse.Panel>
                    </Collapse>
                  </Col>
                </Row>

              }
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
                                {translate("purchaseRequestPrincipalContracts.recipient")}
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
                                {translate("purchaseRequestPrincipalContracts.expectedAt")}
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
                                {translate("purchaseRequestPrincipalContracts.recipientAddress")}
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
                                  "purchaseRequestPrincipalContracts.recipientPhoneNumber"
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
      <PurchaseRequestPrincipalContractFileMappingModal
        visibleDialog={openFileModal}
        files={files}
        onCancelDialog={handleCloseFileModal}
        isViewMode={true}
      />
      <PurchaseRequestPCWorkflowHistoryModal
        isOpen={isOpen}
        handleCloseHistory={handleCloseHistory}
        model={model}
      />
    </>
  );
}

export default PurchaseRequestPrincipalContractPreview;
