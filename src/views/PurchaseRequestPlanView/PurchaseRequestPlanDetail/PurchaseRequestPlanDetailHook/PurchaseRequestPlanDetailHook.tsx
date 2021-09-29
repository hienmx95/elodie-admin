import { Model } from "@react3l/react3l/core/model";
import { PurchaseRequestPlan } from "models/PurchaseRequestPlan";
import { DataNode } from "rc-tree/lib/interface";
import React, { useMemo } from "react";
import { Observable, Subscription } from "rxjs";
import { queryStringService } from "services/query-string-service";

export function usePurchaseRequetPlanDraft<T extends Model>(
  getDraft: () => Observable<T>,
  initData: T,
  handleUpdateNewModel?: (data: PurchaseRequestPlan) => void
) {
  // get id from url
  const { id }: any = queryStringService.useGetQueryString("id");
  // navigating master when update or create successfully

  const isDetail = useMemo(
    () => (id?.toString().match(/^[0-9]+$/) ? true : false), // check if id is number
    [id]
  );

  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const subscription: Subscription = new Subscription();
    if (!isDetail && loading) {
      subscription.add(
        getDraft().subscribe((model: PurchaseRequestPlan) => {
          model.organization = initData?.organization;
          model.organizationId = initData?.organizationId;
          model.mainCurrency = initData?.mainCurrency;
          model.mainCurrencyId = initData?.mainCurrencyId;
          handleUpdateNewModel(model);
          setLoading(false);
        })
      );
    }

    return function cleanup() {
      subscription.unsubscribe();
    };
  }, [getDraft, handleUpdateNewModel, id, initData, isDetail, loading]);
}

export class CategoryNode<T extends Model> implements DataNode {
  public title: string;
  public key: number;
  public item: Model;
  public children: CategoryNode<T>[];
  public quota: number;
  public hasEntered: boolean;

  constructor(model?: T) {
    if (model) {
      this.key = model.categoryId;
      this.item = { ...model.category };
      this.children = [];
      this.title = model.category.name;
      this.quota = model.quota;
      this.hasEntered = model.hasEntered;
    } else {
      this.title = "";
      this.key = null;
      this.children = [];
      this.item = {};
      this.quota = null;
      this.hasEntered = false;
    }
  }
}

export function buildTreeItem<T extends Model>(
  listItem: T[],
  parent?: CategoryNode<T>,
  keyNodes?: number[],
  tree?: CategoryNode<T>[]
): [CategoryNode<T>[], number[]] {
  tree = typeof tree !== "undefined" ? tree : [];
  parent = typeof parent !== "undefined" ? parent : new CategoryNode();
  keyNodes = typeof keyNodes !== "undefined" ? keyNodes : [];
  if (listItem && listItem?.length > 0) {
    var children = listItem
      .filter((child) => {
        return child.parentCategoryId === parent.key;
      })
      .map((currentItem) => new CategoryNode(currentItem));

    if (children && children.length) {
      if (parent.key === null) {
        tree = children;
      } else {
        parent.children = children;
        keyNodes.push(parent.key);
      }
      children.forEach((child) => {
        buildTreeItem(listItem, child, keyNodes);
      });
    }
  }

  return [tree, keyNodes];
}
