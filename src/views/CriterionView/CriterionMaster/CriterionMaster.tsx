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
import { API_CRITERION_PREFIX } from "config/api-consts";
import { Criterion, CriterionFilter } from "models/Criterion";
import { CriterionType, CriterionTypeFilter } from "models/CriterionType";
import { Status, StatusFilter } from "models/Status";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
/* end filter import */
/* begin individual import */
import { criterionRepository } from "repositories/criterion-repository";
import authenticationService from "services/authentication-service";
import detailService from "services/pages/detail-service";
import masterService, { UseMaster } from "services/pages/master-service";
import { getAntOrderType } from "services/table-service";
import nameof from "ts-nameof.macro";
import CriterionDetailModal from "../CriterionDetail/CriterionDetailModal";
import CriterionPreview from "./CriterionPreview";
/* end individual import */

function CriterionMaster() {
  const [translate] = useTranslation();
  const { validAction } = authenticationService.useAction('criterion', API_CRITERION_PREFIX);

  const master: UseMaster = masterService.useMaster<Criterion, CriterionFilter>(
    CriterionFilter,
    "",
    criterionRepository.list,
    criterionRepository.count,
    criterionRepository.delete,
    criterionRepository.bulkDelete
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
  } = masterService.usePreview<Criterion>(Criterion, criterionRepository.get);

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
    Criterion,
    criterionRepository.get,
    criterionRepository.save,
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
    (id: number, criterion: Criterion) => (
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
        {!criterion.used && validAction('delete') && (
          <Menu.Item key="3">
            <Tooltip title={translate("general.actions.delete")}>
              <div
                className="ant-action-menu"
                onClick={() => master.handleServerDelete(criterion)}
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

  const columns: ColumnProps<Criterion>[] = useMemo(
    () => [
      {
        title: (
          <div className="text-center gradient-text">
            {translate("criterions.name")}
          </div>
        ),
        key: nameof(master.list[0].name),
        dataIndex: nameof(master.list[0].name),
        sorter: true,
        sortOrder: getAntOrderType<Criterion, CriterionFilter>(
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
                {translate("criterions.name")}
              </div>
            </div>
          ); //fill the render field after generate code;
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("criterions.description")}
          </div>
        ),
        key: nameof(master.list[0].description),
        dataIndex: nameof(master.list[0].description),
        sorter: true,
        sortOrder: getAntOrderType<Criterion, CriterionFilter>(
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
                {translate("criterions.description")}
              </div>
            </div>
          ); //fill the render field after generate code;
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("criterions.criterionType")}
          </div>
        ),
        key: nameof(master.list[0].criterionType),
        dataIndex: nameof(master.list[0].criterionType),
        sorter: true,
        width: 150,
        sortOrder: getAntOrderType<Criterion, CriterionFilter>(
          master.filter,
          nameof(master.list[0].criterionType)
        ),
        render(criterionType: CriterionType) {
          return criterionType.name; //fill the render field after generate code;
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("criterions.status")}
          </div>
        ),
        key: nameof(master.list[0].status),
        dataIndex: nameof(master.list[0].status),
        sorter: true,
        sortOrder: getAntOrderType<Criterion, CriterionFilter>(
          master.filter,
          nameof(master.list[0].status)
        ),
        width: 200,
        align: "center",
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
        width: 80,
        align: "center",
        render(id: number, criterion: Criterion) {
          return (
            <div className="d-flex justify-content-center button-action-table">
              <Dropdown overlay={menu(id, criterion)} trigger={["click"]}>
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
      <Row justify="space-between" className="mt-4 search__container">
        <Col lg={4} className="pr-4">
          <label className="label">{translate("criterions.name")}</label>
          <AdvanceStringFilter
            value={master.filter[nameof(master.list[0].name)]["contain"]}
            onEnter={master.handleChangeFilter(
              nameof(master.list[0].name),
              "contain" as any,
              StringFilter
            )}
            placeHolder={translate("criterions.placeholder.name")}
            isMaterial={true}
          />
        </Col>

        <Col lg={4} className="pr-4">
          <label className="label">{translate("criterions.description")}</label>
          <AdvanceStringFilter
            value={master.filter[nameof(master.list[0].description)]["contain"]}
            onEnter={master.handleChangeFilter(
              nameof(master.list[0].description),
              "contain" as any,
              StringFilter
            )}
            placeHolder={translate("criterions.placeholder.description")}
            isMaterial={true}
          />
        </Col>

        <Col lg={4} className="pr-4">
          <label className="label">{translate("criterions.maxScore")}</label>
          <AdvanceNumberFilter
            value={master.filter[nameof(master.list[0].maxScore)]["equal"]}
            onEnter={master.handleChangeFilter(
              nameof(master.list[0].maxScore),
              "equal" as any,
              NumberFilter
            )}
            placeHolder={translate("criterions.placeholder.maxScore")}
            isMaterial={true}
          />
        </Col>

        <Col lg={4} className="pr-4">
          <label className="label">
            {translate("criterions.criterionType")}
          </label>
          <AdvanceIdFilter
            value={
              master.filter[nameof(master.list[0].criterionTypeId)]["equal"]
            }
            onChange={master.handleChangeFilter(
              nameof(master.list[0].criterionTypeId),
              "equal" as any,
              IdFilter
            )}
            classFilter={CriterionTypeFilter}
            getList={criterionRepository.filterListCriterionType}
            placeHolder={translate("criterions.placeholder.criterionType")}
            isMaterial={true}
          />
        </Col>

        <Col lg={4} className="pr-4">
          <label className="label">{translate("criterions.status")}</label>
          <AdvanceIdFilter
            value={master.filter[nameof(master.list[0].statusId)]["equal"]}
            onChange={master.handleChangeFilter(
              nameof(master.list[0].statusId),
              "equal" as any,
              IdFilter
            )}
            classFilter={StatusFilter}
            getList={criterionRepository.filterListStatus}
            placeHolder={translate("criterions.placeholder.status")}
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
          {translate("criterions.master.title")}
        </AppMainMasterTitle>
        <AppMainMasterFilter
          {...master}
          repository={criterionRepository}
          translate={translate}
          validAction={validAction}
        >
          {filterChildren}
        </AppMainMasterFilter>
        <AppMainMasterTable {...master} translate={translate} columns={columns} rowSelection={rowSelection}>
          {translate("criterions.table.title")}
        </AppMainMasterTable>
      </div>
      <CriterionPreview
        previewModel={previewModel}
        isOpenPreview={isOpenPreview}
        isLoadingPreview={isLoadingPreview}
        handleClosePreview={handleClosePreview}
        handleGoDetail={master.handleGoDetail}
        translate={translate}
      />
      {isOpenDetailModal &&
        <CriterionDetailModal
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

export default CriterionMaster;
