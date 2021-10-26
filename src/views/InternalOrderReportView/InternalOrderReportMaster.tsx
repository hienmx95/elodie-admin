import { Col, Row, Spin } from "antd";
import classNames from "classnames";
import AdvanceDateRangeFilter from "components/Utility/AdvanceFilter/AdvanceDateRangeFilter/AdvanceDateRangeFilter";
import AdvanceTreeFilter from "components/Utility/AdvanceFilter/AdvanceTreeFilter/AdvanceTreeFilter";
import MultipleSelect from "components/Utility/Select/MultipleSelect/MultipleSelect";
import Select from "components/Utility/Select/Select";
import { INTERNAL_ORDER_REPORT_MASTER_ROUTE } from "config/route-consts";
// import authenticationService from "services/authentication-service";
// import { INTERNAL_ORDER_REPORT_PREFIX } from "config/api-consts";
import { formatNumber } from "helpers/number";
import { InternalOrder, InternalOrderFilter } from "models/InternalOrder";
import { Item, ItemFilter } from "models/Item";
import { OrganizationFilter } from "models/Organization";
import { Warehouse, WarehouseFilter } from "models/Warehouse";
import { Moment } from "moment";
import React from "react";
import { useTranslation } from "react-i18next";
import { internalOrderReportRepository } from "repositories/internal-order-report-repository";
import masterService, { UseMaster } from "services/pages/master-service";
import nameof from "ts-nameof.macro";
import { useGetData } from "./InternalOrderReportHook";
import "./WorkOrderReportView.scss";
export default function InternalOrderReportMaster() {
  const [translate] = useTranslation();
  // const { validAction } = authenticationService.useAction(
  //   "internalOrderReport",
  //   INTERNAL_ORDER_REPORT_PREFIX
  // );

  const [warehouse, setWarehouse] = React.useState<Warehouse>(new Warehouse());

  const [loading, setLoading] = React.useState<boolean>(false);

  const master: UseMaster = masterService.useMaster<
    InternalOrder,
    InternalOrderFilter
  >(
    InternalOrderFilter,
    INTERNAL_ORDER_REPORT_MASTER_ROUTE,
    internalOrderReportRepository.listOrderItem,
    internalOrderReportRepository.countItem
  );

//   const master: UseMaster = masterService.useMaster<
//   CustomerSalesOrder,
//   CustomerSalesOrderFilter
// >(
//   CustomerSalesOrderFilter,
//   CUSTOMER_SALES_ORDER_ROUTE,
//   customerSalesOrderRepository.list,
//   customerSalesOrderRepository.count,
//   customerSalesOrderRepository.delete,
//   customerSalesOrderRepository.bulkDelete
// );

  const ref = React.useRef<boolean>(true);
  React.useEffect(() => {
    if (ref.current) {
      master.filter["time"]["equal"] = 3;
      ref.current = false;
    }
  }, [master.filter, ref]);

  const handleChangeOrganization = React.useCallback(
    (value, object) => {
      // setOrganization(object);
      const newFilter = { ...master.filter };
      newFilter["organizationId"]["equal"] = value;
      master.handleUpdateNewFilter(newFilter);
    },
    [master]
  );

  const handleChangeWarehouse = React.useCallback(
    (value, object) => {
      setWarehouse(object);
      const newFilter = { ...master.filter };
      newFilter["warehouseId"]["equal"] = value;
      master.handleUpdateNewFilter(newFilter);
    },
    [master]
  );

  const timeValue = [
    { id: 1, name: "Hôm nay", checked: false },
    { id: 2, name: "Tuần này", checked: false },
    { id: 3, name: "Tháng này", checked: true },
  ];

  const handleDispatchButtonTime = (state, action) => {
    switch (action.type) {
      case "CHECKED":
        return state.map((o) => {
          if (o.id === action.id) {
            return { ...o, checked: true };
          } else {
            return { ...o, checked: false };
          }
        });

      default:
        return state;
    }
  };

  const [timeOption, dispatch] = React.useReducer(
    handleDispatchButtonTime,
    timeValue
  );
  const handleChooseTime = React.useCallback(
    (time) => {
      const newFilter = { ...master.filter };
      newFilter["date"]["lessEqual"] = undefined;
      newFilter["date"]["greaterEqual"] = undefined;
      newFilter["time"]["equal"] = time.id;
      master.handleUpdateNewFilter(newFilter);
      dispatch({ type: "CHECKED", id: time.id });
    },
    [master]
  );

  const [items, setItems] = React.useState<Item[]>([]);
  const [itemId, setItemId] = React.useState<number[]>([]);
  const [itemFilter, setItemFilter] = React.useState<ItemFilter>(
    new ItemFilter()
  );
  const handleChangeModels = React.useCallback(
    (item, type) => {
      setLoading(true);
      const newFilter = { ...master.filter };
      const newItemFilter = { ...itemFilter };
      switch (type) {
        case "UPDATE":
          setItems([...items, item]);
          let tempItemId = [...itemId, item.id];
          setItemId([...itemId, item.id]);
          newFilter["item"]["in"] = tempItemId;
          newItemFilter["id"]["notIn"] = tempItemId;
          setItemFilter(newItemFilter);
          master.handleUpdateNewFilter(newFilter);
          break;
        case "REMOVE":
          const filteredArray = items.filter((x) => x.id !== item.id);
          let tempItemId2 = filteredArray.map((o) => o.id);
          setItemId([...tempItemId2]);
          newFilter["item"]["in"] = tempItemId2;
          master.handleUpdateNewFilter(newFilter);

          setItems([...filteredArray]);
          break;
      }
      setLoading(false);
    },
    [itemFilter, itemId, items, master]
  );

  const handleChangeDateFilter = React.useCallback(
    (fieldName) => {
      return (dateMoment: [Moment, Moment]) => {
        const newFilter = { ...master.filter };
        newFilter["time"]["equal"] = 4;
        dispatch({ type: "CHECKED", id: -1 });
        newFilter[`${fieldName}`]["lessEqual"] = dateMoment[1];
        newFilter[`${fieldName}`]["greaterEqual"] = dateMoment[0];
        master.handleUpdateNewFilter(newFilter);
      };
    },
    [master]
  );

  const {
    countOrder: orderCounter,
  } = useGetData(
    master.filter,
    internalOrderReportRepository.orderCounter,
    setLoading
  );
  const {
    countOrder: totalRevenue,
  } = useGetData(
    master.filter,
    internalOrderReportRepository.totalRevenue,
    setLoading
  );

  const {
    countOrder: completedOrderCounter,
  } = useGetData(
    master.filter,
    internalOrderReportRepository.completedOrderCounter,
    setLoading
  );
  const {
    countOrder: processingOrderCounter,
  } = useGetData(
    master.filter,
    internalOrderReportRepository.processingOrderCounter,
    setLoading
  );

  // const columns: ColumnProps<InternalOrder>[] = React.useMemo(
  //   () => [
  //     {
  //       title: (
  //         <div className="text-left gradient-text">
  //           {translate("internalOrderReports.code")}
  //         </div>
  //       ),
  //       align: "left",
  //       sorter: true,
  //       key: nameof(master.list[0].itemCode),
  //       dataIndex: nameof(master.list[0].itemCode),
  //       sortOrder: getAntOrderType<InternalOrder, InternalOrderFilter>(
  //         master.filter,
  //         nameof(master.list[0].itemCode)
  //       ),
  //       render(itemCode: string) {
  //         return (
  //           <div className="ant-cell-master__container">
  //             <Tooltip title={itemCode}>
  //               <div
  //                 className={classNames("cell-master__first-row", {
  //                   "first-row--ellipsis": itemCode && itemCode.length >= 30,
  //                 })}
  //               >
  //                 <span>{itemCode}</span>
  //               </div>
  //             </Tooltip>
  //           </div>
  //         );
  //       },
  //     },
  //     {
  //       title: (
  //         <div className="text-left gradient-text">
  //           {translate("internalOrderReports.nameItem")}
  //         </div>
  //       ),
  //       sorter: true,
  //       key: nameof(master.list[0].itemName),
  //       dataIndex: nameof(master.list[0].itemName),
  //       align: "left",
  //       sortOrder: getAntOrderType<InternalOrder, InternalOrderFilter>(
  //         master.filter,
  //         nameof(master.list[0].itemName)
  //       ),
  //       render(itemName: string) {
  //         return (
  //           <Tooltip title={itemName}>
  //             <div className="ant-cell-master__container">
  //               <div
  //                 className={classNames("cell-master__first-row", {
  //                   "first-row--ellipsis": itemName && itemName.length >= 50,
  //                 })}
  //               >
  //                 <span>{itemName}</span>
  //               </div>
  //             </div>
  //           </Tooltip>
  //         );
  //       },
  //     },
  //     {
  //       title: (
  //         <div className="text-right gradient-text">
  //           {translate("internalOrderReports.delivery")}
  //         </div>
  //       ),
  //       sorter: true,
  //       key: nameof(master.list[0].deliveredQuantity),
  //       dataIndex: nameof(master.list[0].deliveredQuantity),
  //       align: "right",
  //       sortOrder: getAntOrderType<InternalOrder, InternalOrderFilter>(
  //         master.filter,
  //         nameof(master.list[0].deliveredQuantity)
  //       ),
  //     },
  //     {
  //       title: (
  //         <div className="text-right gradient-text">
  //           {translate("internalOrderReports.pending")}
  //         </div>
  //       ),
  //       sorter: true,
  //       key: nameof(master.list[0].pendingQuantity),
  //       dataIndex: nameof(master.list[0].pendingQuantity),
  //       align: "right",
  //       sortOrder: getAntOrderType<InternalOrder, InternalOrderFilter>(
  //         master.filter,
  //         nameof(master.list[0].pendingQuantity)
  //       ),
  //     },
  //     {
  //       title: (
  //         <div className="text-right gradient-text">
  //           {translate("internalOrderReports.storeOrder")}
  //         </div>
  //       ),
  //       sorter: true,
  //       key: nameof(master.list[0].storeOrderQuantity),
  //       dataIndex: nameof(master.list[0].storeOrderQuantity),
  //       align: "right",
  //       sortOrder: getAntOrderType<InternalOrder, InternalOrderFilter>(
  //         master.filter,
  //         nameof(master.list[0].storeOrderQuantity)
  //       ),
  //     },
  //   ],
  //   [translate, master]
  // );

  return (
    <Spin spinning={false}>
      <div className="page page__master dashboard-user__container">
        <Row>
          <Col lg={2} className="title__container">
            <span className="title">
              {translate("Báo cáo")}
            </span>
          </Col>
          <Col lg={3} className="ml-2">
            <div
              className={classNames("multiple-select", {
                "disable-placeholder": items.length > 0,
              })}
            >
              <MultipleSelect
                models={items}
                isMaterial={false}
                modelFilter={itemFilter}
                classFilter={ItemFilter}
                placeHolder="Tìm kiếm"
                searchType={"contain"}
                getList={internalOrderReportRepository.listItem}
                onChange={handleChangeModels}
              />
            </div>
          </Col>
          <Col lg={3} className="ml-2">
            <AdvanceTreeFilter
              placeHolder={"Đơn vị"}
              classFilter={OrganizationFilter}
              onChangeSingleItem={handleChangeOrganization}
              checkStrictly={true}
              getTreeData={internalOrderReportRepository.filterListOrganization}
            />
          </Col>
          <Col lg={3} className="ml-2">
            <Select
              classFilter={WarehouseFilter}
              placeHolder={"Theo kho"}
              getList={internalOrderReportRepository.filterListWarehouse}
              onChange={handleChangeWarehouse}
              model={warehouse}
            />
          </Col>
          <Col lg={2}></Col>
          {timeOption !== undefined &&
            timeOption.map((o, index) => (
              <>
                <Col lg={2} className="mr-1" key={index}>
                  <div
                    className={classNames(
                      o?.checked === false ? "btn-report" : "btn-report-active"
                    )}
                    onClick={() => handleChooseTime(o)}
                  >
                    {o?.name}
                  </div>
                </Col>
              </>
            ))}

          <Col lg={4} className="ml-1">
            <AdvanceDateRangeFilter
              onChange={handleChangeDateFilter(nameof(master.filter.date))}
              value={[
                master.filter["date"]["lessEqual"]
                  ? master.filter["date"]["lessEqual"]
                  : null,
                master.filter["date"]["greaterEqual"]
                  ? master.filter["date"]["greaterEqual"]
                  : null,
              ]}
            />
          </Col>
        </Row>
        <div className="grid_dashboard-internal-order-report">
          <div className="box__container-internal-order-report pl-3 pt-3">
            <div className="title">Đơn hàng</div>
            <div className="d-flex">
              <Col lg={18}>
                <div className="box__count">
                  <div className="count-number mt-3">
                    {formatNumber(orderCounter)}
                  </div>
                  {/* <div className="compare-text mt-3">
                    so với quý trước
                  </div> */}
                </div>
              </Col>
              {/* <Col lg={5} className="mt-3">
                <div className="percent-text-increase">+ 47.38%</div>
              </Col> */}
            </div>
          </div>
          <div className="box__container-internal-order-report pl-3 pt-3">
            <div className="title">Doanh thu</div>
            <div className="d-flex">
              <Col lg={18}>
                <div className="box__count">
                  <div className="count-number mt-3">
                    {formatNumber(totalRevenue)} VNĐ
                  </div>
                  <div className="compare-text mt-3">
                    Doanh thu đơn hàng đã hoàn thành
                  </div>
                </div>
              </Col>
            </div>
          </div>
          <div className="box__container-internal-order-report pl-3 pt-3">
            <div className="title">Đơn hàng đã hoàn thành</div>
            <div className="d-flex">
              <Col lg={18}>
                <div className="box__count">
                  <div className="count-number mt-3">
                    {formatNumber(completedOrderCounter)}
                  </div>
                </div>
              </Col>
            </div>
          </div>
          <div className="box__container-internal-order-report pl-3 pt-3">
            <div className="title">Đơn hàng đang xử lý</div>
            <div className="d-flex">
              <Col lg={18}>
                <div className="box__count">
                  <div className="count-number mt-3">
                    {formatNumber(processingOrderCounter)}
                  </div>
                </div>
              </Col>
            </div>
          </div>
        </div>

        {/* <div className="table_internal-order-report mt-3">
          <Table
            rowKey={nameof(master.list[0].key)}
            columns={columns}
            pagination={false}
            dataSource={master.list}
            scroll={{ y: 500 }}
            title={() => (
              <div className="table_title-internal-order-report">
                <div className="table_title_text-internal-order-report">
                  Theo sản phẩm
                </div>
                {
                  // validAction("export") &&
                  <div
                    className="table_title_btn-internal-order-report"
                    onClick={master.handleExportDetail(
                      master.filter,
                      internalOrderReportRepository.export
                    )}
                  >
                    <img
                      alt=""
                      width={20}
                      height={20}
                      className="mr-2"
                      src={require("assets/images/icon-sax/broken/document-download.svg")}
                    />
                    Xuất Excel
                  </div>
                }
              </div>
            )}
          />
        </div> */}
      </div>
    </Spin>
  );
}
