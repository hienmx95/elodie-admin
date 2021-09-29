/* begin general import */
import React, { Dispatch, useContext } from "react";
import { useTranslation } from "react-i18next";
import nameof from "ts-nameof.macro";
import { Badge, Col, Collapse, Row } from "antd";
import FormItem from "components/Utility/FormItem/FormItem";
import { formService } from "services/form-service";
import detailService from "services/pages/detail-service";
import { discussionRepository } from "repositories/discussion-repository";
import AppFooter from "components/AppFooter/AppFooter";
import { AppAction, AppState } from "app/app-store";
import { AppStoreContext } from "app/app-context";
import ChatBox from "components/Utility/ChatBox/ChatBox";
import "./PurchaseRequestDetail.scss";
import illutration from "./../../../assets/images/illutration-image/plan.jpg";
import supportImage from "./../../../assets/images/illutration-image/support.jpg";
/* end general import */

/* begin individual import */
import InputText from "components/Utility/Input/InputText/InputText";
import Select from "components/Utility/Select/Select";
import DatePicker from "components/Utility/Calendar/DatePicker/DatePicker";
import ContentTable from "components/Utility/ContentTable/ContentTable";
import TreeSelect from "components/Utility/TreeSelect/TreeSelect";
import { PurchaseRequest } from "models/PurchaseRequest";
import { PURCHASE_REQUEST_ROUTE } from "config/route-consts";
import { appUserRepository } from "repositories/app-user-repository";
import { purchaseRequestRepository } from "repositories/purchase-request-repository";
import { AppUser, AppUserFilter } from "models/AppUser";
import { OrganizationFilter } from "models/Organization";
import { usePurchaseRequestContentTable } from "./PurchaseRequestDetailHook/PurchaseRequestContentHook";
import { CaretRightOutlined } from "@ant-design/icons";
import { Steps } from "antd";
import { CategoryFilter } from "models/Category";
import {
  PurchaseRequestItemModal,
  usePurchaseRequestItem,
} from "./PurchaseRequestDetailHook/PurchaseRequestItemHook";
import { formatNumber } from "helpers/number";
import classNames from "classnames";
import moment from "moment";
import Modal from "components/Utility/Modal/Modal";
import { useCategoryConfirm } from "./PurchaseRequestDetailHook/CategoryConfirmHook";
import {
  PurchaseRequestFileMappingModal,
  usePurchaseRequestFileMapping,
} from "./PurchaseRequestDetailHook/PurchaseRequestFileMappingHook";
import { usePurchaseRequestFooter } from "./PurchaseRequestDetailHook/PurchaseRequestFooterHook";
import CategorySelect from "components/Utility/CategorySelect/CategorySelect";
import { queryStringService } from "services/query-string-service";
import { PurchaseRequestTemplate } from "models/PurchaseRequestTemplate";
import { PurchaseRequestWorkflowHistoryModal, usePurchaseRequestWorkflowHistory } from "./PurchaseRequestDetailHook/PurchaseRequestWorkflowHistoryHook";
/* end individual import */

const { Step } = Steps;

function PurchaseRequestDetail() {
  const [translate] = useTranslation();

  const [state] = useContext<[AppState, Dispatch<AppAction>]>(AppStoreContext);

  const { user } = useContext<[AppState, Dispatch<AppAction>]>(
    AppStoreContext
  )[0];
  const [purchaseRequestTemplate, setPurchaseRequestTemplate] = React.useState<
    PurchaseRequestTemplate
  >(new PurchaseRequestTemplate());
  const initData = React.useMemo(() => {
    const dataConfiguration = JSON.parse(
      localStorage.getItem("dataConfiguration")
    );
    const model = new PurchaseRequest();
    model.requestedAt = moment();
    if (dataConfiguration) {
      model.mainCurrency = dataConfiguration._DEFAULT_MAIN_CURRENCY;
      model.mainCurrencyId = dataConfiguration._DEFAULT_MAIN_CURRENCY_ID;
    }
    if (user) {
      model.requestor = { ...user };
      model.requestorId = user.id;
      model.requestOrganization = user.organization
        ? { ...user.organization }
        : null;
      model.requestOrganizationId = user.organizationId;
    }
    return model;
  }, [user]);
  const { id }: any = queryStringService.useGetQueryString(
    "purchaseRequestTemplateId"
  );

  const {
    model,
    handleUpdateNewModel,
    isDetail,
    handleChangeSimpleField,
    handleChangeTreeObjectField,
    handleChangeObjectField,
    handleChangeMappingField,
    handleSave,
    handleGoBase,
  } = detailService.useDetail<PurchaseRequest>(
    PurchaseRequest,
    purchaseRequestRepository.get,
    purchaseRequestRepository.save,
    PURCHASE_REQUEST_ROUTE,
    initData
  );
  const organizationFilter = React.useMemo(() => {
    const filter = new OrganizationFilter();
    filter.id.equal = model.requestorId ? model.requestor.organizationId : null;
    return filter;
  }, [model]);
  const handleChangeRequestor = React.useCallback(
    (valueId, valueObject) => {
      const newModel = { ...model };
      newModel.requestor = valueObject;
      newModel.requestorId = valueId;
      if (organizationFilter.id.equal !== valueId) {
        newModel.requestOrganization = undefined;
        newModel.requestOrganizationId = undefined;
      }
      handleUpdateNewModel(newModel);
    },
    [handleUpdateNewModel, model, organizationFilter]
  );

  React.useEffect(() => {
    if (id) {
      purchaseRequestRepository
        .getTemplate(id)
        .subscribe((item) => {
          handleUpdateNewModel(item.content);
          setPurchaseRequestTemplate(item);
        });
    }
  }, [id, handleUpdateNewModel]);

  const {
    files,
    openFileModal,
    isLoadingFile,
    handleChangeFile,
    handleCloseFileModal,
    handleOpenFileModal,
    handleDeleteFile,
  } = usePurchaseRequestFileMapping(
    model,
    nameof("purchaseRequestFileMappings"),
    purchaseRequestRepository.multiUpload,
    handleChangeMappingField,
    handleChangeSimpleField
  );

  const {
    purchaseRequestContentFilter,
    purchaseRequestContentContentColumns,
    purchaseRequestContentList,
    loadPurchaseRequestContentList,
    purchaseRequestContentTotal,
    handleAddPurchaseRequestContent,
    handlePurchaseRequestContentTableChange,
    handlePurchaseRequestContentPagination,
    canBulkDeletePurchaseRequestContent,
    handleLocalBulkDeletePurchaseRequestContent,
    purchaseRequestContentRef,
    handleClickPurchaseRequestContent,
    handleImportPurchaseRequestContent,
    handleExportPurchaseRequestContent,
    handleExportTemplatePurchaseRequestContent,
    handleChangeAllRowPurchaseRequestContent,
    totalItemValue,
  } = usePurchaseRequestContentTable(model, handleUpdateNewModel);

  const purchaseRequestContentTable = React.useMemo(
    () => (
      <ContentTable
        model={model}
        filter={purchaseRequestContentFilter}
        list={purchaseRequestContentList}
        loadingList={loadPurchaseRequestContentList}
        total={purchaseRequestContentTotal}
        handleTableChange={handlePurchaseRequestContentTableChange}
        rowSelection={null}
        handleLocalBulkDelete={handleLocalBulkDeletePurchaseRequestContent}
        canBulkDelete={canBulkDeletePurchaseRequestContent}
        handleExportContent={handleExportPurchaseRequestContent}
        handleExportTemplateContent={handleExportTemplatePurchaseRequestContent}
        handlePagination={handlePurchaseRequestContentPagination}
        handleAddContent={handleAddPurchaseRequestContent}
        ref={purchaseRequestContentRef}
        handleClick={handleClickPurchaseRequestContent}
        handleImportContentList={handleImportPurchaseRequestContent}
        columns={purchaseRequestContentContentColumns}
        hasAddContentInline={true}
        isShowTitle={false}
        isShowFooter={false}
      />
    ),
    [
      model,
      purchaseRequestContentFilter,
      purchaseRequestContentList,
      loadPurchaseRequestContentList,
      purchaseRequestContentTotal,
      handlePurchaseRequestContentTableChange,
      handleLocalBulkDeletePurchaseRequestContent,
      canBulkDeletePurchaseRequestContent,
      handleExportPurchaseRequestContent,
      handleExportTemplatePurchaseRequestContent,
      handlePurchaseRequestContentPagination,
      handleAddPurchaseRequestContent,
      purchaseRequestContentRef,
      handleClickPurchaseRequestContent,
      handleImportPurchaseRequestContent,
      purchaseRequestContentContentColumns,
    ]
  );

  const {
    openItemDialog,
    itemList,
    itemFilter,
    total,
    checkedAll,
    loadingItem,
    handleOpenItem,
    handleCheckItem,
    handleCheckAllItem,
    handleSaveItem,
    handleCancelItem,
    handleChangePaginationItem,
    handleChangeSearchItem,
    handleChangeSelectItem,
  } = usePurchaseRequestItem(
    handleChangeAllRowPurchaseRequestContent,
    model.purchaseRequestContents
  );

  const {
    visibleConfirm,
    confirm,
    cancel,
    openCategoryConfirm,
  } = useCategoryConfirm(
    model,
    handleUpdateNewModel,
    handleChangeAllRowPurchaseRequestContent
  );

  const handleChangeCategoryId = React.useCallback(
    (treeId: any, treeObject: any) => {
      if (model.categoryId) {
        openCategoryConfirm(treeObject);
      } else {
        const newModel = { ...model };
        newModel.category = treeObject;
        newModel.categoryId = treeId;
        handleUpdateNewModel(newModel);
      }
    },
    [model, openCategoryConfirm, handleUpdateNewModel]
  );
  const {
    isOpen,
    handleCloseHistory,
    handleOpenHistory,
  } = usePurchaseRequestWorkflowHistory(model);
  const {
    childrenAction,
    childrenStep,
    visibleSaveTemplateComfirm,
    confirmSaveTemplate,
    handleChangeNameTemplate,
    cancelSaveTemplateConfirm,
  } = usePurchaseRequestFooter(
    translate,
    model,
    handleUpdateNewModel,
    handleSave,
    handleGoBase,
    purchaseRequestTemplate,
    setPurchaseRequestTemplate,
    handleOpenHistory,
  );

  return (
    <>
      <div className="page page__detail purchase-request__container">
        <div className="page__header d-flex align-items-center">
          {isDetail ? (
            <div className="page__title mr-1">
              {translate("purchaseRequests.detail.title")}
            </div>
          ) : (
            translate("purchaseRequests.detail.create")
          )}
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
                className="site-collapse-custom-collapse pb-1 "
                expandIconPosition="right"
              >
                <Collapse.Panel
                  header={"Thông tin chi tiết"}
                  key="1"
                  className="site-collapse-custom-panel "
                >
                  <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col lg={8} className="gutter-row">
                      <FormItem
                        label={translate("purchaseRequests.code")}
                        validateStatus={formService.getValidationStatus<
                          PurchaseRequest
                        >(model.errors, nameof(model.code))}
                        message={model.errors?.code}
                      >
                        <InputText
                          isMaterial={true}
                          value={model.code}
                          placeHolder={translate(
                            "purchaseRequests.placeholder.code"
                          )}
                          disabled={true}
                          className={"tio-account_square_outlined"}
                          onBlur={handleChangeSimpleField(nameof(model.code))}
                        />
                      </FormItem>
                    </Col>

                    <Col lg={8} className="gutter-row">
                      <FormItem
                        label={translate("purchaseRequests.requestor")}
                        validateStatus={formService.getValidationStatus<
                          PurchaseRequest
                        >(model.errors, nameof(model.requestor))}
                        message={model.errors?.requestor}
                        isRequired={true}
                      >
                        <Select
                          isMaterial={true}
                          classFilter={AppUserFilter}
                          placeHolder={translate(
                            "purchaseRequests.placeholder.requestor"
                          )}
                          getList={purchaseRequestRepository.singleListAppUser}
                          onChange={handleChangeRequestor}
                          render={(user: AppUser) => user?.displayName}
                          model={model.requestor}
                          searchProperty={nameof(model.requestor.search)}
                          searchType=""
                        />
                      </FormItem>
                    </Col>

                    <Col lg={8} className="gutter-row">
                      <FormItem
                        label={translate(
                          "purchaseRequests.requestOrganization"
                        )}
                        validateStatus={formService.getValidationStatus<
                          PurchaseRequest
                        >(model.errors, nameof(model.requestOrganization))}
                        message={model.errors?.requestOrganization}
                        isRequired={true}
                      >
                        <TreeSelect
                          isMaterial={true}
                          placeHolder={translate(
                            "purchaseRequests.placeholder.requestOrganization"
                          )}
                          selectable={true}
                          classFilter={OrganizationFilter}
                          onChange={handleChangeTreeObjectField(
                            nameof(model.requestOrganization)
                          )}
                          checkStrictly={true}
                          getTreeData={
                            purchaseRequestRepository.singleListOrganization
                          }
                          item={model.requestOrganization}
                          modelFilter={organizationFilter}
                        />
                      </FormItem>
                    </Col>

                    <Col lg={16} className="gutter-row mt-3">
                      <FormItem
                        label={translate("purchaseRequests.description")}
                        validateStatus={formService.getValidationStatus<
                          PurchaseRequest
                        >(model.errors, nameof(model.description))}
                        message={model.errors?.description}
                        isRequired={true}
                      >
                        <InputText
                          isMaterial={true}
                          value={model.description}
                          placeHolder={translate(
                            "purchaseRequests.placeholder.description"
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
                        label={translate("purchaseRequests.requestedAt")}
                        validateStatus={formService.getValidationStatus<
                          PurchaseRequest
                        >(model.errors, nameof(model.requestedAt))}
                        message={model.errors?.requestedAt}
                      >
                        <DatePicker
                          isMaterial={true}
                          value={model.requestedAt}
                          placeholder={translate(
                            "purchaseRequests.placeholder.requestedAt"
                          )}
                          onChange={handleChangeSimpleField(
                            nameof(model.requestedAt)
                          )}
                        />
                      </FormItem>
                    </Col>

                    <Col lg={8} className="gutter-row mt-3">
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
                  header={"Sản phẩm"}
                  key="1"
                  className="site-collapse-custom-panel"
                >
                  <Row
                    justify="space-between"
                    gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                  >
                    <Col lg={16} className="gutter-row">
                      <FormItem
                        label={translate("purchaseRequests.category")}
                        validateStatus={formService.getValidationStatus<
                          PurchaseRequest
                        >(model.errors, nameof(model.categoryId))}
                        message={model.errors?.categoryId}
                      >
                        <CategorySelect
                          isMaterial={true}
                          classFilter={CategoryFilter}
                          placeHolder={translate(
                            "purchaseRequests.placeholder.category"
                          )}
                          getList={purchaseRequestRepository.singleListCategory}
                          onChange={handleChangeCategoryId}
                          model={model.category}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={6} className="gutter-row">
                      <div className="total__container">
                        <div className="total__first-row">
                          <div className="row__title">Thành tiền:</div>
                          <div className="row__value">
                            {formatNumber(totalItemValue.subTotalNumber)}
                            <span>&nbsp;{model.mainCurrency?.code}</span>
                          </div>
                        </div>
                        <div className="total__second-row">
                          <div className="row__title">Thuế:</div>
                          <div className="row__value">
                            {formatNumber(totalItemValue.taxAmountNumber)}
                            <span>&nbsp;{model.mainCurrency?.code}</span>
                          </div>
                        </div>
                        <div className="total__third-row">
                          <div className="row__title">Tổng tiền:</div>
                          <div className="row__value">
                            {formatNumber(totalItemValue.totalNumber)}
                            <span>&nbsp;{model.mainCurrency?.code}</span>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={24}>{purchaseRequestContentTable}</Col>
                  </Row>
                  <Row>
                    <div className="action__container">
                      <div
                        className={classNames("button__add", {
                          "disabled-div":
                            model.categoryId === null ||
                            model.categoryId === undefined,
                        })}
                        onClick={handleOpenItem(model.categoryId)}
                      >
                        <span>
                          <i className="tio-add_circle_outlined"></i> Thêm sản
                          phẩm
                        </span>
                      </div>
                      <FormItem
                        validateStatus={formService.getValidationStatus<
                          PurchaseRequest
                        >(model.errors, nameof(model.purchaseRequestContents))}
                        message={model.errors?.purchaseRequestContents}
                      >
                        {null}
                      </FormItem>
                    </div>
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
                      header={"Thông tin nhận hàng"}
                      key="1"
                      className="site-collapse-custom-panel mr-3 "
                    >
                      <Row>
                        <Col lg={24} className="mb-3">
                          <FormItem
                            label={translate("purchaseRequests.expectedAt")}
                            validateStatus={formService.getValidationStatus<
                              PurchaseRequest
                            >(model.errors, nameof(model.expectedAt))}
                            message={model.errors?.expectedAt}
                            isRequired={true}
                          >
                            <DatePicker
                              isMaterial={true}
                              value={model.expectedAt}
                              placeholder={translate(
                                "purchaseRequests.placeholder.expectedAt"
                              )}
                              onChange={handleChangeSimpleField(
                                nameof(model.expectedAt)
                              )}
                            />
                          </FormItem>
                        </Col>
                        <Col lg={24} className="mb-3">
                          <FormItem
                            label={translate("purchaseRequests.recipient")}
                            validateStatus={formService.getValidationStatus<
                              PurchaseRequest
                            >(model.errors, nameof(model.recipient))}
                            message={model.errors?.recipient}
                          >
                            <Select
                              isMaterial={true}
                              classFilter={AppUserFilter}
                              placeHolder={translate(
                                "purchaseRequests.placeholder.recipient"
                              )}
                              getList={
                                purchaseRequestRepository.singleListAppUser
                              }
                              onChange={handleChangeObjectField(
                                nameof(model.recipient)
                              )}
                              render={(user: AppUser) => user?.displayName}
                              model={model.recipient}
                              searchProperty={nameof(model.requestor.search)}
                              searchType=""
                            />
                          </FormItem>
                        </Col>
                        <Col lg={24} className="mb-3">
                          <FormItem
                            label={translate(
                              "purchaseRequests.recipientAddress"
                            )}
                            validateStatus={formService.getValidationStatus<
                              PurchaseRequest
                            >(model.errors, nameof(model.recipientAddress))}
                            message={model.errors?.recipientAddress}
                            isRequired={true}
                          >
                            <InputText
                              isMaterial={true}
                              value={model.recipientAddress}
                              placeHolder={translate(
                                "purchaseRequests.placeholder.recipientAddress"
                              )}
                              className={"tio-send_outlined"}
                              onBlur={handleChangeSimpleField(
                                nameof(model.recipientAddress)
                              )}
                            />
                          </FormItem>
                        </Col>
                        <Col lg={24} className="mb-3">
                          <FormItem
                            label={translate(
                              "purchaseRequests.recipientPhoneNumber"
                            )}
                            validateStatus={formService.getValidationStatus<
                              PurchaseRequest
                            >(model.errors, nameof(model.recipientPhoneNumber))}
                            message={model.errors?.recipientPhoneNumber}
                          >
                            <InputText
                              isMaterial={true}
                              value={model.recipientPhoneNumber}
                              placeHolder={translate(
                                "purchaseRequests.placeholder.recipientPhoneNumber"
                              )}
                              className={"tio-call"}
                              onBlur={handleChangeSimpleField(
                                nameof(model.recipientPhoneNumber)
                              )}
                            />
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
      <PurchaseRequestItemModal
        itemList={itemList}
        itemFilter={itemFilter}
        total={total}
        visibleDialog={openItemDialog}
        isCheckedAll={checkedAll}
        loadingItem={loadingItem}
        onSaveDialog={handleSaveItem}
        onCancelDialog={handleCancelItem}
        handleChangeSearchItem={handleChangeSearchItem}
        handleCheckItem={handleCheckItem}
        handleCheckAllItem={handleCheckAllItem}
        handleChangePaginationItem={handleChangePaginationItem}
        handleChangeSelectItem={handleChangeSelectItem}
        translate={translate}
      />
      <PurchaseRequestFileMappingModal
        visibleDialog={openFileModal}
        files={files}
        isLoadingFile={isLoadingFile}
        handleChangeFile={handleChangeFile}
        onCancelDialog={handleCloseFileModal}
        handleDeleteFile={handleDeleteFile}
      />
      <Modal
        title={null}
        onCancel={cancel}
        visible={visibleConfirm}
        width={585}
        visibleFooter={false}
        closable={false}
      >
        <div className="category-confirm__wrapper">
          <div className="category-confirm__container">
            <div className="category-confirm__image">
              <img src={illutration} alt="IMG" />
            </div>
            <div className="category-confirm__title">
              <span>Thay đổi danh mục sản phẩm!</span>
            </div>
            <div className="category-confirm__info">
              <span>
                Toàn bộ thông tin sản phẩm đã nhập sẽ bị xóa khi bạn thay đổi
                danh mục sản phẩm. Bạn có chắc muốn thực hiện?
              </span>
            </div>
          </div>
          <div className="category-confirm__action">
            <button className="btn btn-confirm mr-4" onClick={confirm}>
              <span>
                <i className="tio-checkmark_circle_outlined"></i> Xác nhận
              </span>
            </button>
            <button className="btn btn-cancel" onClick={cancel}>
              <span>
                <i className="tio-clear_circle_outlined"></i> Hủy
              </span>
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        title={null}
        onCancel={cancelSaveTemplateConfirm}
        visible={visibleSaveTemplateComfirm}
        width={585}
        visibleFooter={false}
        closable={false}
      >
        <div className="template-modal__wrapper">
          <div className="template-modal__container">
            <div className="template-modal__title">
              <span>Lưu mẫu</span>
            </div>
            <div className="template-modal__image">
              <img src={supportImage} alt="IMG" width="280" height="210" />
            </div>
            <div className="template-modal__field">
              <FormItem
                label={translate("purchaseRequests.templateName")}
                validateStatus={formService.getValidationStatus<
                  PurchaseRequestTemplate
                >(
                  purchaseRequestTemplate.errors,
                  nameof(purchaseRequestTemplate.name)
                )}
                message={purchaseRequestTemplate.errors?.name}
              >
                <InputText
                  isMaterial={true}
                  value={purchaseRequestTemplate.name}
                  placeHolder={translate(
                    "purchaseRequests.placeholder.templateName"
                  )}
                  className={"tio-comment_text_outlined"}
                  onChange={handleChangeNameTemplate}
                />
              </FormItem>
            </div>
          </div>
          <div className="template-modal__action">
            <button
              className="btn btn-confirm mr-4"
              onClick={confirmSaveTemplate}
            >
              <span>
                <i className="tio-checkmark_circle_outlined"></i> Xác nhận
              </span>
            </button>
            <button
              className="btn btn-cancel"
              onClick={cancelSaveTemplateConfirm}
            >
              <span>
                <i className="tio-clear_circle_outlined"></i> Hủy
              </span>
            </button>
          </div>
        </div>
      </Modal>

      <PurchaseRequestWorkflowHistoryModal
        isOpen={isOpen}
        handleCloseHistory={handleCloseHistory}
        model={model}
      />
    </>
  );
}

export default PurchaseRequestDetail;
