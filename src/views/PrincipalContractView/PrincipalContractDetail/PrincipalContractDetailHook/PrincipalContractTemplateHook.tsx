import { commonService } from "@react3l/react3l/services";
import { Col, Row } from "antd";
import AdvanceDateFilter from "components/Utility/AdvanceFilter/AdvanceDateFilter/AdvanceDateFilter";
import AdvanceStringFilter from "components/Utility/AdvanceFilter/AdvanceStringFilter/AdvanceStringFilter";
import Modal from "components/Utility/Modal/Modal";
import { PRINCIPAL_CONTRACT_DETAIL_ROUTE } from "config/route-consts";
import { formatDate } from "helpers/date-time";
import { TFunction } from "i18next";
import {
  PrincipalContractTemplate,
  PrincipalContractTemplateFilter,
} from "models/PrincipalContractTemplate";
import React from "react";
import { useHistory } from "react-router";
import { principalContractRepository } from "repositories/principal-contract-repository";
import { forkJoin } from "rxjs";
import nameof from "ts-nameof.macro";
import "./PrincipalContractTemplate.scss";

export function usePrincipalContractTemplate() {
  const [openItemDialog, setOpenItemDialog] = React.useState<boolean>(false);
  const history = useHistory();
  const [subscription] = commonService.useSubscription();

  const [templateFilter, setTemplateFilter] = React.useState<
    PrincipalContractTemplateFilter
  >(new PrincipalContractTemplateFilter());

  const [templateList, setTemplateList] = React.useState<
    PrincipalContractTemplate[]
  >([]);

  const handleGetItemList = React.useCallback(
    async (filterValue) => {
      const newFilterValue = { ...filterValue };
      newFilterValue.take = 100000;
      const getNCountItems = forkJoin([
        principalContractRepository.listTemplate(
          newFilterValue
        ),
        principalContractRepository.countTemplate(
          newFilterValue
        ),
      ]).subscribe(
        (results: [PrincipalContractTemplate[], number]) => {
          if (results[0]) {
            const itemList = [...results[0]];
            // const totalValue = Number(results[1]);
            setTemplateList(itemList);
          }
        },
        (errors: any) => { }
      );
      subscription.add(getNCountItems);
    },
    [subscription]
  );

  const handleOpenMenuCreate = React.useCallback(() => {
    setOpenItemDialog(true);
    handleGetItemList(templateFilter);
  }, [handleGetItemList, templateFilter]);
  const handleCancel = React.useCallback(() => {
    setOpenItemDialog(false);
    setTemplateFilter(new PrincipalContractTemplateFilter());
  }, []);

  const handleChangeSearchItem = React.useCallback(
    (fieldName: string, filterType: string) => (value: any) => {
      const filterValue = { ...templateFilter };
      filterValue[fieldName][filterType] = value;
      setTemplateFilter(filterValue);
      handleGetItemList(filterValue);
    },
    [handleGetItemList, templateFilter]
  );
  const handleFilterDate = React.useCallback(
    (value) => {
      const filterValue = { ...templateFilter };
      filterValue["createdAt"]["greater"] = value[0];
      filterValue["createdAt"]["less"] = value[1];
      setTemplateFilter(filterValue);
      handleGetItemList(filterValue);
    },
    [handleGetItemList, templateFilter]
  );

  const handleGoCreateFormTemplate = React.useCallback(
    (item) => {
      history.push(
        `${PRINCIPAL_CONTRACT_DETAIL_ROUTE}?principalContractTemplateId=${item.id}`
      );
    },
    [history]
  );

  return {
    openItemDialog,
    templateList,
    templateFilter,
    setOpenItemDialog,
    handleOpenMenuCreate,
    handleChangeSearchItem,
    handleGoCreateFormTemplate,
    handleCancel,
    handleFilterDate,
  };
}

interface PrincipalContractTemplateModalProps {
  total?: number;
  itemList?: PrincipalContractTemplate[];
  templateFilter?: PrincipalContractTemplateFilter;
  visibleDialog?: boolean;
  translate?: TFunction;
  onCancelDialog?: () => void;
  onSaveDialog?: () => void;

  handleChangeSearchItem?: (
    fieldName: string,
    filterType: string
  ) => (value: any) => void;
  handleGoCreateFormTemplate?: (item: PrincipalContractTemplate) => void;
  handleFilterDate?: (value: any) => void;
}

export function PrincipalContractTemplateModal(
  props: PrincipalContractTemplateModalProps
) {
  const {
    itemList,
    templateFilter,
    visibleDialog,
    onCancelDialog,
    handleChangeSearchItem,
    translate,
    handleGoCreateFormTemplate,
    handleFilterDate,
  } = props;

  return (
    <>
      <Modal
        title={null}
        visible={visibleDialog}
        onCancel={onCancelDialog}
        width={526}
        closable={false}
        visibleFooter={false}
      >
        <div className="template-dialog__wrapper">
          <div className="template-dialog__container">
            <div className="d-flex justify-content-between">
              <div className="template-dialog__title">Chọn mẫu</div>
              <div className="btn-cancel" onClick={onCancelDialog}>
                <i className="tio-clear_circle" />
              </div>
            </div>

            <div className="template-dialog__filter">
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col lg={12}>
                  <AdvanceStringFilter
                    value={templateFilter[nameof(itemList[0].name)]["contain"]}
                    onEnter={handleChangeSearchItem("name", "contain")}
                    isMaterial={true}
                    className={"tio-search"}
                    placeHolder={"Tìm theo tên mẫu"}
                  />
                </Col>
                <Col lg={12}>
                  <AdvanceDateFilter
                    value={templateFilter.createdAt.greater}
                    onChange={handleFilterDate}
                    placeholder={"Chọn ngày"}
                    isMaterial={true}
                  />
                </Col>
              </Row>
            </div>

            <div className="template-dialog__list">
              {itemList &&
                itemList.map(
                  (currentItem: PrincipalContractTemplate, index: number) => (
                    <div className="template" key={currentItem.id}>
                      <div>
                        <div className="template-title">{currentItem.name}</div>
                        <div className="template-date">
                          {formatDate(currentItem.createdAt)}
                        </div>
                      </div>
                      <button
                        className="btn button__add btn-customize"
                        onClick={() => handleGoCreateFormTemplate(currentItem)}
                      >
                        <i className="tio-add"></i>
                        <span className="component_btn-text">
                          {translate("general.actions.use")}
                        </span>
                      </button>
                    </div>
                  )
                )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
