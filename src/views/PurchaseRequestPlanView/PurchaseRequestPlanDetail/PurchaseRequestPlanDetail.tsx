/* begin general import */
import { CaretRightOutlined } from "@ant-design/icons";
import { Badge, Col, Collapse, Row, Steps } from "antd";
import { AppStoreContext } from "app/app-context";
import { AppAction, AppState } from "app/app-store";
import AppFooter from "components/AppFooter/AppFooter";
import ChatBox from "components/Utility/ChatBox/ChatBox";
import FormItem from "components/Utility/FormItem/FormItem";
/* end general import */
/* begin individual import */
import InputText from "components/Utility/Input/InputText/InputText";
import Select from "components/Utility/Select/Select";
import SwitchStatus from "components/Utility/SwitchStatus/SwitchStatus";
import { TreeList } from "components/Utility/TreeList/TreeList";
import TreeSelect from "components/Utility/TreeSelect/TreeSelect";
import { PURCHASE_REQUEST_PLAN_MASTER_ROUTE } from "config/route-consts";
import { OrganizationFilter } from "models/Organization";
import { PurchaseRequestPlan } from "models/PurchaseRequestPlan";
import { Status, StatusFilter } from "models/Status";
import React, { Dispatch, useContext } from "react";
import { useTranslation } from "react-i18next";
import { appUserRepository } from "repositories/app-user-repository";
import { discussionRepository } from "repositories/discussion-repository";
import { purchaseRequestPlanRepository } from "repositories/purchase-request-plan-repository";
import { enumService } from "services/enum-service";
import { formService } from "services/form-service";
import { importExportDataService } from "services/import-export-data-service";
import detailService from "services/pages/detail-service";
import nameof from "ts-nameof.macro";
import {
  buildTreeItem,
  usePurchaseRequetPlanDraft,
} from "./PurchaseRequestPlanDetailHook/PurchaseRequestPlanDetailHook";
import {
  PurchaseRequestPlanFileMappingModal,
  usePurchaseRequestPlanFileMapping,
} from "./PurchaseRequestPlanDetailHook/PurchaseRequestPlanFileMappingHook";
import { usePurchaseRequestPlanFooter } from "./PurchaseRequestPlanDetailHook/PurchaseRequestPlanFooterHook";
import "./PurchaseRequestPlanDetail.scss";
/* end individual import */

const { Step } = Steps;

function PurchaseRequestPlanDetail() {
  const [translate] = useTranslation();

  const [state] = useContext<[AppState, Dispatch<AppAction>]>(AppStoreContext);

  const [statusList] = enumService.useEnumList<Status>(
    purchaseRequestPlanRepository.singleListStatus
  );

  const { user } = useContext<[AppState, Dispatch<AppAction>]>(
    AppStoreContext
  )[0];

  const initData = React.useMemo(() => {
    const dataConfiguration = JSON.parse(
      localStorage.getItem("dataConfiguration")
    );
    const model = new PurchaseRequestPlan();
    if (dataConfiguration) {
      model.mainCurrency = dataConfiguration._DEFAULT_MAIN_CURRENCY;
      model.mainCurrencyId = dataConfiguration._DEFAULT_MAIN_CURRENCY_ID;
    }
    if (user) {
      model.organization = user.organization ? { ...user.organization } : null;
      model.organizationId = user.organizationId;
    }
    return model;
  }, [user]);

  const {
    model,
    handleUpdateNewModel,
    isDetail,
    handleChangeSimpleField,
    handleChangeTreeObjectField,
    handleChangeObjectField,
    handleChangeMappingField,
    handleGoBase,
  } = detailService.useDetail<PurchaseRequestPlan>(
    PurchaseRequestPlan,
    purchaseRequestPlanRepository.get,
    purchaseRequestPlanRepository.save,
    PURCHASE_REQUEST_PLAN_MASTER_ROUTE,
    initData
  );

  usePurchaseRequetPlanDraft<PurchaseRequestPlan>(
    purchaseRequestPlanRepository.getDraft,
    initData,
    handleUpdateNewModel
  );

  const [treeDataList] = buildTreeItem(model?.purchaseRequestPlanContents);

  const {
    files,
    openFileModal,
    isLoadingFile,
    handleChangeFile,
    handleCloseFileModal,
    handleOpenFileModal,
    handleDeleteFile,
  } = usePurchaseRequestPlanFileMapping(
    model,
    nameof("purchaseRequestPlanFileMappings"),
    purchaseRequestPlanRepository.multiUpload,
    handleChangeMappingField,
    handleChangeSimpleField
  );

  const { childrenAction, childrenStep } = usePurchaseRequestPlanFooter(
    translate,
    model,
    handleUpdateNewModel,
    handleGoBase
  );

  const {
    ref,
    handleClick,
    handleImportTreeContentList,
  } = importExportDataService.useImport(
    handleUpdateNewModel,
    model,
    "purchaseRequestPlanContents"
  );

  const {
    handleContentExport,
    handleContentExportTemplate,
  } = importExportDataService.useExport();

  return (
    <>
      <div className="page page__detail purchase-request-plan__container">
        <div className="page__header d-flex align-items-center">
          {isDetail ? (
            <div className="page__title mr-1">
              {translate("purchaseRequestPlans.detail.title")}
            </div>
          ) : (
            translate("general.actions.create")
          )}
        </div>
        <div className="w-100 page__detail-tabs">
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col lg={18} className="gutter-row">
              <Row>
                <Col lg={24}>
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
                      header={translate("general.detail.generalInfomation")}
                      key="1"
                      className="site-collapse-custom-panel"
                    >
                      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col lg={8} className="gutter-row">
                          <FormItem
                            label={translate("purchaseRequestPlans.code")}
                            validateStatus={formService.getValidationStatus<
                              PurchaseRequestPlan
                            >(model.errors, nameof(model.code))}
                            message={model.errors?.code}
                          >
                            <InputText
                              isMaterial={true}
                              value={model.code}
                              placeHolder={translate(
                                "purchaseRequestPlans.placeholder.code"
                              )}
                              className={"tio-blocked"}
                              onBlur={handleChangeSimpleField(
                                nameof(model.code)
                              )}
                              disabled
                            />
                          </FormItem>
                        </Col>
                        <Col lg={8} className="gutter-row">
                          <FormItem
                            label={translate("purchaseRequestPlans.name")}
                            validateStatus={formService.getValidationStatus<
                              PurchaseRequestPlan
                            >(model.errors, nameof(model.name))}
                            message={model.errors?.name}
                            isRequired={true}
                          >
                            <InputText
                              isMaterial={true}
                              value={model.name}
                              placeHolder={translate(
                                "purchaseRequestPlans.placeholder.name"
                              )}
                              className={"tio-document_text_outlined"}
                              onBlur={handleChangeSimpleField(
                                nameof(model.name)
                              )}
                            />
                          </FormItem>
                        </Col>
                        <Col lg={8} className="gutter-row">
                          <FormItem
                            label={translate(
                              "purchaseRequestPlans.organization"
                            )}
                            validateStatus={formService.getValidationStatus<
                              PurchaseRequestPlan
                            >(model.errors, nameof(model.organization))}
                            message={model.errors?.organizationId}
                            isRequired={true}
                          >
                            <TreeSelect
                              isMaterial={true}
                              placeHolder={translate(
                                "purchaseRequestPlans.placeholder.organization"
                              )}
                              selectable={true}
                              classFilter={OrganizationFilter}
                              onChange={handleChangeTreeObjectField(
                                nameof(model.organization)
                              )}
                              checkStrictly={true}
                              getTreeData={
                                purchaseRequestPlanRepository.singleListOrganization
                              }
                              item={model.organization}
                            />
                          </FormItem>
                        </Col>
                        <Col lg={16} className="gutter-row mt-3">
                          <FormItem
                            label={translate(
                              "purchaseRequestPlans.description"
                            )}
                            validateStatus={formService.getValidationStatus<
                              PurchaseRequestPlan
                            >(model.errors, nameof(model.description))}
                            message={model.errors?.description}
                          >
                            <InputText
                              isMaterial={true}
                              value={model.description}
                              placeHolder={translate(
                                "purchaseRequestPlans.placeholder.description"
                              )}
                              className={"tio-comment_text_outlined"}
                              onBlur={handleChangeSimpleField(
                                nameof(model.description)
                              )}
                            />
                          </FormItem>
                        </Col>
                        <Col lg={8} className="gutter-row mt-3">
                          <FormItem
                            label={translate("purchaseRequestPlans.yearKey")}
                            validateStatus={formService.getValidationStatus<
                              PurchaseRequestPlan
                            >(model.errors, nameof(model.yearKey))}
                            message={model.errors?.yearKeyId}
                            isRequired={true}
                          >
                            <Select
                              isMaterial={true}
                              classFilter={StatusFilter}
                              placeHolder={translate(
                                "purchaseRequestPlans.placeholder.yearKey"
                              )}
                              getList={
                                purchaseRequestPlanRepository.singleListYearKey
                              }
                              onChange={handleChangeObjectField(
                                nameof(model.yearKey)
                              )}
                              model={model.yearKey}
                            />
                          </FormItem>
                        </Col>
                        <Col lg={16} className="gutter-row mt-3">
                          <Badge
                            count={
                              model.purchaseRequestPlanFileMappings
                                ? model.purchaseRequestPlanFileMappings.length
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
                                  "purchaseRequestPlans.purchaseRequestPlanFileMappings"
                                )}
                              </span>
                            </div>
                          </Badge>
                        </Col>
                        <Col lg={8} className="gutter-row mt-3">
                          <FormItem
                            validateStatus={formService.getValidationStatus<
                              PurchaseRequestPlan
                            >(model.errors, nameof(model.status))}
                            message={model.errors?.status}
                          >
                            <SwitchStatus
                              checked={
                                model.statusId === statusList[1]?.id
                                  ? true
                                  : false
                              }
                              list={statusList}
                              onChange={handleChangeObjectField(
                                nameof(model.status)
                              )}
                            />
                            <span className="component__title ml-2">
                              {translate("purchaseRequestPlans.status")}
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
                    onChange={() => {}}
                    expandIcon={({ isActive }) => (
                      <CaretRightOutlined rotate={isActive ? 90 : 0} />
                    )}
                    className="site-collapse-custom-collapse"
                    expandIconPosition="right"
                  >
                    <Collapse.Panel
                      header={translate("general.detail.plan")}
                      key="1"
                      className="site-collapse-custom-panel"
                    >
                      <div className="page__master-table mt-4">
                        <div className="content-action mb-3">
                          <div>
                            <label
                              className="mb-0 grow-animate-2"
                              htmlFor="master-import-store"
                            >
                              <i className="tio-sign_in mr-2" />
                              {translate("Nhập excel")}
                            </label>
                            <button
                              className="btn grow-animate-2"
                              onClick={handleContentExport(
                                model,
                                purchaseRequestPlanRepository.exportContent
                              )}
                            >
                              <i className="tio-sign_out" />
                              {translate("Xuất excel")}
                            </button>
                          </div>
                          <button
                            className="btn btn-download grow-animate-2"
                            onClick={handleContentExportTemplate(
                              model,
                              purchaseRequestPlanRepository.exportTemplateContent
                            )}
                          >
                            {translate("Tải file mẫu")}
                          </button>
                        </div>

                        <TreeList
                          tree={treeDataList}
                          isBorder={true}
                          editMode={true}
                          model={model}
                          handleUpdateNewModel={handleUpdateNewModel}
                          placeHolder={translate(
                            "purchaseRequestPlans.placeholder.quota"
                          )}
                        />
                      </div>
                    </Collapse.Panel>
                  </Collapse>
                </Col>
              </Row>
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
      <PurchaseRequestPlanFileMappingModal
        visibleDialog={openFileModal}
        files={files}
        isLoadingFile={isLoadingFile}
        handleChangeFile={handleChangeFile}
        onCancelDialog={handleCloseFileModal}
        handleDeleteFile={handleDeleteFile}
      />
      <AppFooter
        childrenAction={childrenAction}
        childrenStep={childrenStep}
      ></AppFooter>
      {/* input import file */}
      <input
        ref={ref}
        type="file"
        className="invisible"
        id="master-import-store"
        onChange={handleImportTreeContentList(
          purchaseRequestPlanRepository.importContent
        )}
        onClick={handleClick}
      />
    </>
  );
}

export default PurchaseRequestPlanDetail;
