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
import UnitOfMeasurePreview from "./UnitOfMeasurePreview";
/* end general import */

/* begin filter import */
import AdvanceStringFilter from "components/Utility/AdvanceFilter/AdvanceStringFilter/AdvanceStringFilter";
import { StringFilter } from "@react3l/advanced-filters";
import AdvanceIdFilter from "components/Utility/AdvanceFilter/AdvanceIdFilter/AdvanceIdFilter";
import { IdFilter } from "@react3l/advanced-filters";
/* end filter import */

/* begin individual import */
import { unitOfMeasureRepository } from "repositories/unit-of-measure-repository";
import { UnitOfMeasure, UnitOfMeasureFilter } from "models/UnitOfMeasure";
import { Status, StatusFilter } from "models/Status";
import UnitOfMeasureDetailModal from "../UnitOfMeasureDetail/UnitOfMeasureDetailModal";
import detailService from "services/pages/detail-service";
import classNames from "classnames";
import authenticationService from "services/authentication-service";
import { API_UNIT_OF_MEASURE_PREFIX } from "config/api-consts";
/* end individual import */

function UnitOfMeasureMaster() {
  const [translate] = useTranslation();
  const { validAction } = authenticationService.useAction('unitOfMeasure', API_UNIT_OF_MEASURE_PREFIX);

  const master: UseMaster = masterService.useMaster<
    UnitOfMeasure,
    UnitOfMeasureFilter
  >(
    UnitOfMeasureFilter,
    "",
    unitOfMeasureRepository.list,
    unitOfMeasureRepository.count,
    unitOfMeasureRepository.delete,
    unitOfMeasureRepository.bulkDelete
  );

  const {
    isOpenPreview,
    isLoadingPreview,
    previewModel,
    handleOpenPreview,
    handleClosePreview,
  } = masterService.usePreview<UnitOfMeasure>(
    UnitOfMeasure,
    unitOfMeasureRepository.get
  );

  const {
    model,
    isOpenDetailModal,
    handleOpenDetailModal,
    handleCloseDetailModal,
    handleSaveModel,
    loadingModel,
    handleChangeSimpleField,
    handleChangeObjectField,
    dispatch,
  } = detailService.useDetailModal(
    UnitOfMeasure,
    unitOfMeasureRepository.get,
    unitOfMeasureRepository.save,
    master.handleSearch
  );

  master.handleGoCreate = React.useCallback(() => {
    handleClosePreview();
    handleOpenDetailModal(null);
  }, [handleClosePreview, handleOpenDetailModal]);

  master.handleGoDetail = React.useCallback(
    (id: number) => () => {
      handleClosePreview();
      handleOpenDetailModal(id);
    },
    [handleClosePreview, handleOpenDetailModal]
  );

  const rowSelection = React.useMemo(() => {
    if (validAction('bulkDelete')) return master.rowSelection;
    else return null;
  }, [master.rowSelection, validAction]);

  const menu = React.useCallback(
    (id: number, unitOfMeasure: UnitOfMeasure) => (
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
        {!unitOfMeasure.used && validAction('delete') && (
          <Menu.Item key="3">
            <Tooltip title={translate("general.actions.delete")}>
              <div
                className="ant-action-menu"
                onClick={() => master.handleServerDelete(unitOfMeasure)}
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

  const columns: ColumnProps<UnitOfMeasure>[] = useMemo(
    () => [
      {
        title: (
          <div className="text-center gradient-text">
            {translate("unitOfMeasures.name")}
          </div>
        ),
        key: nameof(master.list[0].name),
        dataIndex: nameof(master.list[0].name),
        sorter: true,
        sortOrder: getAntOrderType<UnitOfMeasure, UnitOfMeasureFilter>(
          master.filter,
          nameof(master.list[0].name)
        ),
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
                {translate("unitOfMeasures.name")}
              </div>
            </div>
          );
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("unitOfMeasures.code")}
          </div>
        ),
        key: nameof(master.list[0].code),
        dataIndex: nameof(master.list[0].code),
        sorter: true,
        sortOrder: getAntOrderType<UnitOfMeasure, UnitOfMeasureFilter>(
          master.filter,
          nameof(master.list[0].code)
        ),
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
                {translate("unitOfMeasures.code")}
              </div>
            </div>
          );
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("unitOfMeasures.status")}
          </div>
        ),
        key: nameof(master.list[0].status),
        dataIndex: nameof(master.list[0].status),
        sorter: true,
        align: "center",
        sortOrder: getAntOrderType<UnitOfMeasure, UnitOfMeasureFilter>(
          master.filter,
          nameof(master.list[0].status)
        ),
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
        render(id: number, unitOfMeasure: UnitOfMeasure) {
          return (
            <div className="d-flex justify-content-center button-action-table">
              <Dropdown overlay={menu(id, unitOfMeasure)} trigger={["click"]}>
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
          <label className="label">{translate("unitOfMeasures.code")}</label>
          <AdvanceStringFilter
            value={master.filter[nameof(master.list[0].code)]["contain"]}
            onEnter={master.handleChangeFilter(
              nameof(master.list[0].code),
              "contain" as any,
              StringFilter
            )}
            placeHolder={translate("unitOfMeasures.placeholder.code")}
            isMaterial={true}
          />
        </Col>

        <Col lg={4} className="pr-4">
          <label className="label">{translate("unitOfMeasures.name")}</label>
          <AdvanceStringFilter
            value={master.filter[nameof(master.list[0].name)]["contain"]}
            onEnter={master.handleChangeFilter(
              nameof(master.list[0].name),
              "contain" as any,
              StringFilter
            )}
            placeHolder={translate("unitOfMeasures.placeholder.name")}
            isMaterial={true}
          />
        </Col>

        <Col lg={4} className="pr-4">
          <label className="label">{translate("unitOfMeasures.status")}</label>
          <AdvanceIdFilter
            value={master.filter[nameof(master.list[0].statusId)]["equal"]}
            onChange={master.handleChangeFilter(
              nameof(master.list[0].statusId),
              "equal" as any,
              IdFilter
            )}
            classFilter={StatusFilter}
            getList={unitOfMeasureRepository.filterListStatus}
            placeHolder={translate("unitOfMeasures.placeholder.status")}
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
          {translate("unitOfMeasures.master.title")}
        </AppMainMasterTitle>
        <AppMainMasterFilter
          {...master}
          repository={unitOfMeasureRepository}
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
          {translate("unitOfMeasures.table.title")}
        </AppMainMasterTable>
      </div>
      <UnitOfMeasurePreview
        previewModel={previewModel}
        isOpenPreview={isOpenPreview}
        isLoadingPreview={isLoadingPreview}
        handleClosePreview={handleClosePreview}
        handleGoDetail={master.handleGoDetail}
        translate={translate}
      />
      {isOpenDetailModal &&
        <UnitOfMeasureDetailModal
          model={model}
          visible={isOpenDetailModal}
          handleSave={handleSaveModel}
          handleCancel={handleCloseDetailModal}
          onChangeSimpleField={handleChangeSimpleField}
          onChangeObjectField={handleChangeObjectField}
          dispatchModel={dispatch}
          loading={loadingModel}
          visibleFooter={true}
        />
      }
    </>
  );
}

export default UnitOfMeasureMaster;
