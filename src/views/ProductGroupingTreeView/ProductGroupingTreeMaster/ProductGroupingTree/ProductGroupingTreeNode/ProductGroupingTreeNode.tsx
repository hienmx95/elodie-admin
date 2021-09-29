import { Tooltip, Menu, Dropdown } from "antd";
import classNames from "classnames";
import { Model } from "@react3l/react3l/core";
import React, { ReactElement, ReactNode } from "react";
import ProductGroupingTree from "../ProductGroupingTree";
import "./ProductGroupingTreeNode.scss";
import { useTranslation } from "react-i18next";
import authenticationService from "services/authentication-service";
import { API_PRODUCT_GROUPING_PREFIX } from "config/api-consts";

export interface TreeNodeProps<T extends Model> {
  className?: string;

  node?: T;

  nodeLevel?: number;

  nodePadding?: number;

  children?: ReactElement<any> | ReactElement<any>[];

  onPreview?(node: T): () => void;

  onAdd?(node: T): () => void;

  onEdit?(node: T): () => void;

  onDelete?(node: T): () => void;

  onActive?(node: T): void;

  onChange?(value: T[]): void;

  render?(node: T): ReactNode;

  currentItem?: any;
}

function ProductGroupingTreeNode<T extends Model>(props: TreeNodeProps<T>) {
  const {
    node,
    onAdd,
    onPreview,
    onDelete,
    onEdit,
    onActive,
    children,
    nodeLevel,
    nodePadding,
    currentItem,
  } = props;

  const [translate] = useTranslation();
  const { validAction } = authenticationService.useAction('productGrouping', API_PRODUCT_GROUPING_PREFIX);
  const hasChildren: boolean = node?.children?.length > 0;

  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);

  const handleToggle = React.useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  const handleClick = React.useCallback(
    (nodeItem) => {
      if (onActive) {
        onActive(nodeItem?.item);
      }
    },
    [onActive]
  );

  const handleSliceName = React.useCallback((name: string) => {
    if (name.length > 50) {
      return name.slice(0, 50) + "...";
    } else {
      return name;
    }
  }, []);

  const menu = React.useCallback(
    () => (
      <Menu>
        <Menu.Item key="1">
          <Tooltip title={translate("general.actions.view")}>

            <div className="ant-action-menu" onClick={onPreview(node?.item?.id)}>Xem</div>
          </Tooltip>
        </Menu.Item>
        {validAction('update') &&
          <Menu.Item key="2">
            <Tooltip title={translate("general.actions.edit")}>
              <div className="ant-action-menu" onClick={onEdit(node?.item)}>Sửa</div>
            </Tooltip>
          </Menu.Item>
        }
        {validAction('delete') &&
          <Menu.Item key="3">
            <Tooltip title={translate("general.actions.delete")}>
              <div className="ant-action-menu" onClick={onDelete(node?.item)}>Xóa</div>
            </Tooltip>
          </Menu.Item>

        }
        {validAction('create') &&
          <Menu.Item key="4">
            <Tooltip title={translate("general.actions.create")}>
              <div className="ant-action-menu" onClick={onAdd(node?.item)}>Thêm</div>
            </Tooltip>
          </Menu.Item>
        }
      </Menu>
    ),
    [translate, node, onAdd, onDelete, onEdit, onPreview, validAction]
  );

  return (
    <>
      <li
        className={classNames("tree-item", `tree-item-level-${nodeLevel}`, {
          "tree-active": node.item?.id === currentItem?.id,
          "tree-has-children": hasChildren,
        })}
        style={{
          paddingLeft: `${nodePadding}px`,
          width: `${100 + nodeLevel * 0.11}%`,
          borderRadius: `3px`,
        }}
        key={node?.key}
      >
        <i
          role="button"
          onClick={handleToggle}
          className={classNames("fa mr-2 node-toggler", {
            show: hasChildren,
            "tio-chevron_right": !isExpanded && hasChildren,
            "tio-chevron_down": isExpanded && hasChildren,
          })}
        />
        <div
          className="tree-content-wrapper"

          style={{ alignItems: "center" }}
        >
          {node?.title?.length > 50 && (
            <Tooltip placement="topLeft" title={node?.title}>
              <div className=" w-100" onClick={() => handleClick(node)}> {handleSliceName(node?.title)} </div>
            </Tooltip>
          )}
          {node?.title?.length <= 50 && (
            <div className="w-100" onClick={() => handleClick(node)}> {node?.title} </div>
          )}
          <div
            className="actions mb-2"
            style={{
              right: '10px',
              position: "absolute",
            }}
          >
            <div className="d-flex justify-content-center button-action-table">
              <Dropdown overlay={menu} trigger={["click"]} key={node.id}>
                <span className="action__dots">...</span>
              </Dropdown>
            </div>

            {children}
          </div>
        </div>
      </li>
      {hasChildren && (
        <li
          className={classNames("tree-item")}
          key={
            typeof node.key === "number" ? node.key + 1 : parseInt(node.key) + 1
          }
          style={{
            marginLeft: `${nodePadding + 5}px`,
            width: "unset",
          }}
        >
          <ProductGroupingTree
            {...props}
            key={node.id}
            tree={node.children}
            className={classNames(
              "sub-tree",
              {
                expanded: isExpanded,
              },
              "parent-border"
            )}
            parent={node}
            onAdd={onAdd}
            onEdit={onEdit}
            onPreview={onPreview}
            onDelete={onDelete}
            onActive={onActive}
            nodeLevel={nodeLevel + 1}
            nodePadding={nodePadding}
            currentItem={currentItem}
          />
        </li>
      )}
    </>
  );
}

ProductGroupingTreeNode.defaultProps = {
  nodeLevel: 0,
  nodePadding: 12,
  render<T extends Model>(node: T) {
    return node.tile;
  },
};

export default ProductGroupingTreeNode;
