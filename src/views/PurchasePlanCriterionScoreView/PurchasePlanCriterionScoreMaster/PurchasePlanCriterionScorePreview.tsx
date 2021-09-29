/* begin general import */
import { Model } from "@react3l/react3l/core/model";
import { Descriptions, Empty } from "antd";
import { AppStoreContext } from "app/app-context";
import { AppAction, AppState } from "app/app-store";
import ChatBox from "components/Utility/ChatBox/ChatBox";
import Modal from "components/Utility/Modal/Modal";
import { TFunction } from "i18next";
/* end general import */
/* begin individual import */
import { PurchasePlanCriterionScore } from "models/PurchasePlanCriterionScore";
import moment from "moment";
import React, { Dispatch, useContext } from "react";
import { appUserRepository } from "repositories/app-user-repository";
import { discussionRepository } from "repositories/discussion-repository";
/* end individual import */

interface PurchasePlanCriterionScorePreviewProps<T extends Model> {
  previewModel?: T;
  isOpenPreview?: boolean;
  isLoadingPreview?: boolean;
  handleClosePreview?: () => void;
  handleGoDetail?: (id: number) => () => void;
  translate?: TFunction;
}

function PurchasePlanCriterionScorePreview(
  props: PurchasePlanCriterionScorePreviewProps<PurchasePlanCriterionScore>
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
                      {translate("purchasePlanCriterionScores.startDate")}{" "}
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
                      label={translate("purchasePlanCriterionScores.score")}
                    >
                      <span className="gradient-text">
                        {previewModel.score}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate("purchasePlanCriterionScores.criterion")}
                    >
                      <span className="gradient-text">
                        {previewModel?.criterion?.name}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate(
                        "purchasePlanCriterionScores.criterionType"
                      )}
                    >
                      <span className="gradient-text">
                        {previewModel?.criterionType?.name}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate(
                        "purchasePlanCriterionScores.purchasePlan"
                      )}
                    >
                      <span className="gradient-text">
                        {previewModel?.purchasePlan?.name}
                      </span>
                    </Descriptions.Item>
                  </Descriptions>
                </div>
                <div className="preview__content">
                  <Empty />
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

export default PurchasePlanCriterionScorePreview;
