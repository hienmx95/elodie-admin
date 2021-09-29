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
import { Switch } from "antd";
import InputText from "components/Utility/Input/InputText/InputText";
import Select from "components/Utility/Select/Select";
import { Field } from 'models/Field';
import { appUserRepository } from 'repositories/app-user-repository';
import { fieldRepository } from "repositories/field-repository";
import { FieldTypeFilter } from 'models/FieldType';
import { MenuFilter } from 'models/Menu';
/* end individual import */

const { TabPane } = Tabs;

interface FieldDetailModalProps extends ModalProps {
  model: Field;
  onChangeSimpleField: (fieldName: string) => (fieldValue: any) => void;
  onChangeObjectField?: (
    fieldName: string,
  ) => (fieldIdValue: number, fieldValue?: any) => void;
  onChangeTreeObjectField?: (
    fieldName: string,
    callback?: (id: number) => void,
  ) => (list: any[]) => void;
  dispatchModel?: React.Dispatch<FormDetailAction<Field>>;
  loading?: boolean;
}

function FieldDetailModal(props: FieldDetailModalProps) {
    const [state] = useContext<[AppState, Dispatch<AppAction>
    ]>(AppStoreContext);

    const [translate] = useTranslation();

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
                                        {translate("fields.detail.title")}
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
                                                        <FormItem label={translate("fields.name")}
                                                                    validateStatus={formService.getValidationStatus<Field>(model.errors, nameof(model.name))}
                                                                    message={ model.errors?.name }>
                                                                    <InputText isMaterial={true}
                                                                                value={ model.name }
                                                                                placeHolder={translate("fields.placeholder.name")}
                                                                                className={"tio-account_square_outlined"}
                                                                                onChange={onChangeSimpleField(nameof(model.name))} />
                                                        </FormItem>
                                                    </Col>
                                                    



                                                    <Col lg={12} className='pr-3'>
                                                        <FormItem label={translate("fields.isDeleted")}
                                                                    validateStatus={formService.getValidationStatus<Field>(model.errors, nameof(model.isDeleted))}
                                                                    message={ model.errors?.isDeleted }>
                                                                    <Switch size='small'
                                                                            onChange={onChangeSimpleField(nameof(model.isDeleted))}
                                                                            checked={ model.isDeleted } />
                                                        </FormItem>
                                                    </Col>
                                                    

                                                    <Col lg={12} className='pr-3'>
                                                        <FormItem label={translate("fields.fieldType")}
                                                                    validateStatus={formService.getValidationStatus<Field>(model.errors, nameof(model.fieldType))}
                                                                    message={ model.errors?.fieldType } >
                                                            <Select isMaterial={true}
                                                                classFilter={ FieldTypeFilter }
                                                                placeHolder={translate("fields.placeholder.fieldType")}
                                                                getList={ fieldRepository.singleListFieldType }
                                                                onChange={onChangeObjectField(nameof(model.fieldType))}
                                                                model={ model.fieldType } />
                                                        </FormItem>
                                                    </Col>

                                                    <Col lg={12} className='pr-3'>
                                                        <FormItem label={translate("fields.menu")}
                                                                    validateStatus={formService.getValidationStatus<Field>(model.errors, nameof(model.menu))}
                                                                    message={ model.errors?.menu } >
                                                            <Select isMaterial={true}
                                                                classFilter={ MenuFilter }
                                                                placeHolder={translate("fields.placeholder.menu")}
                                                                getList={ fieldRepository.singleListMenu }
                                                                onChange={onChangeObjectField(nameof(model.menu))}
                                                                model={ model.menu } />
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

export default FieldDetailModal;