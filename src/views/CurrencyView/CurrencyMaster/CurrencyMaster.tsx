/* begin general import */
import { StringFilter } from "@react3l/advanced-filters";
import { Col, Dropdown, Menu, Row, Tooltip } from "antd";
import { ColumnProps } from "antd/lib/table";
import classNames from "classnames";
import { AppMainMasterFilter } from "components/AppMain/MasterPage/AppMainMasterFilter";
import { AppMainMasterTable } from "components/AppMain/MasterPage/AppMainMasterTable";
import { AppMainMasterTitle } from "components/AppMain/MasterPage/AppMainMasterTitle";
/* end general import */
/* begin filter import */
import AdvanceStringFilter from "components/Utility/AdvanceFilter/AdvanceStringFilter/AdvanceStringFilter";
import { API_CURRENCY_PREFIX } from "config/api-consts";
import { Currency, CurrencyFilter } from "models/Currency";
import { Status } from "models/Status";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
/* end filter import */
/* begin individual import */
import { currencyRepository } from "repositories/currency-repository";
import authenticationService from "services/authentication-service";
import detailService from "services/pages/detail-service";
import masterService, { UseMaster } from "services/pages/master-service";
import { getAntOrderType } from "services/table-service";
import nameof from "ts-nameof.macro";
import CurrencyDetailModal from "../CurrencyDetail/CurrencyDetailModal";
import CurrencyPreview from "./CurrencyPreview";
/* end individual import */

function CurrencyMaster() {
  const [translate] = useTranslation();
  const { validAction } = authenticationService.useAction('currency', API_CURRENCY_PREFIX);

  const master: UseMaster = masterService.useMaster<Currency, CurrencyFilter>(
    CurrencyFilter,
    "",
    currencyRepository.list,
    currencyRepository.count,
    currencyRepository.delete,
    currencyRepository.bulkDelete
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
  } = masterService.usePreview<Currency>(Currency, currencyRepository.get);

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
    Currency,
    currencyRepository.get,
    currencyRepository.save,
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
    (id: number, currency: Currency) => (
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
        {!currency.used && validAction('delete') && (
          <Menu.Item key="3">
            <Tooltip title={translate("general.actions.delete")}>
              <div
                className="ant-action-menu"
                onClick={() => master.handleServerDelete(currency)}
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

  const columns: ColumnProps<Currency>[] = useMemo(
    () => [
      {
        title: (
          <div className="text-center gradient-text">
            {translate("currencys.code")}
          </div>
        ),
        key: nameof(master.list[0].code),
        dataIndex: nameof(master.list[0].code),
        sorter: true,
        sortOrder: getAntOrderType<Currency, CurrencyFilter>(
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
                {translate("currencys.code")}
              </div>
            </div>
          );
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("currencys.name")}
          </div>
        ),
        key: nameof(master.list[0].name),
        dataIndex: nameof(master.list[0].name),
        sorter: true,
        sortOrder: getAntOrderType<Currency, CurrencyFilter>(
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
                {translate("currencys.name")}
              </div>
            </div>
          );
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("currencys.status")}
          </div>
        ),
        key: nameof(master.list[0].status),
        dataIndex: nameof(master.list[0].status),
        sorter: true,
        sortOrder: getAntOrderType<Currency, CurrencyFilter>(
          master.filter,
          nameof(master.list[0].status)
        ),
        width: 200,
        align: "center",
        render(status: Status) {
          return (
            <div className="d-flex justify-content-center">
              <div className={status.id === 1 ? "tag--active" : "tag--inactive"}>
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
        width: 150,
        align: "center",
        render(id: number, currency: Currency) {
          return (
            <div className="d-flex justify-content-center button-action-table">
              <Dropdown overlay={menu(id, currency)} trigger={["click"]}>
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
          <label className="label">{translate("currencys.code")}</label>
          <AdvanceStringFilter
            value={master.filter[nameof(master.list[0].code)]["contain"]}
            onEnter={master.handleChangeFilter(
              nameof(master.list[0].code),
              "contain" as any,
              StringFilter
            )}
            placeHolder={translate("currencys.placeholder.code")}
            isMaterial={true}
          />
        </Col>

        <Col lg={4} className="pr-4">
          <label className="label">{translate("currencys.name")}</label>
          <AdvanceStringFilter
            value={master.filter[nameof(master.list[0].name)]["contain"]}
            onEnter={master.handleChangeFilter(
              nameof(master.list[0].name),
              "contain" as any,
              StringFilter
            )}
            placeHolder={translate("currencys.placeholder.name")}
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
          {translate("currencys.master.title")}
        </AppMainMasterTitle>
        <AppMainMasterFilter
          {...master}
          repository={currencyRepository}
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
          {translate("currencys.table.title")}
        </AppMainMasterTable>
      </div>
      <CurrencyPreview
        previewModel={previewModel}
        isOpenPreview={isOpenPreview}
        isLoadingPreview={isLoadingPreview}
        handleClosePreview={handleClosePreview}
        handleGoDetail={master.handleGoDetail}
        translate={translate}
      />
      {isOpenDetailModal &&
        <CurrencyDetailModal
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

export default CurrencyMaster;
