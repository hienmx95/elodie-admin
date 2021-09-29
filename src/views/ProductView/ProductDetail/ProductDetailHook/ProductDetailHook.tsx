import { Product } from "models/Product";
import { ProductProductGroupingMapping } from "models/ProductProductGroupingMapping";
import { Status } from "models/Status";
import { UnitOfMeasureGroupingFilter } from "models/UnitOfMeasureGrouping";
import { UnitOfMeasureGroupingContent } from "models/UnitOfMeasureGroupingContent";
import { UsedVariation } from "models/UsedVariation";
import React, { useState } from "react";
import { productRepository } from "repositories/product-repository";
import { enumService } from "services/enum-service";
export function useProductDetailHook(
  model: Product,
  setModel: (data: Product) => void
) {
  const [
    unitOfMeasureGroupingFilter,
    setUnitOfMeasureGroupingFilter,
  ] = useState<UnitOfMeasureGroupingFilter>(new UnitOfMeasureGroupingFilter());
  const [usedVariationList] = enumService.useEnumList<UsedVariation>(
    productRepository.singleListUsedVariation
  );
  const [statusList] = enumService.useEnumList<Status>(
    productRepository.singleListStatus
  );
  const [hasCodeGeneratorRule, setHasCodeGeneratorRule] = React.useState<
    boolean
  >(false);

  const firstCheck = React.useRef<boolean>(true);

  React.useEffect(() => {
    if (firstCheck.current && (model.id || true)) {
      firstCheck.current = false;
      productRepository
        .checkCodeGeneratorRule()
        .subscribe((hasCodeRule: boolean) => {
          if (hasCodeRule) setHasCodeGeneratorRule(hasCodeRule);
        });
      return;
    } // nếu tạo mới và có codeRule cho sản phẩm
    if (model.id && model.codeGeneratorRuleId) {
      setHasCodeGeneratorRule(true);
      return;
    } // nếu update và đã được áp dụng codeRule
    setHasCodeGeneratorRule(false);
  }, [model.id, model.codeGeneratorRuleId]);

  const handleChangeUOM = React.useCallback(
    (id, value) => {
      model.unitOfMeasure = value;
      model.unitOfMeasureId = id;
      if (unitOfMeasureGroupingFilter.unitOfMeasureId.equal !== id) {
        model.unitOfMeasureGroupingId = undefined;
        model.unitOfMeasureGrouping = undefined;
        if (model.errors?.unitOfMeasure) model.errors.unitOfMeasure = null;
      }
      setModel({ ...model });
      setUnitOfMeasureGroupingFilter({
        ...unitOfMeasureGroupingFilter,
        unitOfMeasureId: {
          equal: id,
        },
      });
    },
    [setModel, model, unitOfMeasureGroupingFilter]
  );

  const renderItems = React.useMemo(() => {
    const contentList = [];
    if (model) {
      if (model.unitOfMeasureGrouping) {
        if (
          model.unitOfMeasureGrouping.unitOfMeasureGroupingContents &&
          model.unitOfMeasureGrouping.unitOfMeasureGroupingContents.length > 0
        )
          model.unitOfMeasureGrouping.unitOfMeasureGroupingContents.forEach(
            (content: UnitOfMeasureGroupingContent) => {
              if (content.unitOfMeasure && content.factor) {
                const { unitOfMeasure, factor } = content;
                const value = `${unitOfMeasure.name} (${factor})`;
                contentList.push(value);
              }
            }
          );
      }
    }
    return contentList.join(",");
  }, [model]);

  const handleChangeChangeProductGrouping = React.useCallback(
    (value) => {
      const list = value.map((item) => {
        const mapping = new ProductProductGroupingMapping();
        mapping.productGrouping = item;
        mapping.productGroupingId = item?.id;
        return mapping;
      });
      setModel({
        ...model,
        productProductGroupingMappings: list,
      });
    },
    [model, setModel]
  );

  return {
    handleChangeUOM,
    unitOfMeasureGroupingFilter,
    setUnitOfMeasureGroupingFilter,
    statusList,
    usedVariationList,
    renderItems,
    handleChangeChangeProductGrouping,
    hasCodeGeneratorRule,
  };
}
