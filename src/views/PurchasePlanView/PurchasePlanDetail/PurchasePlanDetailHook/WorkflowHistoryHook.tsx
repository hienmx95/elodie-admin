import { formatDate } from "helpers/date-time";
import { Table } from "antd";
import { ColumnProps } from "antd/lib/table";
import Modal from "components/Utility/Modal/Modal";
import { PurchasePlan } from "models/PurchasePlan";
import React from "react";
import { useTranslation } from "react-i18next";
import nameof from "ts-nameof.macro";
import { AppUser } from "models/AppUser";

export function useWorkflowHistoryHook(model?: PurchasePlan) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const handleOpenHistory = React.useCallback(() => {
    setIsOpen(true);
  }, []);
  const handleCloseHistory = React.useCallback(() => {
    setIsOpen(false);
  }, []);
  const listHistory = React.useMemo(() => {
    if (
      model &&
      model.purchasePlanWorkflowHistories &&
      model.purchasePlanWorkflowHistories.length > 0
    ) {
      return model.purchasePlanWorkflowHistories;
    }
  }, [model]);
  return {
    isOpen,
    handleOpenHistory,
    handleCloseHistory,
    listHistory,
  };
}

interface PurchasePlanWorkflowHistoryModalProps {
  model: PurchasePlan;
  isOpen: boolean;
  handleCloseHistory: () => void;
}
export function PurchasePlanWorkflowHistoryModal(
  props: PurchasePlanWorkflowHistoryModalProps
) {
  const { model, isOpen, handleCloseHistory } = props;
  const [translate] = useTranslation();
  const columns: ColumnProps<PurchasePlan>[] = React.useMemo(
    () => [
      {
        title: (
          <div className="text-left gradient-text">
            {translate("purchasePlans.histories.appUser")}
          </div>
        ),
        key: nameof(model.purchasePlanWorkflowHistories[0].appUser),
        dataIndex: nameof(model.purchasePlanWorkflowHistories[0].appUser),

        render(...[appUser, content]) {
          return (
            <>
              {
                appUser && <div>{appUser?.displayName}</div>
              }
              {
                content.nextApprovers && content.nextApprovers.length > 0 && content.nextApprovers.map((nextApprover: AppUser) => (
                  <>{nextApprover.username} <br /> {nextApprover.displayName}</>
                ))
              }
            </>
          )
        },
      },
      {
        title: (
          <div className="text-left gradient-text">
            {translate("purchasePlans.histories.requestWorkflowAction")}
          </div>
        ),
        key: nameof(
          model.purchasePlanWorkflowHistories[0].requestWorkflowAction
        ),
        dataIndex: nameof(
          model.purchasePlanWorkflowHistories[0].requestWorkflowAction
        ),

        render(...[requestWorkflowAction]) {
          return requestWorkflowAction?.name;
        },
      },
      {
        title: (
          <div className="text-left gradient-text">
            {translate("purchasePlans.histories.savedAt")}
          </div>
        ),
        key: nameof(model.purchasePlanWorkflowHistories[0].savedAt),
        dataIndex: nameof(model.purchasePlanWorkflowHistories[0].savedAt),

        render(...[savedAt]) {
          return (
            <div className="d-flex justify-content-between">
              <div> {savedAt && formatDate(savedAt)}</div>
              <div>
                {savedAt ? (
                  <i className="tio-checkmark_circle  ml-3 text-success" />
                ) : (
                  <i className="tio-watch_later text-warning ml-3" />
                )}
              </div>
            </div>
          );
        },
      },
    ],
    [model.purchasePlanWorkflowHistories, translate]
  );

  return (
    <>
      <Modal
        title={null}
        visible={isOpen}
        handleCancel={handleCloseHistory}
        width={800}
        visibleFooter={false}
      >
        <div className="preview__containter">
          <div className="preview__left-side">
            <div className="preview__header">
              <div className="preview__header-info">
                <div className="preview__header-text">
                  <span className="preview__header-title mt-2">
                    {translate("purchasePlans.histories.title")}
                  </span>
                </div>
                <button
                  className="btn gradient-btn-icon ant-tooltip-open text-danger"
                  onClick={handleCloseHistory}
                >
                  <i className="tio-clear" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Table
            dataSource={model.purchasePlanWorkflowHistories}
            columns={columns}
            rowKey={nameof(model.purchasePlanWorkflowHistories[0].id)}
            pagination={false}
            scroll={{ y: 500 }}
            className="mr-3 ml-3 mt-3"
          />
        </div>
      </Modal>
    </>
  );
}
