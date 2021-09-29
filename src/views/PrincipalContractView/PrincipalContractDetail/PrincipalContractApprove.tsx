/* begin general import */
import { CaretRightOutlined } from "@ant-design/icons";
import { Badge, Col, Collapse, Descriptions, Row, Steps } from "antd";
import Table, { ColumnProps } from "antd/lib/table";
import { AppStoreContext } from "app/app-context";
import { AppAction, AppState } from "app/app-store";
import AppFooter from "components/AppFooter/AppFooter";
import ChatBox from "components/Utility/ChatBox/ChatBox";
import { PRINCIPAL_CONTRACT_ROUTE } from "config/route-consts";
import { formatDate } from "helpers/date-time";
import { formatNumber } from "helpers/number";
import { Item } from "models/Item";
/* end general import */
/* begin individual import */
import { PrincipalContract } from "models/PrincipalContract";
import { PrincipalContractContent } from "models/PrincipalContractContent";
import { UnitOfMeasure } from "models/UnitOfMeasure";
import React, { Dispatch, useContext } from "react";
import { useTranslation } from "react-i18next";
import { appUserRepository } from "repositories/app-user-repository";
import { discussionRepository } from "repositories/discussion-repository";
import { principalContractRepository } from "repositories/principal-contract-repository";
import masterService from "services/pages/master-service";
import { routerService } from "services/route-service";
import nameof from "ts-nameof.macro";

import "./PrincipalContractApprove.scss";
import { PrincipalContractFileMappingModal, usePrincipalContractFileMapping } from "./PrincipalContractDetailHook/PrincipalContractFileMappingHook";
import { PrincipalContractWorkflowHistoryModal, usePrincipalContractWorkflow } from "./PrincipalContractDetailHook/PrincipalContractWorkflowHook";
/* end individual import */

function PrincipalContractApprove() {
    const [translate] = useTranslation();

    const [, , , handleGoBase] = routerService.useMasterNavigation(
        PRINCIPAL_CONTRACT_ROUTE
    );
    const { user } = useContext<[AppState, Dispatch<AppAction>]>(
        AppStoreContext
    )[0];

    const { model } = masterService.usePreviewPage(
        PrincipalContract,
        principalContractRepository.get
    );

    const {
        files,
        openFileModal,
        handleCloseFileModal,
        handleOpenFileModal,
    } = usePrincipalContractFileMapping(
        model,
        nameof("principalContractFileMappings")
    );
    const {
        childrenStep,
        childrenAction,
        isOpen,
        handleCloseHistory,
    } = usePrincipalContractWorkflow(model, handleGoBase, translate);
    const principalContractContentColumns: ColumnProps<
        PrincipalContract
    >[] = React.useMemo(() => {
        return [
            {
                title: (
                    <div className="table-cell__header">
                        {translate("principalContracts.principalContractContent.item")}
                    </div>
                ),
                width: 180,
                key: nameof(model.principalContractContents[0].item),
                dataIndex: nameof(model.principalContractContents[0].item),
                render: (...params: [Item, PrincipalContractContent, number]) => {
                    return (
                        <div className="table-cell__container table-cell__item">
                            <span className="item-code__text">{params[0].name}</span>
                            <span className="item-name__text">{params[0].code}</span>
                            <span className="item-description__text">
                                {params[0].description}
                            </span>
                        </div>
                    );
                },
            },
            {
                title: (
                    <div className="table-cell__header">
                        {translate(
                            "principalContracts.principalContractContent.unitOfMeasure"
                        )}
                    </div>
                ),
                width: 150,
                key: nameof(model.principalContractContents[0].unitOfMeasure),
                dataIndex: nameof(model.principalContractContents[0].unitOfMeasure),
                render: (
                    ...params: [UnitOfMeasure, PrincipalContractContent, number]
                ) => {
                    return (
                        <div className="table-cell__container">
                            <div className="result-cell">
                                <span className="cell-number">{params[0].name}</span>
                            </div>
                        </div>
                    );
                },
            },
            {
                title: (
                    <div className="table-cell__header">
                        {translate("principalContracts.principalContractContent.price")}
                    </div>
                ),
                width: 170,
                key: nameof(model.principalContractContents[0].unitPrice),
                dataIndex: nameof(model.principalContractContents[0].unitPrice),
                render: (...params: [number, PrincipalContractContent, number]) => {
                    return (
                        <div className="table-cell__container">
                            <div className="result-cell">
                                <span className="cell-number">
                                    {formatNumber(params[1]?.unitPrice)}
                                </span>
                                <span className="ml-2">
                                    {formatNumber(params[1]?.currency?.name)}
                                </span>
                            </div>
                        </div>
                    );
                },
            },

            {
                title: (
                    <div className="table-cell__header">
                        {translate("principalContracts.principalContractContent.taxType")}
                    </div>
                ),
                width: 170,
                key: nameof(model.principalContractContents[0].taxAmount),
                dataIndex: nameof(model.principalContractContents[0].taxAmount),
                render: (...params: [number, PrincipalContractContent, number]) => {
                    return (
                        <div className="table-cell__header">
                            <span>{params[1].taxType.name}</span>
                        </div>
                    );
                },
            },
        ];
    }, [model, translate]);
    return (
        <>
            <div className="page page__detail page__detail--approve">
                <div className="page__header d-flex align-items-center">
                    <div className="page__title mr-1">{model.code}</div>
                </div>
                <div className="w-100 page__detail-tabs">
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col lg={16} className="gutter-row">
                            <Collapse
                                defaultActiveKey={["1"]}
                                onChange={() => { }}
                                expandIcon={({ isActive }) => (
                                    <CaretRightOutlined rotate={isActive ? 90 : 0} />
                                )}
                                className="site-collapse-custom-collapse"
                                expandIconPosition="right"
                            >
                                <Collapse.Panel
                                    header={translate("general.detail.generalInfomation")}
                                    key="1"
                                    className="site-collapse-custom-panel"
                                >
                                    <Row justify="space-between">
                                        <Col span={16} className="mt-3">
                                            <div className="general-field__container">
                                                <div className="general-field__first-row">
                                                    <span>{translate("principalContracts.name")}</span>
                                                </div>
                                                <div className="general-field__second-row mt-1">
                                                    <span>{model?.name}</span>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col span={8} className="mt-3">
                                            <div className="general-field__container">
                                                <div className="general-field__first-row">
                                                    <span>{translate("principalContracts.manager")}</span>
                                                </div>
                                                <div className="general-field__second-row mt-1">
                                                    <span>{model?.manager?.displayName}</span>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col span={8} className="mt-3">
                                            <div className="general-field__container">
                                                <div className="general-field__first-row">
                                                    <span>{translate("principalContracts.code")}</span>
                                                </div>
                                                <div className="general-field__second-row mt-1">
                                                    <span>{model?.code}</span>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col span={8} className="mt-3">
                                            <div className="general-field__container">
                                                <div className="general-field__first-row">
                                                    <span>{translate("principalContracts.date")}</span>
                                                </div>
                                                <div className="general-field__second-row mt-1">
                                                    <span>
                                                        {formatDate(model?.startedAt)} -{" "}
                                                        {formatDate(model?.endedAt)}
                                                    </span>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col span={8} className="mt-3">
                                            <div className="general-field__container">
                                                <div className="general-field__first-row">
                                                    <span>
                                                        {translate("principalContracts.principalContractFileMappings")}
                                                    </span>
                                                </div>
                                                <div className="general-field__second-row mt-2">
                                                    <Badge
                                                        count={
                                                            model.principalContractFileMappings
                                                                ? model.principalContractFileMappings.length
                                                                : 0
                                                        }
                                                    >
                                                        <div
                                                            className="attach-file__button"
                                                            onClick={handleOpenFileModal}
                                                        >
                                                            <span>
                                                                <i className="tio-attachment_diagonal"></i>{" "}
                                                                {translate(
                                                                    "principalContracts.principalContractFileMappings"
                                                                )}
                                                            </span>
                                                        </div>
                                                    </Badge>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mt-3">
                                        <Descriptions
                                            title={translate(
                                                "principalContracts.detail.supplierInformation"
                                            )}
                                            column={1}
                                        >
                                            <Descriptions.Item
                                                label={translate("principalContracts.supplierAddress")}
                                            >
                                                {model?.supplierAddress}
                                            </Descriptions.Item>
                                            <Descriptions.Item
                                                label={translate("principalContracts.numberPhone")}
                                            >
                                                {model?.supplierPhoneNumber}
                                            </Descriptions.Item>

                                            <Descriptions.Item
                                                label={translate("principalContracts.supplierTaxCode")}
                                            >
                                                {model?.supplierTaxCode}
                                            </Descriptions.Item>
                                            <Descriptions.Item
                                                label={translate("principalContracts.appUser")}
                                            >
                                                {model?.supplierRepresentative}
                                            </Descriptions.Item>
                                        </Descriptions>
                                    </Row>
                                    <Row className="mt-3">
                                        <Descriptions
                                            title={translate(
                                                "principalContracts.detail.organizationInformation"
                                            )}
                                            column={1}
                                        >
                                            <Descriptions.Item
                                                label={translate(
                                                    "principalContracts.organizationAddress"
                                                )}
                                            >
                                                {model?.organizationAddress}
                                            </Descriptions.Item>
                                            <Descriptions.Item
                                                label={translate("principalContracts.numberPhone")}
                                            >
                                                {model?.organizationPhoneNumber}
                                            </Descriptions.Item>

                                            <Descriptions.Item
                                                label={translate("principalContracts.supplierTaxCode")}
                                            >
                                                {model?.organizationTaxCode}
                                            </Descriptions.Item>
                                            <Descriptions.Item
                                                label={translate("principalContracts.appUser")}
                                            >
                                                {model?.organizationRepresentative}
                                            </Descriptions.Item>
                                        </Descriptions>
                                    </Row>
                                    <Row className="mt-4">
                                        <Col span={24}>
                                            <Table
                                                rowKey={nameof(model.principalContractContents[0].id)}
                                                pagination={false}
                                                dataSource={model.principalContractContents}
                                                columns={principalContractContentColumns}
                                                scroll={{ y: 500 }}
                                            ></Table>
                                        </Col>
                                    </Row>
                                </Collapse.Panel>
                            </Collapse>
                        </Col>
                        <Col lg={8}>
                            <Row>
                                <Col lg={24}>
                                    <Collapse
                                        defaultActiveKey={["1"]}
                                        onChange={() => { }}
                                        className="site-collapse-custom-collapse"
                                        expandIconPosition="right"
                                        expandIcon={({ isActive }) => (
                                            <CaretRightOutlined rotate={isActive ? 90 : 0} />
                                        )}
                                    >
                                        <Collapse.Panel
                                            header={translate("general.detail.historyInformation")}
                                            key="1"
                                            className="site-collapse-custom-panel"
                                        >
                                            <Row>
                                                <Steps direction="vertical" size="small" current={1}>
                                                    <Steps.Step
                                                        title="Finished"
                                                        description="This is a description."
                                                    />
                                                    <Steps.Step
                                                        title="In Progress"
                                                        description="This is a description."
                                                    />
                                                    <Steps.Step
                                                        title="Waiting"
                                                        description="This is a description."
                                                    />
                                                </Steps>
                                            </Row>
                                        </Collapse.Panel>
                                    </Collapse>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={24}>
                                    <Collapse
                                        defaultActiveKey={["1"]}
                                        onChange={() => { }}
                                        className="site-collapse-custom-collapse"
                                        expandIconPosition="right"
                                        expandIcon={({ isActive }) => (
                                            <CaretRightOutlined rotate={isActive ? 90 : 0} />
                                        )}
                                    >
                                        <Collapse.Panel
                                            header={translate("general.detail.comment")}
                                            key="1"
                                            className="site-collapse-custom-panel"
                                        >
                                            <Row>
                                                <div style={{ minHeight: "300px", width: "100%" }}>
                                                    <ChatBox
                                                        getMessages={discussionRepository.list}
                                                        countMessages={discussionRepository.count}
                                                        postMessage={discussionRepository.create}
                                                        deleteMessage={discussionRepository.delete}
                                                        attachFile={discussionRepository.import}
                                                        suggestList={appUserRepository.list}
                                                        discussionId={model.rowId}
                                                        userInfo={user}
                                                    />
                                                </div>
                                            </Row>
                                        </Collapse.Panel>
                                    </Collapse>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <AppFooter
                        childrenAction={childrenAction}
                        childrenStep={childrenStep}
                    ></AppFooter>
                </div>
                <PrincipalContractFileMappingModal
                    visibleDialog={openFileModal}
                    files={files}
                    onCancelDialog={handleCloseFileModal}
                    isViewMode={true}
                />
                <PrincipalContractWorkflowHistoryModal
                    isOpen={isOpen}
                    model={model}
                    handleCloseHistory={handleCloseHistory}
                    translate={translate}
                />
            </div>
        </>
    );
}

export default PrincipalContractApprove;
