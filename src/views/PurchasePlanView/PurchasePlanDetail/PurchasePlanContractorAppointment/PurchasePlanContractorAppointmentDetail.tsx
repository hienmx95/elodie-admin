/* begin general import */
/* end individual import */
import { CaretRightOutlined } from "@ant-design/icons";
import { Badge, Col, Collapse, Row, Steps, Tooltip } from "antd";
import { AppStoreContext } from "app/app-context";
import { AppAction, AppState } from "app/app-store";
import classNames from "classnames";
import AppFooter from "components/AppFooter/AppFooter";
import DatePicker from "components/Utility/Calendar/DatePicker/DatePicker";
import ChatBox from "components/Utility/ChatBox/ChatBox";
import ContentTable from "components/Utility/ContentTable/ContentTable";
import FormItem from "components/Utility/FormItem/FormItem";
import InputText from "components/Utility/Input/InputText/InputText";
import Select from "components/Utility/Select/Select";
import SelectAddOption from "components/Utility/SelectAddOption/SelectAddOption";
import { PURCHASE_PLAN_ROUTE } from "config/route-consts";
import { PurchasePlan } from "models/PurchasePlan";
import { PurchasePlanFileMapping } from "models/PurchasePlanFileMapping";
import { PurchasePlanMail } from "models/PurchasePlanMail";
import { PurchasePlanSupplierMapping } from "models/PurchasePlanSupplierMapping";
import { PurchaseRequest, PurchaseRequestFilter } from "models/PurchaseRequest";
import { Supplier, SupplierFilter } from "models/Supplier";
import moment from "moment";
import React, { Dispatch, useContext } from "react";
import { useTranslation } from "react-i18next";
import { appUserRepository } from "repositories/app-user-repository";
import { discussionRepository } from "repositories/discussion-repository";
import { purchasePlanRepository } from "repositories/purchase-plan-repository";
import { supplierRepository } from "repositories/supplier-repository";
import { formService } from "services/form-service";
import detailService from "services/pages/detail-service";
import nameof from "ts-nameof.macro";
import {
  FileMappingModal,
  useFileMapping,
} from "../PurchasePlanDetailHook/FileMappingHook";
import { usePurchasePlanContentTable } from "../PurchasePlanDetailHook/PurchasePlanContentHook";
import {
  useDetail,
  useMailModal,
  usePurchasePlanDraft,
} from "../PurchasePlanDetailHook/PurchasePlanDetailHook";
import { usePurchasePlanFooter } from "../PurchasePlanDetailHook/PurchasePlanFooterHook";
import {
  PurchasePlanWorkflowHistoryModal,
  useWorkflowHistoryHook,
} from "../PurchasePlanDetailHook/WorkflowHistoryHook";
import "./PurchasePlanContractorAppointmentDetail.scss";
import {
  PurchasePlanItemModal,
  usePurchasePlanItem,
} from "./PurchasePlanContractorAppointmentHook/PurchasePlanItemHook";
import SupplierDetailModal from "./Supplier/SupplierDetailModal";
import SupplierQuotationModal from "./Supplier/SupplierQuotation";

export interface PurchasePlanContractorAppointmentDetailProps {
  purchaseRequestId?: number;
  purchasePlanTypeId?: number;
  purchaseRequest?: PurchaseRequest;
}

const { Step } = Steps;

function PurchasePlanContractorAppointmentDetail(
  props: PurchasePlanContractorAppointmentDetailProps
) {
  const [translate] = useTranslation();

  const [state] = useContext<[AppState, Dispatch<AppAction>]>(AppStoreContext);

  const { user } = useContext<[AppState, Dispatch<AppAction>]>(
    AppStoreContext
  )[0];

  const { purchaseRequestId, purchasePlanTypeId, purchaseRequest } = props;

  const [requestId, setRequestId] = React.useState<number>(null);
  const [listSupplier, setListSupplier] = React.useState<any>([]);
  const [supplierFilter, setSupplierFilter] = React.useState<SupplierFilter>(
    new SupplierFilter()
  );
  const [isChangeSupplier, setIsChangeSupplier] = React.useState<boolean>(
    false
  );

  const [loadingSupplier, setLoadingSupplier] = React.useState<boolean>(true);

  const [supplierQuotationFilter, setSupplierQuotationFilter] = React.useState<
    SupplierFilter
  >(new SupplierFilter());
  const initData = React.useMemo(() => {
    const dataConfiguration = JSON.parse(
      localStorage.getItem("dataConfiguration")
    );
    const model = new PurchasePlan();
    model.createdAt = moment();
    if (dataConfiguration) {
      model.mainCurrency = dataConfiguration._DEFAULT_MAIN_CURRENCY;
      model.mainCurrencyId = dataConfiguration._DEFAULT_MAIN_CURRENCY_ID;
    }
    if (user) {
      model.creator = { ...user };
      model.creatorId = user.id;
    }
    if (purchaseRequestId) {
      setRequestId(Number(purchaseRequestId));
      model.purchaseRequestId = purchaseRequestId;
    }
    if (purchasePlanTypeId) model.purchasePlanTypeId = purchasePlanTypeId;
    if (purchaseRequest) {
      model.purchaseRequest = purchaseRequest;
    }
    return model;
  }, [purchasePlanTypeId, purchaseRequest, purchaseRequestId, user]);

  const {
    model,
    handleUpdateNewModel,
    isDetail,
    handleChangeSimpleField,
    handleChangeMappingField,
    handleGoBase,
    handleGoPurchasePlanType,
  } = useDetail<PurchasePlan>(
    PurchasePlan,
    purchasePlanRepository.get,
    purchasePlanRepository.save,
    PURCHASE_PLAN_ROUTE,
    initData
  );

  const { setLoadingInitData } = usePurchasePlanDraft<PurchasePlan>(
    purchasePlanRepository.getDraft,
    initData,
    handleUpdateNewModel,
    requestId
  );

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
    nameof("purchasePlanFileMappings"),
    purchasePlanRepository.multiUpload,
    handleChangeMappingField,
    handleChangeSimpleField,
    PurchasePlanFileMapping
  );

  /* Item content table */
  const {
    purchasePlanContentFilter,
    // purchasePlanContentContents,
    // setPurchasePlanContentContents,
    purchasePlanContentContentColumns,
    purchasePlanContentList,
    loadPurchasePlanContentList,
    purchasePlanContentTotal,
    handleAddPurchasePlanContent,
    handlePurchasePlanContentTableChange,
    handlePurchasePlanContentPagination,
    canBulkDeletePurchasePlanContent,
    handleLocalBulkDeletePurchasePlanContent,
    purchasePlanContentRef,
    handleClickPurchasePlanContent,
    handleImportPurchasePlanContent,
    handleExportPurchasePlanContent,
    handleExportTemplatePurchasePlanContent,
    handleChangeAllRowContent,
    // handleSearchPurchasePlanContent,
  } = usePurchasePlanContentTable(model, handleUpdateNewModel);

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
  } = usePurchasePlanItem(
    handleChangeAllRowContent,
    model.purchasePlanContents
  );

  const purchasePlanContentTable = React.useMemo(
    () => (
      <ContentTable
        model={model}
        filter={purchasePlanContentFilter}
        list={purchasePlanContentList}
        loadingList={loadPurchasePlanContentList}
        total={purchasePlanContentTotal}
        handleTableChange={handlePurchasePlanContentTableChange}
        rowSelection={null}
        handleLocalBulkDelete={handleLocalBulkDeletePurchasePlanContent}
        canBulkDelete={canBulkDeletePurchasePlanContent}
        handleExportContent={handleExportPurchasePlanContent}
        handleExportTemplateContent={handleExportTemplatePurchasePlanContent}
        handlePagination={handlePurchasePlanContentPagination}
        handleAddContent={handleAddPurchasePlanContent}
        ref={purchasePlanContentRef}
        handleClick={handleClickPurchasePlanContent}
        handleImportContentList={handleImportPurchasePlanContent}
        columns={purchasePlanContentContentColumns}
        hasAddContentInline={true}
        isShowTitle={false}
        isShowFooter={false}
      />
    ),
    [
      model,
      purchasePlanContentFilter,
      purchasePlanContentList,
      loadPurchasePlanContentList,
      purchasePlanContentTotal,
      handlePurchasePlanContentTableChange,
      handleLocalBulkDeletePurchasePlanContent,
      canBulkDeletePurchasePlanContent,
      handleExportPurchasePlanContent,
      handleExportTemplatePurchasePlanContent,
      handlePurchasePlanContentPagination,
      handleAddPurchasePlanContent,
      purchasePlanContentRef,
      handleClickPurchasePlanContent,
      handleImportPurchasePlanContent,
      purchasePlanContentContentColumns,
    ]
  );

  React.useEffect(() => {
    if (
      loadingSupplier &&
      model?.purchasePlanSupplierMappings?.length > 0 &&
      isDetail
    ) {
      const list = [];
      model?.purchasePlanSupplierMappings?.forEach(
        (purchasePlanSupplierMapping: PurchasePlanSupplierMapping) => {
          list.push(purchasePlanSupplierMapping?.supplier);
          if (
            typeof supplierFilter.id.in === "undefined" ||
            supplierFilter.id === null ||
            !supplierFilter.id.in
          ) {
            supplierFilter.id = {
              notIn: [purchasePlanSupplierMapping?.supplierId],
            };
          } else {
            supplierFilter.id.in.push(purchasePlanSupplierMapping?.supplierId);
          }
        }
      );
      setSupplierFilter({
        ...supplierFilter,
      });
      setListSupplier(list);
      setLoadingSupplier(false);
    }
  }, [
    isDetail,
    loadingSupplier,
    model,
    supplierFilter,
    supplierQuotationFilter,
  ]);

  /* handleChangePurchaseRequest */

  const handleChangePurchaseRequest = React.useCallback(
    (purchaseRequestId, purchaseRequest) => {
      const newModel = { ...model };
      newModel.purchaseRequestId = purchaseRequestId
        ? purchaseRequestId
        : undefined;
      newModel.purchaseRequest = purchaseRequest;
      newModel.purchasePlanContents = undefined;
      newModel.description = undefined;
      newModel.reasonToChooseSupplier = undefined;
      setRequestId(Number(purchaseRequestId));
      setLoadingInitData(true);
      handleUpdateNewModel(newModel);
    },
    [handleUpdateNewModel, model, setLoadingInitData]
  );

  /* mail*/

  const {
    model: emailModel,
    isOpenDetailModal: visibleEmail,
    handleOpenDetailModal: handleOpenEmail,
    handleCloseDetailModal: handleCloseEmail,
    handleSaveModel: handleSendMail,
    handleChangeSimpleField: onChangeSimpleFieldEmail,
    handleChangeObjectField: onChangeObjectFieldEmail,
    handleChangeMappingField: onChangeMappingFieldEmail,
    handleChangeTreeObjectField: onChangeTreeObjectFieldEmail,
    handleUpdateNewModel: onUpdateNewModelEmail,
  } = useMailModal(
    PurchasePlanMail,
    purchasePlanRepository.get,
    purchasePlanRepository.save,
    purchasePlanRepository.createMail,
    PURCHASE_PLAN_ROUTE,
    model,
    handleUpdateNewModel
  );

  /* Supplier Mapping */

  const handleChangeSupplier = React.useCallback(
    (supplierId, supplier) => {
      const purchasePlanSupplierMapping = new PurchasePlanSupplierMapping();
      purchasePlanSupplierMapping.supplierId = supplierId;
      purchasePlanSupplierMapping.supplier = supplier;
      const newModel = { ...model };
      setListSupplier([...listSupplier, supplier]);
      if (
        typeof newModel.purchasePlanSupplierMappings === "undefined" ||
        newModel.purchasePlanSupplierMappings === null
      ) {
        newModel.purchasePlanSupplierMappings = [];
        newModel.purchasePlanSupplierMappings = [
          ...[purchasePlanSupplierMapping],
        ];
      } else {
        newModel.purchasePlanSupplierMappings = [
          ...newModel.purchasePlanSupplierMappings,
          ...[purchasePlanSupplierMapping],
        ];
      }

      if (
        typeof supplierFilter.id.notIn === "undefined" ||
        supplierFilter.id === null ||
        !supplierFilter.id.notIn
      ) {
        setSupplierFilter({
          ...supplierFilter,
          id: { notIn: [supplierId] },
        });
      } else {
        supplierFilter.id.notIn.push(supplierId);
        setSupplierFilter({
          ...supplierFilter,
        });
      }

      if (
        typeof supplierQuotationFilter.id.in === "undefined" ||
        supplierQuotationFilter.id === null ||
        !supplierQuotationFilter.id.in
      ) {
        setSupplierQuotationFilter({
          ...supplierQuotationFilter,
          id: { in: [supplierId] },
        });
      } else {
        supplierQuotationFilter.id.in.push(supplierId);
        setSupplierQuotationFilter({
          ...supplierQuotationFilter,
        });
      }

      handleUpdateNewModel(newModel);
    },
    [
      handleUpdateNewModel,
      listSupplier,
      model,
      supplierFilter,
      supplierQuotationFilter,
    ]
  );

  const handleDeleteSupplierMapping = React.useCallback(
    (index) => {
      const newModel = { ...model };
      newModel.purchasePlanSupplierMappings.splice(index, 1);
      handleUpdateNewModel(newModel);
      listSupplier.splice(index, 1);
      setListSupplier([...listSupplier]);
      supplierFilter.id.notIn.splice(index, 1);
      setSupplierFilter({
        ...supplierFilter,
      });
    },
    [handleUpdateNewModel, listSupplier, model, supplierFilter]
  );

  const {
    model: supplierModel,
    isOpenDetailModal,
    handleOpenDetailModal,
    handleCloseDetailModal,
    handleSaveModel,
    loadingModel,
    handleChangeSimpleField: onChangeSimpleField,
    handleChangeObjectField: onChangeObjectField,
  } = detailService.useDetailModal(
    Supplier,
    supplierRepository.get,
    supplierRepository.saveSupplier
  );

  const handleSaveSupplier = React.useCallback(async () => {
    await handleSaveModel();
    setIsChangeSupplier(true);
  }, [handleSaveModel]);

  /* app footer */

  const {
    isOpen,
    handleCloseHistory,
    handleOpenHistory,
  } = useWorkflowHistoryHook(model);

  const { childrenAction } = usePurchasePlanFooter(
    translate,
    model,
    handleUpdateNewModel,
    handleGoBase,
    handleOpenEmail
  );

  const childrenStep = React.useMemo(() => {
    return (
      <div className="d-flex justify-content-between">
        <Steps current={1} size="small">
          <Steps.Step title={"Khởi tạo"} />
          <Steps.Step title={"Chờ báo giá"} />
          <Steps.Step title={"Đã báo giá"} />
          <Steps.Step title={"Đã chọn NCC"} />
          <Steps.Step title={"Chờ duyệt"} />
          <Steps.Step title={"Đã duyệt"} />
        </Steps>
        <Tooltip title={translate("purchaseRequests.history")}>
          <i
            className="tio-history purchase-request-icon_history"
            onClick={handleOpenHistory}
          />
        </Tooltip>
      </div>
    );
  }, [handleOpenHistory, translate]);

  React.useEffect(() => {
    if (isChangeSupplier && supplierModel.id) {
      handleChangeSupplier(supplierModel?.id, supplierModel);
      setIsChangeSupplier(false);
    }
  }, [handleChangeSupplier, isChangeSupplier, supplierModel]);

  return (
    <>
      <div className="page page__detail purchase-plan__container">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col lg={18} className="gutter-row">
            <div className="page__header d-flex align-items-center">
              <div className="page__header-title">
                {isDetail ? (
                  <div className="page__title mr-1">
                    {model?.code}
                  </div>
                ) : (
                  <div className="page__title mr-1">
                    {translate("generals.detail.title")}
                  </div>
                )}
              </div>

              <div className="page__header-go-back d-flex align-items-center">
                <div className="page__title mr-3">Chỉ định nhà cung cấp</div>
                {!isDetail && (
                  <div className="go-back" onClick={handleGoPurchasePlanType}>
                    Thay đổi loại PAMS
                  </div>
                )}
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
                    <Col lg={8} className="gutter-row mt-3 ">
                      <FormItem
                        label={translate("purchasePlans.quotationExpectedAt")}
                        validateStatus={formService.getValidationStatus<
                          PurchasePlan
                        >(model.errors, nameof(model.quotationExpectedAt))}
                        message={model.errors?.quotationExpectedAt}
                        isRequired={true}
                      >
                        <DatePicker
                          isMaterial={true}
                          value={model.quotationExpectedAt}
                          placeholder={translate(
                            "purchasePlans.placeholder.quotationExpectedAt"
                          )}
                          onChange={handleChangeSimpleField(
                            nameof(model.quotationExpectedAt)
                          )}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={16} className="gutter-row mt-3">
                      <FormItem
                        label={translate("purchasePlans.description")}
                        validateStatus={formService.getValidationStatus<
                          PurchasePlan
                        >(model.errors, nameof(model.description))}
                        message={model.errors?.description}
                        isRequired={true}
                      >
                        <InputText
                          isMaterial={true}
                          value={model.description}
                          placeHolder={translate(
                            "purchasePlans.placeholder.description"
                          )}
                          className={"tio-comment_text_outlined"}
                          onBlur={handleChangeSimpleField(
                            nameof(model.description)
                          )}
                        />
                      </FormItem>
                    </Col>

                    <Col lg={8} className="gutter-row mt-3 ">
                      <Badge
                        count={
                          model.purchasePlanFileMappings
                            ? model.purchasePlanFileMappings.length
                            : 0
                        }
                      >
                        <div
                          className="attach-file__button"
                          onClick={handleOpenFileModal}
                        >
                          <span>
                            <i className="tio-attachment_diagonal"></i>{" "}
                            {translate("purchasePlans.fileMappings")}
                          </span>
                        </div>
                      </Badge>
                    </Col>
                    <Col lg={16} className="gutter-row mt-3">
                      <FormItem
                        label={translate(
                          "purchasePlans.reasonToChooseSupplier"
                        )}
                        validateStatus={formService.getValidationStatus<
                          PurchasePlan
                        >(model.errors, nameof(model.reasonToChooseSupplier))}
                        message={model.errors?.reasonToChooseSupplier}
                        isRequired={true}
                      >
                        <InputText
                          isMaterial={true}
                          value={model.reasonToChooseSupplier}
                          placeHolder={translate(
                            "purchasePlans.placeholder.reasonToChooseSupplier"
                          )}
                          className={"tio-comment_text_outlined"}
                          onBlur={handleChangeSimpleField(
                            nameof(model.reasonToChooseSupplier)
                          )}
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
                  <Row>
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
                    <Col lg={24}>{purchasePlanContentTable}</Col>
                  </Row>
                  <Row>
                    <Col lg={24}>
                      <div className="text-danger">
                        {model?.errors?.purchasePlanContents}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <div className="action__container">
                      <div
                        className={classNames("button__add", {
                          "disabled-div":
                            model.purchaseRequestId === null ||
                            model.purchaseRequestId === undefined,
                        })}
                        onClick={handleOpenItem(model.purchaseRequestId)}
                      >
                        <span>
                          <i className="tio-add_circle_outlined"></i> Thêm sản
                          phẩm
                        </span>
                      </div>
                    </div>
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
                    <Col lg={8} className="gutter-row row-supplier">
                      <FormItem
                        validateStatus={formService.getValidationStatus<
                          PurchasePlan
                        >(
                          model.errors,
                          nameof(model.purchasePlanSupplierMappings)
                        )}
                        message={model.errors?.purchasePlanSupplierMappings}
                      >
                        <SelectAddOption
                          isMaterial={true}
                          modelFilter={supplierFilter}
                          classFilter={SupplierFilter}
                          getList={purchasePlanRepository.singleListSupplier}
                          onChange={handleChangeSupplier}
                          placeHolder={"Tìm kiếm nhà cung cấp"}
                          textFooter={"Tạo mới NCC"}
                          onAdd={() => handleOpenDetailModal(null)}
                          disabled={
                            model.purchasePlanSupplierMappings?.length > 0
                              ? true
                              : false
                          }
                        />
                      </FormItem>
                      <div className="row-supplier_container">
                        {model?.purchasePlanSupplierMappings?.length > 0 &&
                          model?.purchasePlanSupplierMappings.map(
                            (purchasePlanSupplierMapping: any, index) => (
                              <div className="supplier-mapping" key={index}>
                                <div className="supplier-mapping__name d-flex align-items-center">
                                  {purchasePlanSupplierMapping?.supplier
                                    ?.avatar && (
                                      <div className="supplier-mapping__image mr-3">
                                        <img
                                          src={
                                            purchasePlanSupplierMapping?.supplier
                                              ?.avatar
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
                                    <div>
                                      <span className="supplier__tax-code">
                                        <span className="mr-1">MST:</span>

                                        {
                                          purchasePlanSupplierMapping?.supplier
                                            ?.taxCode
                                        }
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="supplier-mapping__delete"
                                  onClick={() =>
                                    handleDeleteSupplierMapping(index)
                                  }
                                >
                                  <i className="tio-clear_circle" />
                                </div>
                              </div>
                            )
                          )}
                      </div>
                    </Col>
                    <Col lg={16} className="gutter-row">
                      <div className="supplier-quotation">
                        <img
                          src={require("../../../../assets/images/illutration-image/seo.jpg")}
                          alt=""
                          width="280"
                          height="210"
                        />
                        <div className="supplier-quotation__description">
                          Chọn nhà cung cấp để lấy báo giá
                        </div>
                      </div>
                    </Col>
                  </Row>
                  {/* <Row>
                    <div className="action__container mt-3">
                      <div
                        className="button__add"
                        onClick={() => handleOpenDetailModal(null)}
                      >
                        <span>
                          <i className="tio-add_circle_outlined mt-3"></i> Tạo
                          mới NCC
                        </span>
                      </div>
                    </div>
                  </Row> */}
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
                            validateStatus={formService.getValidationStatus<
                              PurchasePlan
                            >(model.errors, nameof(model.purchaseRequest))}
                            message={model.errors?.purchaseRequestId}
                            isRequired={true}
                          >
                            <Select
                              isMaterial={true}
                              classFilter={PurchaseRequestFilter}
                              placeHolder={translate(
                                "purchasePlans.placeholder.purchaseRequest"
                              )}
                              getList={
                                purchasePlanRepository.singleListPurchaseRequest
                              }
                              onChange={handleChangePurchaseRequest}
                              render={(purchaseRequest: PurchaseRequest) =>
                                purchaseRequest?.code
                              }
                              model={model.purchaseRequest}
                              searchProperty={nameof(purchaseRequest.code)}
                              searchType={"contain"}
                            />
                          </FormItem>
                        </Col>
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
        isLoadingFile={isLoadingFile}
        handleChangeFile={handleChangeFile}
        onCancelDialog={handleCloseFileModal}
        handleDeleteFile={handleDeleteFile}
      />
      <PurchasePlanItemModal
        itemList={itemList}
        itemFilter={itemFilter}
        total={total}
        isCheckedAll={checkedAll}
        loadingItem={loadingItem}
        visibleDialog={openItemDialog}
        onSaveDialog={handleSaveItem}
        onCancelDialog={handleCancelItem}
        handleChangeSearchItem={handleChangeSearchItem}
        handleCheckItem={handleCheckItem}
        handleCheckAllItem={handleCheckAllItem}
        handleChangePaginationItem={handleChangePaginationItem}
        handleChangeSelectItem={handleChangeSelectItem}
        translate={translate}
      />
      {isOpenDetailModal && (
        <SupplierDetailModal
          visible={isOpenDetailModal}
          model={supplierModel}
          handleChangeSimpleField={onChangeSimpleField}
          handleChangeObjectField={onChangeObjectField}
          loading={loadingModel}
          handleSave={handleSaveSupplier}
          handleCancel={handleCloseDetailModal}
        />
      )}

      {visibleEmail && (
        <SupplierQuotationModal
          visible={visibleEmail}
          model={emailModel}
          handleChangeSimpleField={onChangeSimpleFieldEmail}
          handleChangeMappingField={onChangeMappingFieldEmail}
          handleChangeTreeObjectField={onChangeTreeObjectFieldEmail}
          handleChangeObjectField={onChangeObjectFieldEmail}
          recipients={listSupplier}
          handleCancel={handleCloseEmail}
          filter={supplierQuotationFilter}
          handleSave={handleSendMail}
          handleUpdateNewModel={onUpdateNewModelEmail}
          setFilter={setSupplierQuotationFilter}
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

export default PurchasePlanContractorAppointmentDetail;
