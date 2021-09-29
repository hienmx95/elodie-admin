/* begin general import */
import React, { useMemo } from "react";
import { Col, Row, Tooltip, Menu, Dropdown, Card, Button } from "antd";
import Table, { ColumnProps } from "antd/lib/table";
import { renderMasterIndex } from "helpers/table";
import { useTranslation } from "react-i18next";
import masterService from "services/pages/master-service";
import { getAntOrderType } from "services/table-service";
import nameof from "ts-nameof.macro";
import { DownOutlined } from "@ant-design/icons";
import { CSSTransition } from "react-transition-group";
import InputSearch from "components/Utility/InputSearch/InputSearch";
import Pagination from "components/Utility/Pagination/Pagination";
import FieldTypePreview from "./FieldTypePreview";
import classNames from "classnames";
/* end general import */

/* begin filter import */
import AdvanceStringFilter from "components/Utility/AdvanceFilter/AdvanceStringFilter/AdvanceStringFilter";
import { StringFilter } from "@react3l/advanced-filters";
/* end filter import */

/* begin individual import */
import { fieldTypeRepository } from "repositories/field-type-repository";
import { FieldType, FieldTypeFilter } from "models/FieldType";
import FieldTypeDetailModal from "../FieldTypeDetail/FieldTypeDetailModal";
import detailService from "services/pages/detail-service";
/* end individual import */

function FieldTypeMaster() {
  const [translate] = useTranslation();

  const {
    list,
    total,
    loadingList,
    filter,
    toggle,
    handleChangeFilter,
    handleResetFilter,
    handleToggleSearch,
    handleTableChange,
    handlePagination,
    handleServerDelete,
    handleServerBulkDelete,
    handleSearch,
    handleImportList,
    handleListExport,
    handleExportTemplateList,
    importButtonRef,
    rowSelection,
    canBulkDelete,
    pagination
  } = masterService.useMaster<FieldType, FieldTypeFilter>
      (
        FieldTypeFilter,
        '',
        fieldTypeRepository.list,
        fieldTypeRepository.count,
        fieldTypeRepository.delete,
        fieldTypeRepository.bulkDelete,
      );

  const {
    isOpenPreview,
    isLoadingPreview,
    previewModel,
    handleOpenPreview,
    handleClosePreview,
  } = masterService.usePreview<FieldType>
      (
        FieldType,
        fieldTypeRepository.get,
      );

  const {
    model,
    isOpenDetailModal,
    handleOpenDetailModal,
    handleCloseDetailModal,
    handleSaveModel,
    loadingModel,
    handleChangeSimpleField,
    handleChangeObjectField,
    dispatch,
  } = detailService.useDetailModal(
    FieldType,
    fieldTypeRepository.get,
    fieldTypeRepository.save,
    handleSearch,
  );

  const handleGoCreate = React.useCallback(() => {
    handleClosePreview();
    handleOpenDetailModal(null);
  }, [handleClosePreview, handleOpenDetailModal]);

  const handleGoDetail = React.useCallback((id: number) => () => {
    handleClosePreview();
    handleOpenDetailModal(id);
  }, [handleClosePreview, handleOpenDetailModal]);

  const [dropdown, setDropdown] = React.useState<boolean>(false);

  const handleDropdown = React.useCallback(() => {
    setDropdown(!dropdown);
  }, [dropdown]);

  const menuFilter = React.useMemo(() => (
    <Menu>
      <Menu.Item key="2">
        <Tooltip title={translate("general.button.importExcel")}>
          <>
            <input
              ref={importButtonRef}
              type="file"
              style={{ display: "none" }}
              id="master-import"
              onChange={handleImportList(fieldTypeRepository.import)}
            />
            <button
              className="btn border-less gradient-btn-icon grow-animate-2"
              onClick={() => {
                importButtonRef.current.click();
              }}
            >
              <i className="tio-file_add_outlined" />
            </button>
          </>
        </Tooltip>
      </Menu.Item>
      <Menu.Item key="3">
        <Tooltip title={translate("general.button.exportExcel")}>
          <button
            className="btn border-less gradient-btn-icon grow-animate-2"
            onClick={handleListExport(filter, fieldTypeRepository.export)}
          >
            <i className="tio-file_outlined" />
          </button>
        </Tooltip>
      </Menu.Item>
      <Menu.Item key="4">
        <Tooltip title={translate("general.button.downloadTemplate")}>
          <button
            className="btn border-less gradient-btn-icon grow-animate-2"
            onClick={handleExportTemplateList(fieldTypeRepository.exportTemplate)}
          >
            <i className="tio-download_to" />
          </button>
        </Tooltip>
      </Menu.Item>
    </Menu>
  ), [translate, importButtonRef, handleImportList, handleListExport, filter, handleExportTemplateList]);

  const menuAction = React.useCallback((id: number, fieldType: FieldType) => (
    <Menu>
      <Menu.Item key="1">
        <Tooltip title={translate("general.actions.view")}>
          <button className="btn gradient-btn-icon"
            onClick={handleOpenPreview(id)}>
            <i className="tio-visible" />
          </button>
        </Tooltip>
      </Menu.Item>
      <Menu.Item key="2">
        <Tooltip title={translate("general.actions.edit")}>
          <button className="btn gradient-btn-icon"
            onClick={handleGoDetail(id)}>
            <i className="tio-edit" />
          </button>
        </Tooltip>
      </Menu.Item>
      <Menu.Item key="3">
        <Tooltip title={translate("general.actions.delete")}>
          <button className="btn btn-sm component__btn-delete"
            onClick={() => handleServerDelete(fieldType)}>
            <i className="tio-delete" />
          </button>
        </Tooltip>
      </Menu.Item>
    </Menu>
  ), [handleGoDetail, handleOpenPreview, handleServerDelete, translate]);

  const columns: ColumnProps<FieldType>[] = useMemo(
    () => [
      {
        title: (<div className='text-center gradient-text'>{translate("general.columns.index")}</div>),
        key: "index",
        width: 100,
        render: renderMasterIndex<FieldType>(pagination),
      },




      {
        title: (<div className='text-center gradient-text'>{translate('fieldTypes.code')}</div>),
        key: nameof(list[0].code),
        dataIndex: nameof(list[0].code),
        sorter: true,
        sortOrder: getAntOrderType<FieldType, FieldTypeFilter>
          (
            filter,
            nameof(list[0].code),
          ),
      },



      {
        title: (<div className='text-center gradient-text'>{translate('fieldTypes.name')}</div>),
        key: nameof(list[0].name),
        dataIndex: nameof(list[0].name),
        sorter: true,
        sortOrder: getAntOrderType<FieldType, FieldTypeFilter>
          (
            filter,
            nameof(list[0].name),
          ),
      },






      {
        title: (<div className='text-center gradient-text'>{translate("general.actions.label")}</div>),
        key: "action",
        dataIndex: nameof(list[0].id),
        fixed: "right",
        width: 150,
        align: "center",
        render(id: number, fieldType: FieldType) {
          return (
            <div className='d-flex justify-content-center button-action-table'>
              <Dropdown overlay={menuAction(id, fieldType)} trigger={["click"]} placement="bottomCenter" arrow>
                <span className="action__dots">...</span>
              </Dropdown>
            </div>
          );
        },
      },
    ], [translate, pagination, list, filter, menuAction]);

  return (
    <>
      <div className='page page__master'>
        <div className="page__header d-flex align-items-center justify-content-between">
          <div className="page__title">
            {translate('fieldTypes.master.title')}
          </div>
        </div>
        <div className="page__search">
          <Card bordered={false}>
            <div className="d-flex align-items-center">
              <div className="d-flex flex-grow-1">
                <div className="pr-4 w70">
                  <InputSearch />
                </div>

                <button
                  className={classNames(
                    "btn component__btn-toggle mr-3 grow-animate-1",
                    toggle === true ? "component__btn-toggle-active" : ""
                  )}
                  onClick={handleToggleSearch}
                >
                  <i className="tio-tune_horizontal"></i>
                  <span className="component_btn-text">
                    {translate("general.button.advance")}
                  </span>
                </button>

                <button
                  className="btn component__btn-toggle grow-animate-1 reset-filter"
                  onClick={handleResetFilter}
                >
                  <i className="tio-restore reset-icon"></i>
                  <span className="component_btn-text reset-label">
                    {translate("general.button.reset")}
                  </span>
                </button>
              </div>

              <div className="d-flex justify-content-around ml-4">
                <button
                  className="btn component__btn-toggle grow-animate-1"
                  onClick={handleGoCreate}
                >
                  <i className="tio-add"></i>
                  <span className="component_btn-text">
                    {translate("general.actions.create")}
                  </span>
                </button>
                <div className="table__action">
                  <Dropdown overlay={menuFilter} trigger={["click"]}>
                    <Button onClick={handleDropdown}>
                      <span className="component_btn-text">
                        {translate("general.actions.action")}
                      </span>
                      <DownOutlined className={dropdown ? "dropdown" : null} />
                    </Button>
                  </Dropdown>
                </div>
              </div>
            </div>
            <CSSTransition
              in={toggle}
              timeout={100}
              classNames={"show"}
              unmountOnExit >
              <Row className='mt-4'>


                <Col lg={4} className='pr-4'>
                  <label className='label'>
                    {translate('fieldTypes.code')}
                  </label>
                  <AdvanceStringFilter value={filter[nameof(list[0].code)]["contain"]}
                    onEnter={handleChangeFilter(
                      nameof(list[0].code),
                      'contain' as any,
                      StringFilter,
                    )}
                    placeHolder={translate('fieldTypes.placeholder.code')} />
                </Col>


                <Col lg={4} className='pr-4'>
                  <label className='label'>
                    {translate('fieldTypes.name')}
                  </label>
                  <AdvanceStringFilter value={filter[nameof(list[0].name)]["contain"]}
                    onEnter={handleChangeFilter(
                      nameof(list[0].name),
                      'contain' as any,
                      StringFilter,
                    )}
                    placeHolder={translate('fieldTypes.placeholder.name')} />
                </Col>



              </Row>
            </CSSTransition>
          </Card>
        </div>
        <div className="page__master-table custom-scrollbar">
          <Card bordered={false}>
            <Table
              rowKey={nameof(list[0].id)}
              columns={columns}
              pagination={false}
              dataSource={list}
              loading={loadingList}
              onChange={handleTableChange}
              rowSelection={rowSelection}
              scroll={{ y: 400, x: "max-content" }}
              title={() => (
                <>
                  <div className="d-flex justify-content-end">
                    <div className="flex-shrink-1 d-flex align-items-center">
                      <Tooltip
                        title={translate("general.button.bulkDelete")}
                        key="bulkDelete"
                      >
                        <button
                          className="btn border-less component__btn-delete grow-animate-2"
                          style={{ border: "none", backgroundColor: "unset" }}
                          onClick={handleServerBulkDelete}
                          disabled={!canBulkDelete}
                        >
                          <i className="tio-delete" />
                        </button>
                      </Tooltip>

                      <Pagination
                        skip={filter.skip}
                        take={filter.take}
                        total={total}
                        onChange={handlePagination}
                        style={{ margin: "10px" }}
                      />
                    </div>
                  </div>
                </>
              )}
            />
          </Card>
        </div>
      </div>
      <FieldTypePreview
        previewModel={previewModel}
        isOpenPreview={isOpenPreview}
        isLoadingPreview={isLoadingPreview}
        handleClosePreview={handleClosePreview}
        handleGoDetail={handleGoDetail}
        translate={translate} />
      <FieldTypeDetailModal
        model={model}
        visible={isOpenDetailModal}
        handleSave={handleSaveModel}
        handleCancel={handleCloseDetailModal}
        onChangeSimpleField={handleChangeSimpleField}
        onChangeObjectField={handleChangeObjectField}

        dispatchModel={dispatch}
        loading={loadingModel}
        visibleFooter={true}
      />
    </>
  );
}

export default FieldTypeMaster;
