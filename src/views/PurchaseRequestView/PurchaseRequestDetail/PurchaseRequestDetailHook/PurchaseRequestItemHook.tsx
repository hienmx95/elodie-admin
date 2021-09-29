import { commonService } from "@react3l/react3l/services";
import { Card, Checkbox, Col, Row, Spin } from "antd";
import Modal from "components/Utility/Modal/Modal";
import Pagination from "components/Utility/Pagination/Pagination";
import { TFunction } from "i18next";
import { Item, ItemFilter } from "models/Item";
import React from "react";
import { purchaseRequestRepository } from "repositories/purchase-request-repository";
import { forkJoin } from "rxjs";
import {
  ActionFilterEnum,
  AdvanceFilterAction,
  advanceFilterReducer,
} from "services/advance-filter-service";
import box from "./../../../../assets/images/box-image.svg";
import circle from "./../../../../assets/images/green-circle.svg";
import nameof from "ts-nameof.macro";
import AdvanceStringFilter from "components/Utility/AdvanceFilter/AdvanceStringFilter/AdvanceStringFilter";
import AdvanceIdFilter from "components/Utility/AdvanceFilter/AdvanceIdFilter/AdvanceIdFilter";
import { PurchaseRequestContent } from "models/PurchaseRequestContent";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { ModelFilter } from "@react3l/react3l/core";
import { IdFilter } from "@react3l/advanced-filters";
import { finalize } from "rxjs/operators";
import { commonWebService } from "services/common-web-service";

interface PurchaseRequestItemAction {
  type: string;
  itemList?: Item[];
  currentItemList?: Item[];
  idList?: number[];
  currentIdList?: number[];
  total?: number;
  checkedAll?: boolean;
}

interface PurchaseRequestItem {
  itemList?: Item[];
  currentItemList?: Item[];
  idList?: number[];
  currentIdList?: number[];
  total?: number;
  checkedAll?: boolean;
}

function purchaseRequestReducer(
  lastState: PurchaseRequestItem,
  action: PurchaseRequestItemAction
): PurchaseRequestItem {
  switch (action.type) {
    case "UPDATE_ITEM_LIST":
      return {
        ...lastState,
        itemList: action.itemList,
        total: action.total,
        checkedAll: action.checkedAll
      };
    case "UPDATE_ID_LIST":
      return {
        ...lastState,
        idList: [...action.idList],
        currentIdList: [...action.idList],
        currentItemList: [...action.currentItemList]
      };
    case "UPDATE_BOTH_CHECKED":
      return {
        ...lastState,
        idList: [...lastState.idList, ...action.idList],
        currentItemList: [...lastState.currentItemList, ...action.currentItemList],
        itemList: action.itemList,
      };
    case "UPDATE_BOTH_UNCHECKED":
      const filteredIdList = lastState.idList.filter((currentItem) => {
        return !action.idList.includes(currentItem);
      });
      const filteredItemList = lastState.currentItemList.filter((currentItem) => {
        return !action.idList.includes(currentItem.id);
      });
      return {
        ...lastState,
        idList: filteredIdList,
        itemList: action.itemList,
        currentItemList: filteredItemList
      };
    case "UPDATE_BOTH_CHECKED_All":
      return {
        ...lastState,
        idList: commonWebService.uniqueArray([...lastState.idList, ...action.idList]),
        itemList: action.itemList,
        currentItemList: commonWebService.uniqueArray([...lastState.currentItemList, ...action.currentItemList]),
        checkedAll: action.checkedAll
      };
    case "UPDATE_BOTH_UNCHECKED_All":
      const unCheckedIdList = lastState.idList.filter((currentItem) => {
        return !action.idList.includes(currentItem);
      });
      const unCheckedItemList = lastState.currentItemList.filter((currentItem) => {
        return !action.idList.includes(currentItem.id);
      });
      return {
        ...lastState,
        idList: unCheckedIdList,
        itemList: action.itemList,
        currentItemList: unCheckedItemList,
        checkedAll: action.checkedAll
      };
    default:
      return null;
  }
}

export function usePurchaseRequestItem(
  handleMappingItems: (
    purchaseRequestContents: PurchaseRequestContent[]
  ) => void,
  purchaseRequestContents: PurchaseRequestContent[]
): {
  openItemDialog: boolean;
  itemList: Item[];
  itemFilter: ItemFilter;
  total: number;
  checkedAll: boolean;
  loadingItem: boolean;
  setOpenItemDialog: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpenItem: (categoryId: number) => (event: any) => void;
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
  const [{ itemList, currentItemList, idList, currentIdList, total, checkedAll }, dispatch] = React.useReducer<
    React.Reducer<PurchaseRequestItem, PurchaseRequestItemAction>
  >(purchaseRequestReducer, { itemList: [], idList: [], total: 0, checkedAll: false, currentIdList: [], currentItemList: [] });
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
        purchaseRequestRepository.listItem(filterValue),
        purchaseRequestRepository.countItem(filterValue),
      ]).pipe(finalize(() => {
        setLoading(false);
      })).subscribe(
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
                checkedAll: false
              });
            } else {
              dispatch({
                type: "UPDATE_ITEM_LIST",
                itemList: itemList,
                total: totalValue,
                checkedAll: true
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
    (categoryId: number) => (event: any) => {
      if (categoryId) {
        const itemFilterValue = { ...itemFilter };
        itemFilterValue["categoryId"]["equal"] = categoryId;
        dispatchItemFilter({
          type: ActionFilterEnum.ChangeAllField,
          data: itemFilterValue,
        });
        handleGetItemList(itemFilterValue);
        setOpenItemDialog(true);
      }
    },
    [itemFilter, handleGetItemList]
  );

  const handleCheckItem = React.useCallback(
    (item: Item) => (event: any) => {
      event.stopPropagation();
      event.preventDefault();
      if (item) {
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
            checkedAll: isChecked
          });
        } else {
          dispatch({
            type: "UPDATE_BOTH_UNCHECKED_All",
            itemList: itemListValue,
            currentItemList: itemListValue,
            idList,
            checkedAll: isChecked
          });
        }
      }
    },
    [itemList]
  );

  const handleSaveItem = React.useCallback(() => {
    const currentPurchaseRequestContent = purchaseRequestContents ? [...purchaseRequestContents] : [];
    const newPurchaseRequestContents: PurchaseRequestContent[] = [...currentItemList]
      .map((currentItem, index) => {
        const filteredValue = currentPurchaseRequestContent.filter((currentContent) => {
          return currentContent.itemId === currentItem.id;
        })[0];
        if (filteredValue) {
          return { ...filteredValue, key: undefined };
        } else {
          const purchaseRequestContent = new PurchaseRequestContent();
          purchaseRequestContent.item = { ...currentItem };
          purchaseRequestContent.itemId = purchaseRequestContent.item.id;
          return purchaseRequestContent;
        }
      });
    handleMappingItems(newPurchaseRequestContents);
    setOpenItemDialog(false);
  }, [currentItemList, purchaseRequestContents, handleMappingItems]);

  const handleCancelItem = React.useCallback(() => {
    const newFilterValue = new ItemFilter();
    dispatchItemFilter({
      type: ActionFilterEnum.ChangeAllField,
      data: newFilterValue,
    });
    dispatch({
      type: "UPDATE_ID_LIST",
      idList: currentIdList,
      currentItemList: currentItemList
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

  const handleChangeSelectItem = React.useCallback((id: number) => {
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
  }, [itemFilter, idList, handleGetItemList]);

  React.useEffect(() => {
    if (purchaseRequestContents) {
      const ids =
        purchaseRequestContents.length > 0
          ? purchaseRequestContents.map((current) => current.item?.id)
          : [];
      const items = purchaseRequestContents.length > 0
        ? purchaseRequestContents.map((current) => current.item)
        : [];
      dispatch({
        type: "UPDATE_ID_LIST",
        idList: ids,
        currentItemList: items
      });
    }
  }, [purchaseRequestContents]);

  return {
    openItemDialog,
    itemList,
    itemFilter,
    total,
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
    handleChangeSelectItem
  };
}

interface PurchaseRequestItemModalProps {
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
  handleCheckItem?: (item: Item, isClick?: boolean) => (event: any) => void;
  handleCheckAllItem?: (event: any) => void;
  handleChangeSearchItem?: (
    fieldName: string,
    filterType: string
  ) => (value: any) => void;
  handleChangeSelectItem?: (id: number) => void;
}

export function PurchaseRequestItemModal(props: PurchaseRequestItemModalProps) {
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
    handleChangeSelectItem
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
        {loadingItem && <div className="item-dialog__loading">
          <Spin size="large" />
        </div>
        }
        <div className="item-dialog__wrapper">
          <div className="item-dialog__container">
            <div className="item-dialog__filter">
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col className="gutter-row" span={6}>
                  <AdvanceStringFilter
                    value={itemFilter[nameof(itemList[0].name)]["startWith"]}
                    onEnter={handleChangeSearchItem("name", "startWith")}
                    isMaterial={true}
                    className={"tio-search"}
                    title={"Tên sản phẩm"}
                    placeHolder={"Tìm kiếm tên sản phẩm..."}
                  />
                </Col>
                <Col className="gutter-row" span={6}>
                  <AdvanceStringFilter
                    value={
                      itemFilter[nameof(itemList[0].otherName)]["startWith"]
                    }
                    onEnter={handleChangeSearchItem("otherName", "startWith")}
                    isMaterial={true}
                    className={"tio-search"}
                    title={"Tên khác"}
                    placeHolder={"Tìm kiếm tên khác..."}
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
                <Col className="gutter-row" span={6}>
                  <AdvanceIdFilter
                    onChange={handleChangeSelectItem}
                    placeHolder={"Chọn trạng thái..."}
                    title={"Trạng thái"}
                    isMaterial={true}
                    classFilter={ModelFilter}
                    isEnumList={true}
                    getList={purchaseRequestRepository.singleListItemSelectOption}
                  />
                </Col>
              </Row>
            </div>
            <div className="item-dialog__action">
              <span className="action__result">{total} Kết quả</span>
              <div className="action__check-all">
                <Checkbox onChange={handleCheckAllItem} checked={isCheckedAll}>
                  Chọn tất cả
                </Checkbox>
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
                    <div className="list__card" onClick={handleCheckItem(currentItem)}>
                      <div className="item__check-box">
                        <Checkbox
                          checked={currentItem.isChecked}
                          onClick={handleCheckItem(currentItem)}
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
                        {currentItem.code}
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
