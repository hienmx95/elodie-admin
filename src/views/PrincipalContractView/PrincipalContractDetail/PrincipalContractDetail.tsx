/* begin general import */
/* end individual import */
import { CaretRightOutlined } from "@ant-design/icons";
import { Badge, Col, Collapse, Row, Steps } from "antd";
import { AppStoreContext } from "app/app-context";
import { AppAction, AppState } from "app/app-store";
import classNames from "classnames";
import AppFooter from "components/AppFooter/AppFooter";
import DatePicker from "components/Utility/Calendar/DatePicker/DatePicker";
import CategorySelect from "components/Utility/CategorySelect/CategorySelect";
import ChatBox from "components/Utility/ChatBox/ChatBox";
import ContentTable from "components/Utility/ContentTable/ContentTable";
import FormItem from "components/Utility/FormItem/FormItem";
import InputText from "components/Utility/Input/InputText/InputText";
import Modal from "components/Utility/Modal/Modal";
import Select from "components/Utility/Select/Select";
import TreeSelect from "components/Utility/TreeSelect/TreeSelect";
import { PRINCIPAL_CONTRACT_MASTER_ROUTE } from "config/route-consts";
import { AppUser, AppUserFilter } from "models/AppUser";
import { CategoryFilter } from "models/Category";
import { OrganizationFilter } from "models/Organization";
import { PrincipalContract } from "models/PrincipalContract";
import { PrincipalContractTemplate } from "models/PrincipalContractTemplate";
import { Supplier, SupplierFilter } from "models/Supplier";
import React, { Dispatch, useContext } from "react";
import { useTranslation } from "react-i18next";
import { appUserRepository } from "repositories/app-user-repository";
import { discussionRepository } from "repositories/discussion-repository";
import { principalContractRepository } from "repositories/principal-contract-repository";
import { formService } from "services/form-service";
import detailService from "services/pages/detail-service";
import { queryStringService } from "services/query-string-service";
import nameof from "ts-nameof.macro";
import illutration from "./../../../assets/images/illustration.jpg";
import supportImage from "./../../../assets/images/illutration-image/support.jpg";
import "./PrincipalContractDetail.scss";
import { useCategoryConfirm } from "./PrincipalContractDetailHook/CategoryConfirmHook";
import { usePrincipalContractContentTable } from "./PrincipalContractDetailHook/PrincipalContractContentHook";
import { usePrincipalContractFooter } from "./PrincipalContractDetailHook/PrincipalContractFooter";
// import { usePrincipalContractFooter } from "./PrincipalContractFooter/PrincipalContractFooter";
import {
  PrincipalContractItemModal,
  usePrincipalContractItem,
} from "./PrincipalContractDetailHook/PrincipalContractItemHook";
import {
  PrincipalContractFileMappingModal,
  usePrincipalContractFileMapping,
} from "./PrincipalContractDetailHook/PrincipalContractFileMappingHook";
import { PrincipalContractWorkflowHistoryModal } from "./PrincipalContractDetailHook/PrincipalContractWorkflowHook";

const { Panel } = Collapse;
const { Step } = Steps;

function PrincipalContractDetail() {
  const [translate] = useTranslation();

  const [state] = useContext<[AppState, Dispatch<AppAction>]>(AppStoreContext);
  const { user } = useContext<[AppState, Dispatch<AppAction>]>(
    AppStoreContext
  )[0];
  const [
    principalContractTemplate,
    setPrincipalContractTemplate,
  ] = React.useState<PrincipalContractTemplate>(
    new PrincipalContractTemplate()
  );
  const { id }: any = queryStringService.useGetQueryString(
    "principalContractTemplateId"
  );

  const appUserFilter = React.useMemo(() => {
    const filter = new AppUserFilter();

    if (user) {
      filter.organizationId.equal = user?.organizationId;
    }
    return filter;
  }, [user]);

  const {
    model,
    handleUpdateNewModel,
    isDetail,
    handleChangeSimpleField,
    handleChangeObjectField,
    handleChangeMappingField,
    handleSave,
    handleGoBase,
  } = detailService.useDetail<PrincipalContract>(
    PrincipalContract,
    principalContractRepository.get,
    principalContractRepository.save,
    PRINCIPAL_CONTRACT_MASTER_ROUTE
  );

  const {
    principalContractContentFilter,
    // principalContractContentContents,
    // setPrincipalContractContentContents,
    principalContractContentContentColumns,
    principalContractContentList,
    loadPrincipalContractContentList,
    principalContractContentTotal,
    handleAddPrincipalContractContent,
    handlePrincipalContractContentTableChange,
    handlePrincipalContractContentPagination,
    principalContractContentRowSelection,
    canBulkDeletePrincipalContractContent,
    handleLocalBulkDeletePrincipalContractContent,
    principalContractContentRef,
    handleClickPrincipalContractContent,
    handleImportPrincipalContractContent,
    handleExportPrincipalContractContent,
    handleExportTemplatePrincipalContractContent,
    handleChangeAllRowPrincipalContractContent,
    // handleSearchPrincipalContractContent,
  } = usePrincipalContractContentTable(model, handleUpdateNewModel);

  const principalContractContentTable = React.useMemo(
    () => (
      <ContentTable
        model={model}
        filter={principalContractContentFilter}
        list={principalContractContentList}
        loadingList={loadPrincipalContractContentList}
        total={principalContractContentTotal}
        handleTableChange={handlePrincipalContractContentTableChange}
        rowSelection={principalContractContentRowSelection}
        handleLocalBulkDelete={handleLocalBulkDeletePrincipalContractContent}
        canBulkDelete={canBulkDeletePrincipalContractContent}
        handleExportContent={handleExportPrincipalContractContent}
        handleExportTemplateContent={
          handleExportTemplatePrincipalContractContent
        }
        handlePagination={handlePrincipalContractContentPagination}
        handleAddContent={handleAddPrincipalContractContent}
        ref={principalContractContentRef}
        handleClick={handleClickPrincipalContractContent}
        handleImportContentList={handleImportPrincipalContractContent}
        columns={principalContractContentContentColumns}
        hasAddContentInline={true}
        isShowFooter={false}
        isShowTitle={false}
      />
    ),
    [
      model,
      principalContractContentFilter,
      principalContractContentList,
      loadPrincipalContractContentList,
      principalContractContentTotal,
      handlePrincipalContractContentTableChange,
      principalContractContentRowSelection,
      handleLocalBulkDeletePrincipalContractContent,
      canBulkDeletePrincipalContractContent,
      handleExportPrincipalContractContent,
      handleExportTemplatePrincipalContractContent,
      handlePrincipalContractContentPagination,
      handleAddPrincipalContractContent,
      principalContractContentRef,
      handleClickPrincipalContractContent,
      handleImportPrincipalContractContent,
      principalContractContentContentColumns,
    ]
  );

  const {
    files,
    openFileModal,
    isLoadingFile,
    handleChangeFile,
    handleCloseFileModal,
    handleOpenFileModal,
    handleDeleteFile,
  } = usePrincipalContractFileMapping(
    model,
    nameof("principalContractFileMappings"),
    principalContractRepository.multiUpload,
    handleChangeMappingField,
    handleChangeSimpleField
  );

  const {
    visibleConfirm,
    confirm,
    cancel,
    openCategoryConfirm,
  } = useCategoryConfirm(
    model,
    handleUpdateNewModel,
    handleChangeAllRowPrincipalContractContent
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
  } = usePrincipalContractItem(
    handleChangeAllRowPrincipalContractContent,
    model.principalContractContents
  );
  const {
    childrenAction,
    childrenStep,
    visibleSaveTemplateComfirm,
    confirmSaveTemplate,
    handleChangeNameTemplate,
    cancelSaveTemplateConfirm,
    isOpen,
    handleCloseHistory,
  } = usePrincipalContractFooter(
    translate,
    model,
    handleUpdateNewModel,
    handleGoBase,
    handleSave,
    principalContractTemplate,
    setPrincipalContractTemplate
  );
  React.useEffect(() => {
    if (id) {
      principalContractRepository
        .getTemplate(id)
        .subscribe((item) => {
          handleUpdateNewModel(item.content);
          setPrincipalContractTemplate(item);
        });
    }
  }, [id, handleUpdateNewModel]);

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

  const handleChangeSupplier = React.useCallback(
    (valueId: number, object: Supplier) => {
      // debugger;
      const newModel = { ...model };
      newModel.supplier = object;
      newModel.supplierId = valueId;
      newModel.supplierAddress = object?.address;
      newModel.supplierPhoneNumber = object?.phone;
      newModel.supplierTaxCode = object.taxCode;
      if (object?.supplierContactors && object?.supplierContactors.length > 0)
        newModel.supplierRepresentative = object?.supplierContactors[0]?.name;
      handleUpdateNewModel(newModel);
    },
    [handleUpdateNewModel, model]
  );
  const handleChangeOrganization = React.useCallback(
    (value) => {
      const newModel = { ...model };
      newModel.organization = value[0];
      newModel.organizationId = value[0]?.id;
      newModel.organizationAddress = value[0]?.address;
      newModel.organizationPhoneNumber = value[0]?.phone;
      // newModel.organizationTaxCode = object.taxCode;

      handleUpdateNewModel(newModel);
    },
    [handleUpdateNewModel, model]
  );

  return (
    <>
      <div className="page page__detail principal-contract-container">
        <div className="page__header d-flex align-items-center">
          {isDetail ? (
            <div className="page__title mr-1">
              {/* {translate("generals.detail.title")} */}
              {model?.code}
            </div>
          ) : (
            translate("generals.detail.title")
          )}
        </div>
        <div className="w-100 page__detail-tabs">
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col lg={16} className="gutter-row">
              <Collapse
                defaultActiveKey={["1"]}
                onChange={() => { }}
                expandIcon={({ isActive }) => (
                  <CaretRightOutlined rotate={isActive ? 90 : 0} />
                )}
                className="site-collapse-custom-collapse"
                expandIconPosition="right"
              >
                <Panel
                  header={translate("general.detail.generalInfomation")}
                  key="1"
                  className="site-collapse-custom-panel"
                >
                  <Row>
                    <Col lg={8} className="pr-3 mt-3">
                      <FormItem
                        label={translate("principalContracts.code")}
                        validateStatus={formService.getValidationStatus<
                          PrincipalContract
                        >(model.errors, nameof(model.code))}
                        message={model.errors?.code}
                        isRequired={true}
                      >
                        <InputText
                          isMaterial={true}
                          value={model.code}
                          placeHolder={translate(
                            "principalContracts.placeholder.code"
                          )}
                          className={"tio-documents_outline"}
                          onBlur={handleChangeSimpleField(nameof(model.code))}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={8} className="pr-3 mt-3">
                      <FormItem
                        label={translate("principalContracts.manager")}
                        validateStatus={formService.getValidationStatus<
                          PrincipalContract
                        >(model.errors, nameof(model.managerId))}
                        message={model.errors?.managerId}
                        isRequired={true}
                      >
                        <Select
                          isMaterial={true}
                          classFilter={AppUserFilter}
                          placeHolder={translate(
                            "principalContracts.placeholder.manager"
                          )}
                          getList={
                            principalContractRepository.singleListAppUser
                          }
                          onChange={handleChangeObjectField(
                            nameof(model.manager)
                          )}
                          model={model.manager}
                          render={(user: AppUser) => user?.displayName}
                          modelFilter={appUserFilter}
                        />
                      </FormItem>
                    </Col>

                    <Col lg={8} className="pr-3 mt-3">
                      <FormItem
                        label={translate("principalContracts.startedAt")}
                        validateStatus={formService.getValidationStatus<
                          PrincipalContract
                        >(model.errors, nameof(model.startedAt))}
                        message={model.errors?.startedAt}
                        isRequired={true}
                      >
                        <DatePicker
                          isMaterial={true}
                          value={model.startedAt}
                          placeholder={translate(
                            "principalContracts.placeholder.startedAt"
                          )}
                          onChange={handleChangeSimpleField(
                            nameof(model.startedAt)
                          )}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={16} className="pr-3 mt-3 mt-3">
                      <FormItem
                        label={translate("principalContracts.name")}
                        validateStatus={formService.getValidationStatus<
                          PrincipalContract
                        >(model.errors, nameof(model.name))}
                        message={model.errors?.name}
                        isRequired={true}
                      >
                        <InputText
                          isMaterial={true}
                          value={model.name}
                          placeHolder={translate(
                            "principalContracts.placeholder.name"
                          )}
                          className={"tio-document_text_outlined"}
                          onBlur={handleChangeSimpleField(nameof(model.name))}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={8} className="pr-3 mt-3">
                      <FormItem
                        label={translate("principalContracts.endedAt")}
                        validateStatus={formService.getValidationStatus<
                          PrincipalContract
                        >(model.errors, nameof(model.endedAt))}
                        message={model.errors?.endedAt}
                      >
                        <DatePicker
                          isMaterial={true}
                          value={model.endedAt}
                          placeholder={translate(
                            "principalContracts.placeholder.endedAt"
                          )}
                          onChange={handleChangeSimpleField(
                            nameof(model.endedAt)
                          )}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={8} className="gutter-row mt-3">
                      <Badge
                        count={
                          model.principalContractFileMappings
                            ? model.principalContractFileMappings.length
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
                              "principalContracts.principalContractFileMappings"
                            )}
                          </span>
                        </div>
                      </Badge>
                    </Col>
                  </Row>
                </Panel>
              </Collapse>
            </Col>
            <Col lg={8} className="gutter-row">
              <Collapse
                defaultActiveKey={["1"]}
                onChange={() => { }}
                expandIcon={({ isActive }) => (
                  <CaretRightOutlined rotate={isActive ? 90 : 0} />
                )}
                className="site-collapse-custom-collapse"
                expandIconPosition="right"
              >
                <Panel
                  header={translate("general.detail.historyInformation")}
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
                </Panel>
              </Collapse>
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col lg={16} className="gutter-row">
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
                      header={translate(
                        "principalContracts.detail.supplierInformation"
                      )}
                      key="1"
                      className="site-collapse-custom-panel"
                    >
                      <Row>
                        <Col lg={8} className="pr-3 mt-3">
                          <FormItem
                            label={translate("principalContracts.supplier")}
                            validateStatus={formService.getValidationStatus<
                              PrincipalContract
                            >(model.errors, nameof(model.supplier))}
                            message={model.errors?.supplierId}
                            isRequired={true}
                          >
                            <Select
                              isMaterial={true}
                              classFilter={SupplierFilter}
                              placeHolder={translate(
                                "principalContracts.placeholder.supplier"
                              )}
                              getList={
                                principalContractRepository.singleListSupplier
                              }
                              onChange={handleChangeSupplier}
                              model={model.supplier}
                            />
                          </FormItem>
                        </Col>
                        <Col lg={8} className="pr-3 mt-3">
                          <FormItem
                            label={translate(
                              "principalContracts.supplierTaxCode"
                            )}
                            validateStatus={formService.getValidationStatus<
                              PrincipalContract
                            >(model.errors, nameof(model.supplierTaxCode))}
                            message={model.errors?.supplierTaxCode}
                            isRequired={true}
                          >
                            <InputText
                              isMaterial={true}
                              value={model.supplierTaxCode}
                              placeHolder={translate(
                                "principalContracts.placeholder.supplierTaxCode"
                              )}
                              className={"tio-receipt_outlined"}
                              onBlur={handleChangeSimpleField(
                                nameof(model.supplierTaxCode)
                              )}
                            />
                          </FormItem>
                        </Col>
                        <Col lg={8} className="pr-3 mt-3">
                          <FormItem
                            label={translate("principalContracts.numberPhone")}
                            validateStatus={formService.getValidationStatus<
                              PrincipalContract
                            >(model.errors, nameof(model.supplierPhoneNumber))}
                            message={model.errors?.supplierPhoneNumber}
                            isRequired={true}
                          >
                            <InputText
                              isMaterial={true}
                              value={model.supplierPhoneNumber}
                              placeHolder={translate(
                                "principalContracts.placeholder.numberPhone"
                              )}
                              className={"tio-call"}
                              onBlur={handleChangeSimpleField(
                                nameof(model.supplierPhoneNumber)
                              )}
                            />
                          </FormItem>
                        </Col>
                        <Col lg={8} className="pr-3 mt-3">
                          <FormItem
                            label={translate("principalContracts.appUser")}
                            validateStatus={formService.getValidationStatus<
                              PrincipalContract
                            >(
                              model.errors,
                              nameof(model.supplierRepresentative)
                            )}
                            message={model.errors?.supplierRepresentative}
                            isRequired={true}
                          >
                            <InputText
                              isMaterial={true}
                              value={model.supplierRepresentative}
                              placeHolder={translate(
                                "principalContracts.placeholder.appUser"
                              )}
                              className={"tio-user"}
                              onBlur={handleChangeSimpleField(
                                nameof(model.supplierRepresentative)
                              )}
                            />
                          </FormItem>
                        </Col>
                        <Col lg={16} className="pr-3 mt-3">
                          <FormItem
                            label={translate(
                              "principalContracts.supplierAddress"
                            )}
                            validateStatus={formService.getValidationStatus<
                              PrincipalContract
                            >(model.errors, nameof(model.supplierAddress))}
                            message={model.errors?.supplierAddress}
                            isRequired={true}
                          >
                            <InputText
                              isMaterial={true}
                              value={model.supplierAddress}
                              placeHolder={translate(
                                "principalContracts.placeholder.supplierAddress"
                              )}
                              className={"tio-document_text_outlined"}
                              onBlur={handleChangeSimpleField(
                                nameof(model.supplierAddress)
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
                    className="site-collapse-custom-collapse"
                    expandIconPosition="right"
                    expandIcon={({ isActive }) => (
                      <CaretRightOutlined rotate={isActive ? 90 : 0} />
                    )}
                  >
                    <Collapse.Panel
                      header={translate(
                        "principalContracts.detail.organizationInformation"
                      )}
                      key="1"
                      className="site-collapse-custom-panel"
                    >
                      <Row>
                        <Col lg={8} className="pr-3 mt-3">
                          <FormItem
                            label={translate("principalContracts.organization")}
                            validateStatus={formService.getValidationStatus<
                              PrincipalContract
                            >(model.errors, nameof(model.organization))}
                            message={model.errors?.organizationId}
                            isRequired={true}
                          >
                            <TreeSelect
                              isMaterial={true}
                              placeHolder={translate(
                                "principalContracts.placeholder.organization"
                              )}
                              selectable={true}
                              classFilter={OrganizationFilter}
                              onChange={handleChangeOrganization}
                              checkStrictly={true}
                              getTreeData={
                                principalContractRepository.singleListOrganization
                              }
                              item={model.organization}
                            />
                          </FormItem>
                        </Col>
                        <Col lg={8} className="pr-3 mt-3">
                          <FormItem
                            label={translate(
                              "principalContracts.organizationTaxCode"
                            )}
                            validateStatus={formService.getValidationStatus<
                              PrincipalContract
                            >(model.errors, nameof(model.organizationTaxCode))}
                            message={model.errors?.organizationTaxCode}
                            isRequired={true}
                          >
                            <InputText
                              isMaterial={true}
                              value={model.organizationTaxCode}
                              placeHolder={translate(
                                "principalContracts.placeholder.organizationTaxCode"
                              )}
                              className={"tio-receipt_outlined"}
                              onBlur={handleChangeSimpleField(
                                nameof(model.organizationTaxCode)
                              )}
                            />
                          </FormItem>
                        </Col>
                        <Col lg={8} className="pr-3 mt-3">
                          <FormItem
                            label={translate("principalContracts.numberPhone")}
                            validateStatus={formService.getValidationStatus<
                              PrincipalContract
                            >(
                              model.errors,
                              nameof(model.organizationPhoneNumber)
                            )}
                            message={model.errors?.organizationPhoneNumber}
                            isRequired={true}
                          >
                            <InputText
                              isMaterial={true}
                              value={model.organizationPhoneNumber}
                              className={"tio-call"}
                              onBlur={handleChangeSimpleField(
                                nameof(model.organizationPhoneNumber)
                              )}
                            />
                          </FormItem>
                        </Col>
                        <Col lg={8} className="pr-3 mt-3">
                          <FormItem
                            label={translate("principalContracts.appUser")}
                            validateStatus={formService.getValidationStatus<
                              PrincipalContract
                            >(
                              model.errors,
                              nameof(model.organizationRepresentative)
                            )}
                            message={model.errors?.organizationRepresentative}
                            isRequired={true}
                          >
                            <InputText
                              isMaterial={true}
                              value={model.organizationRepresentative}
                              placeHolder={translate(
                                "principalContracts.placeholder.appUser"
                              )}
                              className={"tio-user"}
                              onBlur={handleChangeSimpleField(
                                nameof(model.organizationRepresentative)
                              )}
                            />
                          </FormItem>
                        </Col>
                        <Col lg={16} className="pr-3 mt-3">
                          <FormItem
                            label={translate(
                              "principalContracts.organizationAddress"
                            )}
                            validateStatus={formService.getValidationStatus<
                              PrincipalContract
                            >(model.errors, nameof(model.organizationAddress))}
                            message={model.errors?.organizationAddress}
                            isRequired={true}
                          >
                            <InputText
                              isMaterial={true}
                              value={model.organizationAddress}
                              placeHolder={translate(
                                "principalContracts.placeholder.organizationAddress"
                              )}
                              className={"tio-email_text_outlined"}
                              onBlur={handleChangeSimpleField(
                                nameof(model.organizationAddress)
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
                    className="site-collapse-custom-collapse"
                    expandIconPosition="right"
                    expandIcon={({ isActive }) => (
                      <CaretRightOutlined rotate={isActive ? 90 : 0} />
                    )}
                  >
                    <Collapse.Panel
                      header={translate("principalContracts.detail.item")}
                      key="1"
                      className="site-collapse-custom-panel"
                    >
                      <Row>
                        <Col lg={16} className="gutter-row">
                          <FormItem
                            label={translate("principalContracts.category")}
                            validateStatus={formService.getValidationStatus<
                              PrincipalContract
                            >(model.errors, nameof(model.categoryId))}
                            message={model.errors?.categoryId}
                            isRequired={true}
                          >
                            <CategorySelect
                              isMaterial={true}
                              classFilter={CategoryFilter}
                              placeHolder={translate(
                                "principalContracts.placeholder.category"
                              )}
                              getList={
                                principalContractRepository.singleListCategory
                              }
                              onChange={handleChangeCategoryId}
                              model={model.category}
                            />
                          </FormItem>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={24}>{principalContractContentTable}</Col>
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
                              <i className="tio-add_circle_outlined"></i> Thêm
                              sản phẩm
                            </span>
                          </div>

                        </div>
                        <FormItem
                          validateStatus={formService.getValidationStatus<
                            PrincipalContract
                          >(model.errors, nameof(model.principalContractContents))}
                          message={model.errors?.principalContractContents}
                        >
                          {null}
                        </FormItem>
                      </Row>
                    </Collapse.Panel>
                  </Collapse>
                </Col>
              </Row>
            </Col>
            <Col lg={8} className="gutter-row">
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
                  header={translate("general.detail.comment")}
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
        </div>
      </div>

      <AppFooter
        childrenAction={childrenAction}
        childrenStep={childrenStep}
      ></AppFooter>
      <PrincipalContractItemModal
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
      <PrincipalContractFileMappingModal
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
                  PrincipalContractTemplate
                >(
                  principalContractTemplate.errors,
                  nameof(principalContractTemplate.name)
                )}
                message={principalContractTemplate.errors?.name}
              >
                <InputText
                  isMaterial={true}
                  value={principalContractTemplate.name}
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
      <PrincipalContractWorkflowHistoryModal
        isOpen={isOpen}
        model={model}
        handleCloseHistory={handleCloseHistory}
        translate={translate}
      />
    </>
  );
}

export default PrincipalContractDetail;
