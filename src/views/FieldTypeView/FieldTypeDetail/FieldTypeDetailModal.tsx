/* begin general import */
import React, { useContext, Dispatch } from "react";
import nameof from "ts-nameof.macro";
import { Card, Col, Row, Tabs } from "antd";
import { useTranslation } from "react-i18next";
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
import InputText from "components/Utility/Input/InputText/InputText";
import { FieldType } from 'models/FieldType';
import { appUserRepository } from 'repositories/app-user-repository';
/* end individual import */

const { TabPane } = Tabs;

interface FieldTypeDetailModalProps extends ModalProps {
  model: FieldType;
  onChangeSimpleField: (fieldName: string) => (fieldValue: any) => void;
  onChangeObjectField?: (
    fieldName: string,
  ) => (fieldIdValue: number, fieldValue?: any) => void;
  onChangeTreeObjectField?: (
    fieldName: string,
    callback?: (id: number) => void,
  ) => (list: any[]) => void;
  dispatchModel?: React.Dispatch<FormDetailAction<FieldType>>;
  loading?: boolean;
}

function FieldTypeDetailModal(props: FieldTypeDetailModalProps) {
    const [state] = useContext<[AppState, Dispatch<AppAction>
    ]>(AppStoreContext);

    const [translate] = useTranslation();

    const {
        model,
        onChangeSimpleField,
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
                                        {translate("fieldTypes.detail.title")}
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
                                                        <FormItem label={translate("fieldTypes.code")}
                                                                    validateStatus={formService.getValidationStatus<FieldType>(model.errors, nameof(model.code))}
                                                                    message={ model.errors?.code }>
                                                                    <InputText isMaterial={true}
                                                                                value={ model.code }
                                                                                placeHolder={translate("fieldTypes.placeholder.code")}
                                                                                className={"tio-account_square_outlined"}
                                                                                onChange={onChangeSimpleField(nameof(model.code))} />
                                                        </FormItem>
                                                    </Col>
                                                    

                                                    <Col lg={12} className='pr-3'>
                                                        <FormItem label={translate("fieldTypes.name")}
                                                                    validateStatus={formService.getValidationStatus<FieldType>(model.errors, nameof(model.name))}
                                                                    message={ model.errors?.name }>
                                                                    <InputText isMaterial={true}
                                                                                value={ model.name }
                                                                                placeHolder={translate("fieldTypes.placeholder.name")}
                                                                                className={"tio-account_square_outlined"}
                                                                                onChange={onChangeSimpleField(nameof(model.name))} />
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

export default FieldTypeDetailModal;