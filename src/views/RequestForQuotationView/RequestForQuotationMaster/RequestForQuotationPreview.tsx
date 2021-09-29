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
import { File } from "models/File";
import { Item } from "models/Item";
/* end general import */
/* begin individual import */
import { RequestForQuotation } from "models/RequestForQuotation";
import { Supplier } from "models/Supplier";
import { UnitOfMeasure } from "models/UnitOfMeasure";
import moment from "moment";
import React, { Dispatch, useContext } from "react";
import { appUserRepository } from "repositories/app-user-repository";
import { discussionRepository } from "repositories/discussion-repository";
import nameof from "ts-nameof.macro";
/* end individual import */

interface RequestForQuotationPreviewProps<T extends Model> {
  previewModel?: T;
  isOpenPreview?: boolean;
  isLoadingPreview?: boolean;
  handleClosePreview?: () => void;
  handleGoDetail?: (id: number) => () => void;
  translate?: TFunction;
}

function RequestForQuotationPreview(
  props: RequestForQuotationPreviewProps<RequestForQuotation>
) {
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
                      {translate("requestForQuotations.startDate")}{" "}
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
                      label={translate("requestForQuotations.code")}
                    >
                      <span className="gradient-text">{previewModel.code}</span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate("requestForQuotations.description")}
                    >
                      <span className="gradient-text">
                        {previewModel.description}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate(
                        "requestForQuotations.quotationExpectedAt"
                      )}
                    >
                      <span className="gradient-text">
                        {previewModel.quotationExpectedAt
                          ? moment(previewModel.quotationExpectedAt).format(
                              "DD/MM/YYYY"
                            )
                          : null}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate(
                        "requestForQuotations.requestDepartmentName"
                      )}
                    >
                      <span className="gradient-text">
                        {previewModel.requestDepartmentName}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate("requestForQuotations.recipientAddress")}
                    >
                      <span className="gradient-text">
                        {previewModel.recipientAddress}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate("requestForQuotations.sendToPRC")}
                    >
                      <span className="gradient-text">
                        {previewModel.sendToPRC}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate("requestForQuotations.note")}
                    >
                      <span className="gradient-text">{previewModel.note}</span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate("requestForQuotations.used")}
                    >
                      <span className="gradient-text">{previewModel.used}</span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate("requestForQuotations.buyer")}
                    >
                      <span className="gradient-text">
                        {previewModel?.buyer?.name}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate(
                        "requestForQuotations.requestOrganization"
                      )}
                    >
                      <span className="gradient-text">
                        {previewModel?.requestOrganization?.name}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate("requestForQuotations.requestor")}
                    >
                      <span className="gradient-text">
                        {previewModel?.requestor?.name}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate("requestForQuotations.status")}
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
                    rowKey={nameof(
                      previewModel.requestForQuotationContents[0].id
                    )}
                    columns={[
                      {
                        title: (
                          <div className="text-center gradient-text">
                            {translate(
                              "requestForQuotationContents.description"
                            )}
                          </div>
                        ),
                        dataIndex: "description",
                        key: "description",
                      },

                      {
                        title: (
                          <div className="text-center gradient-text">
                            {translate("requestForQuotationContents.quantity")}
                          </div>
                        ),
                        dataIndex: "quantity",
                        key: "quantity",
                      },

                      {
                        title: (
                          <div className="text-center gradient-text">
                            {translate("requestForQuotationContents.note")}
                          </div>
                        ),
                        dataIndex: "note",
                        key: "note",
                      },

                      {
                        title: (
                          <div className="text-center gradient-text">
                            {translate(
                              "requestForQuotationContents.noteForSupplier"
                            )}
                          </div>
                        ),
                        dataIndex: "noteForSupplier",
                        key: "noteForSupplier",
                      },

                      {
                        title: (
                          <div className="text-center gradient-text">
                            {translate("requestForQuotationContents.category")}
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
                            {translate("requestForQuotationContents.item")}
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
                            {translate(
                              "requestForQuotationContents.unitOfMeasure"
                            )}
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
                    dataSource={
                      previewModel.requestForQuotationContentsMappings
                    }
                  />
                </div>
                <div className="preview__content">
                  <Table
                    tableLayout="fixed"
                    rowKey={nameof(
                      previewModel.requestForQuotationFileMappings[0].id
                    )}
                    columns={[
                      {
                        title: (
                          <div className="text-center gradient-text">
                            {translate("requestForQuotationFileMappings.file")}
                          </div>
                        ),
                        dataIndex: "file",
                        key: "file",
                        render(file: File) {
                          return file; // fill render field after generate
                        },
                      },
                    ]}
                    pagination={false}
                    dataSource={
                      previewModel.requestForQuotationFileMappingsMappings
                    }
                  />
                </div>
                <div className="preview__content">
                  <Table
                    tableLayout="fixed"
                    rowKey={nameof(
                      previewModel.requestForQuotationSupplierMappings[0].id
                    )}
                    columns={[
                      {
                        title: (
                          <div className="text-center gradient-text">
                            {translate(
                              "requestForQuotationSupplierMappings.supplier"
                            )}
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
                      previewModel.requestForQuotationSupplierMappingsMappings
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

export default RequestForQuotationPreview;
