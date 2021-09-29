import { CaretRightOutlined } from "@ant-design/icons";
import { Checkbox, Col, Collapse, Row, Steps, Table, Tooltip } from "antd";
import { ColumnProps } from "antd/lib/table";
import classNames from "classnames";
import AppFooter from "components/AppFooter/AppFooter";
import { DECIMAL } from "components/Utility/AdvanceFilter/AdvanceNumberFilter/AdvanceNumberFilter";
import CategorySelect from "components/Utility/CategorySelect/CategorySelect";
import FormItem from "components/Utility/FormItem/FormItem";
import InputNumber from "components/Utility/Input/InputNumber/InputNumber";
import InputText from "components/Utility/Input/InputText/InputText";
import Select from "components/Utility/Select/Select";
import SwitchStatus from "components/Utility/SwitchStatus/SwitchStatus";
import TreeSelect from "components/Utility/TreeSelect/TreeSelect";
import UploadFile, { UPLOADTYPE } from "components/Utility/UploadFile/UploadFile";
import { PRODUCT_MASTER_ROUTE } from "config/route-consts";
import { BrandFilter } from "models/Brand";
import { CategoryFilter } from "models/Category/CategoryFilter";
import { Item } from "models/Item";
import { Product } from "models/Product";
import { ProductGroupingFilter } from "models/ProductGrouping";
import { ProductImageMapping } from "models/ProductImageMapping";
import { ProductProductGroupingMapping } from "models/ProductProductGroupingMapping";
import { ProductTypeFilter } from "models/ProductType";
import { TaxTypeFilter } from "models/TaxType";
import { UnitOfMeasureFilter } from "models/UnitOfMeasure";
import { UnitOfMeasureGroupingFilter } from "models/UnitOfMeasureGrouping/UnitOfMeasureGroupingFilter";
import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next";
import { productRepository } from "repositories/product-repository";
import { formService } from "services/form-service";
import detailService from "services/pages/detail-service";
import nameof from "ts-nameof.macro";
import "./ProductDetail.scss";
import { useProductDetailHook } from "./ProductDetailHook/ProductDetailHook";
import { useProductFooter } from "./ProductDetailHook/ProductFooterHook";
import { useProductVariationHook } from "./ProductDetailHook/ProductVariationHook";
import ProductVariations from "./ProductVariations/ProductVariations";

const { Panel } = Collapse;

function ProductDetail() {
  const [translate] = useTranslation();
  const {
    model,
    isDetail,
    handleUpdateNewModel,
    handleChangeSimpleField,
    handleChangeObjectField,
    handleGoBase,
    handleSave,
  } = detailService.useDetail<Product>(
    Product,
    productRepository.get,
    productRepository.save,
    PRODUCT_MASTER_ROUTE
  );
  const {
    handleChangeUOM,
    statusList,
    usedVariationList,
    unitOfMeasureGroupingFilter,
    handleChangeChangeProductGrouping,
    renderItems,
    hasCodeGeneratorRule,
  } = useProductDetailHook(model, handleUpdateNewModel);

  const {
    currentVariationGrouping,
    setCurrentVariationGrouping,
    handleAddVariationGrouping,
    handleRemoveVariationGrouping,
    visible,
    handleCreateVariation,
    handleCloseVariation,
    handleSaveVariation,
    handleChangeVariationGroupingName,
    handleRemoveVariation,
    handleCombine,
    handleChangeListSimpleField,
    handleChangeListObjectField,
    handleChangeItemImageMapping,
    // loading,
    handleDeleteItem,
  } = useProductVariationHook(model, handleUpdateNewModel);
  const { childrenAction } = useProductFooter(
    translate,
    model,
    handleSave,
    handleGoBase
  );
  const items = React.useMemo(() => {
    let list = [];
    if (model.items && model.items.length > 0) {
      list = model.items.map(item => {
        if (item.key === undefined) {
          item.key = item.id;
        }
        return item;
      });
    }
    return list;
  }, [model.items]);
  const handleChangeProductImageMapping = React.useCallback((values) => {
    const newModel = { ...model };
    const arr = newModel.productImageMappings ? newModel.productImageMappings : [];
    const mappings = values.map(item => {
      const mapping = new ProductImageMapping();
      mapping.image = item;
      mapping.imageId = item?.id;
      return mapping;
    });
    newModel.productImageMappings = [...arr, ...mappings];
    handleUpdateNewModel(newModel);

  }, [handleUpdateNewModel, model]);

  const columns: ColumnProps<Item>[] = React.useMemo(() => {
    return [
      {
        title: translate("items.images"),
        key: nameof(items[0].images),
        dataIndex: nameof(items[0].images),
        width: 300,
        align: 'center',
        render(...[, item, index]) {
          return <div className={classNames("image_item", {
            'has-image': item?.itemImageMappings?.length > 0,
          })}
            key={index}>
            <UploadFile
              files={item.itemImageMappings ?
                item.itemImageMappings.map(item => item.image)
                : []
              }
              onUploadImage={productRepository.saveItemImage}
              type={UPLOADTYPE.IMAGE}
              updateList={handleChangeItemImageMapping(item, index)}

            />
          </div>;
        },
      },

      {
        title: translate("items.name"),
        key: nameof(items[0].name),
        dataIndex: nameof(items[0].name),
        render(...[, item]) {
          return item?.name;
        },
      },
      {
        title: translate("items.code"),
        key: nameof(items[0].code),
        dataIndex: nameof(items[0].code),
        render(...[, item, index]) {
          return <FormItem
            validateStatus={formService.getValidationStatus<Product>(
              item.errors,
              nameof(item.code)
            )}
            message={item.errors?.code}
          >
            <InputText
              isMaterial={true}
              value={item.code}
              placeHolder={translate("items.code")}
              onChange={handleChangeListSimpleField(
                nameof(item.code),
                index
              )}
              disabled={true}
            />
          </FormItem>;
        },
      },
      {
        title: translate("items.scanCode"),
        key: nameof(items[0].scanCode),
        dataIndex: nameof(items[0].scanCode),
        render(...[, item, index]) {
          return (
            <FormItem
              validateStatus={formService.getValidationStatus<Product>(
                item.errors,
                nameof(item.scanCode)
              )}
              message={item.errors?.scanCode}
            >
              <InputText
                isMaterial={true}
                value={item.scanCode}
                // placeHolder={translate("products.placeholder.eRPCode")}
                onChange={handleChangeListSimpleField(
                  nameof(item.scanCode),
                  index
                )}
              />
            </FormItem>
          );
        },
      },
      {
        title: translate("items.price"),
        key: nameof(items[0].salePrice),
        dataIndex: nameof(items[0].salePrice),
        render(...[, item, index]) {
          return (
            <FormItem
              validateStatus={formService.getValidationStatus<Item>(
                item.errors,
                nameof(item.salePrice)
              )}
              message={item.errors?.salePrice}
            >
              <InputNumber
                isMaterial={true}
                value={item.salePrice}
                onChange={handleChangeListSimpleField(
                  nameof(item.salePrice),
                  index
                )}
                numberType={DECIMAL}
              />
            </FormItem>
          );
        },
      },
      {
        title: translate("items.retailPrice"),
        key: nameof(items[0].retailPrice),
        dataIndex: nameof(items[0].retailPrice),
        render(...[, item, index]) {
          return (
            <FormItem
              validateStatus={formService.getValidationStatus<Item>(
                item.errors,
                nameof(item.retailPrice)
              )}
              message={item.errors?.retailPrice}
            >
              <InputNumber
                isMaterial={true}
                value={item.retailPrice}
                onChange={handleChangeListSimpleField(
                  nameof(item.retailPrice),
                  index
                )}
                numberType={DECIMAL}
              />
            </FormItem>
          );
        },
      },
      {
        title: translate("items.status"),
        key: nameof(items[0].key),
        dataIndex: nameof(items[0].status),
        align: "center",
        width: 150,
        render(...[, item, index]) {
          return (
            <>
              {statusList.length > 0 && (
                <SwitchStatus
                  checked={item.statusId === statusList[1]?.id ? true : false}
                  list={statusList}
                  onChange={handleChangeListObjectField(
                    nameof(item.status),
                    index
                  )}
                />
              )}
            </>
          );
        },
      },
      {
        title: translate("general.actions.label"),
        key: "action",
        align: "center",
        // dataIndex: nameof(items[0].status),
        render(...params: [Item, Item, number]) {
          return (
            <div className="d-flex justify-content-center button-action-table">
              {!params[1].used && (
                <Tooltip title={translate("general.actions.delete")}>
                  <button
                    className="btn btn-action text-danger"
                    onClick={handleDeleteItem(params[2])}
                  >
                    <i className="tio-delete_outlined" />
                  </button>
                </Tooltip>
              )}
            </div>
          );
        },
      },
    ];
  }, [handleChangeItemImageMapping, handleChangeListObjectField, handleChangeListSimpleField, handleDeleteItem, items, statusList, translate]);
  // React.useEffect(() => {
  //   console.log('model', model);
  // }, [model]);
  return (
    <>
      <div className="page__detail-tabs">
        <>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col lg={18} className="gutter-row">
              <Row>
                <Col lg={24}>
                  <Collapse
                    defaultActiveKey={["1"]}
                    onChange={() => { }}
                    expandIcon={({ isActive }) => (
                      <CaretRightOutlined rotate={isActive ? 90 : 0} />
                    )}
                    className="site-collapse-custom-collapse"
                    expandIconPosition="right"
                  >
                    <Panel
                      header={"Thông tin chung"}
                      key="1"
                      className="site-collapse-custom-panel"
                    >
                      <Row>
                        <Col lg={24}>
                          <div className="upload-file__container">
                            <UploadFile
                              files={model.productImageMappings ?
                                model.productImageMappings.map(item => item.image)
                                : []
                              }
                              onUploadImage={productRepository.saveImage}
                              type={UPLOADTYPE.IMAGE}
                              updateList={handleChangeProductImageMapping}
                            />
                          </div>
                        </Col>
                      </Row>

                      <Row className="d-flex justify-content-between mt-3">
                        <div className="d-flex justify-content-start">
                          <Checkbox
                            onChange={handleChangeSimpleField(
                              nameof(model.isPurchasable)
                            )}
                            checked={model.isPurchasable}
                          >
                            <span className="product-label">
                              {translate("products.isPurchaseable")}
                            </span>
                          </Checkbox>
                          <Checkbox
                            onChange={handleChangeSimpleField(
                              nameof(model.isSellable)
                            )}
                            checked={model.isSellable}
                          >
                            <span className="product-label">
                              {translate("products.isSellable")}
                            </span>
                          </Checkbox>
                        </div>
                        <div>
                          <FormItem>
                            <SwitchStatus
                              checked={
                                model.statusId === statusList[1]?.id
                                  ? true
                                  : false
                              }
                              list={statusList}
                              onChange={handleChangeObjectField(
                                nameof(model.status)
                              )}
                            />
                            <span className="product-label ml-2">
                              {translate("products.status")}
                            </span>
                          </FormItem>
                        </div>
                      </Row>
                      <Row className="mt-3">
                        <Col lg={24}>
                          <FormItem
                            label={translate("products.category")}
                            validateStatus={formService.getValidationStatus<
                              Product
                            >(model.errors, nameof(model.category))}
                            message={model.errors?.category}
                            isRequired={true}
                          >
                            <CategorySelect
                              isMaterial={true}
                              classFilter={CategoryFilter}
                              placeHolder={translate(
                                "products.placeholder.category"
                              )}
                              getList={productRepository.singleListCategory}
                              onChange={handleChangeObjectField(
                                nameof(model.category)
                              )}
                              model={model.category}
                            />
                          </FormItem>
                        </Col>
                      </Row>
                      {model.categoryId !== undefined &&
                        model.categoryId !== null &&
                        model.categoryId !== 0 && (
                          <>
                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                              <Col lg={8} className="mt-3">
                                <FormItem
                                  label={translate("products.code")}
                                  validateStatus={formService.getValidationStatus<
                                    Product
                                  >(model.errors, nameof(model.code))}
                                  message={model.errors?.code}
                                  isRequired={true}
                                >
                                  <InputText
                                    isMaterial={true}
                                    value={model.code}
                                    className={"tio-format_bullets"}
                                    placeHolder={
                                      hasCodeGeneratorRule
                                        ? translate('products.placeholder.codeGeneratorRule')
                                        : translate('products.placeholder.code')
                                    }
                                    disabled={hasCodeGeneratorRule}
                                  />
                                </FormItem>
                              </Col>
                              <Col lg={16} className="mt-3">
                                <FormItem
                                  label={translate("products.name")}
                                  validateStatus={formService.getValidationStatus<
                                    Product
                                  >(model.errors, nameof(model.name))}
                                  message={model.errors?.name}
                                  isRequired={true}
                                >
                                  <InputText
                                    isMaterial={true}
                                    value={model.name}
                                    placeHolder={translate(
                                      "products.placeholder.name"
                                    )}
                                    className={"tio-shopping_icon"}
                                    onChange={handleChangeSimpleField(
                                      nameof(model.name)
                                    )}
                                  />
                                </FormItem>
                              </Col>

                              <Col lg={8} className="mt-3">
                                <FormItem
                                  label={translate("products.scanCode")}
                                  validateStatus={formService.getValidationStatus<
                                    Product
                                  >(model.errors, nameof(model.scanCode))}
                                  message={model.errors?.scanCode}
                                >
                                  <InputText
                                    isMaterial={true}
                                    value={model.scanCode}
                                    placeHolder={translate(
                                      "products.placeholder.scanCode"
                                    )}
                                    className={"tio-barcode"}
                                    onChange={handleChangeSimpleField(
                                      nameof(model.scanCode)
                                    )}
                                  />
                                </FormItem>
                              </Col>
                              <Col lg={16} className="mt-3">
                                <FormItem
                                  label={translate("products.otherName")}
                                  validateStatus={formService.getValidationStatus<
                                    Product
                                  >(model.errors, nameof(model.otherName))}
                                  message={model.errors?.otherName}
                                >
                                  <InputText
                                    isMaterial={true}
                                    value={model.otherName}
                                    placeHolder={translate(
                                      "products.placeholder.otherName"
                                    )}
                                    className={
                                      "tio-carousel_horizontal_outlined"
                                    }
                                    onChange={handleChangeSimpleField(
                                      nameof(model.otherName)
                                    )}
                                  />
                                </FormItem>
                              </Col>
                              <Col lg={8} className="mt-3 ">
                                <FormItem
                                  label={translate("products.eRPCode")}
                                  validateStatus={formService.getValidationStatus<
                                    Product
                                  >(model.errors, nameof(model.erpCode))}
                                  message={model.errors?.erpCode}
                                >
                                  <InputText
                                    isMaterial={true}
                                    value={model.erpCode}
                                    placeHolder={translate(
                                      "products.placeholder.eRPCode"
                                    )}
                                    className={
                                      "tio-carousel_horizontal_outlined"
                                    }
                                    onChange={handleChangeSimpleField(
                                      nameof(model.erpCode)
                                    )}
                                  />
                                </FormItem>
                              </Col>
                              <Col lg={16} className="mt-3">
                                <FormItem
                                  label={translate("products.description")}
                                  validateStatus={formService.getValidationStatus<
                                    Product
                                  >(model.errors, nameof(model.description))}
                                  message={model.errors?.description}
                                >
                                  <InputText
                                    isMaterial={true}
                                    value={model.description}
                                    placeHolder={translate(
                                      "products.placeholder.description"
                                    )}
                                    className={"tio-comment_text_outlined"}
                                    onChange={handleChangeSimpleField(
                                      nameof(model.description)
                                    )}
                                  />
                                </FormItem>
                              </Col>
                            </Row>
                          </>
                        )}
                    </Panel>
                  </Collapse>
                </Col>
              </Row>
              {model.categoryId !== undefined &&
                model.categoryId !== null &&
                model.categoryId !== 0 && (
                  <Row>
                    <Col lg={24}>
                      <Collapse
                        defaultActiveKey={["1"]}
                        onChange={() => { }}
                        className="site-collapse-custom-collapse "
                        expandIcon={({ isActive }) => (
                          <CaretRightOutlined rotate={isActive ? 90 : 0} />
                        )}
                        expandIconPosition="right"
                      >
                        <Panel
                          header={"Đơn vị"}
                          key="1"
                          className="site-collapse-custom-panel product-panel"
                        >
                          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col lg={8} className="mt-3">
                              <FormItem
                                label={translate("products.unitOfMeasure")}
                                validateStatus={formService.getValidationStatus<
                                  Product
                                >(model.errors, nameof(model.unitOfMeasure))}
                                message={model.errors?.unitOfMeasure}
                                isRequired={true}
                              >
                                <Select
                                  isMaterial={true}
                                  classFilter={UnitOfMeasureFilter}
                                  placeHolder={translate(
                                    "products.placeholder.unitOfMeasure"
                                  )}
                                  getList={
                                    productRepository.singleListUnitOfMeasure
                                  }
                                  onChange={handleChangeUOM}
                                  model={model.unitOfMeasure}
                                />
                              </FormItem>
                            </Col>
                            <Col lg={8} className="mt-3">
                              <FormItem
                                label={translate(
                                  "products.unitOfMeasureGrouping"
                                )}
                                validateStatus={formService.getValidationStatus<
                                  Product
                                >(
                                  model.errors,
                                  nameof(model.unitOfMeasureGrouping)
                                )}
                                message={model.errors?.unitOfMeasureGrouping}
                              >
                                <Select
                                  isMaterial={true}
                                  classFilter={UnitOfMeasureGroupingFilter}
                                  placeHolder={translate(
                                    "products.placeholder.unitOfMeasureGrouping"
                                  )}
                                  getList={
                                    productRepository.singleListUnitOfMeasureGrouping
                                  }
                                  onChange={handleChangeObjectField(
                                    nameof(model.unitOfMeasureGrouping)
                                  )}
                                  model={model.unitOfMeasureGrouping}
                                  modelFilter={unitOfMeasureGroupingFilter}
                                />
                              </FormItem>
                            </Col>
                            <Col lg={8} className="mt-3">
                              <FormItem
                                label={translate(
                                  "products.unitOfMeasureGroupingContent"
                                )}
                              >
                                <InputText
                                  isMaterial={true}
                                  value={renderItems}
                                  disabled={true}
                                  placeHolder={translate(
                                    "products.placeholder.unitOfMeasureGroupingContent"
                                  )}
                                />
                              </FormItem>
                            </Col>
                          </Row>
                        </Panel>
                      </Collapse>
                    </Col>
                  </Row>
                )}
            </Col>
            <Col lg={6} className="gutter-row">

              <Row>
                <Col lg={24}>
                  <Collapse
                    defaultActiveKey={["1"]}
                    onChange={() => { }}
                    className="site-collapse-custom-collapse"
                    expandIcon={({ isActive }) => (
                      <CaretRightOutlined rotate={isActive ? 90 : 0} />
                    )}
                    expandIconPosition="right"
                  >
                    <Panel
                      header={"Giá sản phẩm"}
                      key="1"
                      className="site-collapse-custom-panel"
                      style={{ height: "298px" }}
                    >
                      <Row>
                        {model.usedVariationId !== 1 && (
                          <Col lg={24} className="mt-3">
                            <FormItem
                              label={translate("products.salePrice")}
                              validateStatus={formService.getValidationStatus<
                                Product
                              >(model.errors, nameof(model.salePrice))}
                              message={model.errors?.salePrice}
                            >
                              <InputNumber
                                isMaterial={true}
                                value={model.salePrice}
                                placeHolder={translate(
                                  "products.placeholder.salePrice"
                                )}
                                onChange={handleChangeSimpleField(
                                  nameof(model.salePrice)
                                )}
                                numberType={DECIMAL}
                                className="tio-money_vs"
                              />
                            </FormItem>
                          </Col>)}
                        <Col lg={24} className="mt-3">
                          <FormItem
                            label={translate("products.taxType")}
                            validateStatus={formService.getValidationStatus<
                              Product
                            >(model.errors, nameof(model.taxType))}
                            message={model.errors?.taxType}
                            isRequired={true}
                          >
                            <Select
                              isMaterial={true}
                              classFilter={TaxTypeFilter}
                              placeHolder={translate(
                                "products.placeholder.taxType"
                              )}
                              getList={productRepository.singleListTaxType}
                              onChange={handleChangeObjectField(
                                nameof(model.taxType)
                              )}
                              model={model.taxType}
                            />
                          </FormItem>
                        </Col>
                      </Row>
                    </Panel>
                  </Collapse>
                </Col>
              </Row>
              <Row>
                <Col lg={24}>
                  <Collapse
                    defaultActiveKey={["1"]}
                    onChange={() => { }}
                    className="site-collapse-custom-collapse"
                    expandIcon={({ isActive }) => (
                      <CaretRightOutlined rotate={isActive ? 90 : 0} />
                    )}
                    expandIconPosition="right"
                  >
                    <Panel
                      header={"Phân loại"}
                      key="1"
                      className="site-collapse-custom-panel"
                      style={{ height: "353px" }}
                    >
                      <Row>
                        <Col lg={24} className="mt-3">
                          <FormItem
                            label={translate("products.productType")}
                            validateStatus={formService.getValidationStatus<
                              Product
                            >(model.errors, nameof(model.productType))}
                            message={model.errors?.productType}
                            isRequired={true}
                          >
                            <Select
                              isMaterial={true}
                              classFilter={ProductTypeFilter}
                              placeHolder={translate(
                                "products.placeholder.productType"
                              )}
                              getList={productRepository.singleListProductType}
                              onChange={handleChangeObjectField(
                                nameof(model.productType)
                              )}
                              model={model.productType}
                            />
                          </FormItem>
                        </Col>
                        <Col lg={24} className="mt-3">
                          <FormItem
                            label={translate("products.brand")}
                            validateStatus={formService.getValidationStatus<
                              Product
                            >(model.errors, nameof(model.brand))}
                            message={model.errors?.brand}
                          >
                            <Select
                              isMaterial={true}
                              classFilter={BrandFilter}
                              placeHolder={translate(
                                "products.placeholder.brand"
                              )}
                              getList={productRepository.singleListBrand}
                              onChange={handleChangeObjectField(
                                nameof(model.brand)
                              )}
                              model={model.brand}
                            />
                          </FormItem>
                        </Col>

                        <Col lg={24} className="mt-3">
                          <FormItem
                            label={translate("products.productGrouping")}
                            validateStatus={formService.getValidationStatus<
                              Product
                            >(model.errors, nameof(model.productGrouping))}
                            message={model.errors?.productGrouping}
                          >
                            <TreeSelect
                              isMaterial={true}
                              checkable={true}
                              placeHolder={translate(
                                "products.placeholder.productGrouping"
                              )}
                              selectable={false}
                              classFilter={ProductGroupingFilter}
                              onChange={handleChangeChangeProductGrouping}
                              checkStrictly={true}
                              getTreeData={
                                productRepository.singleListProductGrouping
                              }
                              listItem={
                                model.productProductGroupingMappings &&
                                model.productProductGroupingMappings.map(
                                  (current: ProductProductGroupingMapping) =>
                                    current.productGrouping
                                )
                              }
                            />
                          </FormItem>
                        </Col>
                      </Row>
                    </Panel>
                  </Collapse>
                </Col>
              </Row>
              <Row className="">
                <Col lg={24}>
                  <Collapse
                    defaultActiveKey={["1"]}
                    onChange={() => { }}
                    className="site-collapse-custom-collapse"
                    expandIcon={({ isActive }) => (
                      <CaretRightOutlined rotate={isActive ? 90 : 0} />
                    )}
                    expandIconPosition="right"
                  >
                    <Panel
                      header="Lịch sử"
                      key="1"
                      className="site-collapse-custom-panel"
                    >

                      <Row>
                        <Steps direction="vertical" size="small" className="product__step">
                          {model?.productHistories && model?.productHistories.map((item, index) => {
                            const duration = moment.duration(moment().diff(item.savedAt));
                            const min = duration.asMinutes();
                            const hours = duration.asHours();
                            return (
                              <Steps.Step
                                key={index}
                                className="ml-2"
                                title={item?.name}
                                description={(() => (
                                  <div className="d-flex justify-content-between">
                                    <div>{item?.appUser?.displayName}</div>
                                    <div> {min < 60 ? `${Math.ceil(min)} phút trước` :
                                      hours < 24 ?
                                        `${Math.ceil(hours)} giờ trước`
                                        : `Khoảng ${Math.ceil(hours / 24)} ngày trước`
                                    } </div>
                                  </div>
                                ))()}
                                icon={(() => (<img
                                  className="img-fluid"
                                  src={require("../../../assets/images/oval.svg")}
                                  width='16px'
                                  height='16px'
                                  alt=""
                                // onClick={() => handleShowHisory(item)}
                                />))()}

                              >
                              </Steps.Step>);
                          })}
                        </Steps>
                      </Row>
                    </Panel>
                  </Collapse>
                </Col>
              </Row>
            </Col>
          </Row>
          {isDetail && model.usedVariationId === 0 ?
            <>
            </> :
            (
              model.categoryId !== undefined &&
              model.categoryId !== null &&
              model.categoryId !== 0 &&
              model.categoryId !== null &&

              (

                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  <Col lg={18} className="gutter-row">
                    <Collapse
                      defaultActiveKey={["1"]}
                      onChange={() => { }}
                      expandIcon={({ isActive }) => (
                        <CaretRightOutlined rotate={isActive ? 90 : 0} />
                      )}
                      className="site-collapse-custom-collapse"
                      expandIconPosition="right"
                    >
                      <Panel
                        header={"Phiên bản"}
                        key="1"
                        className="site-collapse-custom-panel"
                      >

                        <>
                          {!isDetail &&
                            <Row className="ml-3">
                              <FormItem>
                                <SwitchStatus
                                  checked={
                                    model.usedVariationId ===
                                      usedVariationList[1]?.id
                                      ? true
                                      : false
                                  }
                                  list={usedVariationList}
                                  onChange={handleChangeObjectField(
                                    nameof(model.usedVariation)
                                  )}
                                />
                                <span className="product-label ml-2">
                                  {translate("products.usedVariation")}
                                </span>
                              </FormItem>
                            </Row>
                          }
                          {model.usedVariationId === 1 && (
                            <>
                              <ProductVariations
                                model={model}
                                handleChangeVariationGroupingName={
                                  handleChangeVariationGroupingName
                                }
                                handleCreateVariation={handleCreateVariation}
                                handleRemoveVariation={handleRemoveVariation}
                                visible={visible}
                                handleCloseVariation={handleCloseVariation}
                                handleSaveVariation={handleSaveVariation}
                                currentVariationGrouping={
                                  currentVariationGrouping
                                }
                                setCurrentVariationGrouping={
                                  setCurrentVariationGrouping
                                }
                                handleAddVariationGrouping={
                                  handleAddVariationGrouping
                                }
                                handleRemoveVariationGrouping={
                                  handleRemoveVariationGrouping
                                }
                              />
                              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="pl-3">
                                <Col lg={6} className="mt-3">
                                  <FormItem
                                    // label={translate("items.price")}
                                    validateStatus={formService.getValidationStatus<
                                      Product
                                    >(model.errors, nameof(model.price))}
                                    message={model.errors?.salePrice}
                                  >
                                    <InputNumber
                                      isMaterial={true}
                                      value={model.salePrice}
                                      placeHolder={translate(
                                        "items.placeholder.price"
                                      )}
                                      onChange={handleChangeSimpleField(
                                        nameof(model.salePrice)
                                      )}
                                      numberType={DECIMAL}
                                      className="tio-balels_outlined"
                                    />
                                  </FormItem>
                                </Col>
                                <Col lg={6} className="mt-3">
                                  <FormItem
                                    // label={translate("products.retailPrice")}
                                    validateStatus={formService.getValidationStatus<
                                      Product
                                    >(model.errors, nameof(model.retailPrice))}
                                    message={model.errors?.retailPrice}
                                  >
                                    <InputNumber
                                      isMaterial={true}
                                      value={model.retailPrice}
                                      placeHolder={translate(
                                        "products.placeholder.retailPrice"
                                      )}
                                      onChange={handleChangeSimpleField(
                                        nameof(model.retailPrice)
                                      )}
                                      numberType={DECIMAL}
                                      className="tio-balels_outlined"
                                    />
                                  </FormItem>
                                </Col>
                                <Col lg={6} >
                                  <button
                                    className={classNames(
                                      "btn btn-sm component__btn-primary mr-2 mt-3"
                                    )}
                                    onClick={handleCombine}
                                  >
                                    <span>
                                      {translate("products.actions.combine")}
                                    </span>
                                  </button>
                                </Col>
                              </Row>
                              <Row>

                                <Table
                                  tableLayout="fixed"
                                  columns={columns}
                                  dataSource={items}
                                  pagination={false}
                                  rowKey={nameof(items[0].key)}
                                  className="mt-3"
                                />
                              </Row>
                            </>
                          )}
                        </>
                      </Panel>
                    </Collapse>
                  </Col>
                </Row>
              )
            )
          }
        </>
      </div>

      <AppFooter childrenAction={childrenAction}></AppFooter>
    </>
  );
}

export default ProductDetail;
