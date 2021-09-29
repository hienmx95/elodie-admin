import { formatDate } from "helpers/date-time";
import { Table } from "antd";
import { ColumnProps } from "antd/lib/table";
import Modal from "components/Utility/Modal/Modal";
import { PurchaseRequest } from "models/PurchaseRequest";
import React from 'react';
import { useTranslation } from "react-i18next";
import nameof from "ts-nameof.macro";

export function usePurchaseRequestWorkflowHistory(model: PurchaseRequest) {

    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const handleOpenHistory = React.useCallback(() => {
        setIsOpen(true);
    }, []);
    const handleCloseHistory = React.useCallback(() => {
        setIsOpen(false);
    }, []);
    const listHistory = React.useMemo(() => {
        if (model && model.purchaseRequestWorkflowHistories && model.purchaseRequestWorkflowHistories.length > 0) {
            return model.purchaseRequestWorkflowHistories;
        }
    }, [model]);
    return {
        isOpen,
        handleOpenHistory,
        handleCloseHistory,
        listHistory
    };
}

interface PurchaseRequestWorkflowHistoryModalProps {
    model: PurchaseRequest,
    isOpen: boolean,
    handleCloseHistory: () => void,

}
export function PurchaseRequestWorkflowHistoryModal(props: PurchaseRequestWorkflowHistoryModalProps) {
    const { model, isOpen, handleCloseHistory } = props;
    const [translate] = useTranslation();
    const columns: ColumnProps<any>[] = React.useMemo(
        () => [
            {
                title: (
                    <div className="text-left gradient-text">
                        {translate("purchaseRequests.histories.appUser")}
                    </div>
                ),
                key: nameof(model.purchaseRequestWorkflowHistories[0].appUser),
                dataIndex: nameof(model.purchaseRequestWorkflowHistories[0].appUser),

                render(...[appUser, purchaseRequestWorkflowHistory]) {
                    return appUser ? appUser?.displayName :
                        purchaseRequestWorkflowHistory?.nextApprovers.map((item, index) => {
                            return (<div key={index}>{item?.displayName}</div>);
                        });
                }
            },

            {
                title: (
                    <div className="text-left gradient-text">
                        {translate("purchaseRequests.histories.requestWorkflowAction")}
                    </div>
                ),
                key: nameof(model.purchaseRequestWorkflowHistories[0].requestWorkflowAction),
                dataIndex: nameof(model.purchaseRequestWorkflowHistories[0].requestWorkflowAction),

                render(...[requestWorkflowAction]) {
                    return requestWorkflowAction?.name;
                },
            },
            {
                title: (
                    <div className="text-left gradient-text">
                        {translate("purchaseRequests.histories.savedAt")}
                    </div>
                ),
                key: nameof(model.purchaseRequestWorkflowHistories[0].savedAt),
                dataIndex: nameof(model.purchaseRequestWorkflowHistories[0].savedAt),

                render(...[savedAt]) {
                    return <div className="d-flex justify-content-between">
                        <div> {savedAt && formatDate(savedAt)}</div>
                        <div>
                            {savedAt ?
                                <i className="tio-checkmark_circle  ml-3 text-success" />
                                : <i className="tio-watch_later text-warning ml-3" />
                            }
                        </div>
                    </div >;
                },
            },
        ]
        , [model.purchaseRequestWorkflowHistories, translate]);

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
                                    <span className="preview__header-title mt-2">{translate('purchaseRequests.histories.title')}</span>
                                </div>
                                <button className="btn gradient-btn-icon ant-tooltip-open text-danger" onClick={handleCloseHistory}>
                                    <i className="tio-clear" />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
                <div>
                    <Table
                        dataSource={model.purchaseRequestWorkflowHistories}
                        columns={columns}
                        rowKey={nameof(model.purchaseRequestWorkflowHistories[0].id)}
                        pagination={false}
                        scroll={{ y: 500 }}
                        className="mr-3 ml-3 mt-3"
                    />
                </div>

            </Modal>
        </>
    );
}