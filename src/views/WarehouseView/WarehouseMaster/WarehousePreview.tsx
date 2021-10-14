/* begin general import */
import { Model } from "@react3l/react3l/core/model";
import { Descriptions } from "antd";
import Modal from "components/Utility/Modal/Modal";
import { TFunction } from "i18next";
import { Warehouse } from "models/Warehouse/Warehouse";
import React from "react";
/* end individual import */
import "./WarehouseMaster.scss";

interface WarehousePreviewProps<T extends Model> {
  previewModel?: T;
  isOpenPreview?: boolean;
  isLoadingPreview?: boolean;
  handleClosePreview?: () => void;
  handleGoDetail?: (id: number) => () => void;
  translate?: TFunction;
}

function WarehousePreview(props: WarehousePreviewProps<Warehouse>) {
  const {
    previewModel,
    isOpenPreview,
    isLoadingPreview,
    handleClosePreview,
    handleGoDetail,
    translate,
  } = props;

  return (
    <>
      <Modal
        title={null}
        visible={isOpenPreview}
        handleCancel={handleClosePreview}
        width={500}
        visibleFooter={false}
      >
        {isLoadingPreview ? (
          <div className="loading-block">
            <img src="/assets/svg/spinner.svg" alt="Loading..." />
          </div>
        ) : (
          <div className="preview__containter preview__containter-warehouse">
            <div className="preview__left-side">
              <div className="preview__header">
                <div className="preview__vertical-bar"></div>
                <div className="preview__header-info">
                  <div className="preview__header-text">
                    <span className="preview__header-title">
                      {previewModel?.name}
                    </span>
                    <span className="preview__header-date">
                      {translate("warehouses.code")} {previewModel?.code}
                    </span>
                    <div className="tag--active mt-3">
                      {previewModel?.status?.name}
                    </div>
                  </div>
                  <div className="btn-edit">
                    <button
                      className="btn gradient-btn-icon ant-tooltip-open"
                      onClick={handleGoDetail(previewModel.id)}
                    >
                      <i className="tio-new_message"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="preview__body">
                <div className="preview__content">
                  <Descriptions column={1}>
                    <Descriptions.Item>
                      <span className="gradient-text">
                        {translate("warehouses.address")}
                      </span>
                    </Descriptions.Item>
                    <Descriptions.Item>
                      <span className="gradient-text">
                        {previewModel.address}
                      </span>
                    </Descriptions.Item>
                    <Descriptions.Item label={translate("warehouses.district")}>
                      <span className="gradient-text">
                        {previewModel?.district?.name}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item label={translate("warehouses.province")}>
                      <span className="gradient-text">
                        {previewModel?.province?.name}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item label={translate("warehouses.ward")}>
                      <span className="gradient-text">
                        {previewModel?.ward?.name}
                      </span>
                    </Descriptions.Item>
                  </Descriptions>
                </div>
                <div className="preview__content">
                  <Descriptions column={1}>
                    <Descriptions.Item>
                      <span className="gradient-text">
                        {translate("warehouses.organization")}
                      </span>
                    </Descriptions.Item>
                    <Descriptions.Item>
                      <span className="gradient-text">
                        {previewModel?.organization?.name}
                      </span>
                    </Descriptions.Item>
                  </Descriptions>
                </div>
              </div>
              <div className="preview__footer"></div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

export default WarehousePreview;
