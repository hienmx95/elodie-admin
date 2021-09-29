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
import { Menu } from 'models/Menu';
import { appUserRepository } from 'repositories/app-user-repository';
import { menuRepository } from "repositories/menu-repository";
/* end individual import */

const { TabPane } = Tabs;

interface MenuDetailModalProps extends ModalProps {
  model: Menu;
  onChangeSimpleField: (fieldName: string) => (fieldValue: any) => void;
  onChangeObjectField?: (
    fieldName: string,
  ) => (fieldIdValue: number, fieldValue?: any) => void;
  onChangeTreeObjectField?: (
    fieldName: string,
    callback?: (id: number) => void,
  ) => (list: any[]) => void;
  dispatchModel?: React.Dispatch<FormDetailAction<Menu>>;
  loading?: boolean;
}

function MenuDetailModal(props: MenuDetailModalProps) {
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
                                        {translate("menus.detail.title")}
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
                                                        <FormItem label={translate("menus.code")}
                                                                    validateStatus={formService.getValidationStatus<Menu>(model.errors, nameof(model.code))}
                                                                    message={ model.errors?.code }>
                                                                    <InputText isMaterial={true}
                                                                                value={ model.code }
                                                                                placeHolder={translate("menus.placeholder.code")}
                                                                                className={"tio-account_square_outlined"}
                                                                                onChange={onChangeSimpleField(nameof(model.code))} />
                                                        </FormItem>
                                                    </Col>
                                                    

                                                    <Col lg={12} className='pr-3'>
                                                        <FormItem label={translate("menus.name")}
                                                                    validateStatus={formService.getValidationStatus<Menu>(model.errors, nameof(model.name))}
                                                                    message={ model.errors?.name }>
                                                                    <InputText isMaterial={true}
                                                                                value={ model.name }
                                                                                placeHolder={translate("menus.placeholder.name")}
                                                                                className={"tio-account_square_outlined"}
                                                                                onChange={onChangeSimpleField(nameof(model.name))} />
                                                        </FormItem>
                                                    </Col>
                                                    

                                                    <Col lg={12} className='pr-3'>
                                                        <FormItem label={translate("menus.path")}
                                                                    validateStatus={formService.getValidationStatus<Menu>(model.errors, nameof(model.path))}
                                                                    message={ model.errors?.path }>
                                                                    <InputText isMaterial={true}
                                                                                value={ model.path }
                                                                                placeHolder={translate("menus.placeholder.path")}
                                                                                className={"tio-account_square_outlined"}
                                                                                onChange={onChangeSimpleField(nameof(model.path))} />
                                                        </FormItem>
                                                    </Col>
                                                    

                                                    <Col lg={12} className='pr-3'>
                                                        <FormItem label={translate("menus.isDeleted")}
                                                                    validateStatus={formService.getValidationStatus<Menu>(model.errors, nameof(model.isDeleted))}
                                                                    message={ model.errors?.isDeleted }>
                                                                    <Switch size='small'
                                                                            onChange={onChangeSimpleField(nameof(model.isDeleted))}
                                                                            checked={ model.isDeleted } />
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

export default MenuDetailModal;