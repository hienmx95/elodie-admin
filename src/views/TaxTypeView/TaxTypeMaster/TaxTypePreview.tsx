/* begin general import */
import { Model } from "@react3l/react3l/core/model";
import { Descriptions } from "antd";
import Modal from "components/Utility/Modal/Modal";
import { TFunction } from "i18next";
/* end general import */
/* begin individual import */
import { TaxType } from "models/TaxType";
import React from "react";
/* end individual import */

interface TaxTypePreviewProps<T extends Model> {
  previewModel?: T;
  isOpenPreview?: boolean;
  isLoadingPreview?: boolean;
  handleClosePreview?: () => void;
  handleGoDetail?: (id: number) => () => void;
  translate?: TFunction;
}

function TaxTypePreview(props: TaxTypePreviewProps<TaxType>) {
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
                    <Descriptions.Item label={translate("taxTypes.code")}>
                      <span className="gradient-text">{previewModel.code}</span>
                    </Descriptions.Item>

                    <Descriptions.Item label={translate("taxTypes.name")}>
                      <span className="gradient-text">{previewModel.name}</span>
                    </Descriptions.Item>

                    <Descriptions.Item label={translate("taxTypes.percentage")}>
                      <span className="gradient-text">
                        {previewModel.percentage}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item label={translate("taxTypes.used")}>
                      <span className="gradient-text">{previewModel.used}</span>
                    </Descriptions.Item>

                    <Descriptions.Item label={translate("taxTypes.status")}>
                      <span className="gradient-text">
                        {previewModel?.status?.name}
                      </span>
                    </Descriptions.Item>
                  </Descriptions>
                </div>
                {/* <div className="preview__content">
                  <Empty />
                </div> */}
              </div>
              <div className="preview__footer">
                <button className="btn btn-cancel" onClick={handleClosePreview}>
                  <span>
                    <i className="tio-clear_circle_outlined"></i> ????ng
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

export default TaxTypePreview;
