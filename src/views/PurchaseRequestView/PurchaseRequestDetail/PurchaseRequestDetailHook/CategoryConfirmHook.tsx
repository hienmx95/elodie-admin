import { PurchaseRequest } from "models/PurchaseRequest";
import { PurchaseRequestContent } from "models/PurchaseRequestContent";
import React from "react";

export function useCategoryConfirm(
  model: PurchaseRequest,
  setModel: (data: PurchaseRequest) => void,
  handleChangeAllRowPurchaseRequestContent: (
    purchaseRequestContents: PurchaseRequestContent[]
  ) => void
) {
  const [visibleConfirm, setVisibleConfirm] = React.useState<boolean>(false);
  const [tree, setTree] = React.useState<any>();

  const confirm = React.useCallback(() => {
    handleChangeAllRowPurchaseRequestContent([]);
    setVisibleConfirm(false);
    model.category = tree;
    model.categoryId = tree?.id;
    model.purchaseRequestContents = [];
    setModel({ ...model });
  }, [handleChangeAllRowPurchaseRequestContent, model, setModel, tree]);

  const cancel = React.useCallback(() => {
    setVisibleConfirm(false);
  }, []);

  const openCategoryConfirm = React.useCallback((tree: any) => {
    setVisibleConfirm(true);
    setTree(tree);
  }, []);

  return {
    visibleConfirm,
    confirm,
    cancel,
    openCategoryConfirm,
  };
}
