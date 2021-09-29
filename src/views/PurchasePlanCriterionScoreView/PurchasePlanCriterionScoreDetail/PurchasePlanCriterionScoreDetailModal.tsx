/* begin general import */
import React, { useContext, Dispatch } from "react";
import nameof from "ts-nameof.macro";
import { Card, Col, Row, Tabs } from "antd";
import { translate } from "@react3l/react3l/helpers";
import { AppAction, AppState } from "app/app-store";
import { AppStoreContext } from "app/app-context";
import Modal, { ModalProps } from "components/Utility/Modal/Modal";
import FormItem from "components/Utility/FormItem/FormItem";
import { FormDetailAction, formService } from "services/form-service";
import ChatBox from "components/Utility/ChatBox/ChatBox";
import { discussionRepository } from "repositories/discussion-repository";
import { ASSETS_SVG } from "config/consts";
/* end general import */

/* begin individual import */
import Select from "components/Utility/Select/Select";
import InputNumber, { DECIMAL } from "components/Utility/Input/InputNumber/InputNumber";
import { PurchasePlanCriterionScore } from 'models/PurchasePlanCriterionScore';
import { appUserRepository } from 'repositories/app-user-repository';
import { purchasePlanCriterionScoreRepository } from "repositories/purchase-plan-criterion-score-repository";
import { CriterionFilter } from 'models/Criterion';
import { CriterionTypeFilter } from 'models/CriterionType';
import { PurchasePlanFilter } from 'models/PurchasePlan';
/* end individual import */

const { TabPane } = Tabs;

interface PurchasePlanCriterionScoreDetailModalProps extends ModalProps {
    model: PurchasePlanCriterionScore;
    onChangeSimpleField: (fieldName: string) => (fieldValue: any) => void;
    onChangeObjectField?: (
        fieldName: string,
    ) => (fieldIdValue: number, fieldValue?: any) => void;
    onChangeTreeObjectField?: (
        fieldName: string,
        callback?: (id: number) => void,
    ) => (list: any[]) => void;
    dispatchModel?: React.Dispatch<FormDetailAction<PurchasePlanCriterionScore>>;
    loading?: boolean;
}

function PurchasePlanCriterionScoreDetailModal(props: PurchasePlanCriterionScoreDetailModalProps) {
    const [state] = useContext<[AppState, Dispatch<AppAction>
    ]>(AppStoreContext);

    const {
        model,
        onChangeSimpleField,
        onChangeObjectField,
        loading,
    } = props;

    return (
        <Modal
            {...props}
            width={1200}>
            {   loading ?
                (
                    <div className='loading-block'>
                        <img src={ASSETS_SVG + '/spinner.svg'} alt='Loading...' />
                    </div>
                ) :
                (
                    <div className='page page__detail'>
                        <div className='page__modal-header w-100'>
                            <Row className='d-flex'>
                                <Col lg={24}>
                                    {model?.id ? (
                                        <div className='page__title mr-1'>
                                            {translate("purchasePlanCriterionScores.detail.title")}
                                        </div>
                                    ) : (
                                        translate("general.actions.create")
                                    )}
                                </Col>
                            </Row>
                        </div>
                        <div className='w-100 page__detail-tabs'>
                            <Row className='d-flex'>
                                <Col lg={16}>
                                    <Card>
                                        <Tabs defaultActiveKey='1'>
                                            <TabPane tab={translate("general.detail.generalInfomation")}
                                                key='1'>
                                                <Row>






                                                    <Col lg={12} className='pr-3'>
                                                        <FormItem label={translate("purchasePlanCriterionScores.score")}
                                                            validateStatus={formService.getValidationStatus<PurchasePlanCriterionScore>(model.errors, nameof(model.score))}
                                                            message={model.errors?.score}>
                                                            <InputNumber isMaterial={true}
                                                                value={model.score}
                                                                placeHolder={translate("purchasePlanCriterionScores.placeholder.score")}
                                                                onChange={onChangeSimpleField(nameof(model.score))}
                                                                numberType={DECIMAL} />
                                                        </FormItem>
                                                    </Col>



                                                    <Col lg={12} className='pr-3'>
                                                        <FormItem label={translate("purchasePlanCriterionScores.criterion")}
                                                            validateStatus={formService.getValidationStatus<PurchasePlanCriterionScore>(model.errors, nameof(model.criterion))}
                                                            message={model.errors?.criterion} >
                                                            <Select isMaterial={true}
                                                                classFilter={CriterionFilter}
                                                                placeHolder={translate("purchasePlanCriterionScores.placeholder.criterion")}
                                                                getList={purchasePlanCriterionScoreRepository.singleListCriterion}
                                                                onChange={onChangeObjectField(nameof(model.criterion))}
                                                                model={model.criterion} />
                                                        </FormItem>
                                                    </Col>

                                                    <Col lg={12} className='pr-3'>
                                                        <FormItem label={translate("purchasePlanCriterionScores.criterionType")}
                                                            validateStatus={formService.getValidationStatus<PurchasePlanCriterionScore>(model.errors, nameof(model.criterionType))}
                                                            message={model.errors?.criterionType} >
                                                            <Select isMaterial={true}
                                                                classFilter={CriterionTypeFilter}
                                                                placeHolder={translate("purchasePlanCriterionScores.placeholder.criterionType")}
                                                                getList={purchasePlanCriterionScoreRepository.singleListCriterionType}
                                                                onChange={onChangeObjectField(nameof(model.criterionType))}
                                                                model={model.criterionType} />
                                                        </FormItem>
                                                    </Col>

                                                    <Col lg={12} className='pr-3'>
                                                        <FormItem label={translate("purchasePlanCriterionScores.purchasePlan")}
                                                            validateStatus={formService.getValidationStatus<PurchasePlanCriterionScore>(model.errors, nameof(model.purchasePlan))}
                                                            message={model.errors?.purchasePlan} >
                                                            <Select isMaterial={true}
                                                                classFilter={PurchasePlanFilter}
                                                                placeHolder={translate("purchasePlanCriterionScores.placeholder.purchasePlan")}
                                                                getList={purchasePlanCriterionScoreRepository.singleListPurchasePlan}
                                                                onChange={onChangeObjectField(nameof(model.purchasePlan))}
                                                                model={model.purchasePlan} />
                                                        </FormItem>
                                                    </Col>
                                                </Row>
                                            </TabPane>
                                        </Tabs>
                                    </Card>
                                </Col>
                                <Col lg={8}>
                                    <Card>
                                        <ChatBox getMessages={discussionRepository.list}
                                            countMessages={discussionRepository.count}
                                            postMessage={discussionRepository.create}
                                            deleteMessage={discussionRepository.delete}
                                            attachFile={discussionRepository.import}
                                            suggestList={appUserRepository.list}
                                            discussionId={model.rowId}
                                            userInfo={state.user} />
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </div>
                )
            }
        </Modal>
    );
}

export default PurchasePlanCriterionScoreDetailModal;