import { Card, Col, Row, Spin } from "antd";
import Table, { ColumnProps } from "antd/lib/table";
import classNames from "classnames";
import Pagination from "components/Utility/Pagination/Pagination";
import { AppUser } from "models/AppUser";
import { Organization, OrganizationFilter } from "models/Organization";
import React from "react";
import { useTranslation } from "react-i18next";
import { organizationRepository } from "repositories/organization-repository";
import { commonWebService } from "services/common-web-service";
import masterService, { UseMaster } from "services/pages/master-service";
import nameof from "ts-nameof.macro";
import OrganizationTree from "./OrganizationTree/OrganizationTree";
import { useOrganizationTreeMasterHook } from "./OrganizationTreeMasterHook/OrganizationTreeMasterHook";
import "./OrganizationTreeMaster.scss";
import AdvanceIdFilter from "components/Utility/AdvanceFilter/AdvanceIdFilter/AdvanceIdFilter";
import { ModelFilter } from "@react3l/react3l/core";
import authenticationService from "services/authentication-service";
import { API_ORGANIZATION_PREFIX } from "config/api-consts";
import { routerService } from "services/route-service";
import { ORGANIZATION_DETAIL_ROUTE, ORGANIZATION_ROUTE } from "config/route-consts";
import { useHistory } from "react-router";

function OrganizationTreeMaster() {
  const [translate] = useTranslation();
  const { validAction } = authenticationService.useAction(
    "organization",
    API_ORGANIZATION_PREFIX
  );

  const master: UseMaster = masterService.useMaster<
    Organization,
    OrganizationFilter
  >(
    OrganizationFilter,
    "",
    organizationRepository.list, // gọi
    organizationRepository.count,
    organizationRepository.delete
  );
  const [treeDataList] = commonWebService.buildTree(master.list);
  const {
    isActive,
    loadingList,
    appUserFilter,
    total,
    list,
    currentNode,
    handleClick,
    handleTableChange,
    handlePagination,
    handleChangeIsDisplay,
    handleChangeSearch,
    handleExportAppUser,
    handleDelete
  } = useOrganizationTreeMasterHook(
    organizationRepository.updateIsDisplay,
    organizationRepository.listAppUser,
    organizationRepository.countAppUser,
    master.handleSearch,
    translate,
    validAction,
    master
  );
  const [
    handleCreate,
    handleGoDetail
  ] = routerService.useMasterNavigation(ORGANIZATION_ROUTE);
  const history = useHistory();
  const handleGoCreate = React.useCallback(
    (node: any) => {
      return () => {
        history.push(`${ORGANIZATION_DETAIL_ROUTE}?createId=${node}`);
      };
    },
    [history]
  );
  const columns: ColumnProps<AppUser>[] = React.useMemo(
    () => [
      {
        title: (
          <div className="text-left gradient-text">
            {translate("organizations.appUsers.username")}
          </div>
        ),
        key: nameof(list[0].username),
        dataIndex: nameof(list[0].username),
        render(...[username]) {
          return (
            <div className="ant-cell-master__container">
              <div
                className={classNames("cell-master__first-row", {
                  "first-row--ellipsis": username && username.length >= 10,
                })}
              >
                {username}
              </div>
              <div className="cell-master__second-row">
                {translate("organizations.appUsers.username")}
              </div>
            </div>
          );
        },
      },
      {
        title: (
          <div className="text-left gradient-text">
            {translate("organizations.appUsers.displayName")}
          </div>
        ),
        key: nameof(list[0].displayName),
        dataIndex: nameof(list[0].displayName),
        render(...[displayName]) {
          return (
            <div className="ant-cell-master__container">
              <div
                className={classNames("cell-master__first-row", {
                  "first-row--ellipsis":
                    displayName && displayName.length >= 10,
                })}
              >
                {displayName}
              </div>
              <div className="cell-master__second-row">
                {translate("organizations.appUsers.displayName")}
              </div>
            </div>
          );
        },
      },
      {
        title: (
          <div className="text-left gradient-text">
            {translate("organizations.appUsers.email")}
          </div>
        ),
        key: nameof(list[0].email),
        dataIndex: nameof(list[0].email),
        render(...[email]) {
          return (
            <div className="ant-cell-master__container">
              <div
                className={classNames("cell-master__first-row", {
                  "first-row--ellipsis": email && email.length >= 10,
                })}
              >
                {email}
              </div>
              <div className="cell-master__second-row">
                {translate("organizations.appUsers.email")}
              </div>
            </div>
          );
        },
      },
      {
        title: (
          <div className="text-left gradient-text">
            {translate("organizations.appUsers.phone")}
          </div>
        ),
        key: nameof(list[0].phone),
        dataIndex: nameof(list[0].phone),
        render(...[phone]) {
          return (
            <div className="ant-cell-master__container">
              <div
                className={classNames("cell-master__first-row", {
                  "first-row--ellipsis": phone && phone.length >= 10,
                })}
              >
                {phone}
              </div>
              <div className="cell-master__second-row">
                {translate("organizations.appUsers.phone")}
              </div>
            </div>
          );
        },
      },
    ],
    [list, translate]
  );
  return (
    <div className="page page__master organization__master">
      <Row style={{ paddingLeft: "34px" }}>
        <Col lg={24}>
          <div className="organization__page-title">Đơn vị tổ chức</div>
        </Col>
        <Col lg={10} className="mt-4">
          <Card
            title={"Đơn vị tổ chức"}
            headStyle={{ fontWeight: "bold" }}
            style={{
              borderRadius: "7px",
            }}
            className="organization__card"
            extra={
              <i
                role="button"
                className="tio-add"
                style={{ fontWeight: "bold" }}
                onClick={handleCreate}
              />
            }
          >
            <div className="mt-2">
              <Spin spinning={master.loadingList} className="mt-4">
                <OrganizationTree
                  tree={treeDataList}
                  onActive={handleClick}
                  currentItem={currentNode}
                  onChangeDisplay={handleChangeIsDisplay}
                  onAdd={handleGoCreate}
                  onEdit={handleGoDetail}
                  onDelete={handleDelete}
                />
              </Spin>
            </div>
          </Card>
        </Col>
        <Col lg={14} className="pl-3">
          <div className="organization-master__table">
            {isActive && (
              <>
                <Row className="mt-3 mb-3">
                  <Col span={6}>
                    <AdvanceIdFilter
                      onChange={handleChangeSearch(
                        "organizationTreeFilterType"
                      )}
                      placeHolder={translate(
                        "organizations.placeholder.appUser"
                      )}
                      title={translate("organizations.appUser")}
                      classFilter={ModelFilter}
                      isEnumList={true}
                      getList={
                        organizationRepository.singleListTreeSelectOption
                      }
                    />
                  </Col>
                  {validAction("exportAppUser") && (
                    <Col className="mt-1">
                      <button
                        className="btn component__btn-primary mt-3 ml-4"
                        onClick={handleExportAppUser(
                          appUserFilter,
                          organizationRepository.exportAppUser
                        )}
                      >
                        <i className="tio-file_outlined mr-2" />
                        {translate("general.actions.exportExcel")}
                      </button>
                    </Col>
                  )}
                </Row>
                <Table
                  rowKey={nameof(list[0].id)}
                  columns={columns}
                  pagination={false}
                  dataSource={list}
                  loading={loadingList}
                  onChange={handleTableChange}
                  title={() => (
                    <>
                      <div className="d-flex justify-content-between">
                        <div className="master-table_title">
                          {total} {translate("general.title.result")}
                        </div>
                        <div className="flex-shrink-1 d-flex align-items-center">
                          <Pagination
                            skip={appUserFilter.skip}
                            take={appUserFilter.take}
                            total={total}
                            onChange={handlePagination}
                            style={{ margin: "10px" }}
                          />
                        </div>
                      </div>
                    </>
                  )}
                />
              </>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default OrganizationTreeMaster;
