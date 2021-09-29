/* begin general import */
import {
  IdFilter,
  NumberFilter,
  StringFilter,
} from "@react3l/advanced-filters";
import { Card, Col, Row } from "antd";
import { ColumnProps } from "antd/lib/table";
import classNames from "classnames";
import { AppMainMasterTable } from "components/AppMain/MasterPage/AppMainMasterTable";
import AdvanceDateRangeFilter from "components/Utility/AdvanceFilter/AdvanceDateRangeFilter/AdvanceDateRangeFilter";
import AdvanceIdFilter from "components/Utility/AdvanceFilter/AdvanceIdFilter/AdvanceIdFilter";
import AdvanceNumberRangeFilter from "components/Utility/AdvanceFilter/AdvanceNumberRangeFilter/AdvanceNumberRangeFilter";
/* end general import */
/* begin filter import */
import AdvanceStringFilter from "components/Utility/AdvanceFilter/AdvanceStringFilter/AdvanceStringFilter";
import AdvanceTreeFilter from "components/Utility/AdvanceFilter/AdvanceTreeFilter/AdvanceTreeFilter";
import InputSearch from "components/Utility/InputSearch/InputSearch";
import {
  PURCHASE_PLAN_ROUTE,
  PURCHASE_REQUEST_ROUTE,
} from "config/route-consts";
import { formatDate } from "helpers/date-time";
import { formatNumber } from "helpers/number";
import { AppUser, AppUserFilter } from "models/AppUser";
import { OrganizationFilter } from "models/Organization";
import { Organization } from "models/Organization/Organization";
import { PurchasePlan, PurchasePlanFilter } from "models/PurchasePlan";
import { PurchaseRequest, PurchaseRequestFilter } from "models/PurchaseRequest";
import { Moment } from "moment";
import React, { Dispatch, SetStateAction, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { CSSTransition } from "react-transition-group";
/* end filter import */
/* begin individual import */
import { purchasePlanRepository } from "repositories/purchase-plan-repository";
import { advanceFilterService } from "services/advance-filter-service";
import { getAntOrderType } from "services/table-service";
import nameof from "ts-nameof.macro";
import { usePurchasePlanRequest } from "./PurchasePlanRequestHook/PurchasePlanRequestHook";
/* end individual import */

export interface PurchasePlanRequestProps {
  setViewIndex?: Dispatch<SetStateAction<string>>;
  setLoading?: Dispatch<SetStateAction<boolean>>;
}
function PurchasePlanRequest(props: PurchasePlanRequestProps) {
  const [translate] = useTranslation();

  const { setViewIndex } = props;

  const master = usePurchasePlanRequest(
    PurchaseRequestFilter,
    PURCHASE_PLAN_ROUTE,
    purchasePlanRepository.listPurchaseRequest,
    purchasePlanRepository.countPurchaseRequest
  );

  const [numberRange] = advanceFilterService.useNumberRangeFilter(
    master.filter,
    master.dispatch,
    "total"
  );

  const history = useHistory();

  const baseRoute = React.useMemo(() => {
    let listPath = `${PURCHASE_PLAN_ROUTE}`.split("/");
    const baseRoute = "/" + listPath[listPath.length - 1];
    return baseRoute;
  }, []);

  const handleGoSelect = useCallback(
    (id: number) => {
      history.push(
        `${PURCHASE_PLAN_ROUTE}${baseRoute}-master?viewIndex=${3}&purchaseRequestId=${id}`
      );
      setViewIndex("3");
    },
    [baseRoute, history, setViewIndex]
  );

  const handleGoPreview = React.useCallback(
    (id: number) => {
      let listPath = `${PURCHASE_REQUEST_ROUTE}`.split("/");
      const baseRoute = "/" + listPath[listPath.length - 1];
      history.push(`${PURCHASE_REQUEST_ROUTE}${baseRoute}-preview?id=${id}`);
    },
    [history]
  );

  const handleChangeDateFilter = React.useCallback(
    (fieldName) => {
      return (dateMoment: [Moment, Moment]) => {
        const newFilter = { ...master.filter };
        newFilter[`${fieldName}`]["lessEqual"] = dateMoment[1];
        newFilter[`${fieldName}`]["greaterEqual"] = dateMoment[0];
        master.handleUpdateNewFilter(newFilter);
      };
    },
    [master]
  );

  const columns: ColumnProps<PurchasePlan>[] = useMemo(
    () => [
      {
        title: (
          <div className="text-center gradient-text">
            {translate("purchaseRequests.code")}
          </div>
        ),
        key: nameof(master.list[0].code),
        dataIndex: nameof(master.list[0].code),
        sorter: true,
        sortOrder: getAntOrderType<PurchasePlan, PurchasePlanFilter>(
          master.filter,
          nameof(master.list[0].code)
        ),
        render(code: string, purchasePlan: PurchasePlan) {
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
                <span onClick={() => handleGoPreview(purchasePlan?.id)}>
                  {code}
                </span>
              </div>
              <div className="cell-master__second-row">
                {translate("purchaseRequests.code")}
              </div>
            </div>
          );
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("purchaseRequests.requestor")}
          </div>
        ),
        key: nameof(master.list[0].requestor),
        dataIndex: nameof(master.list[0].requestor),
        sorter: true,
        sortOrder: getAntOrderType<PurchasePlan, PurchasePlanFilter>(
          master.filter,
          nameof(master.list[0].requestor)
        ),
        render(requestor: AppUser) {
          return (
            <div className="ant-cell-master__container">
              <div
                className={classNames("cell-master__first-row", {
                  "first-row--ellipsis":
                    requestor?.displayName &&
                    requestor?.displayName.length >= 30,
                })}
              >
                {requestor?.displayName}
              </div>
              <div className="cell-master__second-row">{requestor?.email}</div>
            </div>
          );
        },
      },

      {
        title: (
          // TODO: Change this name to 'organization'
          <div className="text-center gradient-text">
            {translate("purchaseRequests.requestOrganization")}
          </div>
        ),
        key: nameof(master.list[0].requestOrganization),
        dataIndex: nameof(master.list[0].requestOrganization),
        sorter: true,
        sortOrder: getAntOrderType<PurchasePlan, PurchasePlanFilter>(
          master.filter,
          nameof(master.list[0].requestOrganization)
        ),
        render(ro: Organization) {
          return (
            <div className="ant-cell-master__container">
              <div
                className={classNames("cell-master__first-row", {
                  "first-row--ellipsis": ro.name && ro.name.length >= 30,
                })}
              >
                {ro.name}
              </div>
              <div className="cell-master__second-row">
                {translate("purchaseRequests.requestOrganization")}
              </div>
            </div>
          );
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("purchaseRequests.requestedAt")}
          </div>
        ),
        key: nameof(master.list[0].requestedAt),
        dataIndex: nameof(master.list[0].requestedAt),
        sorter: true,
        sortOrder: getAntOrderType<PurchasePlan, PurchasePlanFilter>(
          master.filter,
          nameof(master.list[0].requestedAt)
        ),
        render(...params: [Moment, PurchasePlan, number]) {
          return (
            <div className="ant-cell-master__container">
              <div className={classNames("cell-master__first-row")}>
                {formatDate(params[0])}
              </div>
              <div className="cell-master__second-row">
                {translate("purchaseRequests.requestedAt")}
              </div>
            </div>
          );
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("purchaseRequests.total")}
          </div>
        ),
        key: nameof(master.list[0].total),
        dataIndex: nameof(master.list[0].total),
        sorter: true,
        sortOrder: getAntOrderType<PurchasePlan, PurchasePlanFilter>(
          master.filter,
          nameof(master.list[0].total)
        ),
        render(total: number) {
          return (
            <div className="ant-cell-master__container">
              <div className={classNames("cell-master__first-row")}>
                {formatNumber(total)}
              </div>
              <div className="cell-master__second-row">
                {translate("purchaseRequests.total")}
              </div>
            </div>
          );
        },
      },
      {
        width: 150,
        render(pr: PurchaseRequest) {
          return (
            <div className="ant-cell-master__container">
              <button
                className="btn component__btn-toggle grow-animate-1 btn-customize"
                onClick={() => {
                  handleGoSelect(pr.id);
                }}
              >
                <i className="tio-add"></i>
                <span className="component_btn-text">Tạo PAMS</span>
              </button>
            </div>
          );
        },
      },
    ],
    [translate, master.list, master.filter, handleGoPreview, handleGoSelect]
  );

  const filterChildren = React.useMemo(
    () => (
      <div className="search__container mt-4">
        <Row justify="space-between">
          <Col lg={4}>
            <AdvanceStringFilter
              title={translate("purchaseRequests.code")}
              isMaterial={true}
              value={master.filter[nameof(master.list[0].code)]["contain"]}
              onEnter={master.handleChangeFilter(
                nameof(master.list[0].code),
                "contain" as any,
                StringFilter
              )}
              className={"tio-search"}
              placeHolder={translate("purchaseRequests.placeholder.code")}
            />
          </Col>

          <Col lg={4}>
            <AdvanceIdFilter
              title={translate("purchaseRequests.requestor")}
              isMaterial={true}
              value={
                master.filter[nameof(master.list[0].requestorId)]["contain"]
              }
              onChange={master.handleChangeFilter(
                nameof(master.list[0].requestorId),
                "contain" as any,
                StringFilter
              )}
              classFilter={AppUserFilter}
              render={(requestor: AppUser) => requestor?.displayName}
              getList={purchasePlanRepository.filterListAppUser}
              placeHolder={translate("purchaseRequests.placeholder.requestor")}
              searchProperty="search"
              searchType={null}
            />
          </Col>

          <Col lg={4}>
            <AdvanceTreeFilter
              title={translate("purchaseRequests.requestOrganization")}
              placeHolder={translate("purchaseRequests.requestOrganization")}
              classFilter={OrganizationFilter}
              onChangeSingleItem={master.handleChangeFilter(
                nameof(master.list[0].requestOrganizationId),
                "equal" as any,
                IdFilter
              )}
              checkStrictly={true}
              getTreeData={purchasePlanRepository.filterListOrganization}
              isMaterial={true}
              value={
                master.filter[nameof(master.list[0].requestOrganizationId)][
                  "equal"
                ]
              }
              searchType="contain"
            />
          </Col>

          <Col lg={4}>
            <AdvanceIdFilter
              title={translate("purchaseRequests.recipient")}
              isMaterial={true}
              value={
                master.filter[nameof(master.list[0].recipientId)]["contain"]
              }
              onChange={master.handleChangeFilter(
                nameof(master.list[0].recipientId),
                "contain" as any,
                StringFilter
              )}
              classFilter={AppUserFilter}
              render={(requestor: AppUser) => requestor?.displayName}
              getList={purchasePlanRepository.filterListAppUser}
              placeHolder={translate("purchaseRequests.placeholder.recipient")}
              searchProperty="search"
              searchType={null}
            />
          </Col>

          <Col lg={4}>
            <AdvanceStringFilter
              title={translate("purchaseRequests.recipientPhoneNumber")}
              isMaterial={true}
              value={
                master.filter[nameof(master.list[0].recipientPhoneNumber)][
                  "contain"
                ]
              }
              onEnter={master.handleChangeFilter(
                nameof(master.list[0].recipientPhoneNumber),
                "contain" as any,
                StringFilter
              )}
              className={"tio-search"}
              placeHolder={translate(
                "purchaseRequests.placeholder.recipientPhoneNumber"
              )}
            />
          </Col>
        </Row>

        <Row justify="space-between" className="mt-3">
          <Col lg={4}>
            <AdvanceStringFilter
              title={translate("purchaseRequests.recipientAddress")}
              isMaterial={true}
              value={
                master.filter[nameof(master.list[0].recipientAddress)][
                  "contain"
                ]
              }
              onEnter={master.handleChangeFilter(
                nameof(master.list[0].recipientAddress),
                "contain" as any,
                StringFilter
              )}
              className={"tio-search"}
              placeHolder={translate(
                "purchaseRequests.placeholder.recipientAddress"
              )}
            />
          </Col>

          <Col lg={4}>
            <AdvanceDateRangeFilter
              title={translate("purchaseRequests.requestedAt")}
              onChange={handleChangeDateFilter(
                nameof(master.filter.requestedAt)
              )}
              value={[
                master.filter["requestedAt"]["lessEqual"]
                  ? master.filter["requestedAt"]["lessEqual"]
                  : null,
                master.filter["requestedAt"]["greaterEqual"]
                  ? master.filter["requestedAt"]["greaterEqual"]
                  : null,
              ]}
              isMaterial={true}
            />
          </Col>

          <Col lg={4}>
            <AdvanceDateRangeFilter
              title={translate("purchaseRequests.expectedAt")}
              onChange={handleChangeDateFilter(
                nameof(master.filter.expectedAt)
              )}
              value={[
                master.filter["expectedAt"]["lessEqual"]
                  ? master.filter["expectedAt"]["lessEqual"]
                  : null,
                master.filter["expectedAt"]["greaterEqual"]
                  ? master.filter["expectedAt"]["greaterEqual"]
                  : null,
              ]}
              isMaterial={true}
            />
          </Col>

          <Col lg={4}>
            <AdvanceNumberRangeFilter
              placeHolderRange={["Từ...", "Đến..."]}
              isMaterial={true}
              title={translate("purchaseRequests.total")}
              valueRange={numberRange}
              onChangeRange={master.handleChangeFilter(
                nameof(master.list[0].total),
                null,
                NumberFilter
              )}
              decimalDigit={2}
              numberType="DECIMAL"
            />
          </Col>

          <Col lg={4} />
        </Row>
      </div>
    ),
    [handleChangeDateFilter, master, numberRange, translate]
  );

  const handleChangeSearchFilter = React.useCallback(
    (value) => {
      const newFilter = { ...master.filter };
      newFilter["search"] = value;
      master.handleUpdateNewFilter(newFilter);
    },
    [master]
  );

  return (
    <>
      <div className="page__search">
        <Card bordered={false}>
          <div className="d-flex align-items-center">
            <div className="d-flex flex-grow-1">
              <div className="pr-4 w70">
                <InputSearch
                  value={master.filter["search"]}
                  onChange={handleChangeSearchFilter}
                  placeHolder="Tìm kiếm"
                />
              </div>

              <button
                className={classNames(
                  "btn component__btn-filter mr-3 grow-animate-1 btn-customize",
                  master.toggle === true ? "component__btn-filter-active" : ""
                )}
                onClick={master.handleToggleSearch}
              >
                <i className="tio-tune_horizontal "></i>
                <span className="component_btn-text">
                  {translate("general.button.advance")}
                </span>
              </button>
            </div>
          </div>
          <CSSTransition
            in={master.toggle}
            timeout={100}
            classNames={"show"}
            unmountOnExit
          >
            {filterChildren}
          </CSSTransition>
        </Card>
      </div>
      <AppMainMasterTable {...master} translate={translate} columns={columns}>
        {translate("purchaseRequests.table.title")}
      </AppMainMasterTable>
    </>
  );
}

export default PurchasePlanRequest;
