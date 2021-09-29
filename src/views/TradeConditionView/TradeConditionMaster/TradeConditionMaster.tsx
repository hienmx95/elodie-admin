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
import { API_TRADE_CONDITION_PREFIX } from "config/api-consts";
import { Status, StatusFilter } from "models/Status";
import { TradeCondition, TradeConditionFilter } from "models/TradeCondition";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
/* end filter import */
/* begin individual import */
import { tradeConditionRepository } from "repositories/trade-condition-repository";
import authenticationService from "services/authentication-service";
import detailService from "services/pages/detail-service";
import masterService, { UseMaster } from "services/pages/master-service";
import { getAntOrderType } from "services/table-service";
import nameof from "ts-nameof.macro";
import TradeConditionDetailModal from "../TradeConditionDetail/TradeConditionDetailModal";
import TradeConditionPreview from "./TradeConditionPreview";
/* end individual import */

function TradeConditionMaster() {
  const [translate] = useTranslation();
  const { validAction } = authenticationService.useAction('tradeCondition', API_TRADE_CONDITION_PREFIX);

  const master: UseMaster = masterService.useMaster<
    TradeCondition,
    TradeConditionFilter
  >(
    TradeConditionFilter,
    "",
    tradeConditionRepository.list,
    tradeConditionRepository.count,
    tradeConditionRepository.delete,
    tradeConditionRepository.bulkDelete
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
  } = masterService.usePreview<TradeCondition>(
    TradeCondition,
    tradeConditionRepository.get
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
    TradeCondition,
    tradeConditionRepository.get,
    tradeConditionRepository.save,
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

  const menu = React.useCallback(
    (id: number, tradeCondition: TradeCondition) => (
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
        {!tradeCondition.used && validAction('delete') && (
          <Menu.Item key="3">
            <Tooltip title={translate("general.actions.delete")}>
              <div
                className="ant-action-menu"
                onClick={() => master.handleServerDelete(tradeCondition)}
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

  const columns: ColumnProps<TradeCondition>[] = useMemo(
    () => [
      {
        title: (
          <div className="text-center gradient-text">
            {translate("tradeConditions.name")}
          </div>
        ),
        key: nameof(master.list[0].name),
        dataIndex: nameof(master.list[0].name),
        sorter: true,
        sortOrder: getAntOrderType<TradeCondition, TradeConditionFilter>(
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
                {translate("tradeConditions.name")}
              </div>
            </div>
          );
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("tradeConditions.description")}
          </div>
        ),
        key: nameof(master.list[0].description),
        dataIndex: nameof(master.list[0].description),
        sorter: true,
        sortOrder: getAntOrderType<TradeCondition, TradeConditionFilter>(
          master.filter,
          nameof(master.list[0].description)
        ),
        render(...[description]) {
          return (
            <div className="ant-cell-master__container">
              <div
                className={classNames("cell-master__first-row", {
                  "first-row--ellipsis":
                    description && description.length >= 30,
                })}
              >
                {description}
              </div>
              <div className="cell-master__second-row">
                {translate("tradeConditions.description")}
              </div>
            </div>
          );
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("tradeConditions.status")}
          </div>
        ),
        key: nameof(master.list[0].status),
        dataIndex: nameof(master.list[0].status),
        sorter: true,
        sortOrder: getAntOrderType<TradeCondition, TradeConditionFilter>(
          master.filter,
          nameof(master.list[0].status)
        ),
        width: 200,
        align: "center",
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
        render(id: number, tradeCondition: TradeCondition) {
          return (
            <div className="d-flex justify-content-center button-action-table">
              <Dropdown overlay={menu(id, tradeCondition)} trigger={["click"]}>
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
      <Row className="mt-4 search__container" justify="space-between">
        <Col lg={4} className="pr-4">
          <label className="label">{translate("tradeConditions.name")}</label>
          <AdvanceStringFilter
            value={master.filter[nameof(master.list[0].name)]["contain"]}
            onEnter={master.handleChangeFilter(
              nameof(master.list[0].name),
              "contain" as any,
              StringFilter
            )}
            placeHolder={translate("tradeConditions.placeholder.name")}
            isMaterial={true}
          />
        </Col>

        <Col lg={4} className="pr-4">
          <label className="label">
            {translate("tradeConditions.description")}
          </label>
          <AdvanceStringFilter
            value={master.filter[nameof(master.list[0].description)]["contain"]}
            onEnter={master.handleChangeFilter(
              nameof(master.list[0].description),
              "contain" as any,
              StringFilter
            )}
            placeHolder={translate("tradeConditions.placeholder.description")}
            isMaterial={true}
          />
        </Col>

        <Col lg={4} className="pr-4">
          <label className="label">{translate("tradeConditions.status")}</label>
          <AdvanceIdFilter
            value={master.filter[nameof(master.list[0].statusId)]["equal"]}
            onChange={master.handleChangeFilter(
              nameof(master.list[0].statusId),
              "equal" as any,
              IdFilter
            )}
            classFilter={StatusFilter}
            getList={tradeConditionRepository.filterListStatus}
            placeHolder={translate("tradeConditions.placeholder.status")}
            isMaterial={true}
          />
        </Col>
        <Col lg={4}></Col>
        <Col lg={4}></Col>
      </Row>
    ),
    [master, translate]
  );

  return (
    <>
      <div className="page page__master">
        <AppMainMasterTitle {...master}>
          {translate("tradeConditions.master.title")}
        </AppMainMasterTitle>
        <AppMainMasterFilter
          {...master}
          repository={tradeConditionRepository}
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
          {translate("tradeConditions.table.title")}
        </AppMainMasterTable>
      </div>
      <TradeConditionPreview
        previewModel={previewModel}
        isOpenPreview={isOpenPreview}
        isLoadingPreview={isLoadingPreview}
        handleClosePreview={handleClosePreview}
        handleGoDetail={master.handleGoDetail}
        translate={translate}
      />
      {isOpenDetailModal && <TradeConditionDetailModal
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

export default TradeConditionMaster;
