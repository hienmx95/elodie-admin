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
import { Switch } from "antd";
import InputText from "components/Utility/Input/InputText/InputText";
import Select from "components/Utility/Select/Select";
import { PurchaseOrderCondition } from 'models/PurchaseOrderCondition';
import { appUserRepository } from 'repositories/app-user-repository';
import { purchaseOrderConditionRepository } from "repositories/purchase-order-condition-repository";
import { PurchaseOrderFilter } from 'models/PurchaseOrder';
/* end individual import */

const { TabPane } = Tabs;

interface PurchaseOrderConditionDetailModalProps extends ModalProps {
  model: PurchaseOrderCondition;
  onChangeSimpleField: (fieldName: string) => (fieldValue: any) => void;
  onChangeObjectField?: (
    fieldName: string,
  ) => (fieldIdValue: number, fieldValue?: any) => void;
  onChangeTreeObjectField?: (
    fieldName: string,
    callback?: (id: number) => void,
  ) => (list: any[]) => void;
  dispatchModel?: React.Dispatch<FormDetailAction<PurchaseOrderCondition>>;
  loading?: boolean;
}

function PurchaseOrderConditionDetailModal(props: PurchaseOrderConditionDetailModalProps) {
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
                                        {translate("purchaseOrderConditions.detail.title")}
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
                                                        <FormItem label={translate("purchaseOrderConditions.code")}
                                                                    validateStatus={formService.getValidationStatus<PurchaseOrderCondition>(model.errors, nameof(model.code))}
                                                                    message={ model.errors?.code }>
                                                                    <InputText isMaterial={true}
                                                                                value={ model.code }
                                                                                placeHolder={translate("purchaseOrderConditions.placeholder.code")}
                                                                                className={"tio-account_square_outlined"}
                                                                                onChange={onChangeSimpleField(nameof(model.code))} />
                                                        </FormItem>
                                                    </Col>
                                                    

                                                    <Col lg={12} className='pr-3'>
                                                        <FormItem label={translate("purchaseOrderConditions.description")}
                                                                    validateStatus={formService.getValidationStatus<PurchaseOrderCondition>(model.errors, nameof(model.description))}
                                                                    message={ model.errors?.description }>
                                                                    <InputText isMaterial={true}
                                                                                value={ model.description }
                                                                                placeHolder={translate("purchaseOrderConditions.placeholder.description")}
                                                                                className={"tio-account_square_outlined"}
                                                                                onChange={onChangeSimpleField(nameof(model.description))} />
                                                        </FormItem>
                                                    </Col>
                                                    





                                                    <Col lg={12} className='pr-3'>
                                                        <FormItem label={translate("purchaseOrderConditions.used")}
                                                                    validateStatus={formService.getValidationStatus<PurchaseOrderCondition>(model.errors, nameof(model.used))}
                                                                    message={ model.errors?.used }>
                                                                    <Switch size='small'
                                                                            onChange={onChangeSimpleField(nameof(model.used))}
                                                                            checked={ model.used } />
                                                        </FormItem>
                                                    </Col>
                                                    

                                                    <Col lg={12} className='pr-3'>
                                                        <FormItem label={translate("purchaseOrderConditions.purchaseOrder")}
                                                                    validateStatus={formService.getValidationStatus<PurchaseOrderCondition>(model.errors, nameof(model.purchaseOrder))}
                                                                    message={ model.errors?.purchaseOrder } >
                                                            <Select isMaterial={true}
                                                                classFilter={ PurchaseOrderFilter }
                                                                placeHolder={translate("purchaseOrderConditions.placeholder.purchaseOrder")}
                                                                getList={ purchaseOrderConditionRepository.singleListPurchaseOrder }
                                                                onChange={onChangeObjectField(nameof(model.purchaseOrder))}
                                                                model={ model.purchaseOrder } />
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

export default PurchaseOrderConditionDetailModal;