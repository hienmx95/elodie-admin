/* begin general import */
import { IdFilter, StringFilter } from "@react3l/advanced-filters";
import { Col, Dropdown, Menu, Row, Tooltip } from "antd";
import { ColumnProps } from "antd/lib/table";
import classNames from "classnames";
import { AppMainMasterFilter } from "components/AppMain/MasterPage/AppMainMasterFilter";
import { AppMainMasterTable } from "components/AppMain/MasterPage/AppMainMasterTable";
import { AppMainMasterTitle } from "components/AppMain/MasterPage/AppMainMasterTitle";
import AdvanceIdFilter from "components/Utility/AdvanceFilter/AdvanceIdFilter/AdvanceIdFilter";
/* end general import */
/* begin filter import */
import AdvanceStringFilter from "components/Utility/AdvanceFilter/AdvanceStringFilter/AdvanceStringFilter";
import { API_SUPPLIER_PREFIX } from "config/api-consts";
import { SUPPLIER_ROUTE } from "config/route-consts";
import { District, DistrictFilter } from "models/District";
import { ProvinceFilter } from "models/Province";
import { Status, StatusFilter } from "models/Status";
import { Supplier, SupplierFilter } from "models/Supplier";
import { Ward, WardFilter } from "models/Ward";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
/* end filter import */
/* begin individual import */
import { supplierRepository } from "repositories/supplier-repository";
import authenticationService from "services/authentication-service";
import masterService, { UseMaster } from "services/pages/master-service";
import { getAntOrderType } from "services/table-service";
import nameof from "ts-nameof.macro";
import SupplierPreview from "./SupplierPreview";
/* end individual import */

function SupplierMaster() {
  const [translate] = useTranslation();
  const { validAction } = authenticationService.useAction('supplier', API_SUPPLIER_PREFIX);

  const master: UseMaster = masterService.useMaster<Supplier, SupplierFilter>(
    SupplierFilter,
    SUPPLIER_ROUTE,
    supplierRepository.list,
    supplierRepository.count,
    supplierRepository.delete,
    supplierRepository.bulkDelete
  );
  const rowSelection = React.useMemo(() => {
    if (validAction('bulkDelete')) return master.rowSelection;
    else return null;
  }, [master.rowSelection, validAction]);
  const {
    isOpenPreview,
    isLoadingPreview,
    previewModel,
    handleOpenPreview,
    handleClosePreview,
  } = masterService.usePreview<Supplier>(Supplier, supplierRepository.get);

  const menu = React.useCallback(
    (id: number, supplier: Supplier) => (
      <Menu>
        <Menu.Item key="1">
          <Tooltip title={translate("general.actions.view")}>
            <div className="ant-action-menu" onClick={handleOpenPreview(id)}>
              {translate("general.actions.view")}
            </div>
          </Tooltip>
        </Menu.Item>
        {validAction('update') &&
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
        }
        {!supplier.used && validAction('delete') && (
          <Menu.Item key="3">
            <Tooltip title={translate("general.actions.delete")}>
              <div
                className="ant-action-menu"
                onClick={() => master.handleServerDelete(supplier)}
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

  const columns: ColumnProps<Supplier>[] = useMemo(
    () => [
      {
        title: (
          <div className="text-left gradient-text">
            {translate("suppliers.name")}
          </div>
        ),
        key: nameof(master.list[0].name),
        dataIndex: nameof(master.list[0].name),
        sorter: true,
        sortOrder: getAntOrderType<Supplier, SupplierFilter>(
          master.filter,
          nameof(master.list[0].name)
        ),
        render(...[, supplier]) {
          return (
            <div className="product-cell-master__wapper">
              <div className="supplier-image">
                {supplier?.supplierImageMappings &&
                  supplier?.supplierImageMappings.length > 0 &&
                  supplier.supplierImageMappings.map(
                    (supplierImageMappings, index) => {
                      return (
                        <img
                          key={index}
                          src={supplierImageMappings?.image?.url}
                          width="48"
                          height="48"
                          alt=""
                        />
                      );
                    }
                  )}
              </div>
              <div className="ant-cell-master__container">
                <div
                  className={classNames("cell-master__first-row", {
                    "first-row--ellipsis":
                      supplier?.name && supplier?.name.length >= 10,
                  })}
                >
                  {supplier?.name}
                </div>
                <div className="cell-master__second-row">{supplier?.code}</div>
              </div>
            </div>
          );
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("suppliers.taxCode")}
          </div>
        ),
        key: nameof(master.list[0].taxCode),
        dataIndex: nameof(master.list[0].taxCode),
        sorter: true,
        sortOrder: getAntOrderType<Supplier, SupplierFilter>(
          master.filter,
          nameof(master.list[0].taxCode)
        ),
        render(...[taxCode]) {
          return (
            <div className="ant-cell-master__container">
              <div
                className={classNames("cell-master__first-row", {
                  "first-row--ellipsis": taxCode && taxCode.length >= 30,
                })}
              >
                {taxCode}
              </div>
              {taxCode && (
                <div className="cell-master__second-row">
                  {translate("suppliers.taxCode")}
                </div>
              )}
            </div>
          ); //fill the render field after generate code;
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("suppliers.address")}
          </div>
        ),
        key: nameof(master.list[0].address),
        dataIndex: nameof(master.list[0].address),
        sorter: true,
        sortOrder: getAntOrderType<Supplier, SupplierFilter>(
          master.filter,
          nameof(master.list[0].address)
        ),
        render(...[address]) {
          return (
            <div className="ant-cell-master__container">
              <div
                className={classNames("cell-master__first-row", {
                  "first-row--ellipsis": address && address.length >= 30,
                })}
              >
                {address}
              </div>
              {address && (
                <div className="cell-master__second-row">
                  {translate("suppliers.address")}
                </div>
              )}
            </div>
          ); //fill the render field after generate code;
        },
      },
      {
        title: (
          <div className="text-center gradient-text">
            {translate("suppliers.province")}
          </div>
        ),
        key: nameof(master.list[0].province),
        dataIndex: nameof(master.list[0].province),
        sorter: true,
        sortOrder: getAntOrderType<Supplier, SupplierFilter>(
          master.filter,
          nameof(master.list[0].province)
        ),
        render(...[province]) {
          return (
            <div className="ant-cell-master__container">
              <div className={classNames("cell-master__first-row")}>
                {province?.name}
              </div>
              {province && (
                <div className="cell-master__second-row">
                  {translate("suppliers.province")}
                </div>
              )}
            </div>
          ); //fill the render field after generate code;
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("suppliers.district")}
          </div>
        ),
        key: nameof(master.list[0].district),
        dataIndex: nameof(master.list[0].district),
        sorter: true,
        sortOrder: getAntOrderType<Supplier, SupplierFilter>(
          master.filter,
          nameof(master.list[0].district)
        ),
        render(district: District) {
          return (
            <div className="ant-cell-master__container">
              <div className={classNames("cell-master__first-row")}>
                {district?.name}
              </div>
              {district && (
                <div className="cell-master__second-row">
                  {translate("suppliers.district")}
                </div>
              )}
            </div>
          ); //fill the render field after generate code;
        },
      },
      {
        title: (
          <div className="text-center gradient-text">
            {translate("suppliers.ward")}
          </div>
        ),
        key: nameof(master.list[0].ward),
        dataIndex: nameof(master.list[0].ward),
        sorter: true,
        sortOrder: getAntOrderType<Supplier, SupplierFilter>(
          master.filter,
          nameof(master.list[0].ward)
        ),
        render(ward: Ward) {
          return (
            <div className="ant-cell-master__container">
              <div className={classNames("cell-master__first-row")}>
                {ward?.name}
              </div>
              {ward && (
                <div className="cell-master__second-row">
                  {translate("suppliers.ward")}
                </div>
              )}
            </div>
          ); //fill the render field after generate code;
        },
      },
      {
        title: (
          <div className="text-center gradient-text">
            {translate("suppliers.status")}
          </div>
        ),
        key: nameof(master.list[0].status),
        dataIndex: nameof(master.list[0].status),
        sorter: true,
        sortOrder: getAntOrderType<Supplier, SupplierFilter>(
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
        width: 200,
        align: "center",
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
        width: 80,
        align: "center",
        render(id: number, supplier: Supplier) {
          return (
            <div className="d-flex justify-content-center button-action-table">
              <Dropdown overlay={menu(id, supplier)} trigger={["click"]}>
                <span className="action__dots">...</span>
              </Dropdown>
            </div>
          );
        },
      },
    ],
    [translate, master, menu]
  );

  const filterChildren = React.useMemo(
    () => (
      <div className="search__container mt-4">
        <Row justify="space-between">
          <Col lg={4} className="mt-3">
            <label className="label">{translate("suppliers.address")}</label>
            <AdvanceStringFilter
              value={master.filter[nameof(master.list[0].address)]["contain"]}
              onEnter={master.handleChangeFilter(
                nameof(master.list[0].address),
                "contain" as any,
                StringFilter
              )}
              placeHolder={translate("suppliers.placeholder.address")}
              isMaterial={true}
              className="tio-search"
            />
          </Col>
          <Col lg={4} className="mt-3">
            <label className="label">{translate("suppliers.province")}</label>
            <AdvanceIdFilter
              value={master.filter[nameof(master.list[0].provinceId)]["equal"]}
              onChange={master.handleChangeFilter(
                nameof(master.list[0].provinceId),
                "equal" as any,
                IdFilter
              )}
              classFilter={ProvinceFilter}
              getList={supplierRepository.filterListProvince}
              placeHolder={translate("suppliers.placeholder.province")}
              isMaterial={true}
            />
          </Col>
          <Col lg={4} className="mt-3">
            <label className="label">{translate("suppliers.district")}</label>
            <AdvanceIdFilter
              value={master.filter[nameof(master.list[0].districtId)]["equal"]}
              onChange={master.handleChangeFilter(
                nameof(master.list[0].districtId),
                "equal" as any,
                IdFilter
              )}
              classFilter={DistrictFilter}
              getList={supplierRepository.filterListDistrict}
              placeHolder={translate("suppliers.placeholder.district")}
              isMaterial={true}
            />
          </Col>
          <Col lg={4} className="mt-3">
            <label className="label">{translate("suppliers.ward")}</label>
            <AdvanceIdFilter
              value={master.filter[nameof(master.list[0].wardId)]["equal"]}
              onChange={master.handleChangeFilter(
                nameof(master.list[0].wardId),
                "equal" as any,
                IdFilter
              )}
              classFilter={WardFilter}
              getList={supplierRepository.filterListWard}
              placeHolder={translate("suppliers.placeholder.ward")}
              isMaterial={true}
            />
          </Col>
          <Col lg={4} className="mt-3">
            <label className="label">{translate("suppliers.status")}</label>
            <AdvanceIdFilter
              value={master.filter[nameof(master.list[0].statusId)]["equal"]}
              onChange={master.handleChangeFilter(
                nameof(master.list[0].statusId),
                "equal" as any,
                IdFilter
              )}
              classFilter={StatusFilter}
              getList={supplierRepository.filterListStatus}
              placeHolder={translate("suppliers.placeholder.status")}
              isMaterial={true}
            />
          </Col>
        </Row>
        <Row justify="space-between">
          <Col lg={4} className="mt-3">
            <label className="label">{translate("suppliers.name")}</label>
            <AdvanceStringFilter
              value={master.filter[nameof(master.list[0].name)]["contain"]}
              onEnter={master.handleChangeFilter(
                nameof(master.list[0].name),
                "contain" as any,
                StringFilter
              )}
              placeHolder={translate("suppliers.placeholder.name")}
              isMaterial={true}
              className="tio-search"
            />
          </Col>
          <Col lg={4} className="mt-3">
            <label className="label">{translate("suppliers.code")}</label>
            <AdvanceStringFilter
              value={master.filter[nameof(master.list[0].code)]["contain"]}
              onEnter={master.handleChangeFilter(
                nameof(master.list[0].code),
                "contain" as any,
                StringFilter
              )}
              placeHolder={translate("suppliers.placeholder.code")}
              isMaterial={true}
              className="tio-search"
            />
          </Col>

          <Col lg={4} className="mt-3">
            <label className="label">{translate("suppliers.phone")}</label>
            <AdvanceStringFilter
              value={master.filter[nameof(master.list[0].phone)]["contain"]}
              onEnter={master.handleChangeFilter(
                nameof(master.list[0].phone),
                "contain" as any,
                StringFilter
              )}
              placeHolder={translate("suppliers.placeholder.phone")}
              isMaterial={true}
              className="tio-search"
            />
          </Col>

          <Col lg={4} className="mt-3">
            <label className="label">{translate("suppliers.email")}</label>
            <AdvanceStringFilter
              value={master.filter[nameof(master.list[0].email)]["contain"]}
              onEnter={master.handleChangeFilter(
                nameof(master.list[0].email),
                "contain" as any,
                StringFilter
              )}
              placeHolder={translate("suppliers.placeholder.email")}
              isMaterial={true}
              className="tio-search"
            />
          </Col>

          <Col lg={4} className="mt-3">
            <label className="label">{translate("suppliers.taxCode")}</label>
            <AdvanceStringFilter
              value={master.filter[nameof(master.list[0].taxCode)]["contain"]}
              onEnter={master.handleChangeFilter(
                nameof(master.list[0].taxCode),
                "contain" as any,
                StringFilter
              )}
              placeHolder={translate("suppliers.placeholder.taxCode")}
              isMaterial={true}
              className="tio-search"
            />
          </Col>
        </Row>
      </div>
    ),
    [master, translate]
  );

  return (
    <>
      <div className="page page__master">
        <AppMainMasterTitle {...master}>
          {translate("suppliers.master.title")}
        </AppMainMasterTitle>
        <AppMainMasterFilter
          {...master}
          repository={supplierRepository}
          translate={translate}
          validAction={validAction}
        >
          {filterChildren}
        </AppMainMasterFilter>
        <AppMainMasterTable
          {...master}
          translate={translate}
          columns={columns}
          rowSelection={rowSelection}
        >
          {translate("suppliers.table.title")}
        </AppMainMasterTable>
      </div>
      <SupplierPreview
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

export default SupplierMaster;
