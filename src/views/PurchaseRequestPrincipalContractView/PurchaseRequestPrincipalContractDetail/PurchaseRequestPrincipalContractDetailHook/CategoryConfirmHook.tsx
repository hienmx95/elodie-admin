import { PurchaseRequestPrincipalContract } from "models/PurchaseRequestPrincipalContract";
import { PurchaseRequestPrincipalContractContent } from "models/PurchaseRequestPrincipalContractContent";
import React from "react";

export function useCategoryConfirm(
  model: PurchaseRequestPrincipalContract,
  setModel: (data: PurchaseRequestPrincipalContract) => void,
  handleChangeAllRowPurchaseRequestPricipalContractContent: (
    purchaseRequestPrincipalContractContents: PurchaseRequestPrincipalContractContent[]
  ) => void
) {
  const [visibleConfirm, setVisibleConfirm] = React.useState<boolean>(false);
  const [tree, setTree] = React.useState<any>();

  const confirm = React.useCallback(() => {
    handleChangeAllRowPurchaseRequestPricipalContractContent([]);
    model.principalContract = tree;
    model.principalContractId = tree?.id;
    model.category = tree?.category;
    model.categoryId = tree?.categoryId;
    model.purchaseRequestContents = [];
    setModel({ ...model });
    setVisibleConfirm(false);
  }, [
    handleChangeAllRowPurchaseRequestPricipalContractContent,
    model,
    setModel,
    tree,
  ]);

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
