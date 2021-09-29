
import { CaretRightOutlined } from "@ant-design/icons";
import { Col, Collapse, Radio, Row, Steps } from "antd";
import AppFooter from "components/AppFooter/AppFooter";
import ContentTable from "components/Utility/ContentTable/ContentTable";
import FormItem from "components/Utility/FormItem/FormItem";
import InputText from "components/Utility/Input/InputText/InputText";
import Select from "components/Utility/Select/Select";
import SwitchStatus from "components/Utility/SwitchStatus/SwitchStatus";
import TreeSelect from "components/Utility/TreeSelect/TreeSelect";
import UploadFile from "components/Utility/UploadFile/UploadFile";
import { SUPPLIER_ROUTE } from "config/route-consts";
import { CategoryFilter } from "models/Category/CategoryFilter";
import { DistrictFilter } from "models/District/DistrictFilter";
import { Nation, NationFilter } from "models/Nation";
import { ProvinceFilter } from "models/Province";
import { Status } from "models/Status";
import { Supplier } from "models/Supplier";
import { SupplierCategoryMapping } from "models/SupplierCategoryMapping";
import { WardFilter } from "models/Ward/WardFilter";
import React from "react";
import { useTranslation } from "react-i18next";
import { supplierRepository } from "repositories/supplier-repository";
import { finalize } from "rxjs/operators";
import { enumService } from "services/enum-service";
import { formService } from "services/form-service";
import detailService from "services/pages/detail-service";
import nameof from "ts-nameof.macro";
import { useSupplierContractorTable } from "./SupplierDetailHook/SupplierContactor";
import { useSupplierFooterHook } from "./SupplierDetailHook/SupplierFooterHook";

const { Panel } = Collapse;
const { Step } = Steps;

function SupplierDetail() {
  const [translate] = useTranslation();

  const {
    model,
    handleUpdateNewModel,
    isDetail,
    handleChangeSimpleField,
    handleChangeObjectField,
    handleSave,
    handleGoBase,
  } = detailService.useDetail<Supplier>(
    Supplier,
    supplierRepository.get,
    supplierRepository.save,
    SUPPLIER_ROUTE
  );
  const [nationList, setNationList] = React.useState<Nation[]>([]);

  const [codeNation, setCodeNation] = React.useState<string>("");

  const ref = React.useRef<boolean>(true);
  React.useEffect(() => {
    if (ref.current) {
      if (model?.nationId === null || model?.nationId === undefined) {
        setCodeNation("VNM");
        supplierRepository
          .singleListNation(new NationFilter())
          .pipe(
            finalize(() => {
              ref.current = false;
            })
          )
          .subscribe((list) => {
            setNationList([...list]);
            const nation = list.filter((item) => item.code === "VNM")[0];
            model.nation = nation;
            model.nationId = nation?.id;
            handleChangeObjectField(nameof(model.nation));
          });
      }
      ref.current = false;
    }
  }, [codeNation, handleChangeObjectField, model]);

  React.useEffect(() => {
    if (model.nationId === 1 || model.nationId === null || model.nationId === undefined) {
      setCodeNation("VNM");
    } else {
      setCodeNation("OTHER");
    }
  }, [model.nationId]);

  const [statusList] = enumService.useEnumList<Status>(
    supplierRepository.singleListStatus
  );

  const handleChangeChangeCategory = React.useCallback(
    (value) => {
      const newModel = { ...model };
      const list = value.map((item) => {
        const mapping = new SupplierCategoryMapping();
        mapping.category = item;
        mapping.categoryId = item?.id;
        return mapping;
      });
      newModel.supplierCategoryMappings = [...list];

      handleUpdateNewModel(newModel);
    },
    [handleUpdateNewModel, model]
  );
  const handleChangeRadio = React.useCallback(
    (event) => {
      const code = String(event.target.value);
      setCodeNation(code);

      if (code === "VNM") {
        model.nation = nationList[0];
        model.nationId = nationList[0]?.id;
      } else {
        model.nation = undefined;
        model.nationId = undefined;
      }
      handleChangeObjectField(nameof(model.nation));
    },
    [handleChangeObjectField, model, nationList]
  );
  const handleChangeNation = React.useCallback((id: number, nation: Nation) => {
    if (id === 1 || nation.code === "VNM") {
      setCodeNation(nation.code);
    }
    handleChangeObjectField("nation")(id, nation);
  }, [setCodeNation, handleChangeObjectField]);

  const [districtFilter, setDistrictFilter] = React.useState<DistrictFilter>(
    new DistrictFilter()
  );

  const [wardFilter, setWardFilter] = React.useState<WardFilter>(
    new WardFilter()
  );

  const handleChangeProvince = React.useCallback(
    (event, item) => {
      const newModel = { ...model };
      newModel.province = item;
      newModel.provinceId = event;

      if (districtFilter.provinceId.equal !== event) {
        newModel.district = undefined;
        newModel.districtId = undefined;
        newModel.ward = undefined;
        newModel.wardId = undefined;
      }
      districtFilter.provinceId.equal = event;
      setDistrictFilter(districtFilter);
      handleUpdateNewModel(newModel);
    },
    [districtFilter, handleUpdateNewModel, model]
  );
  // if (supplier.id && supplier.provinceId) {
  //   districtFilter.provinceId.equal = supplier.provinceId;
  // }
  const handleChangeDistrict = React.useCallback(
    (event, item) => {
      const newModel = { ...model };
      newModel.district = item;
      newModel.districtId = event;
      if (wardFilter.districtId.equal !== event) {
        newModel.wardId = undefined;
        newModel.ward = undefined;
      }
      wardFilter.districtId.equal = event;
      setWardFilter(wardFilter);
      handleUpdateNewModel(newModel);
    },
    [handleUpdateNewModel, model, wardFilter]
  );

  const {
    supplierContactorFilter,
    supplierContactorList,
    loadSupplierContactorList,
    supplierContactorTotal,
    handleAddSupplierContactorContent,
    handleSupplierContactorTableChange,
    handleSupplierContactorPagination,
    canBulkDeleteSupplierContactorContent,
    handleLocalBulkDeleteSupplierContactorContent,
    supplierContactorRef,
    handleClickSupplierContactorContent,
    handleImportSupplierContactorContent,
    handleExportSupplierContactorContent,
    handleExportTemplateSupplierContactorContent,
    supplierContractorColumns,
  } = useSupplierContractorTable(model, handleUpdateNewModel);

  const supplierContactorTable = React.useMemo(
    () => (
      <ContentTable
        model={model}
        filter={supplierContactorFilter}
        list={supplierContactorList}
        loadingList={loadSupplierContactorList}
        total={supplierContactorTotal}
        handleTableChange={handleSupplierContactorTableChange}
        rowSelection={null}
        handleLocalBulkDelete={handleLocalBulkDeleteSupplierContactorContent}
        canBulkDelete={canBulkDeleteSupplierContactorContent}
        handleExportContent={handleExportSupplierContactorContent}
        handleExportTemplateContent={
          handleExportTemplateSupplierContactorContent
        }
        handlePagination={handleSupplierContactorPagination}
        handleAddContent={handleAddSupplierContactorContent}
        ref={supplierContactorRef}
        handleClick={handleClickSupplierContactorContent}
        handleImportContentList={handleImportSupplierContactorContent}
        columns={supplierContractorColumns}
        hasAddContentInline={true}
        isShowTitle={false}
        isShowFooter={false}
        hasWriteContentPermission={true}
      />
    ),
    [
      canBulkDeleteSupplierContactorContent,
      handleAddSupplierContactorContent,
      handleClickSupplierContactorContent,
      handleExportSupplierContactorContent,
      handleExportTemplateSupplierContactorContent,
      handleImportSupplierContactorContent,
      handleLocalBulkDeleteSupplierContactorContent,
      handleSupplierContactorPagination,
      handleSupplierContactorTableChange,
      loadSupplierContactorList,
      model,
      supplierContactorFilter,
      supplierContactorList,
      supplierContactorRef,
      supplierContactorTotal,
      supplierContractorColumns,
    ]
  );
  const { childrenAction } = useSupplierFooterHook(
    translate,
    model,
    handleGoBase,
    handleSave
  );
  return (
    <div className="page page__detail">
      <div className="page__header d-flex align-items-center">
        {isDetail ? (
          <div className="page__title mr-1">
            {translate("suppliers.detail.title")}
          </div>
        ) : (
          translate("suppliers.detail.title")
        )}
      </div>
      <div className="page__detail-tabs">
        <>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col lg={12} className="gutter-row">
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
                  header={"Thông tin chung"}
                  key="1"
                  className="site-collapse-custom-panel"
                >
                  <Row>
                    <Col lg={24}>
                      <div className="upload-file__container">
                        <UploadFile />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={24} className="pr-3 mt-3">
                      <FormItem
                        label={translate("suppliers.name")}
                        validateStatus={formService.getValidationStatus<
                          Supplier
                        >(model.errors, nameof(model.name))}
                        message={model.errors?.name}
                        isRequired={true}
                      >
                        <InputText
                          isMaterial={true}
                          value={model.name}
                          placeHolder={translate("suppliers.placeholder.name")}
                          className={"tio-shopping"}
                          onChange={handleChangeSimpleField(nameof(model.name))}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={12} className="pr-3 mt-3">
                      <FormItem
                        label={translate("suppliers.code")}
                        validateStatus={formService.getValidationStatus<
                          Supplier
                        >(model.errors, nameof(model.code))}
                        message={model.errors?.code}
                        isRequired={true}
                      >
                        <InputText
                          isMaterial={true}
                          value={model.code}
                          placeHolder={translate("suppliers.placeholder.code")}
                          className={"tio-format_bullets"}
                          onChange={handleChangeSimpleField(nameof(model.code))}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={12} className="pr-3 mt-3">
                      <FormItem
                        label={translate("suppliers.taxCode")}
                        validateStatus={formService.getValidationStatus<
                          Supplier
                        >(model.errors, nameof(model.taxCode))}
                        message={model.errors?.taxCode}
                      >
                        <InputText
                          isMaterial={true}
                          value={model.taxCode}
                          placeHolder={translate(
                            "suppliers.placeholder.taxCode"
                          )}
                          className={"tio-receipt_outlined"}
                          onChange={handleChangeSimpleField(
                            nameof(model.taxCode)
                          )}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={12} className="pr-3 mt-3">
                      <FormItem
                        label={translate("suppliers.phone")}
                        validateStatus={formService.getValidationStatus<
                          Supplier
                        >(model.errors, nameof(model.phone))}
                        message={model.errors?.phone}
                      >
                        <InputText
                          isMaterial={true}
                          value={model.phone}
                          placeHolder={translate("suppliers.placeholder.phone")}
                          className={"tio-call"}
                          onChange={handleChangeSimpleField(
                            nameof(model.phone)
                          )}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={12} className="mt-5">
                      <FormItem>
                        <SwitchStatus
                          checked={
                            model.statusId === statusList[1]?.id ? true : false
                          }
                          list={statusList}
                          onChange={handleChangeObjectField(
                            nameof(model.status)
                          )}
                        />
                        <span className="component__title ml-2">
                          {translate("suppliers.status")}
                        </span>
                      </FormItem>
                    </Col>
                    <Col lg={24} className="pr-3 mt-3">
                      <FormItem
                        label={translate("suppliers.description")}
                        validateStatus={formService.getValidationStatus<
                          Supplier
                        >(model.errors, nameof(model.description))}
                        message={model.errors?.description}
                      >
                        <InputText
                          isMaterial={true}
                          value={model.description}
                          placeHolder={translate(
                            "suppliers.placeholder.description"
                          )}
                          className={"tio-comment_text_outlined"}
                          onChange={handleChangeSimpleField(
                            nameof(model.description)
                          )}
                        />
                      </FormItem>
                    </Col>
                  </Row>
                </Panel>
              </Collapse>
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
                      header={translate("suppliers.titles.address")}
                      key="1"
                      className="site-collapse-custom-panel"
                    >
                      <Row>
                        <Col lg={24}>
                          <Radio.Group
                            onChange={handleChangeRadio}
                            value={codeNation}
                          >
                            <Radio value="VNM">
                              {translate("suppliers.nations.vietnam")}
                            </Radio>
                            <Radio value="OTHER">
                              {translate("suppliers.nations.other")}
                            </Radio>
                          </Radio.Group>
                        </Col>

                        {codeNation === "VNM" ? (
                          <>
                            <Col lg={24} className="pr-3 mt-3">
                              <FormItem
                                label={translate("suppliers.address")}
                                validateStatus={formService.getValidationStatus<
                                  Supplier
                                >(model.errors, nameof(model.address))}
                                message={model.errors?.address}
                              >
                                <InputText
                                  isMaterial={true}
                                  value={model.address}
                                  placeHolder={translate(
                                    "suppliers.placeholder.address"
                                  )}
                                  className={"tio-send_outlined"}
                                  onChange={handleChangeSimpleField(
                                    nameof(model.address)
                                  )}
                                />
                              </FormItem>
                            </Col>
                            <Col lg={24} className="pr-3 mt-3">
                              <FormItem
                                label={translate("suppliers.province")}
                                validateStatus={formService.getValidationStatus<
                                  Supplier
                                >(model.errors, nameof(model.province))}
                                message={model.errors?.province}
                              >
                                <Select
                                  isMaterial={true}
                                  classFilter={ProvinceFilter}
                                  placeHolder={translate(
                                    "suppliers.placeholder.province"
                                  )}
                                  getList={
                                    supplierRepository.singleListProvince
                                  }
                                  onChange={handleChangeProvince}
                                  model={model.province}
                                />
                              </FormItem>
                            </Col>
                            <Col lg={24} className="pr-3 mt-3">
                              <FormItem
                                label={translate("suppliers.district")}
                                validateStatus={formService.getValidationStatus<
                                  Supplier
                                >(model.errors, nameof(model.district))}
                                message={model.errors?.district}
                              >
                                <Select
                                  isMaterial={true}
                                  classFilter={DistrictFilter}
                                  placeHolder={translate(
                                    "suppliers.placeholder.district"
                                  )}
                                  getList={
                                    supplierRepository.singleListDistrict
                                  }
                                  onChange={handleChangeDistrict}
                                  model={model.district}
                                  modelFilter={districtFilter}
                                />
                              </FormItem>
                            </Col>
                            <Col lg={24} className="pr-3 mt-3">
                              <FormItem
                                label={translate("suppliers.ward")}
                                validateStatus={formService.getValidationStatus<
                                  Supplier
                                >(model.errors, nameof(model.ward))}
                                message={model.errors?.ward}
                              >
                                <Select
                                  isMaterial={true}
                                  classFilter={WardFilter}
                                  placeHolder={translate(
                                    "suppliers.placeholder.ward"
                                  )}
                                  getList={supplierRepository.singleListWard}
                                  onChange={handleChangeObjectField(
                                    nameof(model.ward)
                                  )}
                                  model={model.ward}
                                  modelFilter={wardFilter}
                                />
                              </FormItem>
                            </Col>
                          </>
                        ) : (
                          <>
                            <Col lg={24} className="pr-3 mt-3">
                              <FormItem
                                label={translate("suppliers.nation")}
                                validateStatus={formService.getValidationStatus<
                                  Supplier
                                >(model.errors, nameof(model.nation))}
                                message={model.errors?.nation}
                              >
                                <Select
                                  isMaterial={true}
                                  classFilter={NationFilter}
                                  placeHolder={translate(
                                    "suppliers.placeholder.nation"
                                  )}
                                  getList={supplierRepository.singleListNation}
                                  onChange={handleChangeNation}
                                  model={model.nation}
                                />
                              </FormItem>
                            </Col>
                            <Col lg={24} className="pr-3 mt-3">
                              <FormItem
                                label={translate("suppliers.address")}
                                validateStatus={formService.getValidationStatus<
                                  Supplier
                                >(model.errors, nameof(model.address))}
                                message={model.errors?.address}
                              >
                                <InputText
                                  isMaterial={true}
                                  value={model.address}
                                  placeHolder={translate(
                                    "suppliers.placeholder.address"
                                  )}
                                  className={"tio-send_outlined"}
                                  onChange={handleChangeSimpleField(
                                    nameof(model.address)
                                  )}
                                />
                              </FormItem>
                            </Col>
                          </>
                        )}
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
                      header={translate("suppliers.titles.category")}
                      key="1"
                      className="site-collapse-custom-panel"
                    >
                      <Row>
                        <Col lg={24} className="mt-3">
                          <FormItem
                            label={translate("suppliers.category")}
                            validateStatus={formService.getValidationStatus<
                              Supplier
                            >(model.errors, nameof(model.category))}
                            message={model.errors?.category}
                          >
                            <TreeSelect
                              isMaterial={true}
                              checkable={true}
                              placeHolder={translate(
                                "suppliers.placeholder.category"
                              )}
                              selectable={false}
                              classFilter={CategoryFilter}
                              onChange={handleChangeChangeCategory}
                              checkStrictly={true}
                              getTreeData={
                                supplierRepository.singleListCategory
                              }
                              listItem={
                                model.supplierCategoryMappings &&
                                model.supplierCategoryMappings.map(
                                  (current: SupplierCategoryMapping) =>
                                    current.category
                                )
                              }
                              onlySelectLeaf={true}
                            />
                          </FormItem>
                        </Col>
                      </Row>
                    </Collapse.Panel>
                  </Collapse>
                </Col>
              </Row>
            </Col>
            <Col lg={6}>
              <Collapse
                defaultActiveKey={["1"]}
                onChange={() => { }}
                className="site-collapse-custom-collapse mr-3"
                expandIconPosition="right"
                expandIcon={({ isActive }) => (
                  <CaretRightOutlined rotate={isActive ? 90 : 0} />
                )}
              >
                <Collapse.Panel
                  header={translate("suppliers.titles.history")}
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
            <Col lg={12}>
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
                  header={translate("suppliers.titles.contact")}
                  key="1"
                  className="site-collapse-custom-panel mr-3"
                >
                  <Row>{supplierContactorTable}</Row>
                  <Row>
                    <div className="action__container">
                      <div
                        className="button__add mr-2"
                        onClick={handleAddSupplierContactorContent}
                      >
                        <span className="text-primary">
                          <i className="tio-add_circle_outlined mr-2"></i>
                          {translate("suppliers.button.addContactor")}
                        </span>
                      </div>
                    </div>
                    <FormItem
                      validateStatus={formService.getValidationStatus<
                        Supplier
                      >(model.errors, nameof(model.supplierContactors))}
                      message={model.errors?.supplierContactors}
                    >
                      {null}
                    </FormItem>
                  </Row>
                </Collapse.Panel>
              </Collapse>
            </Col>
          </Row>
        </>
        <AppFooter childrenAction={childrenAction}></AppFooter>
      </div>
    </div>
  );
}

export default SupplierDetail;
