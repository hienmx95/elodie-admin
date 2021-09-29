import { commonService } from "@react3l/react3l/services";
import { Steps, Tooltip } from "antd";
import Table, { ColumnProps } from "antd/lib/table";
import { AxiosError } from "axios";
import Modal from "components/Utility/Modal/Modal";
import { formatDate } from "helpers/date-time";
import { TFunction } from "i18next";
import { PrincipalContract } from "models/PrincipalContract";
import React from "react";
import { principalContractRepository } from "repositories/principal-contract-repository";
import nameof from 'ts-nameof.macro';

import appMessageService from "services/app-message-service";

export function usePrincipalContractWorkflow(
    model: PrincipalContract,
    handleGoBase: () => void,
    translate: TFunction,
) {

    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const handleOpenHistory = React.useCallback(() => {
        setIsOpen(true);
    }, []);
    const handleCloseHistory = React.useCallback(() => {
        setIsOpen(false);
    }, []);
    const [subscription] = commonService.useSubscription();

    const {
        notifyUpdateItemSuccess,
        notifyUpdateItemError,
    } = appMessageService.useCRUDMessage();
    const handleApprove = React.useCallback(() => {
        subscription.add(
            principalContractRepository
                .approve(model)

                .subscribe(
                    (item: PrincipalContract) => {

                        handleGoBase();
                        notifyUpdateItemSuccess();
                    },
                    (error: AxiosError<PrincipalContract>) => {
                        notifyUpdateItemError();
                    }
                )
        );



    }, [handleGoBase, model, notifyUpdateItemError, notifyUpdateItemSuccess, subscription]);
    const handleReject = React.useCallback(() => {
        subscription.add(
            principalContractRepository
                .reject(model)
                .subscribe(
                    (item: PrincipalContract) => {

                        handleGoBase();
                        notifyUpdateItemSuccess();
                    },
                    (error: AxiosError<PrincipalContract>) => {
                        notifyUpdateItemError();
                    }
                )
        );

    }, [handleGoBase, model, notifyUpdateItemError, notifyUpdateItemSuccess, subscription]);
    const handleRedo = React.useCallback(() => {
        subscription.add(
            principalContractRepository
                .redo(model)
                .subscribe(
                    (item: PrincipalContract) => {

                        handleGoBase();
                        notifyUpdateItemSuccess();
                    },
                    (error: AxiosError<PrincipalContract>) => {
                        notifyUpdateItemError();
                    }
                )
        );

    }, [handleGoBase, model, notifyUpdateItemError, notifyUpdateItemSuccess, subscription]);
    const handlePrint = React.useCallback(() => {
        principalContractRepository.print(model).subscribe(
            () => {
                notifyUpdateItemSuccess();
            },
            (err) => {
                notifyUpdateItemError();
            }
        );

    }, [model, notifyUpdateItemError, notifyUpdateItemSuccess]);
    const childrenAction = React.useMemo(() => {
        return (
            <>
                {model?.requestStateId === 2 &&

                    <button
                        className="btn btn__approve  mr-3"
                        onClick={handleApprove}
                    >
                        <span>
                            <i className="tio-checkmark_circle_outlined mr-2"></i>
                            {translate("general.button.approve")}
                        </span>
                    </button>
                }
                {model?.requestStateId === 2 &&
                    <button
                        className="btn btn__reject mr-3"
                        onClick={handleReject}
                    >
                        <span>
                            <i className="tio-pause_circle_outlined  mr-2"></i>
                            {translate("general.button.reject")}
                        </span>
                    </button>
                }
                {model?.requestStateId === 2 &&
                    <button
                        className="btn btn__redo  mr-3"
                        onClick={handleRedo}
                    >
                        <span>
                            <i className="tio-replay mr-2"></i>
                            {translate("general.button.redo")}
                        </span>
                    </button>
                }
                {model?.requestStateId === 3 &&
                    <button
                        className="btn btn__cancel mr-3"
                        onClick={handlePrint}
                    >
                        <span>
                            <i className="tio-print mr-2"></i>
                            {translate("general.button.print")}
                        </span>
                    </button>
                }
                <button className="btn btn__cancel mr-3" onClick={handleGoBase}>
                    <span>
                        <i className="tio-clear_circle_outlined mr-2"></i>
                        {translate("general.button.close")}
                    </span>
                </button>
            </>
        );
    }, [handleApprove, translate, handleReject, handleRedo, model, handlePrint, handleGoBase]);
    const childrenStep = React.useMemo(() => {
        return (
            <div className="d-flex justify-content-between" style={{ width: '60%' }}>
                <Steps current={model?.requestStateId} size="small" >
                    <Steps.Step title="Khởi tạo" />
                    <Steps.Step title="Chờ duyệt" />
                    <Steps.Step title="Đã duyệt" />
                </Steps>

                <Tooltip title={translate('principalContracts.history')}>
                    <i className="tio-history purchase-request-icon_history "
                        onClick={handleOpenHistory} />
                </Tooltip>

            </div>
        );
    }, [handleOpenHistory, model, translate]);
    return {
        childrenStep,
        childrenAction,
        isOpen,
        handleCloseHistory,
    };
}

interface PrincipalContractWorkflowHistoryModalProps {
    model: PrincipalContract,
    isOpen: boolean,
    handleCloseHistory: () => void,
    translate: TFunction,

}
export function PrincipalContractWorkflowHistoryModal(props: PrincipalContractWorkflowHistoryModalProps) {
    const { model, isOpen, handleCloseHistory, translate } = props;
    const columns: ColumnProps<any>[] = React.useMemo(
        () => [
            {
                title: (
                    <div className="text-left gradient-text">
                        {translate("principalContracts.histories.appUser")}
                    </div>
                ),
                key: nameof(model.principalContractWorkflowHistories[0].appUser),
                dataIndex: nameof(model.principalContractWorkflowHistories[0].appUser),

                render(...[appUser, principalContractWorkflowHistory]) {
                    return appUser ? appUser?.displayName :
                        principalContractWorkflowHistory?.nextApprovers.map((item, index) => {
                            return (<div key={index}>{item?.displayName}</div>);
                        });
                }
            },

            {
                title: (
                    <div className="text-left gradient-text">
                        {translate("principalContracts.histories.requestWorkflowAction")}
                    </div>
                ),
                key: nameof(model.principalContractWorkflowHistories[0].requestWorkflowAction),
                dataIndex: nameof(model.principalContractWorkflowHistories[0].requestWorkflowAction),

                render(...[requestWorkflowAction]) {
                    return requestWorkflowAction?.name;
                },
            },
            {
                title: (
                    <div className="text-left gradient-text">
                        {translate("principalContracts.histories.savedAt")}
                    </div>
                ),
                key: nameof(model.principalContractWorkflowHistories[0].savedAt),
                dataIndex: nameof(model.principalContractWorkflowHistories[0].savedAt),

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
        , [model.principalContractWorkflowHistories, translate]);

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
                                    <span className="preview__header-title mt-2">{translate('principalContracts.histories.title')}</span>
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
                        dataSource={model.principalContractWorkflowHistories}
                        columns={columns}
                        rowKey={nameof(model.principalContractWorkflowHistories[0].id)}
                        pagination={false}
                        scroll={{ y: 500 }}
                        className="mr-3 ml-3 mt-3"
                    />
                </div>

            </Modal>
        </>
    );
}