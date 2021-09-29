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
import { Criterion } from "models/Criterion";
import { Currency } from "models/Currency";
import { Item } from "models/Item";
/* end general import */
/* begin individual import */
import { PurchasePlan } from "models/PurchasePlan";
import { PurchaseRequestContent } from "models/PurchaseRequestContent";
import { SavingType } from "models/SavingType";
import { Supplier } from "models/Supplier";
import { TaxType } from "models/TaxType";
import { UnitOfMeasure } from "models/UnitOfMeasure";
import moment from "moment";
import React, { Dispatch, useContext } from "react";
import { appUserRepository } from "repositories/app-user-repository";
import { discussionRepository } from "repositories/discussion-repository";
import nameof from "ts-nameof.macro";
/* end individual import */

interface PurchasePlanPreviewProps<T extends Model> {
  previewModel?: T;
  isOpenPreview?: boolean;
  isLoadingPreview?: boolean;
  handleClosePreview?: () => void;
  handleGoDetail?: (id: number) => () => void;
  translate?: TFunction;
}

function PurchasePlanPreview(props: PurchasePlanPreviewProps<PurchasePlan>) {
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
                      {translate("purchasePlans.startDate")}{" "}
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
                    <Descriptions.Item label={translate("purchasePlans.code")}>
                      <span className="gradient-text">{previewModel.code}</span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate("purchasePlans.description")}
                    >
                      <span className="gradient-text">
                        {previewModel.description}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate("purchasePlans.quotationExpectedAt")}
                    >
                      <span className="gradient-text">
                        {previewModel.quotationExpectedAt
                          ? moment(previewModel.quotationExpectedAt).format(
                              "DD/MM/YYYY"
                            )
                          : null}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item label={translate("purchasePlans.note")}>
                      <span className="gradient-text">{previewModel.note}</span>
                    </Descriptions.Item>

                    <Descriptions.Item label={translate("purchasePlans.total")}>
                      <span className="gradient-text">
                        {previewModel.total}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item label={translate("purchasePlans.used")}>
                      <span className="gradient-text">{previewModel.used}</span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate("purchasePlans.creator")}
                    >
                      <span className="gradient-text">
                        {previewModel?.creator?.name}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate("purchasePlans.mainCurrency")}
                    >
                      <span className="gradient-text">
                        {previewModel?.mainCurrency?.name}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate("purchasePlans.purchasePlanType")}
                    >
                      <span className="gradient-text">
                        {previewModel?.purchasePlanType?.name}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate("purchasePlans.purchaseRequest")}
                    >
                      <span className="gradient-text">
                        {previewModel?.purchaseRequest?.name}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate("purchasePlans.selectedSupplier")}
                    >
                      <span className="gradient-text">
                        {previewModel?.selectedSupplier?.name}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate("purchasePlans.status")}
                    >
                      <span className="gradient-text">
                        {previewModel?.status?.name}
                      </span>
                    </Descriptions.Item>
                  </Descriptions>
                </div>
                <div className="preview__content">
                  <Table
                    tableLayout="fixed"
                    rowKey={nameof(previewModel.purchasePlanContents[0].id)}
                    columns={[
                      {
                        title: (
                          <div className="text-center gradient-text">
                            {translate("purchasePlanContents.description")}
                          </div>
                        ),
                        dataIndex: "description",
                        key: "description",
                      },

                      {
                        title: (
                          <div className="text-center gradient-text">
                            {translate("purchasePlanContents.unitPrice")}
                          </div>
                        ),
                        dataIndex: "unitPrice",
                        key: "unitPrice",
                      },

                      {
                        title: (
                          <div className="text-center gradient-text">
                            {translate("purchasePlanContents.taxAmount")}
                          </div>
                        ),
                        dataIndex: "taxAmount",
                        key: "taxAmount",
                      },

                      {
                        title: (
                          <div className="text-center gradient-text">
                            {translate("purchasePlanContents.price")}
                          </div>
                        ),
                        dataIndex: "price",
                        key: "price",
                      },

                      {
                        title: (
                          <div className="text-center gradient-text">
                            {translate("purchasePlanContents.quantity")}
                          </div>
                        ),
                        dataIndex: "quantity",
                        key: "quantity",
                      },

                      {
                        title: (
                          <div className="text-center gradient-text">
                            {translate("purchasePlanContents.subTotal")}
                          </div>
                        ),
                        dataIndex: "subTotal",
                        key: "subTotal",
                      },

                      {
                        title: (
                          <div className="text-center gradient-text">
                            {translate("purchasePlanContents.savingCost")}
                          </div>
                        ),
                        dataIndex: "savingCost",
                        key: "savingCost",
                      },

                      {
                        title: (
                          <div className="text-center gradient-text">
                            {translate("purchasePlanContents.total")}
                          </div>
                        ),
                        dataIndex: "total",
                        key: "total",
                      },

                      {
                        title: (
                          <div className="text-center gradient-text">
                            {translate("purchasePlanContents.note")}
                          </div>
                        ),
                        dataIndex: "note",
                        key: "note",
                      },

                      {
                        title: (
                          <div className="text-center gradient-text">
                            {translate("purchasePlanContents.exchangeRate")}
                          </div>
                        ),
                        dataIndex: "exchangeRate",
                        key: "exchangeRate",
                      },

                      {
                        title: (
                          <div className="text-center gradient-text">
                            {translate("purchasePlanContents.exchangedAt")}
                          </div>
                        ),
                        dataIndex: "exchangedAt",
                        key: "exchangedAt",
                      },

                      {
                        title: (
                          <div className="text-center gradient-text">
                            {translate(
                              "purchasePlanContents.exchangedSubTotal"
                            )}
                          </div>
                        ),
                        dataIndex: "exchangedSubTotal",
                        key: "exchangedSubTotal",
                      },

                      {
                        title: (
                          <div className="text-center gradient-text">
                            {translate("purchasePlanContents.exchangedTotal")}
                          </div>
                        ),
                        dataIndex: "exchangedTotal",
                        key: "exchangedTotal",
                      },

                      {
                        title: (
                          <div className="text-center gradient-text">
                            {translate("purchasePlanContents.category")}
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
                            {translate("purchasePlanContents.exchangeCurrency")}
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
                            {translate("purchasePlanContents.item")}
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
                            {translate("purchasePlanContents.mainCurrency")}
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
                            {translate(
                              "purchasePlanContents.purchaseRequestContent"
                            )}
                          </div>
                        ),
                        dataIndex: "purchaseRequestContent",
                        key: "purchaseRequestContent",
                        render(purchaseRequestContent: PurchaseRequestContent) {
                          return purchaseRequestContent; // fill render field after generate
                        },
                      },

                      {
                        title: (
                          <div className="text-center gradient-text">
                            {translate("purchasePlanContents.savingType")}
                          </div>
                        ),
                        dataIndex: "savingType",
                        key: "savingType",
                        render(savingType: SavingType) {
                          return savingType; // fill render field after generate
                        },
                      },

                      {
                        title: (
                          <div className="text-center gradient-text">
                            {translate("purchasePlanContents.taxType")}
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
                            {translate("purchasePlanContents.unitOfMeasure")}
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
                    dataSource={previewModel.purchasePlanContentsMappings}
                  />
                </div>
                <div className="preview__content">
                  <Table
                    tableLayout="fixed"
                    rowKey={nameof(
                      previewModel.purchasePlanCriterionMappings[0].id
                    )}
                    columns={[
                      {
                        title: (
                          <div className="text-center gradient-text">
                            {translate("purchasePlanCriterionMappings.weight")}
                          </div>
                        ),
                        dataIndex: "weight",
                        key: "weight",
                      },

                      {
                        title: (
                          <div className="text-center gradient-text">
                            {translate(
                              "purchasePlanCriterionMappings.criterion"
                            )}
                          </div>
                        ),
                        dataIndex: "criterion",
                        key: "criterion",
                        render(criterion: Criterion) {
                          return criterion; // fill render field after generate
                        },
                      },
                    ]}
                    pagination={false}
                    dataSource={
                      previewModel.purchasePlanCriterionMappingsMappings
                    }
                  />
                </div>
                <div className="preview__content">
                  <Table
                    tableLayout="fixed"
                    rowKey={nameof(
                      previewModel.purchasePlanSupplierMappings[0].id
                    )}
                    columns={[
                      {
                        title: (
                          <div className="text-center gradient-text">
                            {translate("purchasePlanSupplierMappings.weight")}
                          </div>
                        ),
                        dataIndex: "weight",
                        key: "weight",
                      },

                      {
                        title: (
                          <div className="text-center gradient-text">
                            {translate("purchasePlanSupplierMappings.supplier")}
                          </div>
                        ),
                        dataIndex: "supplier",
                        key: "supplier",
                        render(supplier: Supplier) {
                          return supplier; // fill render field after generate
                        },
                      },
                    ]}
                    pagination={false}
                    dataSource={
                      previewModel.purchasePlanSupplierMappingsMappings
                    }
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

export default PurchasePlanPreview;
