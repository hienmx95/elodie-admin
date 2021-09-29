/* begin general import */
import { Model } from '@react3l/react3l/core/model';
import { Popconfirm, Row } from 'antd';
import Table, { ColumnProps } from 'antd/lib/table';
import { AxiosError } from 'axios';
import FormItem from 'components/Utility/FormItem/FormItem';
import Modal from 'components/Utility/Modal/Modal';
import Select from 'components/Utility/Select/Select';
import { renderMasterIndex } from 'helpers/table';
import { TFunction } from 'i18next';
/* end general import */
/* begin individual import */
import { AppUser } from 'models/AppUser';
import { AppUserRoleMapping } from 'models/AppUserRoleMapping';
import { Role, RoleFilter } from 'models/Role';
import React, { useCallback, useState } from "react";
import { appUserRepository } from 'repositories/app-user-repository';
import appMessageService from 'services/app-message-service';
import { formService } from 'services/form-service';
import nameof from "ts-nameof.macro";
/* end individual import */

export function appUserRoleMappingHook(
    setLoadList: () => void,
): {
    visible: boolean,
    appUser: AppUser,
    handleOpenRoleView: (id: number) => void,
    handleCloseRoleView: () => void,
    handleSaveRole: (selected: Role) => void,
} {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [appUser, setAppUser] = useState<AppUser>(new AppUser());
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [visible, setVisible] = useState<boolean>(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const handleOpenRoleView = useCallback(
        (id: number) => {
            appUserRepository.get(id).subscribe(user => {
                setAppUser(user);
                setVisible(true);
            });

        },
        [],
    );
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const handleCloseRoleView = React.useCallback(() => {
        setVisible(false);
    }, []);

    const {
        notifyUpdateItemSuccess,
        notifyUpdateItemError,
    } = appMessageService.useCRUDMessage();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const handleSaveRole = useCallback(
        list => {
            if (appUser?.appUserRoleMappings) {

                if (list && list?.length > 0) {
                    const listRoleIds = list.map(role => role.id);
                    const usedRoleIds = appUser.appUserRoleMappings.map(
                        content => content.roleId,
                    );
                    list.forEach((i: Role) => {
                        const content = new AppUserRoleMapping();
                        content.role = i;
                        content.roleId = i?.id;
                        if (appUser.appUserRoleMappings.length > 0) {
                            // add unused role
                            if (!usedRoleIds.includes(i.id)) {
                                appUser.appUserRoleMappings.push(content);
                            }
                        } else {
                            appUser.appUserRoleMappings.push(content);
                        }
                    });
                    // remove content which used removed role
                    const newContents = appUser.appUserRoleMappings.filter(content =>
                        listRoleIds.includes(content.roleId),
                    );
                    appUser.appUserRoleMappings = newContents;
                    setAppUser(appUser);
                } else {
                    // if no store selected, remove all contents
                    appUser.appUserRoleMappings = [];
                    setAppUser({
                        ...appUser,
                    });
                }
                appUserRepository
                    .updateRole(appUser)
                    .subscribe(
                        (item => {
                            setAppUser({ ...item });
                            setTimeout(() => {
                                notifyUpdateItemSuccess();
                            }, 0);
                            setVisible(false);
                            setLoadList();
                        }),
                        ((error: AxiosError<AppUser>) => {
                            if (error.response && error.response.status === 400) {
                                setAppUser(error.response?.data);
                            }
                            notifyUpdateItemError();


                        })
                    );
            }


        }, [appUser, notifyUpdateItemError, notifyUpdateItemSuccess, setLoadList]);
    return {
        visible,
        appUser,
        handleOpenRoleView,
        handleCloseRoleView,
        handleSaveRole,

    };
};

interface AppUserRoleMappingViewProps<T extends Model> {
    model?: T;
    isOpenPreview?: boolean;
    isLoadingPreview?: boolean;
    handleClosePreview?: () => void;
    onSave?: (selectedList: Role[]) => void;
    translate?: TFunction;
};

export function AppUserRoleMappingView(props: AppUserRoleMappingViewProps<AppUser>
) {

    const {
        model,
        isOpenPreview,
        handleClosePreview,
        onSave,
        translate,
    } = props;
    const [role, setRole] = React.useState<Role>(new Role());
    const [selectedList, setSelectedList] = React.useState<Role[]>([]);
    const [roleFilter, setRoleFilter] = React.useState<RoleFilter>(new RoleFilter());
    const [isRole, setIsRole] = React.useState<boolean>(true);
    const ref = React.useRef<boolean>(true);

    React.useEffect(() => {

        if (isOpenPreview) {
            if (isRole) {
                setRole(new Role());
                setIsRole(false);
            }
            if (ref.current) {
                if (model?.appUserRoleMappings && model?.appUserRoleMappings.length > 0) {
                    const selected = model?.appUserRoleMappings.map((item: Role) => item?.role);
                    setSelectedList(selected);
                    const ids = selected.map(role => role.id);
                    roleFilter.id.notIn = ids;
                    setRoleFilter({ ...roleFilter });
                    ref.current = false;

                } else {
                    setSelectedList([]);
                    ref.current = false;
                }
            }
        } else {
            ref.current = true;
        }
    }, [
        isOpenPreview,
        model,
        setSelectedList,
        model.appUserRoleMappings,
        roleFilter,
        isRole,
        selectedList,
    ]);
    const hanldeChangeMappingRole = React.useCallback((valueId, valueObject) => {
        setRole(valueObject);

    }, []);

    const handleAddRole = React.useCallback(
        () => {
            if (role?.id !== undefined) {
                const ids = selectedList.map(role => role.id);
                if (!ids.includes(role.id)) {
                    selectedList.push(role);
                    setSelectedList([...selectedList]);
                }
                roleFilter.id.notIn = ids;
                setRoleFilter({ ...roleFilter });
                setRole(new Role());
            }
        }, [role, selectedList, roleFilter]);

    const handleDeleteItem = React.useCallback((index: number) => {
        if (index > -1) {
            selectedList.splice(index, 1);
        }
        setSelectedList([...selectedList]);
        setRole(new Role());
    }, [selectedList]);
    const handleSave = React.useCallback(() => {
        if (typeof onSave === 'function') {
            setRole(new Role());
            onSave(selectedList);
        }
    }, [onSave, selectedList]);

    const columns: ColumnProps<Role>[] = React.useMemo(() => {
        return [
            {
                title: (<div className='text-left gradient-text'>{translate("general.columns.index")}</div>),
                key: "index",
                width: 70,
                render: renderMasterIndex<Role>(),
            },
            {
                title: (<div className='text-left gradient-text'>{translate("appUsers.roles.code")}</div>),
                key: nameof(selectedList[0].code),
                dataIndex: nameof(selectedList[0].code),

                ellipsis: true,
            },
            {
                title: (<div className='text-left gradient-text'>{translate("appUsers.roles.name")}</div>),
                key: nameof(selectedList[0].name),
                dataIndex: nameof(selectedList[0].name),
                ellipsis: true,
            },
            {
                title: (<div className='text-center gradient-text'>{translate("general.actions.label")}</div>),
                key: "action",
                dataIndex: nameof(selectedList[0].id),
                fixed: "right",
                width: 150,
                align: "center",
                render(...[, , index]) {
                    return (
                        <div className="d-flex justify-content-center button-action-table">
                            <Popconfirm
                                placement="top"
                                title={translate('general.delete.content')}
                                onConfirm={() => handleDeleteItem(index)}
                                okText={translate('general.actions.delete')}
                                cancelText={translate('general.actions.cancel')}
                            >
                                <button className="btn btn-sm ">
                                    <i className="tio-delete_outlined text-danger" />
                                </button>
                            </Popconfirm>
                        </div>
                    );
                },
            },
        ];
    }, [handleDeleteItem, selectedList, translate]);

    return <>
        <Modal
            title={null}
            visible={isOpenPreview}
            handleCancel={handleClosePreview}
            width={1200}

            visibleFooter={false}>
            {
                <div className="preview__containter">
                    <div className="preview__left-side">
                        <div className="preview__header">
                            <div className="preview__vertical-bar"></div>
                            <div className="preview__header-info">
                                <div className="preview__header-text">
                                    <span className="preview__header-title mt-2">{translate('appUsers.addRole')}</span>
                                </div>

                            </div>
                        </div>
                        <div className="preview__body">
                            <div className="preview__content">
                                <div className="d-flex w-50 mt-2">
                                    <FormItem
                                        validateStatus={formService.getValidationStatus<
                                            AppUser
                                        >(model.errors, nameof(model.role))}
                                        message={model.errors?.role}
                                    >
                                        <Select
                                            isMaterial={true}
                                            classFilter={RoleFilter}
                                            placeHolder={translate("appUsers.placeholder.role")}
                                            getList={appUserRepository.listRole}
                                            onChange={hanldeChangeMappingRole}
                                            model={role}
                                            modelFilter={roleFilter}
                                        />
                                    </FormItem>
                                    <button
                                        className="btn btn-sm component__btn-primary ml-3"
                                        onClick={handleAddRole}
                                    >
                                        <i className="fa mr-2 fa-plus" />
                                        {translate('appUsers.roles.add')}
                                    </button>
                                </div>

                                <Row>

                                    <Table
                                        key={selectedList[0]?.id}
                                        tableLayout="fixed"
                                        columns={columns}
                                        dataSource={selectedList}
                                        pagination={false}
                                        rowKey={nameof(selectedList[0].id)}
                                        className=" mt-4"
                                        scroll={{ y: 500 }}
                                    />
                                </Row>
                            </div>

                        </div>
                        <div className="preview__footer d-flex justify-content-between">
                            <button className="btn btn-sm component__btn-primary mr-2" onClick={handleSave}>
                                <span>
                                    <i className="tio-save mr-2"></i>{" "}
                                    {translate("general.actions.save")}
                                </span>
                            </button>
                            <button
                                className="btn btn-cancel"
                                onClick={handleClosePreview}
                            >
                                <span>
                                    <i className="tio-clear_circle_outlined"></i> Đóng
                                    </span>
                            </button>
                        </div>
                    </div>

                </div>
            }
        </Modal>
    </>;
}

export default AppUserRoleMappingView;
