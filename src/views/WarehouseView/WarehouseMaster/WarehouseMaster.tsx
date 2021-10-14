/* begin general import */
import { IdFilter, StringFilter } from "@react3l/advanced-filters";
import { Col, Dropdown, Menu, Row, Tooltip } from "antd";
import { ColumnProps } from "antd/lib/table";
import classNames from "classnames";
import AppMainMasterFilter from "components/AppMain/MasterPage/AppMainMasterFilter";
import { AppMainMasterTable } from "components/AppMain/MasterPage/AppMainMasterTable";
import { AppMainMasterTitle } from "components/AppMain/MasterPage/AppMainMasterTitle";
import AdvanceIdFilter from "components/Utility/AdvanceFilter/AdvanceIdFilter/AdvanceIdFilter";
/* end general import */
/* begin filter import */
import AdvanceStringFilter from "components/Utility/AdvanceFilter/AdvanceStringFilter/AdvanceStringFilter";
import AdvanceTreeFilter from "components/Utility/AdvanceFilter/AdvanceTreeFilter/AdvanceTreeFilter";
import { API_WAREHOUSE_PREFIX } from "config/api-consts";
import { WAREHOUSE_ROUTE } from "config/route-consts";
import { Organization, OrganizationFilter } from "models/Organization";
import { ProvinceFilter } from "models/Province";
import { Status, StatusFilter } from "models/Status";
import { WarehouseFilter } from "models/Warehouse";
import { Warehouse } from "models/Warehouse/Warehouse";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
/* end filter import */
/* begin individual import */
import { warehouseRepository } from "repositories/warehouse-repository";
import authenticationService from "services/authentication-service";
import masterService, { UseMaster } from "services/pages/master-service";
import { getAntOrderType } from "services/table-service";
import nameof from "ts-nameof.macro";
import WarehousePreview from "./WarehousePreview";
/* end individual import */

function WarehouseMaster() {
  const [translate] = useTranslation();
  const { validAction } = authenticationService.useAction(
    "warehouse",
    API_WAREHOUSE_PREFIX
  );

  const master: UseMaster = masterService.useMaster<Warehouse, WarehouseFilter>(
    WarehouseFilter,
    WAREHOUSE_ROUTE,
    warehouseRepository.list,
    warehouseRepository.count,
    warehouseRepository.delete,
    warehouseRepository.bulkDelete
  );
  master.rowSelection = null;

  const {
    isOpenPreview,
    isLoadingPreview,
    previewModel,
    handleOpenPreview,
    handleClosePreview,
  } = masterService.usePreview<Warehouse>(Warehouse, warehouseRepository.get);

  const filterChildren = React.useMemo(
    () => (
      <div className="search__container mt-4">
        <Row justify="space-between">
          <Col lg={4}>
            <AdvanceStringFilter
              title={translate("warehouses.code")}
              value={master.filter[nameof(master.list[0].code)]["contain"]}
              onEnter={master.handleChangeFilter(
                nameof(master.list[0].code),
                "contain" as any,
                StringFilter
              )}
              placeHolder={translate("warehouses.placeholder.code")}
              isMaterial={true}
            />
          </Col>
          {/* <Col lg={4}>
            <AdvanceStringFilter
              title={translate("warehouses.name")}
              value={master.filter[nameof(master.list[0].name)]["contain"]}
              onEnter={master.handleChangeFilter(
                nameof(master.list[0].name),
                "contain" as any,
                StringFilter
              )}
              placeHolder={translate("warehouses.placeholder.name")}
              isMaterial={true}
            />
          </Col> */}

          <Col lg={4}>
            <AdvanceTreeFilter
              title={translate("warehouses.organization")}
              placeHolder={translate("warehouses.placeholder.organization")}
              classFilter={OrganizationFilter}
              onChangeSingleItem={master.handleChangeFilter(
                nameof(master.list[0].organization),
                "equal" as any,
                IdFilter
              )}
              checkStrictly={true}
              getTreeData={warehouseRepository.singleListOrganization}
              isMaterial={true}
            />
          </Col>
          <Col lg={4}>
            <AdvanceStringFilter
              title={translate("warehouses.address")}
              value={master.filter[nameof(master.list[0].address)]["contain"]}
              onEnter={master.handleChangeFilter(
                nameof(master.list[0].address),
                "contain" as any,
                StringFilter
              )}
              placeHolder={translate("warehouses.placeholder.address")}
              isMaterial={true}
            />
          </Col>
          <Col lg={4}>
            <AdvanceIdFilter
              title={translate("warehouses.status")}
              value={master.filter[nameof(master.list[0].statusId)]["equal"]}
              onChange={master.handleChangeFilter(
                nameof(master.list[0].statusId),
                "equal" as any,
                IdFilter
              )}
              classFilter={StatusFilter}
              getList={warehouseRepository.singleListStatus}
              placeHolder={translate("warehouses.placeholder.status")}
              isMaterial={true}
            />
          </Col>
        </Row>
        <Row justify="space-between">
          <Col lg={4}>
            <AdvanceIdFilter
              title={translate("warehouses.province")}
              value={master.filter[nameof(master.list[0].provinceId)]["equal"]}
              onChange={master.handleChangeFilter(
                nameof(master.list[0].provinceId),
                "equal" as any,
                IdFilter
              )}
              classFilter={ProvinceFilter}
              getList={warehouseRepository.singleListProvince}
              placeHolder={translate("warehouses.placeholder.province")}
              isMaterial={true}
            />
          </Col>
          <Col lg={4}>
            <AdvanceIdFilter
              title={translate("warehouses.district")}
              value={master.filter[nameof(master.list[0].districtId)]["equal"]}
              onChange={master.handleChangeFilter(
                nameof(master.list[0].districtId),
                "equal" as any,
                IdFilter
              )}
              classFilter={ProvinceFilter}
              getList={warehouseRepository.singleListProvince}
              placeHolder={translate("warehouses.placeholder.district")}
              isMaterial={true}
            />
          </Col>
          <Col lg={4}>
            <AdvanceIdFilter
              title={translate("warehouses.ward")}
              value={master.filter[nameof(master.list[0].wardId)]["equal"]}
              onChange={master.handleChangeFilter(
                nameof(master.list[0].wardId),
                "equal" as any,
                IdFilter
              )}
              classFilter={ProvinceFilter}
              getList={warehouseRepository.singleListProvince}
              placeHolder={translate("warehouses.placeholder.ward")}
              isMaterial={true}
            />
          </Col>
          <Col lg={4} />
          <Col lg={4} />
        </Row>
      </div>
    ),
    [master, translate]
  );

  const menu = React.useCallback(
    (id: number, product: Warehouse) => (
      <Menu>
        <Menu.Item key="1">
          <Tooltip title={translate("general.actions.view")}>
            <div className="ant-action-menu" onClick={handleOpenPreview(id)}>
              {translate("general.actions.view")}
            </div>
          </Tooltip>
        </Menu.Item>
        {validAction("update") && (
          <Menu.Item key="2">
            <Tooltip title={translate("general.actions.edit")}>
              <div
                className="ant-action-menu"
                onClick={master.handleGoDetail(id)}
              >
                {translate("general.actions.edit")}
              </div>
            </Tooltip>
          </Menu.Item>
        )}
        {!product.used && validAction("delete") && (
          <Menu.Item key="3">
            <Tooltip title={translate("general.actions.delete")}>
              <div
                className="ant-action-menu"
                onClick={() => master.handleServerDelete(product)}
              >
                {translate("general.actions.delete")}
              </div>
            </Tooltip>
          </Menu.Item>
        )}
      </Menu>
    ),
    [handleOpenPreview, master, translate, validAction]
  );

  const columns: ColumnProps<Warehouse>[] = useMemo(
    () => [
      {
        title: (
          <div className="text-center gradient-text">
            {translate("warehouses.name")}
          </div>
        ),
        key: nameof(master.list[0].name),
        dataIndex: nameof(master.list[0].name),
        sorter: true,
        sortOrder: getAntOrderType<Warehouse, WarehouseFilter>(
          master.filter,
          nameof(master.list[0].name)
        ),
        render(name: string) {
          return (
            <div className="ant-cell-master__container">
              <div className={classNames("cell-master__first-row")}>{name}</div>
              <div className="cell-master__second-row">
                {translate("warehouses.name")}
              </div>
            </div>
          );
        },
      },
      {
        title: (
          <div className="text-center gradient-text">
            {translate("warehouses.code")}
          </div>
        ),
        key: nameof(master.list[0].code),
        dataIndex: nameof(master.list[0].code),
        sorter: true,
        sortOrder: getAntOrderType<Warehouse, WarehouseFilter>(
          master.filter,
          nameof(master.list[0].code)
        ),
        render(code: string, warehouse: Warehouse) {
          return (
            <div className="ant-cell-master__container">
              <div
                className={classNames(
                  "cell-master__first-row",
                  "first-row--link",
                  {
                    "first-row--ellipsis": code && code.length >= 30,
                  }
                )}
              >
                <div onClick={handleOpenPreview(warehouse.id)}>{code}</div>
              </div>
              <div className="cell-master__second-row">
                {translate("warehouses.code")}
              </div>
            </div>
          );
        },
      },
      {
        title: (
          <div className="text-center gradient-text">
            {translate("warehouses.organization")}
          </div>
        ),
        key: nameof(master.list[0].organization),
        dataIndex: nameof(master.list[0].organization),
        sorter: true,
        sortOrder: getAntOrderType<Warehouse, WarehouseFilter>(
          master.filter,
          nameof(master.list[0].organization)
        ),

        render(organization: Organization) {
          return (
            <div className="ant-cell-master__container">
              <div className={classNames("cell-master__first-row")}>
                {organization?.name}
              </div>
              <div className="cell-master__second-row">
                {translate("warehouses.organization")}
              </div>
            </div>
          );
        },
      },
      {
        title: (
          <div className="text-center gradient-text">
            {translate("warehouses.address")}
          </div>
        ),
        key: nameof(master.list[0].address),
        dataIndex: nameof(master.list[0].address),
        sorter: true,
        sortOrder: getAntOrderType<Warehouse, WarehouseFilter>(
          master.filter,
          nameof(master.list[0].address)
        ),
        render(address: string) {
          return (
            <div className="ant-cell-master__container">
              <div className={classNames("cell-master__first-row")}>
                {address}
              </div>
              <div className="cell-master__second-row">
                {translate("warehouses.address")}
              </div>
            </div>
          );
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("warehouses.status")}
          </div>
        ),
        key: nameof(master.list[0].status),
        dataIndex: nameof(master.list[0].status),
        align: "center",
        sorter: true,
        width: 200,
        ellipsis: true,
        sortOrder: getAntOrderType<Warehouse, WarehouseFilter>(
          master.filter,
          nameof(master.list[0].status)
        ),
        render(status: Status) {
          return (
            <div className={status.id === 1 ? "tag--active" : "tag--inactive"}>
              {status?.name}
            </div>
          );
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("general.actions.label")}
          </div>
        ),
        key: "action",
        dataIndex: nameof(master.list[0].id),
        fixed: "right",
        width: 150,
        align: "center",
        render(id: number, product: Warehouse) {
          return (
            <div className="d-flex justify-content-center button-action-table">
              <Dropdown overlay={menu(id, product)} trigger={["click"]}>
                <span className="action__dots">...</span>
              </Dropdown>
            </div>
          );
        },
      },
    ],
    [translate, master.list, master.filter, handleOpenPreview, menu]
  );

  return (
    <>
      <div className="page page__master">
        <AppMainMasterTitle {...master}>
          {translate("warehouses.master.title")}
        </AppMainMasterTitle>
        <AppMainMasterFilter
          {...master}
          repository={warehouseRepository}
          translate={translate}
          isMaterialActionAdvance={true}
        //   validAction={validAction}
        >
          {filterChildren}
        </AppMainMasterFilter>
        <AppMainMasterTable
          {...master}
          translate={translate}
          columns={columns}
          isDragable={true}
          rowSelection={master.rowSelection}
        >
          {translate("warehouses.table.title")}
        </AppMainMasterTable>
      </div>
      <WarehousePreview
        previewModel={previewModel}
        isOpenPreview={isOpenPreview}
        isLoadingPreview={isLoadingPreview}
        handleClosePreview={handleClosePreview}
        handleGoDetail={master.handleGoDetail}
        translate={translate}
      />
    </>
  );
}

export default WarehouseMaster;
