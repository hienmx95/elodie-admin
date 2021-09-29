import { PrincipalContract } from "models/PrincipalContract";
import { PrincipalContractContent } from "models/PrincipalContractContent";
import React from "react";

export function useCategoryConfirm(
  model: PrincipalContract,
  setModel: (data: PrincipalContract) => void,
  handleChangeAllRowPricipalContractContent: (
    principalContractContents: PrincipalContractContent[]
  ) => void
) {
  const [visibleConfirm, setVisibleConfirm] = React.useState<boolean>(false);
  const [tree, setTree] = React.useState<any>();

  const confirm = React.useCallback(() => {
    handleChangeAllRowPricipalContractContent([]);
    model.category = tree;
    model.categoryId = tree?.id;
    model.principalContractContents = [];
    setModel({ ...model });
    setVisibleConfirm(false);
  }, [handleChangeAllRowPricipalContractContent, model, setModel, tree]);

  const cancel = React.useCallback(() => {
    setVisibleConfirm(false);
  }, []);

  const openCategoryConfirm = React.useCallback((treeObject: any) => {
    setVisibleConfirm(true);
    setTree(treeObject);
  }, []);

  return {
    visibleConfirm,
    confirm,
    cancel,
    openCategoryConfirm,
  };
}
