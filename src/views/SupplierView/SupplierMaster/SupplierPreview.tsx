/* begin general import */
import { Model } from "@react3l/react3l/core/model";
import { Descriptions } from "antd";
import Table, { ColumnProps } from "antd/lib/table";
import Modal from "components/Utility/Modal/Modal";
import { renderMasterIndex } from "helpers/table";
import { TFunction } from "i18next";
/* end general import */
/* begin individual import */
import { Supplier } from "models/Supplier";
import React, { useMemo } from "react";
import nameof from "ts-nameof.macro";
/* end individual import */

interface SupplierPreviewProps<T extends Model> {
  previewModel?: T;
  isOpenPreview?: boolean;
  isLoadingPreview?: boolean;
  handleClosePreview?: () => void;
  handleGoDetail?: (id: number) => () => void;
  translate?: TFunction;
}

function SupplierPreview(props: SupplierPreviewProps<Supplier>) {
  const {
    previewModel,
    isOpenPreview,
    isLoadingPreview,
    handleClosePreview,
    handleGoDetail,
    translate,
  } = props;

  const columns: ColumnProps<Supplier>[] = useMemo(() => {
    return [
      {
        title: (
          <div className="text-center gradient-text">
            {translate("general.columns.index")}
          </div>
        ),
        key: "index",
        width: 100,
        align: "center",
        render: renderMasterIndex<Supplier>(),
      },
      {
        title: translate("suppliers.supplierContactors.name"),
        key: nameof(previewModel.supplierContactors[0].name),
        dataIndex: nameof(previewModel.supplierContactors[0].name),
      },
      {
        title: translate("suppliers.supplierContactors.phone"),
        key: nameof(previewModel.supplierContactors[0].phone),
        dataIndex: nameof(previewModel.supplierContactors[0].phone),
      },
      {
        title: translate("suppliers.supplierContactors.email"),
        key: nameof(previewModel.supplierContactors[0].email),
        dataIndex: nameof(previewModel.supplierContactors[0].email),
      },
    ];
  }, [previewModel.supplierContactors, translate]);

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
                    <Descriptions.Item label={translate("suppliers.code")}>
                      <span className="gradient-text">{previewModel.code}</span>
                    </Descriptions.Item>

                    <Descriptions.Item label={translate("suppliers.name")}>
                      <span className="gradient-text">{previewModel.name}</span>
                    </Descriptions.Item>

                    <Descriptions.Item label={translate("suppliers.taxCode")}>
                      <span className="gradient-text">
                        {previewModel.taxCode}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item label={translate("suppliers.phone")}>
                      <span className="gradient-text">
                        {previewModel.phone}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item label={translate("suppliers.email")}>
                      <span className="gradient-text">
                        {previewModel.email}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item label={translate("suppliers.address")}>
                      <span className="gradient-text">
                        {previewModel.address}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item label={translate("suppliers.ownerName")}>
                      <span className="gradient-text">
                        {previewModel.ownerName}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate("suppliers.description")}
                    >
                      <span className="gradient-text">
                        {previewModel.description}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item label={translate("suppliers.district")}>
                      <span className="gradient-text">
                        {previewModel?.district?.name}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item label={translate("suppliers.nation")}>
                      <span className="gradient-text">
                        {previewModel?.nation?.name}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate("suppliers.personInCharge")}
                    >
                      <span className="gradient-text">
                        {previewModel?.personInCharge?.name}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item label={translate("suppliers.province")}>
                      <span className="gradient-text">
                        {previewModel?.province?.name}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item label={translate("suppliers.status")}>
                      <span className="gradient-text">
                        {previewModel?.status?.name}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item label={translate("suppliers.ward")}>
                      <span className="gradient-text">
                        {previewModel?.ward?.name}
                      </span>
                    </Descriptions.Item>
                  </Descriptions>
                </div>

                <div className="preview__content">
                  <Descriptions
                    title={translate("suppliers.titles.contact")}
                    column={1}
                  >
                    <Descriptions.Item>
                      <Table
                        columns={columns}
                        dataSource={previewModel.supplierContactors}
                        rowKey={nameof(previewModel.supplierContactors[0].id)}
                        pagination={false}
                        className="w-100"
                      />
                    </Descriptions.Item>
                  </Descriptions>
                </div>
              </div>
              <div className="preview__footer">
                <button className="btn btn-cancel" onClick={handleClosePreview}>
                  <span>
                    <i className="tio-clear_circle_outlined"></i> Đóng
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

export default SupplierPreview;
