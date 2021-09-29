/* begin general import */
import {
  IdFilter,
  NumberFilter,
  StringFilter,
} from "@react3l/advanced-filters";
import { Col, Dropdown, Menu, Row, Tooltip } from "antd";
import { ColumnProps } from "antd/lib/table";
import classNames from "classnames";
import { AppMainMasterFilter } from "components/AppMain/MasterPage/AppMainMasterFilter";
import { AppMainMasterTable } from "components/AppMain/MasterPage/AppMainMasterTable";
import { AppMainMasterTitle } from "components/AppMain/MasterPage/AppMainMasterTitle";
import AdvanceIdFilter from "components/Utility/AdvanceFilter/AdvanceIdFilter/AdvanceIdFilter";
import AdvanceNumberFilter from "components/Utility/AdvanceFilter/AdvanceNumberFilter/AdvanceNumberFilter";
/* end general import */
/* begin filter import */
import AdvanceStringFilter from "components/Utility/AdvanceFilter/AdvanceStringFilter/AdvanceStringFilter";
import { API_TAX_TYPE_PREFIX } from "config/api-consts";
import { Status, StatusFilter } from "models/Status";
import { TaxType, TaxTypeFilter } from "models/TaxType";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
/* end filter import */
/* begin individual import */
import { taxTypeRepository } from "repositories/tax-type-repository";
import authenticationService from "services/authentication-service";
import detailService from "services/pages/detail-service";
import masterService, { UseMaster } from "services/pages/master-service";
import { getAntOrderType } from "services/table-service";
import nameof from "ts-nameof.macro";
import TaxTypeDetailModal from "../TaxTypeDetail/TaxTypeDetailModal";
import TaxTypePreview from "./TaxTypePreview";
/* end individual import */

function TaxTypeMaster() {
  const [translate] = useTranslation();
  const { validAction } = authenticationService.useAction('taxType', API_TAX_TYPE_PREFIX);

  const master: UseMaster = masterService.useMaster<TaxType, TaxTypeFilter>(
    TaxTypeFilter,
    "",
    taxTypeRepository.list,
    taxTypeRepository.count,
    taxTypeRepository.delete,
    taxTypeRepository.bulkDelete
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
  } = masterService.usePreview<TaxType>(TaxType, taxTypeRepository.get);

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
    TaxType,
    taxTypeRepository.get,
    taxTypeRepository.save,
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
    (id: number, taxType: TaxType) => (
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
        {!taxType.used && validAction('delete') && (
          <Menu.Item key="3">
            <Tooltip title={translate("general.actions.delete")}>
              <div
                className="ant-action-menu"
                onClick={() => master.handleServerDelete(taxType)}
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

  const columns: ColumnProps<TaxType>[] = useMemo(
    () => [
      {
        title: (
          <div className="text-center gradient-text">
            {translate("taxTypes.code")}
          </div>
        ),
        key: nameof(master.list[0].code),
        dataIndex: nameof(master.list[0].code),
        sorter: true,
        // width: 150,
        sortOrder: getAntOrderType<TaxType, TaxTypeFilter>(
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
                {translate("taxTypes.code")}
              </div>
            </div>
          );
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("taxTypes.percentage")}
          </div>
        ),
        key: nameof(master.list[0].percentage),
        dataIndex: nameof(master.list[0].percentage),
        sorter: true,
        // width: 100,
        sortOrder: getAntOrderType<TaxType, TaxTypeFilter>(
          master.filter,
          nameof(master.list[0].percentage)
        ),
        render(...[percentage]) {
          return (
            <div className="ant-cell-master__container">
              <div
                className={classNames("cell-master__first-row", {
                  "first-row--ellipsis": percentage && percentage.length >= 30,
                })}
              >
                {percentage}
              </div>
              <div className="cell-master__second-row">
                {translate("taxTypes.percentage")}
              </div>
            </div>
          );
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("taxTypes.status")}
          </div>
        ),
        key: nameof(master.list[0].status),
        dataIndex: nameof(master.list[0].status),
        sorter: true,
        // width: 100,
        align: "center",
        sortOrder: getAntOrderType<TaxType, TaxTypeFilter>(
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
        render(id: number, taxType: TaxType) {
          return (
            <div className="d-flex justify-content-center button-action-table">
              <Dropdown overlay={menu(id, taxType)} trigger={["click"]}>
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
        <Col lg={4} className="pr-4 ">
          <label className="label">{translate("taxTypes.code")}</label>
          <AdvanceStringFilter
            value={master.filter[nameof(master.list[0].code)]["contain"]}
            onEnter={master.handleChangeFilter(
              nameof(master.list[0].code),
              "contain" as any,
              StringFilter
            )}
            placeHolder={translate("taxTypes.placeholder.code")}
            isMaterial={true}
          />
        </Col>
        <Col lg={4} className="pr-4">
          <label className="label">{translate("taxTypes.percentage")}</label>
          <AdvanceNumberFilter
            value={master.filter[nameof(master.list[0].percentage)]["equal"]}
            onEnter={master.handleChangeFilter(
              nameof(master.list[0].percentage),
              "equal" as any,
              NumberFilter
            )}
            placeHolder={translate("taxTypes.placeholder.percentage")}
            isMaterial={true}
          />
        </Col>

        <Col lg={4} className="pr-4">
          <label className="label">{translate("taxTypes.status")}</label>
          <AdvanceIdFilter
            value={master.filter[nameof(master.list[0].statusId)]["equal"]}
            onChange={master.handleChangeFilter(
              nameof(master.list[0].statusId),
              "equal" as any,
              IdFilter
            )}
            classFilter={StatusFilter}
            getList={taxTypeRepository.filterListStatus}
            placeHolder={translate("taxTypes.placeholder.status")}
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
          {translate("taxTypes.master.title")}
        </AppMainMasterTitle>
        <AppMainMasterFilter
          {...master}
          repository={taxTypeRepository}
          translate={translate}
          validAction={validAction}
        >
          {filterChildren}
        </AppMainMasterFilter>
        <AppMainMasterTable {...master} translate={translate} columns={columns} rowSelection={rowSelection}>
          {translate("taxTypes.table.title")}
        </AppMainMasterTable>
      </div>
      <TaxTypePreview
        previewModel={previewModel}
        isOpenPreview={isOpenPreview}
        isLoadingPreview={isLoadingPreview}
        handleClosePreview={handleClosePreview}
        handleGoDetail={master.handleGoDetail}
        translate={translate}
      />
      {isOpenDetailModal &&
        <TaxTypeDetailModal
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

export default TaxTypeMaster;
