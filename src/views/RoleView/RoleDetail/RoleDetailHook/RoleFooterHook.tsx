import { AxiosError } from "axios";
import { TFunction } from "i18next";
import { Role } from "models/Role";
import React from "react";
import { roleRepository } from "repositories/role-repository";
import appMessageService from "services/app-message-service";

export function useRoleFooterHook(
    translate: TFunction,
    model?: Role,
    handleGoBase?: () => void,
    handleSave?: (item: Role) => () => void,
    isLinkAssginAppUser?: boolean,
) {
    const [loading, setLoading] = React.useState<boolean>(false);

    const { notifyUpdateItemSuccess, notifyUpdateItemError } = appMessageService.useCRUDMessage();
    const handleAssignAppUser = React.useCallback((model) => {
        setLoading(true);
        roleRepository.assignAppUser(model).subscribe(
            (item: Role) => {
                handleGoBase();
                notifyUpdateItemSuccess();
                setLoading(false);
            },
            (error: AxiosError<Role>) => {
                notifyUpdateItemError();
            });

    }, [handleGoBase, notifyUpdateItemError, notifyUpdateItemSuccess]);
    const childrenAction = React.useMemo(() => {
        return (
            <>
                {isLinkAssginAppUser ?
                    <button
                        className="btn btn-sm component__btn-primary mr-2"
                        onClick={() => handleAssignAppUser(model)}
                    >
                        <span>
                            <i className="tio-save mr-2" /> {translate("general.actions.save")}
                        </span>
                    </button>

                    :
                    <button
                        className="btn btn-sm component__btn-primary mr-2"
                        onClick={handleSave(model)}
                    >
                        <span>
                            <i className="tio-save mr-2" /> {translate("general.actions.save")}
                        </span>
                    </button>
                }
                <button
                    className="btn btn-sm component__btn-cancel mr-2"
                    onClick={handleGoBase}
                >
                    <span>
                        <i className="tio-clear_circle_outlined"></i>{" "}
                        {translate("general.button.cancel")}
                    </span>
                </button>
            </>
        );
    }, [
        handleAssignAppUser,
        handleGoBase,
        handleSave,
        isLinkAssginAppUser,
        model,
        translate,
    ]);

    return {
        childrenAction,
        loading,
    };
}
