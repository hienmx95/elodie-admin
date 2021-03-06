import React, { useCallback, useState } from "react";
import { Product } from "models/Product";
import { VariationGrouping } from "models/VariationGrouping";
import { useTranslation } from "react-i18next";
import { Variation } from "models/Variation";
import { Item } from "models/Item";
import { Modal } from "antd";
import { ItemImageMapping } from "models/ItemImageMapping";

export function useProductVariationHook(
  model: Product,
  setModel: (data: Product) => void
) {
  const [translate] = useTranslation();
  const [visible, setVisible] = useState<boolean>(false);
  const [currentVariationGrouping, setCurrentVariationGrouping] = useState<
    VariationGrouping
  >(new VariationGrouping());
  const [variationGroupings, setVariationGroupings] = useState<
    VariationGrouping[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddVariationGrouping = useCallback(() => {
    setModel(
      Product.clone<Product>({
        ...model,
        variationGroupings: [
          ...(model.variationGroupings ?? []),
          new VariationGrouping(),
        ],
      })
    );
  }, [model, setModel]);
  const handleRemoveVariationGrouping = React.useCallback(
    (index: number) => {


      Modal.confirm({
        title: translate("general.delete.title"),
        content: translate("general.delete.content"),
        // onCancel,
        okType: "danger",
        onOk() {
          model.variationGroupings.splice(index, 1);
          setModel(
            Product.clone<Product>({
              ...model,
            })
          );
          setLoading(false);
        },
      });

    },
    [model, setModel, translate]
  );
  const handleCreateVariation = useCallback(
    (index: number) => {
      setCurrentVariationGrouping(model.variationGroupings[index]);
      setVisible(true);
    },
    [model.variationGroupings]
  );
  const handleCloseVariation = useCallback(() => {
    setVisible(false);
  }, []);
  const handleRemoveVariation = React.useCallback(
    (index, variationGroup) => {
      return (item) => {

        variationGroup.variations.splice(variationGroup.variations.indexOf(item), 1);
        setCurrentVariationGrouping(currentVariationGrouping);
        const indexGroup = model.variationGroupings.indexOf(variationGroup);
        model.variationGroupings[indexGroup] = variationGroup;
        setModel(
          Product.clone<Product>({
            ...model,
          })
        );
      };
    },
    [currentVariationGrouping, model, setModel]
  );

  const handleSaveVariation = useCallback(
    (item) => {
      const index = model.variationGroupings.indexOf(item);
      model.variationGroupings[index] = item;
      setModel(
        Product.clone<Product>({
          ...model,
        })
      ); // update product
      setVisible(false);
    },
    [model, setModel]
  );
  const handleChangeVariationGroupingName = React.useCallback(
    (index: number) => {
      return (value?: string) => {
        const newModel = { ...model };
        newModel.variationGroupings[index].name = value;
        setModel(newModel);
      };
    },
    [model, setModel]
  );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function permutations(choices, callback, prefix = []) {
    if (!choices.length) {
      return callback(prefix);
    }
    // tslint:disable-next-line:prefer-for-of
    for (let c = 0; c < choices[0].variations?.length; c++) {
      permutations(
        choices.slice(1),
        callback,
        prefix.concat(choices[0].variations[c])
      );
    }
  }

  const handleCombine = React.useCallback(
    (salePrice) => {
      model.items = [];
      const { variationGroupings } = model;
      const result: { [key: string]: Item } = {};
      const currentItems: Item[] = model.items;
      const currentItemKeys: { [key: number]: Item } = {};
      currentItems?.forEach((item: Item) => {
        currentItemKeys[item.id] = item;
      });
      permutations(variationGroupings, (prefix) => {
        const key: string = prefix.map((v: Variation) => v.code).join("-");
        const newItem: Item = Item.clone<Item>({
          key,
          productId: model.id,
          product: model,
          name: `${model.name} - ${prefix
            .map((v: Variation) => v.name)
            .join(" - ")}`,
          code: `${prefix.map((v: Variation) => v.code).join("-")}`, // b??? product code v?? m?? n??y ???????c sinh sau khi t???o s???n ph???m
          scanCode: model.scanCode,
          salePrice: model.salePrice,
          retailPrice: model.retailPrice,
          images: [],
          canDelete: true,
        });
        result[key] = newItem;
        return newItem;
      });
      // add new Items to list
      const newItems = [...model.items, ...Object.values(result)];
      setModel(
        Product.clone<Product>({
          ...model,
          items: newItems,
        })
      );
      // setSaveProduct(true);
    },
    [model, permutations, setModel]
  );

  const handleChangeListSimpleField = React.useCallback(
    (field, index) => {
      return (value) => {
        model.items[index][field] = value;

        setModel({
          ...model,
          // items:
        });
      };
    },
    [model, setModel]
  );
  const handleChangeListObjectField = useCallback(
    (field, index) => {
      return (id, value) => {
        model.items[index][field] = value;
        model.items[index][`${field}Id`] = id;
        setModel(
          Product.clone<Product>({
            ...model,
          })
        );
      };
    },
    [model, setModel]
  );
  const handleDeleteItem = React.useCallback(
    (index: number) => {
      return () => {
        setLoading(true);
        Modal.confirm({
          title: translate("general.delete.title"),
          content: translate("general.delete.content"),
          // onCancel,
          okType: "danger",
          onOk() {

            const newModel = { ...model };
            const newModel2 = { ...model };
            newModel.items.splice(index, 1);
            setModel({ ...newModel2, items: [...newModel.items] });
            setLoading(false);
          },
        });
      };
    },
    [model, setModel, translate]
  );

  const handleChangeItemImageMapping = React.useCallback((item, index) => {
    return (values) => {
      const arr = item.itemImageMappings ? item.itemImageMappings : [];
      const mappings = values.map(item => {
        const mapping = new ItemImageMapping();
        mapping.image = item;
        mapping.imageId = item?.id;
        return mapping;
      });
      item.itemImageMappings = [...arr, ...mappings];
      model.items[index] = item;
      setModel(
        Product.clone<Product>({
          ...model,
        })
      );
    };
  }, [model, setModel]);


  return {
    variationGroupings,
    setVariationGroupings,
    currentVariationGrouping,
    setCurrentVariationGrouping,
    handleAddVariationGrouping,
    handleRemoveVariationGrouping,
    visible,
    handleCreateVariation,
    handleCloseVariation,
    handleSaveVariation,
    handleRemoveVariation,
    handleChangeVariationGroupingName,
    handleCombine,
    handleChangeListSimpleField,
    handleChangeListObjectField,
    handleChangeItemImageMapping,
    handleDeleteItem,
    loading,
  };
}
