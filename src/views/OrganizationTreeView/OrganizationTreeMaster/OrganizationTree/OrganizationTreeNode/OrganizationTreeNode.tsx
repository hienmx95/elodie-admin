import { Model } from "@react3l/react3l/core";
import { Tooltip } from "antd";
import classNames from "classnames";
import { API_ORGANIZATION_PREFIX } from "config/api-consts";
import React, { ReactElement, ReactNode } from "react";
import authenticationService from "services/authentication-service";
import OrganizationTree from "../OrganizationTree";
import "./OrganizationTreeNode.scss";

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

  onChangeDisplay?: (node: T) => void;

  render?(node: T): ReactNode;

  currentItem?: any;
}

function OrganizationTreeNode<T extends Model>(props: TreeNodeProps<T>) {
  const {
    node,
    onAdd,
    onPreview,
    onDelete,
    onEdit,
    onActive,
    onChangeDisplay,
    children,
    nodeLevel,
    nodePadding,
    currentItem,
  } = props;
  const { validAction } = authenticationService.useAction(
    "organization",
    API_ORGANIZATION_PREFIX
  );

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
        <div className="tree-content-wrapper" style={{ alignItems: "center" }}>
          {node?.title?.length > 50 && (
            <Tooltip placement="topLeft" title={node?.title}>
              <div className=" w-100" onClick={() => handleClick(node)}>
                {handleSliceName(node?.title)}{" "}
              </div>
            </Tooltip>
          )}
          {node?.title?.length <= 50 && (
            <div className="w-100" onClick={() => handleClick(node)}>
              {node?.title}{" "}
            </div>
          )}

          {validAction("updateIsDisplay") && (
            <div
              className="actions mb-2"
              style={{
                right: "10px",
                position: "absolute",
              }}
            >
              {typeof onPreview === "function" && (
                <i
                  role="button"
                  className="tio-visible_outlined color-primary "
                  onClick={onPreview(node)}
                />
              )}
              {typeof onAdd === "function" && (
                //   validAction("create") &&
                <i
                  role="button"
                  className="tio-add color-primary"
                  onClick={onAdd(node?.item?.id)}
                />
              )}
              {typeof onEdit === "function" && (
                //   validAction("update") &&
                <i
                  role="button"
                  className="tio-edit color-primary "
                  onClick={onEdit(node?.item?.id)}
                />
              )}
              {typeof onDelete === "function" && !hasChildren && (
                // validAction("delete") &&
                <i
                  role="button"
                  className="tio-delete_outlined color-primary"
                  onClick={onDelete(node?.item)}
                />
              )}
              {/* <Switch
                                checked={node?.item.isDisplay ? true : false}
                                size={'small'}
                                onChange={() => onChangeDisplay(node?.item)}
                                className="mt-1"
                            /> */}

              {children}
            </div>
          )}
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
          <OrganizationTree
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
            onChangeDisplay={onChangeDisplay}
            nodeLevel={nodeLevel + 1}
            nodePadding={nodePadding}
            currentItem={currentItem}
          />
        </li>
      )}
    </>
  );
}

OrganizationTreeNode.defaultProps = {
  nodeLevel: 0,
  nodePadding: 12,
  render<T extends Model>(node: T) {
    return node.tile;
  },
};

export default OrganizationTreeNode;
