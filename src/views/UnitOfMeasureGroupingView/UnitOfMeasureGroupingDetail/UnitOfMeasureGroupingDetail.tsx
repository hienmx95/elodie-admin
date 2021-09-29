import { CaretRightOutlined } from "@ant-design/icons";
import { Col, Collapse, Row } from "antd";
import AppFooter from "components/AppFooter/AppFooter";
import ContentTable from "components/Utility/ContentTable/ContentTable";
import FormItem from "components/Utility/FormItem/FormItem";
import InputText from "components/Utility/Input/InputText/InputText";
import Select from "components/Utility/Select/Select";
import SwitchStatus from "components/Utility/SwitchStatus/SwitchStatus";
import { UNIT_OF_MEASURE_GROUPING_MASTER_ROUTE } from "config/route-consts";
import { Product } from "models/Product";
import { Status } from "models/Status";
import { UnitOfMeasureFilter } from "models/UnitOfMeasure";
import { UnitOfMeasureGrouping } from "models/UnitOfMeasureGrouping";
import React from "react";
import { useTranslation } from "react-i18next";
import { unitOfMeasureGroupingRepository } from "repositories/unit-of-measure-grouping-repository";
import { enumService } from "services/enum-service";
import { formService } from "services/form-service";
import detailService from "services/pages/detail-service";
import nameof from "ts-nameof.macro";
import "./UnitOfMeasureGroupingDetail.scss";
import { useUnitOfMeasureGroupingContentTable } from "./UnitOfMeasureGroupingDetailHook/UnitOfMeasureGroupingContentHook";
import { useUnitOfMeasureGroupingFooterHook } from "./UnitOfMeasureGroupingDetailHook/UnitOfMeasureGroupingFooterHook";
const { Panel } = Collapse;

function UnitOfMeasureGroupingDetail() {
  const [translate] = useTranslation();

  const {
    model,
    handleUpdateNewModel,
    // isDetail,
    handleChangeSimpleField,
    handleChangeObjectField,
    handleSave,
    handleGoBase,
  } = detailService.useDetail<Product>(
    Product,
    unitOfMeasureGroupingRepository.get,
    unitOfMeasureGroupingRepository.save,
    UNIT_OF_MEASURE_GROUPING_MASTER_ROUTE
  );
  const [statusList] = enumService.useEnumList<Status>(
    unitOfMeasureGroupingRepository.singleListStatus
  );
  const {
    unitOfMeasureGroupingContentFilter,
    unitOfMeasureGroupingContentList,
    loadUnitOfMeasureGroupingContentList,
    unitOfMeasureGroupingContentTotal,
    handleAddUnitOfMeasureGroupingContent,
    handleUnitOfMeasureGroupingContentTableChange,
    handleUnitOfMeasureGroupingContentPagination,
    canBulkDeleteUnitOfMeasureGroupingContent,
    handleLocalBulkDeleteUnitOfMeasureGroupingContent,
    unitOfMeasureGroupingContentRef,
    handleClickUnitOfMeasureGroupingContent,
    handleImportUnitOfMeasureGroupingContent,
    handleExportUnitOfMeasureGroupingContent,
    handleExportTemplateUnitOfMeasureGroupingContent,
    unitOfMeasureGroupingContentColumns,
    handleChangeUOMBase,
  } = useUnitOfMeasureGroupingContentTable(model, handleUpdateNewModel);
  const unitOfMeareseGroupingContentTable = React.useMemo(
    () => (
      <ContentTable
        model={model}
        filter={unitOfMeasureGroupingContentFilter}
        list={unitOfMeasureGroupingContentList}
        loadingList={loadUnitOfMeasureGroupingContentList}
        total={unitOfMeasureGroupingContentTotal}
        handleTableChange={handleUnitOfMeasureGroupingContentTableChange}
        rowSelection={null}
        handleLocalBulkDelete={
          handleLocalBulkDeleteUnitOfMeasureGroupingContent
        }
        canBulkDelete={canBulkDeleteUnitOfMeasureGroupingContent}
        handleExportContent={handleExportUnitOfMeasureGroupingContent}
        handleExportTemplateContent={
          handleExportTemplateUnitOfMeasureGroupingContent
        }
        handlePagination={handleUnitOfMeasureGroupingContentPagination}
        handleAddContent={handleAddUnitOfMeasureGroupingContent}
        ref={unitOfMeasureGroupingContentRef}
        handleClick={handleClickUnitOfMeasureGroupingContent}
        handleImportContentList={handleImportUnitOfMeasureGroupingContent}
        columns={unitOfMeasureGroupingContentColumns}
        hasAddContentInline={true}
        isShowTitle={false}
        isShowFooter={false}
      />
    ),
    [
      canBulkDeleteUnitOfMeasureGroupingContent,
      handleAddUnitOfMeasureGroupingContent,
      handleClickUnitOfMeasureGroupingContent,
      handleExportTemplateUnitOfMeasureGroupingContent,
      handleExportUnitOfMeasureGroupingContent,
      handleImportUnitOfMeasureGroupingContent,
      handleLocalBulkDeleteUnitOfMeasureGroupingContent,
      handleUnitOfMeasureGroupingContentPagination,
      handleUnitOfMeasureGroupingContentTableChange,
      loadUnitOfMeasureGroupingContentList,
      model,
      unitOfMeasureGroupingContentColumns,
      unitOfMeasureGroupingContentFilter,
      unitOfMeasureGroupingContentList,
      unitOfMeasureGroupingContentRef,
      unitOfMeasureGroupingContentTotal,
    ]
  );

  const { childrenAction } = useUnitOfMeasureGroupingFooterHook(
    translate,
    model,
    handleGoBase,
    handleSave
  );

  return (
    <>
      <div className="page page__detail unit-of-measure-grouping__container">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col lg={8} className="gutter-row">
            <Collapse
              defaultActiveKey={["1"]}
              onChange={() => {}}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
              className="site-collapse-custom-collapse"
              expandIconPosition="right"
            >
              <Panel
                header={"Thông tin chung"}
                key="1"
                className="site-collapse-custom-panel"
              >
                <Row>
                  <Col lg={24} className="pr-3 mt-3">
                    <FormItem
                      label={translate("unitOfMeasureGroupings.code")}
                      validateStatus={formService.getValidationStatus<
                        UnitOfMeasureGrouping
                      >(model.errors, nameof(model.code))}
                      message={model.errors?.code}
                    >
                      <InputText
                        isMaterial={true}
                        value={model.code}
                        placeHolder={translate(
                          "unitOfMeasureGroupings.placeholder.code"
                        )}
                        className={"tio-format_points"}
                        onChange={handleChangeSimpleField(nameof(model.code))}
                      />
                    </FormItem>
                  </Col>

                  <Col lg={24} className="pr-3  mt-3">
                    <FormItem
                      label={translate("unitOfMeasureGroupings.name")}
                      validateStatus={formService.getValidationStatus<
                        UnitOfMeasureGrouping
                      >(model.errors, nameof(model.name))}
                      message={model.errors?.name}
                    >
                      <InputText
                        isMaterial={true}
                        value={model.name}
                        placeHolder={translate(
                          "unitOfMeasureGroupings.placeholder.name"
                        )}
                        className={"tio-share"}
                        onChange={handleChangeSimpleField(nameof(model.name))}
                      />
                    </FormItem>
                  </Col>
                  <Col lg={24} className="pr-3 mt-3">
                    <FormItem
                      label={translate("unitOfMeasureGroupings.unitOfMeasure")}
                      validateStatus={formService.getValidationStatus<
                        UnitOfMeasureGrouping
                      >(model.errors, nameof(model.unitOfMeasure))}
                      message={model.errors?.unitOfMeasureId}
                    >
                      <Select
                        isMaterial={true}
                        classFilter={UnitOfMeasureFilter}
                        placeHolder={translate(
                          "unitOfMeasureGroupings.placeholder.unitOfMeasure"
                        )}
                        getList={
                          unitOfMeasureGroupingRepository.singleListUnitOfMeasure
                        }
                        onChange={handleChangeUOMBase}
                        model={model.unitOfMeasure}
                      />
                    </FormItem>
                  </Col>

                  <Col lg={24} className=" mt-3">
                    <FormItem>
                      <SwitchStatus
                        checked={
                          model.statusId === statusList[1]?.id ? true : false
                        }
                        list={statusList}
                        onChange={handleChangeObjectField(nameof(model.status))}
                      />
                      <span className="product-label ml-2">
                        {translate("products.status")}
                      </span>
                    </FormItem>
                  </Col>

                  <Col lg={24} className="pr-3 mt-3 ">
                    <FormItem
                      label={translate("unitOfMeasureGroupings.description")}
                      validateStatus={formService.getValidationStatus<
                        UnitOfMeasureGrouping
                      >(model.errors, nameof(model.description))}
                      message={model.errors?.description}
                    >
                      <InputText
                        isMaterial={true}
                        value={model.description}
                        placeHolder={translate(
                          "unitOfMeasureGroupings.placeholder.description"
                        )}
                        className={"tio-comment_text_outlined"}
                        onChange={handleChangeSimpleField(
                          nameof(model.description)
                        )}
                      />
                    </FormItem>
                  </Col>
                </Row>
              </Panel>
            </Collapse>
          </Col>
          <Col lg={16}>
            <Collapse
              defaultActiveKey={["1"]}
              onChange={() => {}}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
              className="site-collapse-custom-collapse"
              expandIconPosition="right"
            >
              <Panel
                header={translate(
                  "unitOfMeasureGroupings.unitOfMeasureGroupingContent.title"
                )}
                key="1"
                className="site-collapse-custom-panel"
              >
                {model?.unitOfMeasure && (
                  <>
                    <Row className="">{unitOfMeareseGroupingContentTable}</Row>
                    <Row>
                      <div className="action__container">
                        <div
                          className="button__add"
                          onClick={handleAddUnitOfMeasureGroupingContent}
                        >
                          <span>
                            <i className="tio-add_circle_outlined"></i>
                            {translate("general.actions.create")}
                          </span>
                        </div>
                      </div>
                    </Row>
                  </>
                )}
              </Panel>
            </Collapse>
          </Col>
        </Row>

        <AppFooter childrenAction={childrenAction}></AppFooter>
      </div>
    </>
  );
}

export default UnitOfMeasureGroupingDetail;
