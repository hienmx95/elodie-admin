import { AxiosError } from "axios";
import { TFunction } from "i18next";
import React from "react";
import { appUserRepository } from "repositories/app-user-repository";
import appMessageService from "services/app-message-service";
import { ChangePassword } from "./AppUserChangePassword";

export function AppUserChangePasswordHook(
  id?: number,
  translate?: TFunction,
  handleClosePanel?: () => void
) {
  const [model, setModel] = React.useState<ChangePassword>(
    new ChangePassword()
  );

  const {
    notifyUpdateItemSuccess,
    notifyUpdateItemError,
  } = appMessageService.useCRUDMessage();

  const [isCheck, setIsCheck] = React.useState<boolean>(false);

  const handleChangePassWord = React.useCallback(() => {
    return (value) => {
      model.newPassword = value;
      model.reNewpassword = null;
      setIsCheck(false);
      setModel({ ...model });
    };
  }, [setModel, model]);

  const handleChangePassWordRe = React.useCallback(() => {
    return (value) => {
      if (model.newPassword === value) {
        setIsCheck(true);
        setModel({ ...model, reNewpassword: value, errors: null });
      } else {
        setIsCheck(false);
        setModel({
          ...model,
          errors: { reNewpassword: translate("appUsers.errorWritePassword") },
        });
      }
    };
  }, [setModel, translate, model]);

  const closePanel = React.useCallback(() => {
    handleClosePanel();
    setModel(new ChangePassword());
  }, [handleClosePanel, setModel]);

  const handleSave = React.useCallback(() => {
    appUserRepository
      .changePassword({ id: id, newPassword: model.newPassword })
      .subscribe(
        () => {
          closePanel();
          notifyUpdateItemSuccess(); // global message service go here
        },
        (error: AxiosError<any>) => {
          if (error.response && error.response.status === 400) {
            setModel(error.response?.data); // setModel for catching error
          }
          notifyUpdateItemError(); // global message service go here
        }
      );
  }, [
    model,
    notifyUpdateItemError,
    notifyUpdateItemSuccess,
    id,
    closePanel,
  ]);

  return {
    model,
    handleChangePassWord,
    handleChangePassWordRe,
    isCheck,
    handleSave,
    closePanel,
  };
}
