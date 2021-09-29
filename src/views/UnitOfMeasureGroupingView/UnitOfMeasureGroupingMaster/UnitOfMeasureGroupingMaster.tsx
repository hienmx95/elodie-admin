/* begin general import */
import React, { useMemo } from "react";
import { Col, Row, Tooltip, Menu, Dropdown } from "antd";
import { ColumnProps } from "antd/lib/table";
import { useTranslation } from "react-i18next";
import masterService, { UseMaster } from "services/pages/master-service";
import { getAntOrderType } from "services/table-service";
import nameof from "ts-nameof.macro";
import { AppMainMasterTitle } from "components/AppMain/MasterPage/AppMainMasterTitle";
import { AppMainMasterFilter } from "components/AppMain/MasterPage/AppMainMasterFilter";
import { AppMainMasterTable } from "components/AppMain/MasterPage/AppMainMasterTable";
import UnitOfMeasureGroupingPreview from "./UnitOfMeasureGroupingPreview";
/* end general import */

/* begin filter import */
import AdvanceStringFilter from "components/Utility/AdvanceFilter/AdvanceStringFilter/AdvanceStringFilter";
import { StringFilter } from "@react3l/advanced-filters";
import AdvanceIdFilter from "components/Utility/AdvanceFilter/AdvanceIdFilter/AdvanceIdFilter";
import { IdFilter } from "@react3l/advanced-filters";
/* end filter import */

/* begin individual import */
import { unitOfMeasureGroupingRepository } from "repositories/unit-of-measure-grouping-repository";
import {
  UnitOfMeasureGrouping,
  UnitOfMeasureGroupingFilter,
} from "models/UnitOfMeasureGrouping";
import { Status, StatusFilter } from "models/Status";
import { UnitOfMeasure, UnitOfMeasureFilter } from "models/UnitOfMeasure";
import classNames from "classnames";
import { UNIT_OF_MEASURE_GROUPING_ROUTE } from "config/route-consts";
import authenticationService from "services/authentication-service";
import { API_UNIT_OF_MEASURE_GROUPING_PREFIX } from "config/api-consts";
/* end individual import */

function UnitOfMeasureGroupingMaster() {
  const [translate] = useTranslation();
  const { validAction } = authenticationService.useAction('unitOfMeasureGrouping', API_UNIT_OF_MEASURE_GROUPING_PREFIX);

  const master: UseMaster = masterService.useMaster<
    UnitOfMeasureGrouping,
    UnitOfMeasureGroupingFilter
  >(
    UnitOfMeasureGroupingFilter,
    UNIT_OF_MEASURE_GROUPING_ROUTE,
    unitOfMeasureGroupingRepository.list,
    unitOfMeasureGroupingRepository.count,
    unitOfMeasureGroupingRepository.delete,
    unitOfMeasureGroupingRepository.bulkDelete
  );

  const {
    isOpenPreview,
    isLoadingPreview,
    previewModel,
    handleOpenPreview,
    handleClosePreview,
  } = masterService.usePreview<UnitOfMeasureGrouping>(
    UnitOfMeasureGrouping,
    unitOfMeasureGroupingRepository.get
  );
  const rowSelection = React.useMemo(() => {
    if (validAction('bulkDelete')) return master.rowSelection;
    else return null;
  }, [master.rowSelection, validAction]);
  const menu = React.useCallback(
    (id: number, unitOfMeasureGrouping: UnitOfMeasureGrouping) => (
      <Menu>
        <Menu.Item key="1">
          <Tooltip title={translate("general.actions.view")}>
            <div className="ant-action-menu" onClick={handleOpenPreview(id)}>
              {translate("general.actions.view")}
            </div>
          </Tooltip>
        </Menu.Item>
        {validAction('create') &&
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
        {!unitOfMeasureGrouping.used && validAction('delete') && (
          <Menu.Item key="3">
            <Tooltip title={translate("general.actions.delete")}>
              <div
                className="ant-action-menu"
                onClick={() => master.handleServerDelete(unitOfMeasureGrouping)}
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

  const columns: ColumnProps<UnitOfMeasureGrouping>[] = useMemo(
    () => [
      {
        title: (
          <div className="text-center gradient-text">
            {translate("unitOfMeasureGroupings.name")}
          </div>
        ),
        key: nameof(master.list[0].name),
        dataIndex: nameof(master.list[0].name),
        sorter: true,
        sortOrder: getAntOrderType<
          UnitOfMeasureGrouping,
          UnitOfMeasureGroupingFilter
        >(master.filter, nameof(master.list[0].name)),
        render(...[name]) {
          return (
            <div className="ant-cell-master__container">
              <div
                className={classNames("cell-master__first-row", {
                  "first-row--ellipsis": name && name.length >= 30,
                })}
              >
                {name}
              </div>
              <div className="cell-master__second-row">
                {translate("unitOfMeasureGroupings.name")}
              </div>
            </div>
          );
        },
      },
      {
        title: (
          <div className="text-center gradient-text">
            {translate("unitOfMeasureGroupings.code")}
          </div>
        ),
        key: nameof(master.list[0].code),
        dataIndex: nameof(master.list[0].code),
        sorter: true,
        sortOrder: getAntOrderType<
          UnitOfMeasureGrouping,
          UnitOfMeasureGroupingFilter
        >(master.filter, nameof(master.list[0].code)),
        render(...[code]) {
          return (
            <div className="ant-cell-master__container">
              <div
                className={classNames("cell-master__first-row", {
                  "first-row--ellipsis": code && code.length >= 30,
                })}
              >
                {code}
              </div>
              <div className="cell-master__second-row">
                {translate("unitOfMeasureGroupings.code")}
              </div>
            </div>
          ); //fill the render field after generate code;
        },
      },
      {
        title: (
          <div className="text-center gradient-text">
            {translate("unitOfMeasureGroupings.unitOfMeasure")}
          </div>
        ),
        key: nameof(master.list[0].unitOfMeasure),
        dataIndex: nameof(master.list[0].unitOfMeasure),
        sorter: true,
        sortOrder: getAntOrderType<
          UnitOfMeasureGrouping,
          UnitOfMeasureGroupingFilter
        >(master.filter, nameof(master.list[0].unitOfMeasure)),
        render(unitOfMeasure: UnitOfMeasure) {
          return (
            <div className="ant-cell-master__container">
              <div
                className={classNames("cell-master__first-row", {
                  "first-row--ellipsis":
                    unitOfMeasure?.name && unitOfMeasure?.name.length >= 30,
                })}
              >
                {unitOfMeasure.name}
              </div>
              <div className="cell-master__second-row">
                {translate("unitOfMeasureGroupings.unitOfMeasure")}
              </div>
            </div>
          ); //fill the render field after generate name;
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("unitOfMeasureGroupings.status")}
          </div>
        ),
        key: nameof(master.list[0].status),
        dataIndex: nameof(master.list[0].status),
        sorter: true,
        align: "center",
        sortOrder: getAntOrderType<
          UnitOfMeasureGrouping,
          UnitOfMeasureGroupingFilter
        >(master.filter, nameof(master.list[0].status)),
        render(status: Status) {
          return (
            <div className="d-flex justify-content-center">
              <div
                className={status.id === 1 ? "tag--active" : "tag--inactive"}
              >
                {status?.name}
              </div>
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
        width: 80,
        align: "center",
        render(id: number, unitOfMeasureGrouping: UnitOfMeasureGrouping) {
          return (
            <div className="d-flex justify-content-center button-action-table">
              <Dropdown
                overlay={menu(id, unitOfMeasureGrouping)}
                trigger={["click"]}
              >
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
      <Row className="mt-4 search__container">
        <Col lg={4} className="pr-4">
          <label className="label">
            {translate("unitOfMeasureGroupings.name")}
          </label>
          <AdvanceStringFilter
            value={master.filter[nameof(master.list[0].name)]["contain"]}
            onEnter={master.handleChangeFilter(
              nameof(master.list[0].name),
              "contain" as any,
              StringFilter
            )}
            placeHolder={translate("unitOfMeasureGroupings.placeholder.name")}
            isMaterial={true}
          />
        </Col>
        <Col lg={4} className="pr-4">
          <label className="label">
            {translate("unitOfMeasureGroupings.code")}
          </label>
          <AdvanceStringFilter
            value={master.filter[nameof(master.list[0].code)]["contain"]}
            onEnter={master.handleChangeFilter(
              nameof(master.list[0].code),
              "contain" as any,
              StringFilter
            )}
            placeHolder={translate("unitOfMeasureGroupings.placeholder.code")}
            isMaterial={true}
          />
        </Col>
        <Col lg={4} className="pr-4">
          <label className="label">
            {translate("unitOfMeasureGroupings.unitOfMeasure")}
          </label>
          <AdvanceIdFilter
            value={
              master.filter[nameof(master.list[0].unitOfMeasureId)]["equal"]
            }
            onChange={master.handleChangeFilter(
              nameof(master.list[0].unitOfMeasureId),
              "equal" as any,
              IdFilter
            )}
            classFilter={UnitOfMeasureFilter}
            getList={unitOfMeasureGroupingRepository.filterListUnitOfMeasure}
            placeHolder={translate(
              "unitOfMeasureGroupings.placeholder.unitOfMeasure"
            )}
            isMaterial={true}
          />
        </Col>
        <Col lg={4} className="pr-4">
          <label className="label">
            {translate("unitOfMeasureGroupings.status")}
          </label>
          <AdvanceIdFilter
            value={master.filter[nameof(master.list[0].statusId)]["equal"]}
            onChange={master.handleChangeFilter(
              nameof(master.list[0].statusId),
              "equal" as any,
              IdFilter
            )}
            classFilter={StatusFilter}
            getList={unitOfMeasureGroupingRepository.filterListStatus}
            placeHolder={translate("unitOfMeasureGroupings.placeholder.status")}
            isMaterial={true}
          />
        </Col>
      </Row>
    ),
    [master, translate]
  );

  return (
    <>
      <div className="page page__master">
        <AppMainMasterTitle {...master}>
          {translate("unitOfMeasureGroupings.master.title")}
        </AppMainMasterTitle>
        <AppMainMasterFilter
          {...master}
          repository={unitOfMeasureGroupingRepository}
          translate={translate}
          validAction={validAction}
        >
          {filterChildren}
        </AppMainMasterFilter>
        <AppMainMasterTable {...master} translate={translate} columns={columns} rowSelection={rowSelection}>
          {translate("unitOfMeasureGroupings.table.title")}
        </AppMainMasterTable>
      </div>
      <UnitOfMeasureGroupingPreview
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

export default UnitOfMeasureGroupingMaster;
