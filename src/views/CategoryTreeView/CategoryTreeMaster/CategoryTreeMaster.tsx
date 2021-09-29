import { AppMainMasterTitle } from "components/AppMain/MasterPage/AppMainMasterTitle";
import InputSearch from "components/Utility/InputSearch/InputSearch";
import { API_CATEGORY_PREFIX } from "config/api-consts";
import { Category, CategoryFilter } from "models/Category";
import React from "react";
import { useTranslation } from "react-i18next";
import { categoryRepository } from "repositories/category-repository";
import authenticationService from "services/authentication-service";
import { commonWebService } from "services/common-web-service";
import masterService, { UseMaster } from "services/pages/master-service";
import { TreeList } from "../../../components/Utility/TreeList/TreeList";
import CategoryTreeDetail from "../CategoryTreeDetail/CategoryTreeDetail";
import "./CategoryMaster.scss";
import CategoryPreview from "./CategoryPreview";
import { useDetailCategoryModal } from "./CategoryTreeMasterHook";

function CategoryTreeMaster() {
  const [translate] = useTranslation();
  const { validAction } = authenticationService.useAction('category', API_CATEGORY_PREFIX);

  const master: UseMaster = masterService.useMaster<Category, CategoryFilter>(
    CategoryFilter,
    "",
    categoryRepository.list,
    categoryRepository.count,
    categoryRepository.delete,
    categoryRepository.bulkDelete
  );

  const {
    isOpenPreview,
    isLoadingPreview,
    previewModel,
    handleOpenPreview,
    handleClosePreview,
  } = masterService.usePreview<Category>(Category, categoryRepository.get);

  const [treeDataList] = commonWebService.buildTree(master.list);

  const {
    model,
    isOpenDetailModal,
    handleOpenDetailModal,
    handleCloseDetailModal,
    handleSaveModel,
    loadingModel,
    handleChangeSimpleField,
    handleChangeObjectField,
    handleChangeTreeObjectField,
    dispatch,
    handleUpdateNewModel,
  } = useDetailCategoryModal(
    Category,
    categoryRepository.get,
    categoryRepository.save,
    master.handleSearch
  );

  const handleGoCreate = React.useCallback(() => {
    handleOpenDetailModal(null);
  }, [handleOpenDetailModal]);

  const handleAdd = React.useCallback(
    (node: any) => () => {
      const newModel = new Category();
      newModel.parent = node;
      newModel.parentId = node?.id;
      handleUpdateNewModel(newModel);
      handleOpenDetailModal(null);
    },
    [handleUpdateNewModel, handleOpenDetailModal]
  );

  const handleDelete = React.useCallback(
    (node: any) => () => {
      master.handleServerDelete(node);
    },
    [master]
  );

  const handleGoDetail = React.useCallback(
    (node: any) => () => {
      handleClosePreview();
      handleOpenDetailModal(node?.id);
    },
    [handleOpenDetailModal, handleClosePreview]
  );
  const handleFilter = React.useCallback((value) => {
    const newFilter = { ...master.filter };
    newFilter.search = value;
    master.handleUpdateNewFilter(newFilter);
  }, [master]);

  return (
    <>
      <div className="page page__master category-container">
        <AppMainMasterTitle {...master}>
          {translate("categories.master.title")}
        </AppMainMasterTitle>
        <div className="d-flex align-items-center ml-4 mr-4 mt-4">
          <div className="d-flex flex-grow-1">
            <div className="pr-4 w70">
              <InputSearch
                value={master.filter["search"]}
                onChange={handleFilter}
                placeHolder="Tìm kiếm" />
            </div>
          </div>
          <div className="d-flex justify-content-around ml-4 ">
            {validAction('create') &&
              <button
                className="btn component__btn-toggle grow-animate-1 btn-customize"
                onClick={handleGoCreate}
              >
                <i className="tio-add"></i>
                <span className="component_btn-text">
                  {translate("general.actions.create")}
                </span>
              </button>
            }
          </div>
        </div>
        <div className="page__master-table mt-4">
          <TreeList
            tree={treeDataList}
            onPreview={handleOpenPreview}
            onDelete={handleDelete}
            onEdit={handleGoDetail}
            onAdd={handleAdd}
          />
        </div>
      </div>
      {isOpenDetailModal && (
        <CategoryTreeDetail
          model={model}
          visible={isOpenDetailModal}
          handleSave={handleSaveModel}
          handleCancel={handleCloseDetailModal}
          onChangeSimpleField={handleChangeSimpleField}
          onChangeObjectField={handleChangeObjectField}
          onChangeTreeObjectField={handleChangeTreeObjectField}
          dispatchModel={dispatch}
          loading={loadingModel}
          visibleFooter={true}
        />
      )}

      <CategoryPreview
        previewModel={previewModel}
        isOpenPreview={isOpenPreview}
        isLoadingPreview={isLoadingPreview}
        handleClosePreview={handleClosePreview}
        handleGoDetail={handleGoDetail}
        translate={translate}
      />
    </>
  );
}

export default CategoryTreeMaster;
