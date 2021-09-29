/* begin general import */
import { Card, Col, Row, Spin } from "antd";
import FormItem from "components/Utility/FormItem/FormItem";
import InputText from "components/Utility/Input/InputText/InputText";
import Modal, { ModalProps } from "components/Utility/Modal/Modal";
import SwitchStatus from "components/Utility/SwitchStatus/SwitchStatus";
import { ProductType } from "models/ProductType";
import { Status } from "models/Status";
import React from "react";
import { useTranslation } from "react-i18next";
import { productTypeRepository } from "repositories/product-type-repository";
import { enumService } from "services/enum-service";
import { FormDetailAction, formService } from "services/form-service";
import nameof from "ts-nameof.macro";
/* end individual import */

interface ProductTypeDetailModalProps extends ModalProps {
  model: ProductType;
  onChangeSimpleField: (fieldName: string) => (fieldValue: any) => void;
  onChangeObjectField?: (
    fieldName: string
  ) => (fieldIdValue: number, fieldValue?: any) => void;
  onChangeTreeObjectField?: (
    fieldName: string,
    callback?: (id: number) => void
  ) => (list: any[]) => void;
  dispatchModel?: React.Dispatch<FormDetailAction<ProductType>>;
  loading?: boolean;
}

function ProductTypeDetailModal(props: ProductTypeDetailModalProps) {
  const { model, onChangeSimpleField, onChangeObjectField, loading } = props;
  const [statusList] = enumService.useEnumList<Status>(
    productTypeRepository.singleListStatus
  );

  const [translate] = useTranslation();

  return (
    <Modal {...props} visibleFooter={!loading} width={765}>
      {loading && (
        <div className="loading-block">
          <Spin size="large" />
        </div>
      )}
      <div className="page page__detail">
        <div className="page__modal-header w-100">
          <div className="page__modal-header-block"></div>
          <Row className="d-flex">
            <Col lg={24} className="page__modal-header-title">
              {model?.id ? (
                <div className="page__title mr-1">
                  {translate("productTypes.detail.title")}
                </div>
              ) : (
                translate("general.actions.create")
              )}
            </Col>
          </Row>
        </div>
        <div className="w-100 page__detail-tabs">
          <Row className="d-flex">
            <Col lg={24}>
              <Card>
                <Row>
                  <Col lg={12} className="pr-3 mt-3">
                    <FormItem
                      label={translate("productTypes.code")}
                      validateStatus={formService.getValidationStatus<
                        ProductType
                      >(model.errors, nameof(model.code))}
                      message={model.errors?.code}
                      isRequired={true}
                    >
                      <InputText
                        isMaterial={true}
                        value={model.code}
                        placeHolder={translate("productTypes.placeholder.code")}
                        className={"tio-carousel_horizontal_outlined"}
                        onChange={onChangeSimpleField(nameof(model.code))}
                      />
                    </FormItem>
                  </Col>

                  <Col lg={12} className="pr-3 mt-3">
                    <FormItem
                      label={translate("productTypes.name")}
                      validateStatus={formService.getValidationStatus<
                        ProductType
                      >(model.errors, nameof(model.name))}
                      message={model.errors?.name}
                      isRequired={true}
                    >
                      <InputText
                        isMaterial={true}
                        value={model.name}
                        placeHolder={translate("productTypes.placeholder.name")}
                        className={"tio-carousel_horizontal_outlined"}
                        onChange={onChangeSimpleField(nameof(model.name))}
                      />
                    </FormItem>
                  </Col>

                  <Col lg={12} className="pr-3 mt-3">
                    <FormItem
                      label={translate("productTypes.description")}
                      validateStatus={formService.getValidationStatus<
                        ProductType
                      >(model.errors, nameof(model.description))}
                      message={model.errors?.description}
                    >
                      <InputText
                        isMaterial={true}
                        value={model.description}
                        placeHolder={translate(
                          "productTypes.placeholder.description"
                        )}
                        className={"tio-comment_text_outlined"}
                        onChange={onChangeSimpleField(
                          nameof(model.description)
                        )}
                      />
                    </FormItem>
                  </Col>

                  <Col lg={12} className="pr-3 mt-5">
                    <FormItem
                      validateStatus={formService.getValidationStatus<
                        ProductType
                      >(model.errors, nameof(model.status))}
                      message={model.errors?.status}
                    >
                      <SwitchStatus
                        checked={
                          model.statusId === statusList[1]?.id ? true : false
                        }
                        list={statusList}
                        onChange={onChangeObjectField(nameof(model.status))}
                      />
                      <span className="component__title ml-2">
                        {translate("productTypes.status")}
                      </span>
                    </FormItem>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </Modal>
  );
}

export default ProductTypeDetailModal;
