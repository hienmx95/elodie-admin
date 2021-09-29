/* begin general import */
import { Model } from "@react3l/react3l/core/model";
import { Descriptions } from "antd";
import Table from "antd/lib/table";
import { AppStoreContext } from "app/app-context";
import { AppAction, AppState } from "app/app-store";
import ChatBox from "components/Utility/ChatBox/ChatBox";
import Modal from "components/Utility/Modal/Modal";
import { TFunction } from "i18next";
import { Category } from "models/Category";
import { Currency } from "models/Currency";
import { Item } from "models/Item";
/* end general import */
/* begin individual import */
import { PurchaseOrder } from "models/PurchaseOrder";
import { TaxType } from "models/TaxType";
import { UnitOfMeasure } from "models/UnitOfMeasure";
import moment from "moment";
import React, { Dispatch, useContext } from "react";
import { appUserRepository } from "repositories/app-user-repository";
import { discussionRepository } from "repositories/discussion-repository";
import nameof from "ts-nameof.macro";
/* end individual import */

interface PurchaseOrderPreviewProps<T extends Model> {
  previewModel?: T;
  isOpenPreview?: boolean;
  isLoadingPreview?: boolean;
  handleClosePreview?: () => void;
  handleGoDetail?: (id: number) => () => void;
  translate?: TFunction;
}

function PurchaseOrderPreview(props: PurchaseOrderPreviewProps<PurchaseOrder>) {
  const {
    previewModel,
    isOpenPreview,
    isLoadingPreview,
    handleClosePreview,
    handleGoDetail,
    translate,
  } = props;

  const [state] = useContext<[AppState, Dispatch<AppAction>]>(AppStoreContext);

  return (
    <>
      <Modal
        title={null}
        visible={isOpenPreview}
        handleCancel={handleClosePreview}
        width={1200}
        visibleFooter={false}
      >
        {isLoadingPreview ? (
          <div className="loading-block">
            <img src="/assets/svg/spinner.svg" alt="Loading..." />
          </div>
        ) : (
          <div className="preview__containter">
            <div className="preview__left-side">
              <div className="preview__header">
                <div className="preview__vertical-bar"></div>
                <div className="preview__header-info">
                  <div className="preview__header-text">
                    <span className="preview__header-title">
                      {previewModel.name}
                    </span>
                    <span className="preview__header-date">
                      {translate("purchaseOrders.startDate")}{" "}
                      {previewModel.startDate
                        ? moment(previewModel.startDate).format("DD/MM/YYYY")
                        : null}
                    </span>
                  </div>
                  <button
                    className="btn gradient-btn-icon ant-tooltip-open"
                    onClick={handleGoDetail(previewModel.id)}
                  >
                    <i className="tio-edit"></i>
                  </button>
                </div>
              </div>
              <div className="preview__body">
                <div className="preview__content">
                  <Descriptions column={2}>
                    <Descriptions.Item
                      label={translate("purchaseOrders.description")}
                    >
                      <span className="gradient-text">
                        {previewModel.description}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate("purchaseOrders.pOCode")}
                    >
                      <span className="gradient-text">
                        {previewModel.pOCode}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate("purchaseOrders.pONumber")}
                    >
                      <span className="gradient-text">
                        {previewModel.pONumber}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate("purchaseOrders.purchaserAddress")}
                    >
                      <span className="gradient-text">
                        {previewModel.purchaserAddress}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate("purchaseOrders.purchaserPhoneNumber")}
                    >
                      <span className="gradient-text">
                        {previewModel.purchaserPhoneNumber}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate("purchaseOrders.supplierEmail")}
                    >
                      <span className="gradient-text">
                        {previewModel.supplierEmail}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate("purchaseOrders.supplierPhoneNumber")}
                    >
                      <span className="gradient-text">
                        {previewModel.supplierPhoneNumber}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate("purchaseOrders.recipientAddress")}
                    >
                      <span className="gradient-text">
                        {previewModel.recipientAddress}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate("purchaseOrders.recipientPhoneNumber")}
                    >
                      <span className="gradient-text">
                        {previewModel.recipientPhoneNumber}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate("purchaseOrders.expectedAt")}
                    >
                      <span className="gradient-text">
                        {previewModel.expectedAt
                          ? moment(previewModel.expectedAt).format("DD/MM/YYYY")
                          : null}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate("purchaseOrders.subTotal")}
                    >
                      <span className="gradient-text">
                        {previewModel.subTotal}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate("purchaseOrders.commission")}
                    >
                      <span className="gradient-text">
                        {previewModel.commission}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate(
                        "purchaseOrders.generalDiscountPercentage"
                      )}
                    >
                      <span className="gradient-text">
                        {previewModel.generalDiscountPercentage}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate("purchaseOrders.generalDiscountAmount")}
                    >
                      <span className="gradient-text">
                        {previewModel.generalDiscountAmount}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate("purchaseOrders.total")}
                    >
                      <span className="gradient-text">
                        {previewModel.total}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item label={translate("purchaseOrders.used")}>
                      <span className="gradient-text">{previewModel.used}</span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate("purchaseOrders.creator")}
                    >
                      <span className="gradient-text">
                        {previewModel?.creator?.name}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate("purchaseOrders.project")}
                    >
                      <span className="gradient-text">
                        {previewModel?.project?.name}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate("purchaseOrders.projectBudget")}
                    >
                      <span className="gradient-text">
                        {previewModel?.projectBudget?.name}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate("purchaseOrders.projectOrganization")}
                    >
                      <span className="gradient-text">
                        {previewModel?.projectOrganization?.name}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate("purchaseOrders.purchaseOrderType")}
                    >
                      <span className="gradient-text">
                        {previewModel?.purchaseOrderType?.name}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate("purchaseOrders.purchaseOrganization")}
                    >
                      <span className="gradient-text">
                        {previewModel?.purchaseOrganization?.name}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate("purchaseOrders.purchasePlan")}
                    >
                      <span className="gradient-text">
                        {previewModel?.purchasePlan?.name}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate("purchaseOrders.purchaseRequest")}
                    >
                      <span className="gradient-text">
                        {previewModel?.purchaseRequest?.name}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate("purchaseOrders.purchaser")}
                    >
                      <span className="gradient-text">
                        {previewModel?.purchaser?.name}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate("purchaseOrders.receiveOrganization")}
                    >
                      <span className="gradient-text">
                        {previewModel?.receiveOrganization?.name}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate("purchaseOrders.recipient")}
                    >
                      <span className="gradient-text">
                        {previewModel?.recipient?.name}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate("purchaseOrders.status")}
                    >
                      <span className="gradient-text">
                        {previewModel?.status?.name}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate("purchaseOrders.supplier")}
                    >
                      <span className="gradient-text">
                        {previewModel?.supplier?.name}
                      </span>
                    </Descriptions.Item>
                  </Descriptions>
                </div>
                <div className="preview__content">
                  <Table
                    tableLayout="fixed"
                    rowKey={nameof(previewModel.purchaseOrderConditions[0].id)}
                    columns={[
                      {
                        title: (
                          <div className="text-center gradient-text">
                            {translate("purchaseOrderConditions.code")}
                          </div>
                        ),
                        dataIndex: "code",
                        key: "code",
                      },

                      {
                        title: (
                          <div className="text-center gradient-text">
                            {translate("purchaseOrderConditions.description")}
                          </div>
                        ),
                        dataIndex: "description",
                        key: "description",
                      },

                      {
                        title: (
                          <div className="text-center gradient-text">
                            {translate("purchaseOrderConditions.used")}
                          </div>
                        ),
                        dataIndex: "used",
                        key: "used",
                      },
                    ]}
                    pagination={false}
                    dataSource={previewModel.purchaseOrderConditionsMappings}
                  />
                </div>
                <div className="preview__content">
                  <Table
                    tableLayout="fixed"
                    rowKey={nameof(previewModel.purchaseOrderContents[0].id)}
                    columns={[
                      {
                        title: (
                          <div className="text-center gradient-text">
                            {translate("purchaseOrderContents.description")}
                          </div>
                        ),
                        dataIndex: "description",
                        key: "description",
                      },

                      {
                        title: (
                          <div className="text-center gradient-text">
                            {translate("purchaseOrderContents.isReceiveAll")}
                          </div>
                        ),
                        dataIndex: "isReceiveAll",
                        key: "isReceiveAll",
                      },

                      {
                        title: (
                          <div className="text-center gradient-text">
                            {translate("purchaseOrderContents.unitPrice")}
                          </div>
                        ),
                        dataIndex: "unitPrice",
                        key: "unitPrice",
                      },

                      {
                        title: (
                          <div className="text-center gradient-text">
                            {translate("purchaseOrderContents.quantity")}
                          </div>
                        ),
                        dataIndex: "quantity",
                        key: "quantity",
                      },

                      {
                        title: (
                          <div className="text-center gradient-text">
                            {translate("purchaseOrderContents.price")}
                          </div>
                        ),
                        dataIndex: "price",
                        key: "price",
                      },

                      {
                        title: (
                          <div className="text-center gradient-text">
                            {translate("purchaseOrderContents.taxAmount")}
                          </div>
                        ),
                        dataIndex: "taxAmount",
                        key: "taxAmount",
                      },

                      {
                        title: (
                          <div className="text-center gradient-text">
                            {translate("purchaseOrderContents.total")}
                          </div>
                        ),
                        dataIndex: "total",
                        key: "total",
                      },

                      {
                        title: (
                          <div className="text-center gradient-text">
                            {translate("purchaseOrderContents.exchangeRate")}
                          </div>
                        ),
                        dataIndex: "exchangeRate",
                        key: "exchangeRate",
                      },

                      {
                        title: (
                          <div className="text-center gradient-text">
                            {translate("purchaseOrderContents.exchangedPrice")}
                          </div>
                        ),
                        dataIndex: "exchangedPrice",
                        key: "exchangedPrice",
                      },

                      {
                        title: (
                          <div className="text-center gradient-text">
                            {translate(
                              "purchaseOrderContents.exchangedTaxAmount"
                            )}
                          </div>
                        ),
                        dataIndex: "exchangedTaxAmount",
                        key: "exchangedTaxAmount",
                      },

                      {
                        title: (
                          <div className="text-center gradient-text">
                            {translate("purchaseOrderContents.exchangedTotal")}
                          </div>
                        ),
                        dataIndex: "exchangedTotal",
                        key: "exchangedTotal",
                      },

                      {
                        title: (
                          <div className="text-center gradient-text">
                            {translate("purchaseOrderContents.category")}
                          </div>
                        ),
                        dataIndex: "category",
                        key: "category",
                        render(category: Category) {
                          return category; // fill render field after generate
                        },
                      },

                      {
                        title: (
                          <div className="text-center gradient-text">
                            {translate(
                              "purchaseOrderContents.exchangeCurrency"
                            )}
                          </div>
                        ),
                        dataIndex: "exchangeCurrency",
                        key: "exchangeCurrency",
                        render(exchangeCurrency: Currency) {
                          return exchangeCurrency; // fill render field after generate
                        },
                      },

                      {
                        title: (
                          <div className="text-center gradient-text">
                            {translate("purchaseOrderContents.item")}
                          </div>
                        ),
                        dataIndex: "item",
                        key: "item",
                        render(item: Item) {
                          return item; // fill render field after generate
                        },
                      },

                      {
                        title: (
                          <div className="text-center gradient-text">
                            {translate("purchaseOrderContents.mainCurrency")}
                          </div>
                        ),
                        dataIndex: "mainCurrency",
                        key: "mainCurrency",
                        render(mainCurrency: Currency) {
                          return mainCurrency; // fill render field after generate
                        },
                      },

                      {
                        title: (
                          <div className="text-center gradient-text">
                            {translate("purchaseOrderContents.taxType")}
                          </div>
                        ),
                        dataIndex: "taxType",
                        key: "taxType",
                        render(taxType: TaxType) {
                          return taxType; // fill render field after generate
                        },
                      },

                      {
                        title: (
                          <div className="text-center gradient-text">
                            {translate("purchaseOrderContents.unitOfMeasure")}
                          </div>
                        ),
                        dataIndex: "unitOfMeasure",
                        key: "unitOfMeasure",
                        render(unitOfMeasure: UnitOfMeasure) {
                          return unitOfMeasure; // fill render field after generate
                        },
                      },
                    ]}
                    pagination={false}
                    dataSource={previewModel.purchaseOrderContentsMappings}
                  />
                </div>
              </div>
              <div className="preview__footer">
                <button className="btn btn-cancel" onClick={handleClosePreview}>
                  <span>
                    <i className="tio-clear_circle_outlined"></i> Hủy
                  </span>
                </button>
              </div>
            </div>
            <div className="preview__right-side">
              <ChatBox
                getMessages={discussionRepository.list}
                countMessages={discussionRepository.count}
                postMessage={discussionRepository.create}
                deleteMessage={discussionRepository.delete}
                attachFile={discussionRepository.import}
                suggestList={appUserRepository.list}
                discussionId={previewModel.rowId}
                userInfo={state.user}
              />
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

export default PurchaseOrderPreview;
