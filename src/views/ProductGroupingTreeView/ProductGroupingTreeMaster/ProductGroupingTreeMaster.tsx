import { PlusCircleOutlined } from "@ant-design/icons";
import { StringFilter } from "@react3l/advanced-filters";
import { Card, Col, Dropdown, Menu, Row, Spin, Tooltip } from "antd";
import { ColumnProps } from "antd/lib/table";
import classNames from "classnames";
import { AppMainMasterFilter } from "components/AppMain/MasterPage/AppMainMasterFilter";
import { AppMainMasterTable } from "components/AppMain/MasterPage/AppMainMasterTable";
import AdvanceStringFilter from "components/Utility/AdvanceFilter/AdvanceStringFilter/AdvanceStringFilter";
import { Product, ProductFilter } from "models/Product";
import { ProductGrouping, ProductGroupingFilter } from "models/ProductGrouping";
import { ProductType } from "models/ProductType";
import { Status } from "models/Status";
import React from "react";
import { useTranslation } from "react-i18next";
import { productGroupingRepository } from "repositories/product-grouping-repository";
import { commonWebService } from "services/common-web-service";
import masterService, { UseMaster } from "services/pages/master-service";
import nameof from "ts-nameof.macro";
import ProductGroupingDetailModal from "../ProductGroupingTreeDetail/ProductGroupingTreeDetail";
import { ProductPreview, useProductGroupingMappingHook } from "./ProductGroupingTreeMasterHook/ProductGroupingMappingTableHook";
import "./ProductGroupingMaster.scss";
import ProductGroupingTree from "./ProductGroupingTree/ProductGroupingTree";
import { useDetailProductGroupingModal } from "./ProductGroupingTreeMasterHook/ProductGroupingTreeMasterHook";
import ProductGroupingTreePreview from "./ProductGroupingTreePreview";
import ProductProductGroupingMappingView, { useProductGroupingMappingModalHook } from "./ProductGroupingTreeMasterHook/ProductGroupingMappingModalHook";
import authenticationService from "services/authentication-service";
import { API_PRODUCT_GROUPING_PREFIX } from "config/api-consts";


function ProductGroupingTreeMaster() {
  const [translate] = useTranslation();
  const { validAction } = authenticationService.useAction('productGrouping', API_PRODUCT_GROUPING_PREFIX);

  const [currentNode, setCurrentNode] = React.useState<ProductGrouping>(new ProductGrouping());
  const [isActive, setActive] = React.useState<boolean>(false);
  const master: UseMaster = masterService.useMaster<
    ProductGrouping,
    ProductGroupingFilter
  >(
    ProductGroupingFilter,
    "",
    productGroupingRepository.list, // gọi
    productGroupingRepository.count,
    productGroupingRepository.delete
  );
  const [treeDataList] = commonWebService.buildTree(master.list);
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
    handleUpdateNewModel,
  } = useDetailProductGroupingModal(
    ProductGrouping,
    productGroupingRepository.get,
    productGroupingRepository.save,
    master.handleSearch
  );

  const {
    isOpenPreview,
    isLoadingPreview,
    previewModel,
    handleOpenPreview,
    handleClosePreview
  } = masterService.usePreview<ProductGrouping>(ProductGrouping, productGroupingRepository.get);

  // product productGrouping mapping table hook
  const
    {
      list,
      total,
      loadingList,
      filter,
      toggle,
      handleUpdateNewFilter,
      handleResetFilter,
      handleToggleSearch,
      handleTableChange,
      handlePagination,
      handleSearch,
      handleImportList,
      handleListExport,
      handleExportTemplateList,
      importButtonRef,
      rowSelection,
      handleDeleteProduct,
      handleBulkDeleteProduct,
      canBulkDelete,
      handleChangeSearch,
      idList,
      isOpenProductPrewiew,
      product,
      handleOpenProductPreview,
      handleCloseProductPreview,
    } = useProductGroupingMappingHook(
      ProductFilter,
      productGroupingRepository.listProduct, // gọi
      productGroupingRepository.countProduct,
      productGroupingRepository.deleteProduct,
      productGroupingRepository.bulkDeleteProduct,
      null,
      null,
      currentNode,
      setCurrentNode,
      validAction,
    );
  // product productGrouping mapping modal hook
  const {
    isOpenProductModal,
    handleOpenProductModal,
    handleCloseProductModal,
    handleSaveProduct,
    productList,
    productTotal,
    loadingProductModal,
    handleChangePagination: handleChangePaginationModal,
    handleChangeSearch: handleChangeSearchModal,
    productFilter,
    rowSelection: rowSelectionModal,
    selectedList,
  } = useProductGroupingMappingModalHook(
    currentNode,
    setCurrentNode,
    idList,
    productGroupingRepository.listProduct,
    productGroupingRepository.countProduct,
    handleSearch,
  );
  const handleGoCreate = React.useCallback(() => {
    const newModel = new ProductGrouping();
    handleUpdateNewModel(newModel);
    handleOpenDetailModal(null);
  }, [handleOpenDetailModal, handleUpdateNewModel]);

  const handleAdd = React.useCallback(
    (node: any) => () => {
      const newModel = new ProductGrouping();
      newModel.parent = node;
      newModel.parentId = node?.id;
      handleUpdateNewModel(newModel);
      handleOpenDetailModal(null);
    },
    [handleUpdateNewModel, handleOpenDetailModal]
  );

  const handleDelete = React.useCallback(
    (node: any) => () => {
      master.handleServerDelete(node);
    },
    [master]
  );

  const handleGoDetail = React.useCallback(
    (node: any) => () => {
      handleClosePreview();
      handleOpenDetailModal(node?.id);
    },
    [handleOpenDetailModal, handleClosePreview]
  );
  const handleClick = React.useCallback((node) => {
    setCurrentNode(node);
    const newFilter = { ...filter };
    newFilter['productGroupingId']['equal'] = node.id;
    if (validAction('update')) {
      handleUpdateNewFilter(newFilter);
      setActive(true);
    }
  }, [filter, handleUpdateNewFilter, validAction]);
  const leftButton = React.useMemo(() => {
    if (validAction('create')) {
      return (
        <div className="tree__add-button" onClick={handleGoCreate}>
          <PlusCircleOutlined className="icon" />
          <span>Thêm nhóm cấp 1</span>
        </div>
      );
    }

  }, [handleGoCreate, validAction]);

  const menu2 = React.useCallback(
    (id: number, product: Product) => (
      <Menu style={{ borderRadius: "6px" }}>
        <Menu.Item key="1">
          <Tooltip title={translate("general.actions.view")}>
            <div className="ant-action-menu" onClick={() => handleOpenProductPreview(product)}>Xem</div>
          </Tooltip>
        </Menu.Item>
        <Menu.Item key="2">
          <Tooltip title={translate("general.actions.delete")}>
            <div className="ant-action-menu" onClick={() => handleDeleteProduct(product)}>Xoá</div>
          </Tooltip>
        </Menu.Item>
      </Menu >
    ),
    [handleOpenProductPreview, translate, handleDeleteProduct]
  );

  const filterChildren = React.useMemo(
    () => (
      <Row className="mt-4">
        <Col lg={8} className="pr-4">
          <AdvanceStringFilter
            value={filter?.code?.contain}
            onEnter={handleChangeSearch(
              "code",
              "contain",
            )}
            placeHolder={translate("productGroupings.placeholder.code")}
            isMaterial={true}
            className={"tio-search"}
            title={translate("productGroupings.code")}
          />
        </Col>

        <Col lg={8} className="pr-4">
          <AdvanceStringFilter
            value={filter?.name?.contain}
            onEnter={handleChangeSearch(
              "name",
              "contain",
            )}
            placeHolder={translate("productGroupings.placeholder.name")}
            isMaterial={true}
            className={"tio-search"}
            title={translate("productGroupings.name")}
          />
        </Col>

        <Col lg={8} className="pr-4">
          <AdvanceStringFilter
            value={filter?.otherName?.contain}
            onEnter={handleChangeSearch(
              "otherName",
              "contain",
            )}
            placeHolder={translate("productGroupings.placeholder.otherName")}
            isMaterial={true}
            className={"tio-search"}
            title={translate("productGroupings.products.otherName")}
          />
        </Col>
      </Row>
    ),
    [filter, handleChangeSearch, translate]
  );

  // column for table mapping
  const columns: ColumnProps<Product>[] = React.useMemo(
    () => [
      {
        title: (
          <div className="text-left gradient-text">
            {translate("productGroupings.products.name")}
          </div>
        ),
        key: nameof(list[0].name),
        dataIndex: nameof(list[0].name),
        width: 300,
        render(...[, product]) {
          return (
            <div className="product-cell-master__wapper">
              <div className="product-image">
                {product?.productImageMappings &&
                  product?.productImageMappings.length > 0 &&
                  product.productImageMappings.map(
                    (productImageMapping, index) => {
                      return (
                        <img
                          key={index}
                          src={productImageMapping?.image?.url}
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
                      product?.name && product?.name.length >= 10,
                  })}
                >
                  {product?.name}
                </div>
                <div className="cell-master__second-row">{product?.code}</div>
              </div>
            </div>
          );
        },
      },
      {
        title: (
          <div className="text-left gradient-text">
            {translate("productGroupings.products.productType")}
          </div>
        ),
        key: nameof(list[0].productType),
        dataIndex: nameof(list[0].productType),
        width: 200,
        ellipsis: true,
        render(productType: ProductType) {
          return (
            <div className="ant-cell-master__container">
              <div className={classNames("cell-master__first-row")}>
                {productType?.name}
              </div>
              <div className="cell-master__second-row">
                {translate("productGroupings.products.productType")}
              </div>
            </div>
          );
        },
      },
      {
        title: (
          <div className="text-left gradient-text">
            {translate("productGroupings.products.usedVariation")}
          </div>
        ),
        key: nameof(list[0].usedVariation),
        dataIndex: nameof(list[0].usedVariation),
        ellipsis: true,
        render(usedVariation, product: Product) {
          return (
            <>
              {product.usedVariationId === 0 ? (
                <span className="cell-master__first-row">
                  {usedVariation?.name}
                </span>
              ) : (
                <span className="cell-master__first-row">
                  {usedVariation?.name} ( {product?.variationCounter} ){" "}
                </span>
              )}
              <div className="cell-master__second-row">
                {translate("productGroupings.products.usedVariation")}
              </div>
            </>
          );
        },
      },
      {
        title: (
          <div className="text-center gradient-text">
            {translate("productGroupings.products.status")}
          </div>
        ),
        key: nameof(list[0].status),
        dataIndex: nameof(list[0].status),
        align: "center",
        width: 200,
        ellipsis: true,
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
        dataIndex: "id",
        fixed: "right",
        width: 80,
        align: "center",
        render(id: number, product: Product) {
          return (
            <div className="d-flex justify-content-center button-action-table">
              <Dropdown overlay={menu2(id, product)} trigger={["click"]}>
                <span className="action__dots">...</span>
              </Dropdown>
            </div>
          );
        },
      },
    ],
    [translate, list, menu2]
  );

  return (
    <div className="page page__master product-grouping__master">
      <Row style={{ paddingLeft: "34px" }}>
        <Col lg={24}>
          <div className="product-grouping__page-title">Nhóm sản phẩm</div>
        </Col>
        <Col lg={8} className='mt-4'>

          <Card
            title={"NHÓM SẢN PHẨM"}
            extra={leftButton}
            headStyle={{ fontWeight: "bold" }}
            style={{
              borderRadius: "7px",
            }}
            className="product-grouping__card"
          >
            <div >
              <AdvanceStringFilter
                value={master.filter[nameof(master.list[0].name)]["contain"]}
                onEnter={master.handleChangeFilter(
                  nameof(master.list[0].name),
                  "contain" as any,
                  StringFilter
                )}
                placeHolder="Tìm kiếm từ khóa nhóm sản phẩm..."
                isMaterial={true}
                className="tio-search"

              />
            </div>

            <div className="mt-2" >
              <Spin spinning={master.loadingList} className="mt-4" >
                <ProductGroupingTree
                  tree={treeDataList}
                  onPreview={handleOpenPreview}
                  onDelete={handleDelete}
                  onEdit={handleGoDetail}
                  onAdd={handleAdd}
                  onActive={handleClick}
                  currentItem={currentNode}
                />
              </Spin>
            </div>
          </Card>
        </Col>
        <Col lg={16} className="pl-3">
          <div className="tree__mapping-table">
            {isActive && (
              <>
                <AppMainMasterFilter
                  toggle={toggle}
                  importButtonRef={importButtonRef}
                  filter={filter}
                  handleUpdateNewFilter={handleUpdateNewFilter}
                  handleToggleSearch={handleToggleSearch}
                  handleGoCreate={handleOpenProductModal}
                  handleListExport={handleListExport}
                  handleImportList={handleImportList}
                  handleExportTemplateList={handleExportTemplateList}
                  canBulkDelete={canBulkDelete}
                  handleResetFilter={handleResetFilter}
                  repository={productGroupingRepository}
                  translate={translate}
                  isMaterialActionAdvance={true}
                  handleServerBulkDelete={handleBulkDeleteProduct}
                  validAction={validAction}

                >
                  {filterChildren}
                </AppMainMasterFilter>
                <AppMainMasterTable
                  list={list}
                  filter={filter}
                  loadingList={loadingList}
                  rowSelection={rowSelection}
                  total={total}
                  handleTableChange={handleTableChange}
                  handlePagination={handlePagination}
                  translate={translate}
                  columns={columns}
                  isDragable={true}
                >
                  {translate("productGroupings.table.title")}
                </AppMainMasterTable>
              </>
            )}
          </div>
        </Col>
      </Row >
      <ProductGroupingTreePreview
        previewModel={previewModel}
        isOpenPreview={isOpenPreview}
        isLoadingPreview={isLoadingPreview}
        handleClosePreview={handleClosePreview}
        handleGoDetail={handleGoDetail}
        translate={translate}
      />
      {isOpenDetailModal &&
        <ProductGroupingDetailModal
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
      <ProductProductGroupingMappingView
        model={currentNode}
        list={productList}
        isOpenPreview={isOpenProductModal}
        isLoadingPreview={loadingProductModal}
        handleClosePreview={handleCloseProductModal}
        handleSave={handleSaveProduct}
        translate={translate}
        productFilter={productFilter}
        handleChangePagination={handleChangePaginationModal}
        handleChangeSearch={handleChangeSearchModal}
        rowSelection={rowSelectionModal}
        selectedList={selectedList}
        total={productTotal}

      />
      <ProductPreview
        previewModel={product}
        isOpenPreview={isOpenProductPrewiew}
        handleClosePreview={handleCloseProductPreview}
        translate={translate}
      />
    </div>
  );
}

export default ProductGroupingTreeMaster;
