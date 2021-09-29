/* begin general import */
import { CaretRightOutlined } from "@ant-design/icons";
import { Badge, Col, Collapse, Row, Steps } from "antd";
import Table, { ColumnProps } from "antd/lib/table";
import { AppStoreContext } from "app/app-context";
import { AppAction, AppState } from "app/app-store";
import ChatBox from "components/Utility/ChatBox/ChatBox";
import { formatNumber } from "helpers/number";
import { Category } from "models/Category";
/* end general import */
/* begin individual import */
import { PurchaseRequestPlan } from "models/PurchaseRequestPlan";
import { PurchaseRequestPlanContent } from "models/PurchaseRequestPlanContent";
import React, { Dispatch, useContext } from "react";
import { useTranslation } from "react-i18next";
import { appUserRepository } from "repositories/app-user-repository";
import { discussionRepository } from "repositories/discussion-repository";
import { purchaseRequestPlanRepository } from "repositories/purchase-request-plan-repository";
import masterService from "services/pages/master-service";
import nameof from "ts-nameof.macro";
import "./PurchaseRequestPlanApprove.scss";
import {
  PurchaseRequestPlanFileMappingModal,
  usePurchaseRequestPlanFileMapping,
} from "./PurchaseRequestPlanDetailHook/PurchaseRequestPlanFileMappingHook";
/* end individual import */

function PurchaseRequestPlanApprove() {
  const [translate] = useTranslation();

  const { user } = useContext<[AppState, Dispatch<AppAction>]>(
    AppStoreContext
  )[0];

  const { model } = masterService.usePreviewPage(
    PurchaseRequestPlan,
    purchaseRequestPlanRepository.get
  );

  const {
    files,
    openFileModal,
    handleCloseFileModal,
    handleOpenFileModal,
  } = usePurchaseRequestPlanFileMapping(
    model,
    nameof("purchaseRequestPlanFileMappings")
  );

  const purchaseRequestPlanContentColumns: ColumnProps<
    PurchaseRequestPlanContent
  >[] = React.useMemo(() => {
    return [
      {
        title: (
          <div className="table-cell__header">
            {translate(
              "purchaseRequestPlans.purchaseRequestPlanContent.category"
            )}
          </div>
        ),
        width: 180,
        key: nameof(model.purchaseRequestPlanContents[0].category),
        dataIndex: nameof(model.purchaseRequestPlanContents[0].category),
        render: (...params: [Category, PurchaseRequestPlanContent, number]) => {
          return (
            <div className="table-cell__item">
              <div className="item-code__image">
                {params[0]?.image?.url && (
                  <img
                    src={params[0]?.image?.url}
                    alt=""
                    width={50}
                    height={50}
                  />
                )}
                {!params[0]?.image?.url && (
                  <img
                    src={require("../../../assets/images/default-category.svg")}
                    alt=""
                    width={50}
                    height={50}
                  />
                )}
              </div>
              <div className="ml-3">
                <div className="item-name__text">{params[0].name}</div>
                <div className="item-code__text">{params[0].code}</div>
              </div>
            </div>
          );
        },
      },
      {
        title: (
          <div className="table-cell__header">
            {translate("purchaseRequestPlans.purchaseRequestPlanContent.level")}
          </div>
        ),
        width: 150,
        key: nameof(model.purchaseRequestPlanContents[0].level),
        dataIndex: nameof(model.purchaseRequestPlanContents[0].level),
        render: (...params: [number, PurchaseRequestPlanContent, number]) => {
          return (
            <div className="table-cell__container">
              <div className="result-cell">
                <span className="cell-number">{params[1].category.level}</span>
              </div>
            </div>
          );
        },
      },
      {
        title: (
          <div className="table-cell__header">
            {translate("purchaseRequestPlans.purchaseRequestPlanContent.quota")}
          </div>
        ),
        width: 170,
        key: nameof(model.purchaseRequestPlanContents[0].quota),
        dataIndex: nameof(model.purchaseRequestPlanContents[0].quota),
        align: "right",
        render: (...params: [number, PurchaseRequestPlanContent, number]) => {
          return (
            <div className="table-cell__container">
              <div className="result-cell">
                <span className="cell-number">
                  {formatNumber(params[1].quota)}
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
      <div className="page page__detail page__detail--approve purchase-request-plan__approve">
        <div className="page__header d-flex align-items-center">
          <div className="page__title mr-1">
            {translate("purchaseRequestPlans.master.title")}
          </div>
        </div>
        <div className="w-100 page__detail-tabs">
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col lg={18} className="gutter-row">
              <Collapse
                defaultActiveKey={["1"]}
                onChange={() => {}}
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
                          <span>{translate("purchaseRequestPlans.name")}</span>
                        </div>
                        <div className="general-field__second-row mt-1">
                          <div>{model.name}</div>
                        </div>
                      </div>
                    </Col>
                    <Col span={6}>
                      <div className="general-field__container">
                        <div className="general-field__first-row">
                          <span>
                            {translate("purchaseRequestPlans.yearKey")}
                          </span>
                        </div>
                        <div className="general-field__second-row mt-1">
                          <span>{model.yearKey?.name}</span>
                        </div>
                      </div>
                    </Col>
                    <Col span={6}>
                      <div className="general-field__container">
                        <div className="general-field__first-row">
                          <span>
                            {translate("purchaseRequestPlans.organization")}
                          </span>
                        </div>
                        <div className="general-field__second-row mt-1">
                          <span>{model.organization?.name}</span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row justify="space-between">
                    <Col span={16}>
                      <div className="general-field__container">
                        <div className="general-field__first-row">
                          <span>
                            {translate("purchaseRequestPlans.description")}
                          </span>
                        </div>
                        <div className="general-field__second-row mt-1">
                          <div>{model.description}</div>
                        </div>
                      </div>
                    </Col>
                    <Col span={6}>
                      <div className="general-field__container">
                        <div className="general-field__first-row">
                          <span>
                            {translate("purchaseRequestPlans.creator")}
                          </span>
                        </div>
                        <div className="general-field__second-row mt-1">
                          <img
                            src={model.creator?.avatar}
                            className="general-field__circle-image"
                            alt="IMG"
                          />
                          <span>{model.creator?.displayName}</span>
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
                              "purchaseRequestPlans.purchaseRequestPlanFileMappings"
                            )}
                          </span>
                        </div>
                        <div className="general-field__second-row mt-2">
                          <Badge
                            count={
                              model.purchaseRequestPlanFileMappings
                                ? model.purchaseRequestPlanFileMappings.length
                                : 0
                            }
                          >
                            <div
                              className="attach-file__button disabled-for-preview"
                              onClick={handleOpenFileModal}
                            >
                              <span>
                                <i className="tio-attachment_diagonal"></i>{" "}
                                {translate(
                                  "purchaseRequestPlans.purchaseRequestPlanFileMappings"
                                )}
                              </span>
                            </div>
                          </Badge>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col span={24}>
                      <Table
                        rowKey={nameof(
                          model.purchaseRequestPlanContents[0].categoryId
                        )}
                        pagination={false}
                        dataSource={model.purchaseRequestPlanContents}
                        columns={purchaseRequestPlanContentColumns}
                        scroll={{ y: 500 }}
                      ></Table>
                    </Col>
                  </Row>
                  {/* <Row className="mt-4">
                    <Col span={12}>
                      <div className="d-flex">
                        <div className="category__title">
                          {translate("purchaseRequestPlans.category")}:{" "}
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
                  </Row> */}
                </Collapse.Panel>
              </Collapse>
            </Col>
            <Col lg={6} className="gutter-row">
              <Row>
                <Col lg={24}>
                  <Collapse
                    defaultActiveKey={["1"]}
                    onChange={() => {}}
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
                    onChange={() => {}}
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
      <PurchaseRequestPlanFileMappingModal
        visibleDialog={openFileModal}
        files={files}
        onCancelDialog={handleCloseFileModal}
        isViewMode={true}
      />
    </>
  );
}

export default PurchaseRequestPlanApprove;
