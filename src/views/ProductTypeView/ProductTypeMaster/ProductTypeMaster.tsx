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
import ProductTypePreview from "./ProductTypePreview";
/* end general import */

/* begin filter import */
import AdvanceStringFilter from "components/Utility/AdvanceFilter/AdvanceStringFilter/AdvanceStringFilter";
import { StringFilter } from "@react3l/advanced-filters";
import AdvanceIdFilter from "components/Utility/AdvanceFilter/AdvanceIdFilter/AdvanceIdFilter";
import { IdFilter } from "@react3l/advanced-filters";
/* end filter import */

/* begin individual import */
import { productTypeRepository } from "repositories/product-type-repository";
import { ProductType, ProductTypeFilter } from "models/ProductType";
import { Status, StatusFilter } from "models/Status";
import ProductTypeDetailModal from "../ProductTypeDetail/ProductTypeDetailModal";
import detailService from "services/pages/detail-service";
import classNames from "classnames";
import authenticationService from "services/authentication-service";
import { API_PRODUCT_TYPE_PREFIX } from "config/api-consts";
/* end individual import */

function ProductTypeMaster() {
  const [translate] = useTranslation();
  const { validAction } = authenticationService.useAction('productType', API_PRODUCT_TYPE_PREFIX);

  const master: UseMaster = masterService.useMaster<
    ProductType,
    ProductTypeFilter
  >(
    ProductTypeFilter,
    "",
    productTypeRepository.list,
    productTypeRepository.count,
    productTypeRepository.delete,
    productTypeRepository.bulkDelete
  );

  const {
    isOpenPreview,
    isLoadingPreview,
    previewModel,
    handleOpenPreview,
    handleClosePreview,
  } = masterService.usePreview<ProductType>(
    ProductType,
    productTypeRepository.get
  );
  const rowSelection = React.useMemo(() => {
    if (validAction('bulkDelete')) return master.rowSelection;
    else return null;
  }, [master.rowSelection, validAction]);

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
    ProductType,
    productTypeRepository.get,
    productTypeRepository.save,
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
    (id: number, productType: ProductType) => (
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
        {!productType.used && validAction('delete') &&
          <Menu.Item key="3">
            <Tooltip title={translate("general.actions.delete")}>
              <div
                className="ant-action-menu"
                onClick={() => master.handleServerDelete(productType)}
              >
                {translate("general.actions.delete")}
              </div>
            </Tooltip>
          </Menu.Item>
        }
      </Menu>
    ),
    [handleOpenPreview, master, translate, validAction]
  );

  const columns: ColumnProps<ProductType>[] = useMemo(
    () => [
      {
        title: (
          <div className="text-center gradient-text">
            {translate("productTypes.code")}
          </div>
        ),
        key: nameof(master.list[0].code),
        dataIndex: nameof(master.list[0].code),
        sorter: true,
        sortOrder: getAntOrderType<ProductType, ProductTypeFilter>(
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
                {translate("productTypes.code")}
              </div>
            </div>
          ); //fill the render field after generate code;
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("productTypes.name")}
          </div>
        ),
        key: nameof(master.list[0].name),
        dataIndex: nameof(master.list[0].name),
        sorter: true,
        sortOrder: getAntOrderType<ProductType, ProductTypeFilter>(
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
                {translate("productTypes.name")}
              </div>
            </div>
          ); //fill the render field after generate code;
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("productTypes.description")}
          </div>
        ),
        key: nameof(master.list[0].description),
        dataIndex: nameof(master.list[0].description),
        sorter: true,
        sortOrder: getAntOrderType<ProductType, ProductTypeFilter>(
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
              {description && (
                <div className="cell-master__second-row">
                  {translate("productTypes.description")}
                </div>
              )}
            </div>
          ); //fill the render field after generate code;
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("productTypes.status")}
          </div>
        ),
        key: nameof(master.list[0].status),
        dataIndex: nameof(master.list[0].status),
        sorter: true,
        sortOrder: getAntOrderType<ProductType, ProductTypeFilter>(
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
        render(id: number, productType: ProductType) {
          return (
            <div className="d-flex justify-content-center button-action-table">
              <Dropdown overlay={menu(id, productType)} trigger={["click"]}>
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
          <label className="label">{translate("productTypes.code")}</label>
          <AdvanceStringFilter
            value={master.filter[nameof(master.list[0].code)]["contain"]}
            onEnter={master.handleChangeFilter(
              nameof(master.list[0].code),
              "contain" as any,
              StringFilter
            )}
            placeHolder={translate("productTypes.placeholder.code")}
            isMaterial={true}
          />
        </Col>

        <Col lg={4} className="pr-4">
          <label className="label">{translate("productTypes.name")}</label>
          <AdvanceStringFilter
            value={master.filter[nameof(master.list[0].name)]["contain"]}
            onEnter={master.handleChangeFilter(
              nameof(master.list[0].name),
              "contain" as any,
              StringFilter
            )}
            placeHolder={translate("productTypes.placeholder.name")}
            isMaterial={true}
          />
        </Col>

        <Col lg={4} className="pr-4">
          <label className="label">
            {translate("productTypes.description")}
          </label>
          <AdvanceStringFilter
            value={master.filter[nameof(master.list[0].description)]["contain"]}
            onEnter={master.handleChangeFilter(
              nameof(master.list[0].description),
              "contain" as any,
              StringFilter
            )}
            placeHolder={translate("productTypes.placeholder.description")}
            isMaterial={true}
          />
        </Col>

        <Col lg={4} className="pr-4">
          <label className="label">{translate("productTypes.status")}</label>
          <AdvanceIdFilter
            value={master.filter[nameof(master.list[0].statusId)]["equal"]}
            onChange={master.handleChangeFilter(
              nameof(master.list[0].statusId),
              "equal" as any,
              IdFilter
            )}
            classFilter={StatusFilter}
            getList={productTypeRepository.filterListStatus}
            placeHolder={translate("productTypes.placeholder.status")}
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
          {translate("productTypes.master.title")}
        </AppMainMasterTitle>
        <AppMainMasterFilter
          {...master}
          repository={productTypeRepository}
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
          {translate("productTypes.table.title")}
        </AppMainMasterTable>
      </div>
      <ProductTypePreview
        previewModel={previewModel}
        isOpenPreview={isOpenPreview}
        isLoadingPreview={isLoadingPreview}
        handleClosePreview={handleClosePreview}
        handleGoDetail={master.handleGoDetail}
        translate={translate}
      />
      {isOpenDetailModal &&
        <ProductTypeDetailModal
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

export default ProductTypeMaster;
