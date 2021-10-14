import { Model } from "@react3l/react3l/core/model";
import Modal from "components/Utility/Modal/Modal";
import { Descriptions, Tooltip } from "antd";
import Table, { ColumnProps } from "antd/lib/table";
import { formatDate } from "../../../helpers/date-time";
import { formatNumber } from "../../../helpers/number";
import { renderMasterIndex } from "../../../helpers/table";
import { TFunction } from "i18next";
import { CustomerSalesOrder } from "../../../models/CustomerSalesOrder";
import { CustomerSalesOrderContent } from "../../../models/CustomerSalesOrderContent";
import { Item } from "../../../models/Item";
import { TaxType } from "../../../models/TaxType";
import React from "react";
import nameof from "ts-nameof.macro";
import { commonWebService } from "../../../services/common-web-service";

interface CustomerSalesOrderPreviewProps<T extends Model> {
  previewModel?: T;
  isOpenPreview?: boolean;
  isLoadingPreview?: boolean;
  handleClosePreview?: () => void;
  handleGoDetail?: (id: number) => () => void;
  translate?: TFunction;
  customerSalesOrderContent: CustomerSalesOrderContent;
}

function CustomerSalesOrderPreview(props: CustomerSalesOrderPreviewProps<CustomerSalesOrder>) {
  const {
    previewModel,
    isOpenPreview,
    isLoadingPreview,
    handleClosePreview,
    translate,
    handleGoDetail
  } = props;
  const [customerSalesOrderContent, setCustomerSalesOrderContent] = React.useState<CustomerSalesOrderContent[]>();
  React.useEffect(() => {
    if (
      previewModel &&
      (previewModel?.customerSalesOrderContents?.length > 0 ||
        previewModel?.customerSalesOrderContents?.length > 0)
    ) {
      setCustomerSalesOrderContent([
        ...previewModel?.customerSalesOrderContents.concat(
          previewModel?.customerSalesOrderPromotions,
        ),
      ]);
    }
  }, [previewModel]);
  const columnsPopup: ColumnProps<CustomerSalesOrderContent>[] = React.useMemo(() => {
    return [
      {
        title: translate("general.columns.index"),
        key: "index",
        width: 100,
        render: renderMasterIndex<CustomerSalesOrderContent>(),
      },
      {
        title: translate('customerSalesOrderContents.items.code'),
        key: nameof(customerSalesOrderContent[0].code),
        dataIndex: nameof(customerSalesOrderContent[0].item),
        render(item: Item) {
          return item?.code;
        },
      },
      {
        title: translate('customerSalesOrderContents.items.name'),
        key: nameof(customerSalesOrderContent[0].item),
        dataIndex: nameof(customerSalesOrderContent[0].item),
        render(item: Item) {
          return item?.name;
        },
        width: 250,
      },
      {
        title: translate('customerSalesOrderContents.quantity'),
        key: nameof(customerSalesOrderContent[0].quantity),
        dataIndex: nameof(customerSalesOrderContent[0].quantity),
        align: 'right',
      },
      {
        title: translate('customerSalesOrderContents.salePrice'),
        key: nameof(customerSalesOrderContent[0].salePrice),
        dataIndex: nameof(customerSalesOrderContent[0].salePrice),
        render(...[salePrice]) {
          return formatNumber(salePrice);
        },
        align: 'right',
      },
      {
        title: translate('customerSalesOrderContents.discountPercentage'),
        key: nameof(customerSalesOrderContent[0].discountPercentage),
        dataIndex: nameof(customerSalesOrderContent[0].discountPercentage),
        align: 'right',
      },
      {
        title: translate('customerSalesOrderContents.generalDiscountPercentage'),
        key: nameof(customerSalesOrderContent[0].generalDiscountPercentage),
        dataIndex: nameof(customerSalesOrderContent[0].generalDiscountPercentage),
        align: 'center',
      },
      {
        title: translate('customerSalesOrderContents.amount'),
        key: nameof(customerSalesOrderContent[0].amount),
        dataIndex: nameof(customerSalesOrderContent[0].amount),
        render(...[amount]) {
          return formatNumber(amount);
        },
        align: 'right',
      },
      {
        title: translate('customerSalesOrderContents.taxPercentage'),
        key: nameof(customerSalesOrderContent[0].taxType),
        dataIndex: nameof(customerSalesOrderContent[0].taxType),
        render(taxType: TaxType) {
          return taxType?.name;
        },
        align: 'right',
      },
    ];
  }, [customerSalesOrderContent, translate]);
  return (
    <>
      <Modal
        title={null}
        visible={isOpenPreview}
        handleCancel={handleClosePreview}
        width={1250}
        visibleFooter={false}
      >
        <div className="preview__containter">
          <div className="preview__left-side">
            <div className="preview__header">
              <div className="preview__header-info">
                <div className="preview__header-text">
                  <span className="preview__header-title">
                    <Tooltip title={previewModel?.code} placement="bottom">
                      {commonWebService.limitWord(previewModel?.code, 50)}
                    </Tooltip>
                  </span>
                </div>
              </div>
            </div>
            <div className="preview__body">
              <div className="preview__content">
                <Descriptions title={translate('customerSalesOrders.detail.title')} column={2}>
                  <Descriptions.Item label={translate('customerSalesOrders.code')}>
                    <span className="gradient-text">{previewModel?.code}</span>
                  </Descriptions.Item>

                  <Descriptions.Item label={translate('customerSalesOrders.customer')}>
                    <span className="gradient-text">{previewModel?.customer?.name} </span>
                  </Descriptions.Item>

                  <Descriptions.Item label={translate('customerSalesOrders.phone')}>
                    <span className="gradient-text">{previewModel?.customer?.phone}</span>
                  </Descriptions.Item>
                  
                  <Descriptions.Item label={translate('customerSalesOrders.shippingName')}>
                    <span className="gradient-text">{previewModel?.shippingName}</span>
                  </Descriptions.Item>

                  <Descriptions.Item label={translate('customerSalesOrders.deliveryDate')}>
                    <span className="gradient-text">
                      {previewModel?.deliveryDate !== null
                        ? formatDate(previewModel?.deliveryDate)
                        : ''}
                    </span>
                  </Descriptions.Item>

                  <Descriptions.Item label={translate('customerSalesOrders.orderDate')}>
                    <span className="gradient-text">
                      {previewModel?.orderDate !== null
                        ? formatDate(previewModel?.orderDate)
                        : ''}
                    </span>
                  </Descriptions.Item>

                  <Descriptions.Item label={translate('customerSalesOrders.salesEmployee')}>
                    <span className="gradient-text">{previewModel?.salesEmployeeId && previewModel?.salesEmployee?.displayName}</span>
                  </Descriptions.Item>

                  <Descriptions.Item label={translate('customerSalesOrders.requestState')}>
                    <span className="gradient-text">{previewModel?.requestStateId && previewModel?.requestState?.name}</span>
                  </Descriptions.Item>

                  <Descriptions.Item label={translate('customerSalesOrders.salesEmployee')}>
                    <span className="gradient-text">{previewModel?.salesEmployeeId && previewModel?.salesEmployee?.displayName}</span>
                  </Descriptions.Item>

                  <Descriptions.Item label={translate('customerSalesOrders.paymentStatus')}>
                    <span className="gradient-text">{previewModel?.orderPaymentStatusId && previewModel?.orderPaymentStatus?.name}</span>
                  </Descriptions.Item>

                  <Descriptions.Item label={translate('customerSalesOrders.isEditedPrice')}>
                    <span className={"gradient-text" + (previewModel?.editedPriceStatusId === 1 ? 'isActive' : '')}>
                      <i className="tio-checkmark_circle ml-2 "></i>
                    </span>
                  </Descriptions.Item>
                  <Descriptions.Item label={translate('customerSalesOrders.note')}>
                    <span className="gradient-text" dangerouslySetInnerHTML={{ __html: previewModel?.note }}></span>
                  </Descriptions.Item>
                </Descriptions>
                <Descriptions title={translate('customerSalesOrders.shipAddress')} column={2}>
                  <Descriptions.Item
                    label={translate('customerSalesOrders.invoiceAddress')}
                  >
                    <span className="gradient-text">{previewModel?.invoiceAddress}</span>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={translate('customerSalesOrders.deliveryAddress')}
                  >
                    <span className="gradient-text"> {previewModel?.deliveryAddress}</span>
                  </Descriptions.Item>

                  <Descriptions.Item label={translate('customerSalesOrders.nation')}>
                    <span className="gradient-text">{previewModel?.invoiceNation && previewModel?.invoiceNation?.name}</span>
                  </Descriptions.Item>
                  <Descriptions.Item label={translate('customerSalesOrders.nation')}>
                    <span className="gradient-text"> {previewModel?.deliveryNationId && previewModel?.deliveryNation?.name}</span>
                  </Descriptions.Item>

                  <Descriptions.Item
                    label={translate('customerSalesOrders.province')}
                  >
                    <span className="gradient-text"> {previewModel?.invoiceProvince && previewModel?.invoiceProvince?.name}</span>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={translate('customerSalesOrders.province')}
                  >
                    <span className="gradient-text"> {previewModel?.deliveryProvince && previewModel?.deliveryProvince?.name}</span>
                  </Descriptions.Item>

                  <Descriptions.Item
                    label={translate('customerSalesOrders.district')}
                  >
                    <span className="gradient-text"> {previewModel?.invoiceDistrict && previewModel?.invoiceDistrict?.name}</span>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={translate('customerSalesOrders.district')}
                  >
                    <span className="gradient-text"> {previewModel?.deliveryDistrict && previewModel?.deliveryDistrict?.name}</span>
                  </Descriptions.Item>

                  <Descriptions.Item label={translate('customerSalesOrders.zipCode')}>
                    <span className="gradient-text"> {previewModel?.invoiceZIPCode}</span>
                  </Descriptions.Item>

                  <Descriptions.Item label={translate('customerSalesOrders.zipCode')}>
                    <span className="gradient-text">{previewModel?.deliveryZIPCode}</span>
                  </Descriptions.Item>
                </Descriptions>
                <Descriptions column={1}>
                  <Descriptions.Item>
                    <Table
                      dataSource={customerSalesOrderContent}
                      columns={columnsPopup}
                      size="small"
                      tableLayout="fixed"
                      loading={isLoadingPreview}
                      rowKey={nameof(previewModel.id)}
                      key={nameof(previewModel.id)}
                      scroll={{ y: 240 }}
                      pagination={false}
                      className="mb-3 customerSalesOrder"
                    />
                  </Descriptions.Item>
                </Descriptions>
                <Descriptions column={1}>
                  <Descriptions.Item
                    label={translate('customerSalesOrders.subTotal')}
                    className="float-right"
                  >
                    <span className="gradient-text">{formatNumber(previewModel?.subTotal)}</span>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={translate('customerSalesOrders.discountAmount')}
                    className="float-right"
                  >
                    <span className="gradient-text">{formatNumber(previewModel?.generalDiscountAmount) || 0}</span>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={translate('customerSalesOrders.totalTaxAmount')}
                    className="float-right"
                  >
                    <span className="gradient-text">{formatNumber(previewModel?.totalTax) || 0}</span>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={translate('customerSalesOrders.total')}
                    className="float-right total">
                    <span className="gradient-text">{formatNumber(previewModel?.total)}</span>
                  </Descriptions.Item>
                </Descriptions>
              </div>
            </div>
            <div className="preview__footer">
              <button
                className="btn btn-primary mr-2"
                onClick={handleGoDetail(previewModel.id)}
              >
                <i className="tio-edit"></i> {translate("Chỉnh sửa")}
              </button>
              <button className="btn btn-cancel" onClick={handleClosePreview}>
                <span>
                  <i className="tio-clear_circle_outlined" /> {translate("Đóng")}
                </span>
              </button>

            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default CustomerSalesOrderPreview;
