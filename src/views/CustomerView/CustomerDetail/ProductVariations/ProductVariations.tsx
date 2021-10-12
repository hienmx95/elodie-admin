import { Col, Row } from "antd/lib/grid";
import FormItem from "components/Utility/FormItem/FormItem";
import InputTag from "components/Utility/Input/InputTag/InputTag";
import InputText from "components/Utility/Input/InputText/InputText";
import { Product } from "models/Product";
import { VariationGrouping } from "models/VariationGrouping";
import React, { Dispatch, SetStateAction, RefObject } from "react";
import { useTranslation } from "react-i18next";
import { commonWebService } from "services/common-web-service";
import { formService } from "services/form-service";
import nameof from "ts-nameof.macro";
import "./ProductVariations.scss";
import VariationModal from "./VariationModal";
import { v4 as uuidv4 } from "uuid";

export interface PriceAndVariations {
  model: Product;
  handleChangeVariationGroupingName?: (index: number) => () => void;
  handleCreateVariation?: (index: number) => void;
  handleRemoveVariation?: (
    indexVariation: number,
    variationGroup: VariationGrouping
  ) => (item: any) => void;
  visible?: boolean;
  handleCloseVariation?: () => void;
  handleSaveVariation?: (item) => void;
  currentVariationGrouping?: VariationGrouping;
  setCurrentVariationGrouping?: Dispatch<SetStateAction<VariationGrouping>>;
  handleAddVariationGrouping?: () => void;
  handleRemoveVariationGrouping?: (index: number) => void;
}

function ProductVariations(props: PriceAndVariations) {
  const [translate] = useTranslation();
  const wrapperRef: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(
    null
  );

  const {
    model,
    handleChangeVariationGroupingName,
    handleCreateVariation,
    handleRemoveVariation,
    visible,
    handleCloseVariation,
    handleSaveVariation,
    currentVariationGrouping,
    setCurrentVariationGrouping,
    handleAddVariationGrouping,
    handleRemoveVariationGrouping,
  } = props;
  commonWebService.useClickOutside(wrapperRef, handleCloseVariation);
  return (
    <div className="price-and-variations pl-3 mt-3">
      {model.variationGroupings &&
        model.variationGroupings.length > 0 &&
        model.variationGroupings.map(
          (variationGrouping: VariationGrouping, index: number) => {
            return (
              <Row
                className="ant-row ant-form-item variation"
                key={index}
                gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}

              >
                <Col lg={8} className="mt-3">
                  <FormItem label={translate("products.variationGroupingName")}>
                    <InputText
                      isMaterial={true}
                      value={variationGrouping?.name}
                      placeHolder={translate(
                        "products.placeholder.variationGroupingName"
                      )}
                      className={"tio-material"}
                      onChange={handleChangeVariationGroupingName(index)}
                    />
                  </FormItem>
                </Col>

                <Col lg={8} className="mt-3">
                  <FormItem label={translate("products.variationValue")}>
                    <div className="select__container">
                      <div
                        className={variationGrouping?.variations.length > 0 ? "select__input " : ""}
                        onClick={() => handleCreateVariation(index)}
                      >
                        <InputTag
                          listItem={variationGrouping?.variations}
                          isMaterial={true}
                          onClear={
                            handleRemoveVariation(index, variationGrouping)
                          }

                        />
                      </div>
                      {visible && (
                        <div className="select__list-container" key={uuidv4()}>
                          <VariationModal
                            visible={visible}
                            onClose={handleCloseVariation}
                            onSave={handleSaveVariation}
                            model={currentVariationGrouping}
                            setModel={setCurrentVariationGrouping}
                          />
                        </div>
                      )}
                    </div>

                    <span
                      onClick={() => handleRemoveVariationGrouping(index)}
                      className="btn-cancel"
                    >
                      <i className="tio-clear_circle mr-2" />
                    </span>
                  </FormItem>
                </Col>
                <VariationModal
                  visible={visible}
                  onClose={handleCloseVariation}
                  onSave={handleSaveVariation}
                  model={currentVariationGrouping}
                  setModel={setCurrentVariationGrouping}
                />
              </Row>
            );
          }
        )}

      <span
        className=" btn-add text-primary"
        onClick={handleAddVariationGrouping}
      >
        <i className="tio-add_circle_outlined mr-2 mt-1" />
        {translate("products.createVariations")}
      </span>

      <Row>
        <Col className="mt-4">
          <FormItem
            validateStatus={formService.getValidationStatus<Product>(
              model?.errors,
              nameof(model.items)
            )}
            message={model.errors?.items}
          >
            {" "}
          </FormItem>
        </Col>
      </Row>
    </div>
  );
}

export default ProductVariations;
