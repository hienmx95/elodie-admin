/* begin general import */
import { Card, Col, Row, Spin } from "antd";
import FormItem from "components/Utility/FormItem/FormItem";
/* end general import */
/* begin individual import */
import InputText from "components/Utility/Input/InputText/InputText";
import Modal, { ModalProps } from "components/Utility/Modal/Modal";
import Select from "components/Utility/Select/Select";
import SwitchStatus from "components/Utility/SwitchStatus/SwitchStatus";
import { ProductGrouping, ProductGroupingFilter } from "models/ProductGrouping";
import { Status } from "models/Status";
import React from "react";
import { useTranslation } from "react-i18next";
import { productGroupingRepository } from "repositories/product-grouping-repository";
import { enumService } from "services/enum-service";
import { FormDetailAction, formService } from "services/form-service";
import nameof from "ts-nameof.macro";

/* end individual import */


interface ProductGroupingDetailModalProps extends ModalProps {
  model: ProductGrouping; // current item
  onChangeSimpleField: (fieldName: string) => (fieldValue: any) => void;
  onChangeObjectField?: (
    fieldName: string
  ) => (fieldIdValue: number, fieldValue?: any) => void;
  onChangeTreeObjectField?: (
    fieldName: string,
    callback?: (id: number) => void
  ) => (list: any[]) => void;
  dispatchModel?: React.Dispatch<FormDetailAction<ProductGrouping>>;
  loading?: boolean;
}

function ProductGroupingDetailModal(props: ProductGroupingDetailModalProps) {
  const [translate] = useTranslation();
  const { model, onChangeSimpleField, onChangeObjectField, loading } = props;
  const [statusList] = enumService.useEnumList<Status>(
    productGroupingRepository.singleListStatus
  );
  return (
    <Modal {...props} visibleFooter={!loading} width={1200}>
      {loading && (
        <div className="loading-block">
          <Spin size="large" />
        </div>
      )}
      <div className="page page__detail">
        <div className="page__modal-header w-100">
          <div className="page__modal-header-block"></div>
          <Row className="d-flex">
            <Col lg={24}>
              {model?.id ? (
                <div className="page__title mr-1">
                  {translate("productGroupings.detail.title")}
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
                      label={translate("productGroupings.name")}
                      validateStatus={formService.getValidationStatus<
                        ProductGrouping
                      >(model.errors, nameof(model.name))}
                      message={model.errors?.name}
                    >
                      <InputText
                        isMaterial={true}
                        value={model.name}
                        placeHolder={translate("productGroupings.placeholder.name")}
                        className={"tio-carousel_horizontal_outlined"}
                        onChange={onChangeSimpleField(nameof(model.name))}
                      />
                    </FormItem>
                  </Col>
                  <Col lg={12} className="pr-3 mt-3">
                    <FormItem
                      label={translate("productGroupings.code")}
                      validateStatus={formService.getValidationStatus<
                        ProductGrouping
                      >(model.errors, nameof(model.code))}
                      message={model.errors?.code}
                    >
                      <InputText
                        isMaterial={true}
                        value={model.code}
                        placeHolder={translate("productGroupings.placeholder.code")}
                        className={"tio-carousel_horizontal_outlined"}
                        onChange={onChangeSimpleField(nameof(model.code))}
                      />
                    </FormItem>
                  </Col>

                  <Col lg={24} className="pr-3 mt-3">
                    <FormItem
                      label={translate("productGroupings.description")}
                      validateStatus={formService.getValidationStatus<
                        ProductGrouping
                      >(model.errors, nameof(model.description))}
                      message={model.errors?.name}
                    >
                      <InputText
                        isMaterial={true}
                        value={model.description}
                        placeHolder={translate("productGroupings.placeholder.description")}
                        className={"tio-comment_text_outlined"}
                        onChange={onChangeSimpleField(
                          nameof(model.description)
                        )}
                      />
                    </FormItem>
                  </Col>

                  <Col lg={12} className="pr-3 mt-3">
                    <FormItem
                      label={translate("productGroupings.parent")}
                      validateStatus={formService.getValidationStatus<
                        ProductGrouping
                      >(model.errors, nameof(model.parent))}
                      message={model.errors?.parent}
                    >
                      <Select
                        isMaterial={true}
                        classFilter={ProductGroupingFilter}
                        placeHolder={translate("productGroupings.placeholder.parent")}
                        getList={
                          productGroupingRepository.singleListProductGrouping
                        }
                        onChange={onChangeObjectField(nameof(model.parent))}
                        model={model.parent}
                      />
                    </FormItem>
                  </Col>
                  <Col lg={12} className="pr-3 mt-5">
                    <FormItem
                      validateStatus={formService.getValidationStatus<ProductGrouping>(
                        model.errors,
                        nameof(model.status)
                      )}
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
                        {translate("productGroupings.status")}
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

export default ProductGroupingDetailModal;
