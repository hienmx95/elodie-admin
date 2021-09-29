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
import "./PurchaseRequestPrincipalContractDetail.scss";
import illutration from "./../../../assets/images/illustration.jpg";
import supportImage from "./../../../assets/images/illutration-image/support.jpg";
/* end general import */

/* begin individual import */
import InputText from "components/Utility/Input/InputText/InputText";
import Select from "components/Utility/Select/Select";
import DatePicker from "components/Utility/Calendar/DatePicker/DatePicker";
import ContentTable from "components/Utility/ContentTable/ContentTable";
import TreeSelect from "components/Utility/TreeSelect/TreeSelect";
import { PURCHASE_REQUEST_PRINCIPAL_CONTRACT_ROUTE } from "config/route-consts";
import { appUserRepository } from "repositories/app-user-repository";

import { AppUser, AppUserFilter } from "models/AppUser";
import { OrganizationFilter } from "models/Organization";

import { CaretRightOutlined } from "@ant-design/icons";
import { Steps } from "antd";

import { formatNumber } from "helpers/number";
import classNames from "classnames";
import moment from "moment";
import Modal from "components/Utility/Modal/Modal";
import {
  PurchaseRequestPrincipalContractFileMappingModal,
  usePurchaseRequestPrincipalContractFileMapping,
} from "./PurchaseRequestPrincipalContractDetailHook/PurchaseRequestPrincipalContractFileMappingHook";
import { useCategoryConfirm } from "./PurchaseRequestPrincipalContractDetailHook/CategoryConfirmHook";
import { usePurchaseRequestPrincipalContractFooter } from "./PurchaseRequestPrincipalContractDetailHook/PurchaseRequestPrincipalContractFooterHook";
import {
  PurchaseRequestPrincipalContractItemModal,
  usePurchaseRequestPrincipalContractItem,
} from "./PurchaseRequestPrincipalContractDetailHook/PurchaseRequestPrincipalContractItemHook";
import { usePurchaseRequestPrincipalContractContentTable } from "./PurchaseRequestPrincipalContractDetailHook/PurchaseRequestprincipalContractContentHook";
import { PurchaseRequestPrincipalContract } from "models/PurchaseRequestPrincipalContract";
import { purchaseRequestPrincipalContractRepository } from "repositories/purchase-request-principal-contract-repository";
import { PrincipalContractFilter } from "models/PrincipalContract";
import { queryStringService } from "services/query-string-service";
import { PurchaseRequestPrincipalContractTemplate } from "models/PrincipalContractPurchaseRequestTemplate";

/* end individual import */

const { Step } = Steps;

function PurchaseRequestPrincipalContractDetail() {
  const [translate] = useTranslation();

  const [state] = useContext<[AppState, Dispatch<AppAction>]>(AppStoreContext);

  const { user } = useContext<[AppState, Dispatch<AppAction>]>(
    AppStoreContext
  )[0];

  const [
    purchaseRequestPrincipalContractTemplate,
    setPurchaseRequestPrincipalContractTemplate,
  ] = React.useState<PurchaseRequestPrincipalContractTemplate>(
    new PurchaseRequestPrincipalContractTemplate()
  );
  const { id }: any = queryStringService.useGetQueryString(
    "purchaseRequestPrincipalContractTemplateId"
  );
  const [principalContractFilter, setPrincipalContractFilter] = React.useState<PrincipalContractFilter>(new PrincipalContractFilter());

  const initData = React.useMemo(() => {
    const dataConfiguration = JSON.parse(
      localStorage.getItem("dataConfiguration")
    );
    const model = new PurchaseRequestPrincipalContract();
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
    setPrincipalContractFilter({
      ...principalContractFilter,
      organizationId: { equal: model.requestOrganizationId },
      startedAt: { lessEqual: model.requestedAt.clone().startOf("day") },
      endedAt: { greaterEqual: model.requestedAt.clone().endOf('day') }
    });
    return model;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  function disabledDate(current) {
    // Can not select days before today and today
    return current && current > moment().endOf('day');
  }

  const {
    model,
    handleUpdateNewModel,
    isDetail,
    handleChangeSimpleField,
    handleChangeObjectField,
    handleChangeMappingField,
    handleGoBase,
  } = detailService.useDetail<PurchaseRequestPrincipalContract>(
    PurchaseRequestPrincipalContract,
    purchaseRequestPrincipalContractRepository.get,
    purchaseRequestPrincipalContractRepository.save,
    PURCHASE_REQUEST_PRINCIPAL_CONTRACT_ROUTE,
    initData
  );
  React.useEffect(() => {
    if (id) {
      purchaseRequestPrincipalContractRepository
        .getTemplate(id)
        .subscribe((item) => {
          handleUpdateNewModel(item.content);
          setPurchaseRequestPrincipalContractTemplate(item);
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
  } = usePurchaseRequestPrincipalContractFileMapping(
    model,
    nameof("purchaseRequestFileMappings"),
    purchaseRequestPrincipalContractRepository.multiUpload,
    handleChangeMappingField,
    handleChangeSimpleField,
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
  } = usePurchaseRequestPrincipalContractContentTable(
    model,
    handleUpdateNewModel
  );

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
    handleChangeSelectItem
  } = usePurchaseRequestPrincipalContractItem(
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

  const handleChangePrincipalContractId = React.useCallback(
    (value: any, valueObject: any) => {
      if (model.principalContractId) {
        openCategoryConfirm(valueObject);
      } else {
        const newModel = { ...model };
        newModel.principalContract = valueObject;
        newModel.principalContractId = value;
        newModel.category = valueObject?.category;
        newModel.categoryId = valueObject?.categoryId;
        handleUpdateNewModel(newModel);
      }
    },
    [model, openCategoryConfirm, handleUpdateNewModel]
  );

  const {
    childrenAction,
    childrenStep,
    visibleSaveTemplateComfirm,
    confirmSaveTemplate,
    handleChangeNameTemplate,
    cancelSaveTemplateConfirm,
  } = usePurchaseRequestPrincipalContractFooter(
    translate,
    model,
    totalItemValue,
    handleUpdateNewModel,
    handleGoBase,
    purchaseRequestPrincipalContractTemplate,
    setPurchaseRequestPrincipalContractTemplate
  );
  const handleChangeRequestOrganization = React.useCallback((value) => {
    const newModel = { ...model };
    newModel.requestOrganization = value[0];
    newModel.requestOrganizationId = value[0]?.id;
    if (principalContractFilter.organizationId.equal !== value[0]?.id) {
      newModel.principalContract = undefined;
      newModel.principalContractId = undefined;
    }
    setPrincipalContractFilter({
      ...principalContractFilter,
      organizationId: {
        equal: newModel.requestOrganizationId
      }
    });
    handleUpdateNewModel(newModel);

  }, [handleUpdateNewModel, model, principalContractFilter]);

  const handleChangeRequestedAt = React.useCallback((value) => {
    const newModel = { ...model };
    newModel.requestedAt = value;
    if (principalContractFilter.startedAt.greater !== value && principalContractFilter.endedAt.less !== value) {
      newModel.principalContract = undefined;
      newModel.principalContractId = undefined;
    }
    setPrincipalContractFilter({
      ...principalContractFilter,
      startedAt: {
        greater: value
      }
      ,
      endedAt: {
        less: value
      }
    });
    handleUpdateNewModel(newModel);

  }, [handleUpdateNewModel, model, principalContractFilter]);

  return (
    <>
      <div className="page page__detail purchase-request-principal-contract__container">
        <div className="page__header d-flex align-items-center">
          {isDetail ? (
            <div className="page__title mr-1">
              {translate("purchaseRequestPrincipalContracts.detail.title")}
            </div>
          ) : (
            translate("general.actions.create")
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
                className="site-collapse-custom-collapse pb-1"
                expandIconPosition="right"
              >
                <Collapse.Panel
                  header={"Thông tin chi tiết"}
                  key="1"
                  className="site-collapse-custom-panel"
                >
                  <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col lg={8} className="gutter-row">
                      <FormItem
                        label={translate(
                          "purchaseRequestPrincipalContracts.code"
                        )}
                        validateStatus={formService.getValidationStatus<
                          PurchaseRequestPrincipalContract
                        >(model.errors, nameof(model.code))}
                        message={model.errors?.code}
                      >
                        <InputText
                          isMaterial={true}
                          value={model.code}
                          placeHolder={translate(
                            "purchaseRequestPrincipalContracts.placeholder.code"
                          )}
                          className={"tio-blocked"}
                          onBlur={handleChangeSimpleField(nameof(model.code))}
                          disabled={true}
                        />
                      </FormItem>
                    </Col>

                    <Col lg={8} className="gutter-row">
                      <FormItem
                        label={translate(
                          "purchaseRequestPrincipalContracts.requestor"
                        )}
                        validateStatus={formService.getValidationStatus<
                          PurchaseRequestPrincipalContract
                        >(model.errors, nameof(model.requestor))}
                        message={model.errors?.requestor}
                        isRequired={true}
                      >
                        <Select
                          isMaterial={true}
                          classFilter={AppUserFilter}
                          placeHolder={translate(
                            "purchaseRequestPrincipalContracts.placeholder.requestor"
                          )}
                          getList={
                            purchaseRequestPrincipalContractRepository.singleListAppUser
                          }
                          onChange={handleChangeObjectField(
                            nameof(model.requestor)
                          )}
                          render={(user: AppUser) => user?.displayName}
                          model={model.requestor}
                          searchType=""
                          searchProperty='search'
                        />
                      </FormItem>
                    </Col>

                    <Col lg={8} className="gutter-row">
                      <FormItem
                        label={translate(
                          "purchaseRequestPrincipalContracts.requestOrganization"
                        )}
                        validateStatus={formService.getValidationStatus<
                          PurchaseRequestPrincipalContract
                        >(model.errors, nameof(model.requestOrganization))}
                        message={model.errors?.requestOrganization}
                        isRequired={true}
                      >
                        <TreeSelect
                          isMaterial={true}
                          placeHolder={translate(
                            "purchaseRequestPrincipalContracts.placeholder.requestOrganization"
                          )}
                          selectable={true}
                          classFilter={OrganizationFilter}
                          onChange={handleChangeRequestOrganization}
                          checkStrictly={true}
                          getTreeData={
                            purchaseRequestPrincipalContractRepository.singleListOrganization
                          }
                          item={model.requestOrganization}
                        />
                      </FormItem>
                    </Col>

                    <Col lg={16} className="gutter-row mt-3">
                      <FormItem
                        label={translate(
                          "purchaseRequestPrincipalContracts.description"
                        )}
                        validateStatus={formService.getValidationStatus<
                          PurchaseRequestPrincipalContract
                        >(model.errors, nameof(model.description))}
                        message={model.errors?.description}
                        isRequired={true}
                      >
                        <InputText
                          isMaterial={true}
                          value={model.description}
                          placeHolder={translate(
                            "purchaseRequestPrincipalContracts.placeholder.description"
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
                        label={translate(
                          "purchaseRequestPrincipalContracts.requestedAt"
                        )}
                        validateStatus={formService.getValidationStatus<
                          PurchaseRequestPrincipalContract
                        >(model.errors, nameof(model.requestedAt))}
                        message={model.errors?.requestedAt}
                      >
                        <DatePicker
                          isMaterial={true}
                          value={model.requestedAt}
                          placeholder={translate(
                            "purchaseRequestPrincipalContracts.placeholder.requestedAt"
                          )}
                          onChange={handleChangeRequestedAt}
                          disabledDate={disabledDate}
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
                              "purchaseRequestPrincipalContracts.purchaseRequestFileMappings"
                            )}
                          </span>
                        </div>
                      </Badge>
                    </Col>
                    <Col lg={8} className="gutter-row mt-3" />
                    <Col lg={8} className="gutter-row mt-3">
                      <FormItem
                        label={translate(
                          "purchaseRequestPrincipalContracts.principalContract"
                        )}
                        validateStatus={formService.getValidationStatus<
                          PurchaseRequestPrincipalContract
                        >(model.errors, nameof(model.principalContract))}
                        message={model.errors?.principalContract}
                        isRequired={true}
                      >
                        <Select
                          isMaterial={true}
                          classFilter={PrincipalContractFilter}
                          placeHolder={translate(
                            "purchaseRequestPrincipalContracts.placeholder.principalContract"
                          )}
                          getList={
                            purchaseRequestPrincipalContractRepository.singleListPrincipalContract
                          }
                          onChange={handleChangePrincipalContractId}
                          model={model.principalContract}
                          modelFilter={principalContractFilter}
                        />
                      </FormItem>
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
                        label={translate(
                          "purchaseRequestPrincipalContracts.category"
                        )}
                        validateStatus={formService.getValidationStatus<
                          PurchaseRequestPrincipalContract
                        >(model.errors, nameof(model.categoryId))}
                        message={model.errors?.categoryId}
                      >
                        <InputText
                          isMaterial={true}
                          value={model.category?.name}
                          className={"tio-blocked"}
                          disabled={true}
                          placeHolder={translate(
                            "purchaseRequestPrincipalContracts.placeholder.category"
                          )}
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
                            model.principalContractId === null ||
                            model.principalContractId === undefined,
                        })}
                        onClick={handleOpenItem(model.principalContractId)}
                      >
                        <span>
                          <i className="tio-add_circle_outlined"></i> Thêm sản
                          phẩm
                        </span>
                      </div>
                      <FormItem
                        validateStatus={formService.getValidationStatus<
                          PurchaseRequestPrincipalContract
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
            <Col lg={6} className="gutter-row">
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
                      className="site-collapse-custom-panel mr-3"
                    >
                      <Row>
                        <Col lg={24} className="mb-3">
                          <FormItem
                            label={translate(
                              "purchaseRequestPrincipalContracts.expectedAt"
                            )}
                            validateStatus={formService.getValidationStatus<
                              PurchaseRequestPrincipalContract
                            >(model.errors, nameof(model.expectedAt))}
                            message={model.errors?.expectedAt}
                            isRequired={true}
                          >
                            <DatePicker
                              isMaterial={true}
                              value={model.expectedAt}
                              placeholder={translate(
                                "purchaseRequestPrincipalContracts.placeholder.expectedAt"
                              )}
                              onChange={handleChangeSimpleField(
                                nameof(model.expectedAt)
                              )}
                            />
                          </FormItem>
                        </Col>
                        <Col lg={24} className="mb-3">
                          <FormItem
                            label={translate(
                              "purchaseRequestPrincipalContracts.recipient"
                            )}
                            validateStatus={formService.getValidationStatus<
                              PurchaseRequestPrincipalContract
                            >(model.errors, nameof(model.recipient))}
                            message={model.errors?.recipient}
                          >
                            <Select
                              isMaterial={true}
                              classFilter={AppUserFilter}
                              placeHolder={translate(
                                "purchaseRequestPrincipalContracts.placeholder.recipient"
                              )}
                              getList={
                                purchaseRequestPrincipalContractRepository.singleListAppUser
                              }
                              onChange={handleChangeObjectField(
                                nameof(model.recipient)
                              )}
                              render={(user: AppUser) => user?.displayName}
                              model={model.recipient}
                            />
                          </FormItem>
                        </Col>
                        <Col lg={24} className="mb-3">
                          <FormItem
                            label={translate(
                              "purchaseRequestPrincipalContracts.recipientAddress"
                            )}
                            validateStatus={formService.getValidationStatus<
                              PurchaseRequestPrincipalContract
                            >(model.errors, nameof(model.recipientAddress))}
                            message={model.errors?.recipientAddress}
                            isRequired={true}
                          >
                            <InputText
                              isMaterial={true}
                              value={model.recipientAddress}
                              placeHolder={translate(
                                "purchaseRequestPrincipalContracts.placeholder.recipientAddress"
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
                              "purchaseRequestPrincipalContracts.recipientPhoneNumber"
                            )}
                            validateStatus={formService.getValidationStatus<
                              PurchaseRequestPrincipalContract
                            >(model.errors, nameof(model.recipientPhoneNumber))}
                            message={model.errors?.recipientPhoneNumber}
                          >
                            <InputText
                              isMaterial={true}
                              value={model.recipientPhoneNumber}
                              placeHolder={translate(
                                "purchaseRequestPrincipalContracts.placeholder.recipientPhoneNumber"
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
                      className="site-collapse-custom-panel mr-3"
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
      <PurchaseRequestPrincipalContractItemModal
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
      <PurchaseRequestPrincipalContractFileMappingModal
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
                  PurchaseRequestPrincipalContractTemplate
                >(
                  purchaseRequestPrincipalContractTemplate.errors,
                  nameof(purchaseRequestPrincipalContractTemplate.name)
                )}
                message={purchaseRequestPrincipalContractTemplate.errors?.name}
              >
                <InputText
                  isMaterial={true}
                  value={purchaseRequestPrincipalContractTemplate.name}
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
    </>
  );
}

export default PurchaseRequestPrincipalContractDetail;
