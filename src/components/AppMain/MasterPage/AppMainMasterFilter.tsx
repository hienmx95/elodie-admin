import { DownOutlined } from "@ant-design/icons";
import { Button, Card, Dropdown, Menu, Tooltip } from "antd";
import classNames from "classnames";
import InputSearch from "components/Utility/InputSearch/InputSearch";
import { TFunction } from "i18next";
import React, { ReactNode } from "react";
import { CSSTransition } from "react-transition-group";
import { UseMaster } from "services/pages/master-service";
import "./AppMainMasterFilter.scss";

export interface AppMainMasterFilterProps extends UseMaster {
  translate: TFunction;
  children: ReactNode;
  repository: any;
  isShowDelete?: boolean;
  isMaterialAction?: boolean;
  isCreate?: boolean;
  handleGoCreateTemplate?: () => void;
  isMaterialActionAdvance?: boolean;
  validAction?: TFunction;
}

export function AppMainMasterFilter(props: AppMainMasterFilterProps) {
  const {
    toggle,
    importButtonRef,
    filter,
    handleUpdateNewFilter,
    repository,
    translate,
    handleToggleSearch,
    handleGoCreate,
    handleListExport,
    handleImportList,
    handleExportTemplateList,
    children,
    handleServerBulkDelete,
    canBulkDelete,
    isMaterialAction = false,
    handleGoCreateTemplate,
    isCreate = true,
    handleResetFilter,
    // handleChangeFilter,
    isMaterialActionAdvance = false,
    validAction,
  } = props;

  const handleClickFilter = React.useCallback(() => {
    if (toggle) {
      handleResetFilter();
    }
    handleToggleSearch();
  }, [toggle, handleResetFilter, handleToggleSearch]);

  const handleChangeFilter = React.useCallback(
    (value) => {
      const newFilter = { ...filter };
      newFilter["search"] = value;
      handleUpdateNewFilter(newFilter);
    },
    [filter, handleUpdateNewFilter]
  );

  const menu = React.useMemo(
    () => (
      <Menu>
        {validAction("import") && (
          <Menu.Item key="2">
            <Tooltip title={translate("general.button.importExcel")}>
              <>
                <input
                  ref={importButtonRef}
                  type="file"
                  style={{ display: "none" }}
                  id="master-import"
                  onChange={handleImportList(repository.import)}
                />
                <div
                  className="ant-action-menu"
                  onClick={() => {
                    importButtonRef.current.click();
                  }}
                >
                  {translate("general.actions.importExcel")}
                </div>
              </>
            </Tooltip>
          </Menu.Item>
        )}
        {validAction("export") && (
          <Menu.Item key="3">
            <Tooltip title={translate("general.button.exportExcel")}>
              <div
                className="ant-action-menu"
                onClick={handleListExport(filter, repository.export)}
              >
                {translate("general.actions.exportExcel")}
              </div>
            </Tooltip>
          </Menu.Item>
        )}
        {validAction("exportTemplate") && (
          <Menu.Item key="4">
            <Tooltip title={translate("general.button.downloadTemplate")}>
              <div
                className="ant-action-menu"
                onClick={handleExportTemplateList(repository.exportTemplate)}
              >
                {translate("general.actions.exportTemplate")}
              </div>
            </Tooltip>
          </Menu.Item>
        )}
      </Menu>
    ),
    [
      handleImportList,
      handleExportTemplateList,
      filter,
      handleListExport,
      importButtonRef,
      repository.import,
      repository.export,
      repository.exportTemplate,
      translate,
      validAction,
    ]
  );

  const menuCreate = React.useMemo(
    () => (
      <Menu>
        {validAction("create") && (
          <Menu.Item key="1">
            <div className="ant-action-menu text-left" onClick={handleGoCreate}>
              {translate("general.actions.create")}
            </div>
          </Menu.Item>
        )}
        {validAction("createTemplate") && (
          <Menu.Item key="2">
            <div
              className="ant-action-menu text-left"
              onClick={handleGoCreateTemplate}
            >
              {translate("general.actions.createTemplate")}
            </div>
          </Menu.Item>
        )}
      </Menu>
    ),
    [handleGoCreate, handleGoCreateTemplate, translate, validAction]
  );

  return (
    <>
      <div className="page__search">
        <Card bordered={false}>
          <div className="d-flex align-items-center">
            <div className="d-flex flex-grow-1">
              <div className="pr-4 w70">
                <InputSearch
                  value={filter["search"]}
                  onChange={handleChangeFilter}
                  placeHolder="Tìm kiếm"
                />
              </div>

              <button
                className={classNames(
                  "btn component__btn-filter mr-3 grow-animate-1 btn-customize",
                  toggle === true ? "component__btn-filter-active" : ""
                )}
                onClick={handleClickFilter}
              >
                <i className="tio-tune_horizontal "></i>
                <span className="component_btn-text">
                  {translate("general.button.advance")}
                </span>
              </button>
            </div>

            <div className="d-flex justify-content-around ml-4 ">
              {canBulkDelete && validAction("bulkDelete") && (
                <button
                  className="btn component__btn-cancel component__btn-toggle grow-animate-1 btn-customize mr-3"
                  onClick={handleServerBulkDelete}
                  disabled={!canBulkDelete}
                >
                  <i className="tio-clear"></i>
                  <span className="component_btn-text">
                    {translate("general.actions.delete")}
                  </span>
                </button>
              )}
              {!isMaterialAction
                ? isCreate &&
                  validAction("create") && (
                    <button
                      className="btn component__btn-toggle  btn-customize"
                      onClick={handleGoCreate}
                    >
                      <i className="tio-add"></i>
                      <span className="component_btn-text">
                        {translate("general.actions.create")}
                      </span>
                    </button>
                  )
                : validAction("create") &&
                  validAction("createTemplate") && (
                    <div className="btn-create-template">
                      <Dropdown
                        overlay={menuCreate}
                        trigger={["click"]}
                        placement="bottomLeft"
                      >
                        <Button className="component__btn-toggle  btn-customize">
                          <i className="tio-add"></i>
                          <span className="component_btn-text">
                            {translate("general.actions.create")}
                          </span>
                        </Button>
                      </Dropdown>
                    </div>
                  )}
              {isMaterialActionAdvance &&
                (validAction("export") ||
                  validAction("exportTemplate") ||
                  validAction("import")) && (
                  <div className="table__action">
                    <Dropdown overlay={menu} trigger={["click"]}>
                      <Button>
                        <span className="component_btn-text">
                          {translate("general.actions.action")}
                        </span>
                        <DownOutlined />
                      </Button>
                    </Dropdown>
                  </div>
                )}
            </div>
          </div>
          <CSSTransition
            in={toggle}
            timeout={100}
            classNames={"show"}
            unmountOnExit
          >
            {children}
          </CSSTransition>
        </Card>
      </div>
    </>
  );
}

AppMainMasterFilter.defaultProps = {
  isMaterialAction: false,
  isMaterialActionAdvance: false,
  validAction: () => {
    return true;
  },
};

export default AppMainMasterFilter;
