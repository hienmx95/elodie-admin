import { Card, Col, Row, Spin } from "antd";
import FormItem from "components/Utility/FormItem/FormItem";
import InputText from "components/Utility/Input/InputText/InputText";
import Modal, { ModalProps } from "components/Utility/Modal/Modal";
import SwitchStatus from "components/Utility/SwitchStatus/SwitchStatus";
import TreeSelect from "components/Utility/TreeSelect/TreeSelect";
import UploadFile from "components/Utility/UploadFile/UploadFile";
import { Category, CategoryFilter } from "models/Category";
import { Status } from "models/Status";
import React from "react";
import { useTranslation } from "react-i18next";
import { categoryRepository } from "repositories/category-repository";
import { enumService } from "services/enum-service";
import { FormDetailAction, formService } from "services/form-service";
import nameof from "ts-nameof.macro";

interface CategoryDetailModalProps extends ModalProps {
  model: Category;
  onChangeSimpleField: (fieldName: string) => (fieldValue: any) => void;
  onChangeObjectField?: (
    fieldName: string
  ) => (fieldIdValue: number, fieldValue?: any) => void;
  onChangeTreeObjectField?: (
    fieldName: string,
    callback?: (id: number) => void
  ) => (list: any[]) => void;
  dispatchModel?: React.Dispatch<FormDetailAction<Category>>;
  loading?: boolean;
}

function CategoryTreeDetail(props: CategoryDetailModalProps) {
  const [translate] = useTranslation();
  const {
    model,
    onChangeSimpleField,
    onChangeObjectField,
    onChangeTreeObjectField,
    loading,
  } = props;
  const [statusList] = enumService.useEnumList<Status>(
    categoryRepository.singleListStatus
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
            <Col lg={24} className="page__modal-header-title">
              {model?.id ? (
                <div className="page__title mr-1">
                  {translate("categories.detail.title")}
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
                  <Col lg={24}>
                    <div className="upload-file__container">
                      <UploadFile />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={12} className="pr-3">
                    <FormItem
                      label={translate("categories.name")}
                      validateStatus={formService.getValidationStatus<Category>(
                        model.errors,
                        nameof(model.name)
                      )}
                      message={model.errors?.name}
                      isRequired={true}
                    >
                      <InputText
                        isMaterial={true}
                        value={model.name}
                        placeHolder={translate("categories.placeholder.name")}
                        className={"tio-carousel_horizontal_outlined"}
                        onChange={onChangeSimpleField(nameof(model.name))}
                      />
                    </FormItem>
                  </Col>
                  <Col lg={12} className="pr-3">
                    <FormItem
                      label={translate("categories.code")}
                      validateStatus={formService.getValidationStatus<Category>(
                        model.errors,
                        nameof(model.code)
                      )}
                      message={model.errors?.code}
                      isRequired={true}
                    >
                      <InputText
                        isMaterial={true}
                        value={model.code}
                        placeHolder={translate("categories.placeholder.code")}
                        className={"tio-carousel_horizontal_outlined"}
                        onChange={onChangeSimpleField(nameof(model.code))}
                      />
                    </FormItem>
                  </Col>
                  <Col lg={12} className="pr-3">
                    <FormItem
                      label={translate("categories.categoryParent")}
                      validateStatus={formService.getValidationStatus<Category>(
                        model.errors,
                        nameof(model.parent)
                      )}
                      message={model.errors?.parent}
                    >
                      <TreeSelect
                        isMaterial={true}
                        placeHolder={translate(
                          "categories.placeholder.category"
                        )}
                        selectedKey={model.id}
                        selectable={true}
                        classFilter={CategoryFilter}
                        onChange={onChangeTreeObjectField(nameof(model.parent))}
                        checkStrictly={true}
                        getTreeData={categoryRepository.singleListCategory}
                        item={model.parent}
                      />
                    </FormItem>
                  </Col>
                  <Col lg={12} className="pr-3">
                    <FormItem
                      label={translate("categories.prefix")}
                      validateStatus={formService.getValidationStatus<Category>(
                        model.errors,
                        nameof(model.prefix)
                      )}
                      message={model.errors?.prefix}
                    >
                      <InputText
                        isMaterial={true}
                        value={model.prefix}
                        placeHolder={translate("categories.placeholder.prefix")}
                        className={"tio-labels_outlined"}
                        onChange={onChangeSimpleField(nameof(model.prefix))}
                      />
                    </FormItem>
                  </Col>
                  <Col lg={12} className="pr-3 mt-3">
                    <FormItem
                      label={translate("categories.description")}
                      validateStatus={formService.getValidationStatus<Category>(
                        model.errors,
                        nameof(model.description)
                      )}
                      message={model.errors?.description}
                    >
                      <InputText
                        isMaterial={true}
                        value={model.description}
                        placeHolder={translate(
                          "categories.placeholder.description"
                        )}
                        className={"tio-comment_text_outlined"}
                        onChange={onChangeSimpleField(
                          nameof(model.description)
                        )}
                      />
                    </FormItem>
                  </Col>
                  <Col lg={12} className="pr-3 mt-3">
                    <FormItem
                      validateStatus={formService.getValidationStatus<Category>(
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
                        {translate("categories.status")}
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

export default CategoryTreeDetail;
