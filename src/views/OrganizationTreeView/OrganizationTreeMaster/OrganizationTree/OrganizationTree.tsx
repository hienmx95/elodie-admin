import { TreeProps as AntTreeProps } from "antd/lib/tree";
import { Model } from "@react3l/react3l/core";
import classNames from "classnames";
import React, { ReactElement } from "react";
import "./OrganizationTree.scss";
import OrganizationTreeNode from "./OrganizationTreeNode/OrganizationTreeNode";

export interface TreeProps<T> extends AntTreeProps {
    className?: string;

    parent?: T;

    tree?: T[];

    nodePadding?: number;

    children?: ReactElement<any> | ReactElement<any>[];

    nodeLevel?: number;

    onAdd?(node: T): () => void;

    onChange?(value: T[]): void;

    onDelete?(node: T): () => void;

    onEdit?(node: T): () => void;

    onPreview?(node: T): () => void;

    onActive?(node: T): void;

    onChangeDisplay?: (node: T) => void;
    currentItem?: any;

    component?: string;

    api?: string;
}

function OrganizationTree<T extends Model>(props: TreeProps<T>) {
    const {
        tree,
        className,
        onAdd,
        onEdit,
        onPreview,
        onDelete,
        onActive,
        onChangeDisplay,
        nodeLevel,
        nodePadding,
        children,
        currentItem,
    } = props;

    return (
        <ul className={classNames("organization__tree",
            className)}>
            {typeof children === "object" ? (
                children
            ) : (
                <>
                    {tree?.map((node: T, index) => {

                        return (
                            <OrganizationTreeNode
                                {...props}
                                key={index}
                                node={node}
                                onAdd={onAdd}
                                onPreview={onPreview}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                onActive={onActive}
                                onChangeDisplay={onChangeDisplay}
                                nodeLevel={nodeLevel}
                                nodePadding={nodePadding}
                                currentItem={currentItem}
                                className={classNames({ 'tree-active': node === currentItem })}
                            ></OrganizationTreeNode>
                        );
                    })}
                </>
            )}
        </ul>
    );
}

OrganizationTree.defaultProps = {
    nodePadding: 12,
    nodeLevel: 0,
};

export default OrganizationTree;
