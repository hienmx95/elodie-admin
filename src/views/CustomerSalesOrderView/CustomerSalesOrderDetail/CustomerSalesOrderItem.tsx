import { IdFilter } from "@react3l/advanced-filters";
import { commonService } from "@react3l/react3l/services";
import { Card, Checkbox, Col, Row, Spin } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import AdvanceStringFilter from "components/Utility/AdvanceFilter/AdvanceStringFilter/AdvanceStringFilter";
import Modal from "components/Utility/Modal/Modal";
import Pagination from "components/Utility/Pagination/Pagination";
import { TFunction } from "i18next";
import { Item, ItemFilter } from "models/Item";
import { CustomerSalesOrderContent } from "models/CustomerSalesOrderContent";
import { CustomerSalesOrderPromotion } from "models/CustomerSalesOrderPromotion";
import React, { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { forkJoin } from "rxjs";
import { finalize } from "rxjs/operators";
import {
  ActionFilterEnum,
  AdvanceFilterAction,
  advanceFilterReducer
} from "services/advance-filter-service";
import { commonWebService } from "services/common-web-service";
import nameof from "ts-nameof.macro";
import box from "./../../../assets/images/box-image.svg";
import circle from "./../../../assets/images/green-circle.svg";
import { customerSalesOrderRepository } from "repositories/customer-sales-order-repository";
import { Model } from "@react3l/react3l/core";
import { Modal as ModalWarning } from "antd";
import { CustomerSalesOrder } from "models/CustomerSalesOrder";
interface CustomerSalesOrderItemAction {
  type: string;
  itemList?: Item[];
  currentItemList?: Item[];
  idList?: number[];
  currentIdList?: number[];
  total?: number;
  checkedAll?: boolean;
}

interface CustomerSalesOrderRequestItem {
  itemList?: Item[];
  currentItemList?: Item[];
  idList?: number[];
  currentIdList?: number[];
  total?: number;
  checkedAll?: boolean;
}

function leadReducer(
  lastState: CustomerSalesOrderRequestItem,
  action: CustomerSalesOrderItemAction
): CustomerSalesOrderRequestItem {
  switch (action.type) {
    case "UPDATE_ITEM_LIST":
      return {
        ...lastState,
        itemList: action.itemList,
        total: action.total,
        checkedAll: action.checkedAll,
      };
    case "UPDATE_ID_LIST":
      return {
        ...lastState,
        idList: [...action.idList],
        currentIdList: [...action.idList],
        currentItemList: [...action.currentItemList],
      };
    case "UPDATE_BOTH_CHECKED":
      return {
        ...lastState,
        idList: [...lastState.idList, ...action.idList],
        currentItemList: [
          ...lastState.currentItemList,
          ...action.currentItemList,
        ],
        itemList: action.itemList,
      };
    case "UPDATE_BOTH_UNCHECKED":
      const filteredIdList = lastState.idList.filter((currentItem) => {
        return !action.idList.includes(currentItem);
      });
      const filteredItemList = lastState.currentItemList.filter(
        (currentItem) => {
          return !action.idList.includes(currentItem.id);
        }
      );
      return {
        ...lastState,
        idList: filteredIdList,
        itemList: action.itemList,
        currentItemList: filteredItemList,
      };
    case "UPDATE_BOTH_CHECKED_All":
      return {
        ...lastState,
        idList: commonWebService.uniqueArray([
          ...lastState.idList,
          ...action.idList,
        ]),
        itemList: action.itemList,
        currentItemList: commonWebService.uniqueArray([
          ...lastState.currentItemList,
          ...action.currentItemList,
        ]),
        checkedAll: action.checkedAll,
      };
    case "UPDATE_BOTH_UNCHECKED_All":
      const unCheckedIdList = lastState.idList.filter((currentItem) => {
        return !action.idList.includes(currentItem);
      });
      const unCheckedItemList = lastState.currentItemList.filter(
        (currentItem) => {
          return !action.idList.includes(currentItem.id);
        }
      );
      return {
        ...lastState,
        idList: unCheckedIdList,
        itemList: action.itemList,
        currentItemList: unCheckedItemList,
        checkedAll: action.checkedAll,
      };
    default:
      return null;
  }
}

export function useCustomerSalesOrderItem<T extends Model>(
  handleMappingItems: (
    models
  ) => void,
  models: T[],
  fieldName?: string,
  setCalculateTotal?: Dispatch<SetStateAction<boolean>>,
  CustomerSalesOrder?: CustomerSalesOrder,
): {
  openItemDialog: boolean;
  itemList: Item[];
  itemFilter: ItemFilter;
  totalList: number;
  checkedAll: boolean;
  loadingItem: boolean;
  setOpenItemDialog: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpenItem: (event: any) => void;
  handleCheckItem: (item: Item) => (event: any) => void;
  handleCheckAllItem: (event: any) => void;
  handleSaveItem: () => void;
  handleCancelItem: () => void;
  handleChangePaginationItem: (skip: number, take: number) => void;
  handleChangeSearchItem: (
    fieldName: string,
    filterType: string
  ) => (value: any) => void;
  handleChangeSelectItem: (id: number) => void;
} {
  const [
    { itemList, currentItemList, idList, currentIdList, total, checkedAll },
    dispatch,
  ] = React.useReducer<React.Reducer<CustomerSalesOrderRequestItem, CustomerSalesOrderItemAction>>(
    leadReducer,
    {
      itemList: [],
      idList: [],
      total: 0,
      checkedAll: false,
      currentIdList: [],
      currentItemList: [],
    }
  );
  const [translate] = useTranslation();
  const [openItemDialog, setOpenItemDialog] = React.useState<boolean>(false);
  const [subscription] = commonService.useSubscription();
  const [itemFilter, dispatchItemFilter] = React.useReducer<
    React.Reducer<ItemFilter, AdvanceFilterAction<ItemFilter>>
  >(advanceFilterReducer, new ItemFilter());
  const [loading, setLoading] = React.useState<boolean>();

  const handleGetItemList = React.useCallback(
    async (filterValue) => {
      setLoading(true);
      const getNCountItems = forkJoin([
        customerSalesOrderRepository.listItem(filterValue),
        customerSalesOrderRepository.countItem(filterValue),
      ])
        .pipe(
          finalize(() => {
            setLoading(false);
          })
        )
        .subscribe(
          (results: [Item[], number]) => {
            if (results[0]) {
              const itemList = [...results[0]];
              const totalValue = Number(results[1]);
              let countChecked = 0;
              itemList.map((currentItem) => {
                const filteredValue = idList.filter(
                  (currentId) => currentItem.id === currentId
                )[0];
                if (filteredValue) {
                  currentItem.isChecked = true;
                  countChecked += 1;
                } else {
                  currentItem.isChecked = false;
                }
                return currentItem;
              });
              if (countChecked < 10) {
                dispatch({
                  type: "UPDATE_ITEM_LIST",
                  itemList: itemList,
                  total: totalValue,
                  checkedAll: false,
                });
              } else {
                dispatch({
                  type: "UPDATE_ITEM_LIST",
                  itemList: itemList,
                  total: totalValue,
                  checkedAll: true,
                });
              }
            }
          },
          (errors: any) => { }
        );
      subscription.add(getNCountItems);
    },
    [idList, subscription]
  );

  const handleOpenItem = React.useCallback(
    (event: any) => {
      const itemFilterValue = { ...itemFilter };
      itemFilterValue.salesEmployeeId.equal = CustomerSalesOrder.salesEmployeeId;
      dispatchItemFilter({
        type: ActionFilterEnum.ChangeAllField,
        data: itemFilterValue,
      });
      if (typeof CustomerSalesOrder.salesEmployeeId === 'undefined') {
        ModalWarning.warning({
          title: '',
          content: translate('customerSalesOrders.errors.saleEmployee'),
        });
      }
      else{
        handleGetItemList(itemFilterValue);
        setOpenItemDialog(true);
      }
    },
    [itemFilter, handleGetItemList, CustomerSalesOrder]
  );

  const handleCheckItem = React.useCallback(
    (item: Item) => (event: any) => {
      event.stopPropagation();
      event.preventDefault();
      if (item.hasInventory) {
        const itemValue = { ...item };
        itemValue.isChecked = !itemValue.isChecked;
        const index = itemList.findIndex(
          (currentItem) => currentItem.id === item.id
        );
        itemList[index] = itemValue;
        if (itemValue.isChecked) {
          dispatch({
            type: "UPDATE_BOTH_CHECKED",
            itemList,
            currentItemList: [itemValue],
            idList: [itemValue.id],
          });
        } else {
          dispatch({
            type: "UPDATE_BOTH_UNCHECKED",
            itemList,
            currentItemList: [itemValue],
            idList: [itemValue.id],
          });
        }
      }
    },
    [itemList]
  );

  const handleCheckAllItem = React.useCallback(
    (event: CheckboxChangeEvent) => {
      const itemListValue = [...itemList];
      if (itemListValue && itemListValue.length > 0) {
        const isChecked = event.target.checked;
        itemListValue.forEach((currentItem) => {
          currentItem.isChecked = isChecked;
        });
        const idList = itemList.map((currentItem: Item) => currentItem.id);
        if (isChecked) {
          dispatch({
            type: "UPDATE_BOTH_CHECKED_All",
            itemList: itemListValue,
            currentItemList: itemListValue,
            idList,
            checkedAll: isChecked,
          });
        } else {
          dispatch({
            type: "UPDATE_BOTH_UNCHECKED_All",
            itemList: itemListValue,
            currentItemList: itemListValue,
            idList,
            checkedAll: isChecked,
          });
        }
      }
    },
    [itemList]
  );

  const handleSaveItem = React.useCallback(() => {
    if (fieldName === 'customerSalesOrderContent') {
      const currentCustomerSalesOrderContent = models
        ? [...models]
        : [];

      const newCustomerSalesOrderContents = [...currentItemList].map(
        (currentItem, index) => {
          const filteredValue = currentCustomerSalesOrderContent.filter(
            (currentContent) => {
              return currentContent.itemId === currentItem.id;
            }
          )[0];

          if (filteredValue) {
            return { ...filteredValue, key: undefined };
          } else {
            const content = new CustomerSalesOrderContent();
            content.item = { ...currentItem };
            content.itemId = currentItem?.id;
            content.primaryUnitOfMeasure = currentItem?.product?.unitOfMeasure;
            content.primaryUnitOfMeasureId = currentItem?.product?.unitOfMeasureId;
            content.taxPercentage = currentItem?.product?.taxType?.percentage;
            content.factor = 1;
            content.unitOfMeasure = currentItem?.product?.unitOfMeasure;
            content.unitOfMeasureId = currentItem?.product?.unitOfMeasureId;
            content.salePrice = 1 * currentItem.salePrice ?? 0;
            content.amount = currentItem.salePrice;
            content.totalAmount = currentItem.salePrice;
            content.discountPercentage = 0;
            content.generalDiscountAmount = 0;
            content.generalDiscountPercentage = 0;
            content.taxType = currentItem?.product?.taxType;
            content.taxTypeId = currentItem?.product?.taxTypeId;
            content.primaryPrice = currentItem?.salePrice;
            content.quantity = 1;
            content.requestedQuantity = 1;
            return content;
          }
        }
      );
      handleMappingItems(newCustomerSalesOrderContents);
    }
    if (fieldName === 'customerSalesOrderPromotion') {
      const currentCustomerSalesOrderPromotion = models
        ? [...models]
        : [];

      const newCustomerSalesOrderPromotions = [...currentItemList].map(
        (currentItem, index) => {
          const filteredValue = currentCustomerSalesOrderPromotion.filter(
            (currentContent) => {
              return currentContent.itemId === currentItem.id;
            }
          )[0];

          if (filteredValue) {
            return { ...filteredValue, key: undefined };
          } else {
            const content = new CustomerSalesOrderPromotion();
            content.item = { ...currentItem };
            content.itemId = currentItem?.id;
            content.primaryUnitOfMeasure = currentItem?.product?.unitOfMeasure;
            content.primaryUnitOfMeasureId = currentItem?.product?.unitOfMeasureId;
            content.quantity = 1;
            content.requestedQuantity = 1;
            content.salePrice = 1 * currentItem.salePrice ?? 0;
            content.primaryPrice = currentItem?.salePrice;
            content.factor = 1;
            content.unitOfMeasure = currentItem?.product?.unitOfMeasure;
            content.unitOfMeasureId = currentItem?.product?.unitOfMeasure?.id;
            return content;
          }
        }
      );
      handleMappingItems(newCustomerSalesOrderPromotions);
    }
    setOpenItemDialog(false);
    if (setCalculateTotal) {
      setCalculateTotal(true);
    }
  }, [fieldName, setCalculateTotal, models, currentItemList, handleMappingItems]);

  const handleCancelItem = React.useCallback(() => {
    const newFilterValue = new ItemFilter();
    dispatchItemFilter({
      type: ActionFilterEnum.ChangeAllField,
      data: newFilterValue,
    });
    dispatch({
      type: "UPDATE_ID_LIST",
      idList: currentIdList,
      currentItemList: currentItemList,
    });
    setOpenItemDialog(false);
  }, [currentIdList, currentItemList]);

  const handleChangePaginationItem = React.useCallback(
    (skip: number, take: number) => {
      const filterValue = { ...itemFilter };
      filterValue["skip"] = skip;
      filterValue["take"] = take;
      dispatchItemFilter({
        type: ActionFilterEnum.ChangeAllField,
        data: filterValue,
      });
      handleGetItemList(filterValue);
    },
    [itemFilter, handleGetItemList]
  );

  const handleChangeSearchItem = React.useCallback(
    (fieldName: string, filterType: string) => (value: any) => {
      const filterValue = { ...itemFilter };
      filterValue[fieldName][filterType] = value;
      filterValue["skip"] = 0;
      filterValue["take"] = 10;
      dispatchItemFilter({
        type: ActionFilterEnum.ChangeAllField,
        data: filterValue,
      });
      handleGetItemList(filterValue);
    },
    [itemFilter, handleGetItemList]
  );

  const handleChangeSelectItem = React.useCallback(
    (id: number) => {
      const filterValue = { ...itemFilter };
      filterValue["id"] = new IdFilter();
      if (id) {
        switch (id) {
          case 1:
            filterValue["id"]["in"] = [...idList];
            break;
          case 2:
            filterValue["id"]["notIn"] = [...idList];
            break;
          case 3:
            break;
        }
      }
      filterValue["skip"] = 0;
      filterValue["take"] = 10;
      dispatchItemFilter({
        type: ActionFilterEnum.ChangeAllField,
        data: filterValue,
      });
      handleGetItemList(filterValue);
    },
    [itemFilter, idList, handleGetItemList]
  );

  React.useEffect(() => {
    if (models) {
      const ids =
        models.length > 0
          ? models.map((current) => current?.item?.id)
          : [];
      const items =
        models.length > 0
          ? models.map((current) => current?.item)
          : [];
      dispatch({
        type: "UPDATE_ID_LIST",
        idList: ids,
        currentItemList: items,
      });
    }
  }, [models]);

  return {
    openItemDialog,
    itemList,
    itemFilter,
    totalList: total,
    checkedAll,
    loadingItem: loading,
    setOpenItemDialog,
    handleOpenItem,
    handleCheckItem,
    handleCheckAllItem,
    handleSaveItem,
    handleCancelItem,
    handleChangePaginationItem,
    handleChangeSearchItem,
    handleChangeSelectItem,
  };
}

interface CustomerSalesOrderItemModalProps {
  total?: number;
  itemList?: Item[];
  itemFilter?: ItemFilter;
  visibleDialog?: boolean;
  isCheckedAll?: boolean;
  loadingItem?: boolean;
  translate?: TFunction;
  onCancelDialog?: () => void;
  onSaveDialog?: () => void;
  handleChangePaginationItem?: (skip: number, take: number) => void;
  handleCheckItem?: (item: Item) => (event: any) => void;
  handleCheckAllItem?: (event: any) => void;
  handleChangeSearchItem?: (
    fieldName: string,
    filterType: string
  ) => (value: any) => void;
  handleChangeSelectItem?: (id: number) => void;
}

export function CustomerSalesOrderItemModal(props: CustomerSalesOrderItemModalProps) {
  const [translate] = useTranslation();

  const {
    total,
    itemList,
    itemFilter,
    visibleDialog,
    isCheckedAll,
    loadingItem,
    onSaveDialog,
    onCancelDialog,
    handleChangePaginationItem,
    handleCheckItem,
    handleCheckAllItem,
    handleChangeSearchItem,
  } = props;

  return (
    <>
      <Modal
        title={null}
        visible={visibleDialog}
        onCancel={onCancelDialog}
        handleSave={onSaveDialog}
        handleCancel={onCancelDialog}
        width={1275}
        closable={false}
      >
        {loadingItem && (
          <div className="item-dialog__loading">
            <Spin size="large" />
          </div>
        )}
        <div className="item-dialog__wrapper">
          <div className="item-dialog__container">
            <Row className="d-flex">
              <Col lg={24} className="page__modal-header-title">
                {translate("items.preview.product.add")}
              </Col>
            </Row>
            <div className="item-dialog__filter">
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col className="gutter-row" span={6}>
                  <AdvanceStringFilter
                    value={itemFilter[nameof(itemList[0].name)]["contain"]}
                    onEnter={handleChangeSearchItem("name", "contain")}
                    isMaterial={true}
                    className={"tio-search"}
                    title={"Tên sản phẩm"}
                    placeHolder={"Tìm kiếm tên sản phẩm..."}
                  />
                </Col>
                <Col className="gutter-row" span={6}>
                  <AdvanceStringFilter
                    value={itemFilter[nameof(itemList[0].code)]["contain"]}
                    onEnter={handleChangeSearchItem("code", "contain")}
                    isMaterial={true}
                    className={"tio-search"}
                    title={"Mã sản phẩm"}
                    placeHolder={"Tìm theo mã..."}
                  />
                </Col>
              </Row>
            </div>
            <div className="item-dialog__action">
              <div className="d-flex">
                <span className="action__result mr-3">Tổng cộng {total} Kết quả</span>
                <div className="action__check-all">
                  <Checkbox
                    onChange={handleCheckAllItem}
                    checked={isCheckedAll}
                  >
                    Chọn tất cả
                  </Checkbox>
                </div>
              </div>
              <div className="action__pagination">
                <Pagination
                  skip={itemFilter.skip}
                  take={itemFilter.take}
                  total={total}
                  onChange={handleChangePaginationItem}
                />
              </div>
            </div>
            <div className="item-dialog__list">
              {itemList &&
                itemList.map((currentItem: Item, index: number) => (
                  <Card key={index}>
                    <div
                      className="list__card"
                      onClick={handleCheckItem(currentItem)}
                    >
                      <div className="item__check-box">
                        <Checkbox
                          checked={currentItem.isChecked}
                          onClick={handleCheckItem(currentItem)}
                          disabled={!currentItem.hasInventory}
                        ></Checkbox>
                      </div>
                      <img
                        src={currentItem.image ? currentItem.image?.url : box}
                        alt="Box"
                        className="item__image"
                      />
                      <img
                        src={circle}
                        alt="Circle"
                        className="item__image-circle"
                      />
                      <div className="item__title">{currentItem.name}</div>
                      <div className="item__description">
                        {currentItem.saleStock} sản phẩm
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
