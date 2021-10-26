import { Model } from "@react3l/react3l/core";
import { AppUser } from "models/AppUser";
import React, { Dispatch, SetStateAction } from "react";
export function useAppUserDetailHook(
  model?: AppUser,
  setModel?: Dispatch<SetStateAction<Model>>
) {

  const handleChangeAvatar = React.useCallback(
    (values) => {
      model.avatar = values[0];
      setModel({...model});
    },
    [setModel, model]
  );

  const [addNew, setAddNew] = React.useState<boolean>(true);

  React.useEffect(() => {
    // if (isEdit && model.id) {
    //   if (model.id) {
    //     setDisplay(model.customerTypeId === 1 ? false : true);
    //   }
    //   setIsEdit(false);
    // }

    if (addNew) {
      model.statusId = 1;
      model.status = { id: 1, name: "Hoạt động" };
      model.sex = { name: "Nữ", id: 2 };
      model.sexId = 2;
      setModel({ ...model });
      setAddNew(false);
    }
  }, [addNew, setModel, setAddNew, model]);

  return {
    handleChangeAvatar,
  };
}
