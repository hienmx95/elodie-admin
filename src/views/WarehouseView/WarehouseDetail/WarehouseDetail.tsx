/* begin general import */
import { CaretRightOutlined } from "@ant-design/icons";
import { Col, Collapse, Row } from "antd";
import classNames from "classnames";
import AppFooter from "components/AppFooter/AppFooter";
import ContentTable from "components/Utility/ContentTable/ContentTable";
import FormItem from "components/Utility/FormItem/FormItem";
/* end general import */
/* begin individual import */
import InputText from "components/Utility/Input/InputText/InputText";
import Select from "components/Utility/Select/Select";
import SwitchStatus from "components/Utility/SwitchStatus/SwitchStatus";
import TreeSelect from "components/Utility/TreeSelect/TreeSelect";
import { WAREHOUSE_ROUTE } from "config/route-consts";
import { DistrictFilter } from "models/District";
import { OrganizationFilter } from "models/Organization";
import { ProvinceFilter } from "models/Province";
import { Status } from "models/Status";
import { WardFilter } from "models/Ward";
import { Warehouse } from "models/Warehouse/Warehouse";
import React from "react";
import { useTranslation } from "react-i18next";
import { warehouseRepository } from "repositories/warehouse-repository";
import { enumService } from "services/enum-service";
import { formService } from "services/form-service";
import detailService from "services/pages/detail-service";
import nameof from "ts-nameof.macro";
import { useInventoryTable } from "./InventoryHook";
import { useWarehouseFooter } from "./WarehouseFooterHook";
import { useWarehouseItem, WarehouseItemModal } from "./WarehouseItemHook";
/* end individual import */

const { Panel } = Collapse;

function WarehouseDetail() {
  const [translate] = useTranslation();

  const [districtFilter, setDistrictFilter] = React.useState<DistrictFilter>(
    new DistrictFilter()
  );

  const [wardFilter, setWardFilter] = React.useState<WardFilter>(
    new WardFilter()
  );

  const [statusList] = enumService.useEnumList<Status>(
    warehouseRepository.singleListStatus
  );

  const {
    model,
    loading,
    handleUpdateNewModel,
    isDetail,
    handleChangeSimpleField,
    handleChangeTreeObjectField,
    handleChangeObjectField,
    handleGoBase,
    handleSave,
  } = detailService.useDetail<Warehouse>(
    Warehouse,
    warehouseRepository.get,
    warehouseRepository.save,
    WAREHOUSE_ROUTE
  );

  const {
    inventoryFilter,
    inventoryContentColumns,
    inventoryList,
    loadInventoryList,
    inventoryTotal,
    handleAddInventory,
    handleInventoryTableChange,
    handleInventoryPagination,
    canBulkDeleteInventory,
    handleLocalBulkDeleteInventory,
    inventoryRef,
    handleClickInventory,
    handleImportInventory,
    handleExportInventory,
    handleExportTemplateInventory,
    handleChangeAllRowContent,
  } = useInventoryTable(model, handleUpdateNewModel);

  const pPFInventoryTable = React.useMemo(
    () => (
      <ContentTable
        model={model}
        filter={inventoryFilter}
        list={inventoryList}
        loadingList={loadInventoryList}
        total={inventoryTotal}
        handleTableChange={handleInventoryTableChange}
        rowSelection={null}
        handleLocalBulkDelete={handleLocalBulkDeleteInventory}
        canBulkDelete={canBulkDeleteInventory}
        handleExportContent={handleExportInventory}
        handleExportTemplateContent={handleExportTemplateInventory}
        handlePagination={handleInventoryPagination}
        handleAddContent={handleAddInventory}
        ref={inventoryRef}
        handleClick={handleClickInventory}
        handleImportContentList={handleImportInventory}
        columns={inventoryContentColumns}
        hasAddContentInline={true}
        isShowTitle={false}
        isShowFooter={false}
      />
    ),
    [
      model,
      inventoryFilter,
      inventoryList,
      loadInventoryList,
      inventoryTotal,
      handleInventoryTableChange,
      handleLocalBulkDeleteInventory,
      canBulkDeleteInventory,
      handleExportInventory,
      handleExportTemplateInventory,
      handleInventoryPagination,
      handleAddInventory,
      inventoryRef,
      handleClickInventory,
      handleImportInventory,
      inventoryContentColumns,
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
  } = useWarehouseItem(handleChangeAllRowContent, model.inventories);

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

  const { childrenAction } = useWarehouseFooter(
    translate,
    model,
    handleSave,
    handleGoBase,
    loading,
  );



  return (
    <>
      <div className="page page__detail">
        <div className="page__header d-flex align-items-center">
          {isDetail ? (
            <div className="page__title mr-1">
              {translate("warehouses.detail.title")}
            </div>
          ) : (
            translate("general.actions.create")
          )}
        </div>
        <div className="w-100 mt-3 page__detail-tabs">
          <Row className="d-flex">
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
                <Panel
                  header={translate("Thông tin chung")}
                  key="1"
                  className="site-collapse-custom-panel"
                >
                  <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col lg={6} className="gutter">
                      <FormItem
                        label={translate("warehouses.code")}
                        validateStatus={formService.getValidationStatus<
                          Warehouse
                        >(model.errors, nameof(model.code))}
                        message={model.errors?.code}
                        isRequired={true}
                      >
                        <InputText
                          isMaterial={true}
                          value={model.code}
                          placeHolder={translate("warehouses.placeholder.code")}
                          className={"tio-layers"}
                          onBlur={handleChangeSimpleField(nameof(model.code))}
                          disabled
                        />
                      </FormItem>
                    </Col>
                    <Col lg={6} className="gutter">
                      <FormItem
                        label={translate("warehouses.name")}
                        validateStatus={formService.getValidationStatus<
                          Warehouse
                        >(model.errors, nameof(model.name))}
                        message={model.errors?.name}
                        isRequired={true}
                      >
                        <InputText
                          isMaterial={true}
                          value={model.name}
                          placeHolder={translate("warehouses.placeholder.name")}
                          className={"tio-labels_outlined"}
                          onBlur={handleChangeSimpleField(nameof(model.name))}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={6} className="gutter">
                      <FormItem
                        label={translate("warehouses.organization")}
                        validateStatus={formService.getValidationStatus<
                          Warehouse
                        >(model.errors, nameof(model.organization))}
                        message={model.errors?.organizationId}
                        isRequired={true}
                      >
                        <TreeSelect
                          isMaterial={true}
                          placeHolder={translate(
                            "warehouses.placeholder.organization"
                          )}
                          selectable={true}
                          classFilter={OrganizationFilter}
                          onChange={handleChangeTreeObjectField(
                            nameof(model.organization)
                          )}
                          checkStrictly={true}
                          getTreeData={
                            warehouseRepository.singleListOrganization
                          }
                          item={model.organization}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={6} className="gutter">
                      <FormItem
                        label={translate("tradeConditions.status")}
                        validateStatus={formService.getValidationStatus<
                          Warehouse
                        >(model.errors, nameof(model.status))}
                        message={model.errors?.status}
                      >
                        <SwitchStatus
                          checked={
                            model.statusId === statusList[1]?.id ? true : false
                          }
                          list={statusList}
                          onChange={handleChangeObjectField(
                            nameof(model.status)
                          )}
                        />
                      </FormItem>
                    </Col>
                  </Row>
                  <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col lg={6} className="gutter">
                      <FormItem
                        label={translate("warehouses.address")}
                        validateStatus={formService.getValidationStatus<
                          Warehouse
                        >(model.errors, nameof(model.address))}
                        message={model.errors?.address}
                        isRequired={true}
                      >
                        <InputText
                          isMaterial={true}
                          value={model.address}
                          placeHolder={translate(
                            "warehouses.placeholder.address"
                          )}
                          className={"tio-layers"}
                          onBlur={handleChangeSimpleField(
                            nameof(model.address)
                          )}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={6} className="gutter">
                      <FormItem
                        label={translate("warehouses.province")}
                        validateStatus={formService.getValidationStatus<
                          Warehouse
                        >(model.errors, nameof(model.province))}
                        message={model.errors?.province}
                      >
                        <Select
                          isMaterial={true}
                          classFilter={ProvinceFilter}
                          placeHolder={translate(
                            "warehouses.placeholder.province"
                          )}
                          getList={warehouseRepository.singleListProvince}
                          onChange={handleChangeProvince}
                          model={model.province}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={6} className="gutter">
                      <FormItem
                        label={translate("warehouses.district")}
                        validateStatus={formService.getValidationStatus<
                          Warehouse
                        >(model.errors, nameof(model.district))}
                        message={model.errors?.district}
                      >
                        <Select
                          isMaterial={true}
                          classFilter={DistrictFilter}
                          placeHolder={translate(
                            "warehouses.placeholder.district"
                          )}
                          getList={warehouseRepository.singleListDistrict}
                          onChange={handleChangeDistrict}
                          model={model.district}
                          modelFilter={districtFilter}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={6} className="gutter">
                      <FormItem
                        label={translate("warehouses.ward")}
                        validateStatus={formService.getValidationStatus<
                          Warehouse
                        >(model.errors, nameof(model.ward))}
                        message={model.errors?.ward}
                      >
                        <Select
                          isMaterial={true}
                          classFilter={WardFilter}
                          placeHolder={translate("warehouses.placeholder.ward")}
                          getList={warehouseRepository.singleListWard}
                          onChange={handleChangeObjectField(nameof(model.ward))}
                          model={model.ward}
                          modelFilter={wardFilter}
                        />
                      </FormItem>
                    </Col>
                  </Row>
                </Panel>
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
                <Panel
                  header={translate("Sản phẩm")}
                  key="1"
                  className="site-collapse-custom-panel"
                >
                  <Row>
                    <Col lg={24} className="table-content-detail">{pPFInventoryTable}</Col>
                  </Row>
                  <Row>
                    <div className="action__container">
                      <div
                        className={classNames("button__add ")}
                        onClick={handleOpenItem}
                      >
                        <span className="text-primary">
                          <i className="tio-add_circle_outlined"></i> Thêm sản
                          phẩm
                        </span>
                      </div>
                      <FormItem
                        validateStatus={formService.getValidationStatus<
                          Warehouse
                        >(model.errors, nameof(model.ppfInventories))}
                        message={model.errors?.ppfInventories}
                      >
                        {null}
                      </FormItem>
                    </div>
                  </Row>
                </Panel>
              </Collapse>
            </Col>
          </Row>
        </div>
      </div>
      <WarehouseItemModal
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
      <AppFooter childrenAction={childrenAction}></AppFooter>
    </>
  );
}

export default WarehouseDetail;
