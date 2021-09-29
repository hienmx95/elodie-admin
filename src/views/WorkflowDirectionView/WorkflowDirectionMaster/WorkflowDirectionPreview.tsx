/* begin general import */
import { Model } from "@react3l/react3l/core/model";
import { Descriptions } from "antd";
import Table, { ColumnProps } from "antd/lib/table";
import Modal from "components/Utility/Modal/Modal";
import { formatDate } from "helpers/date-time";
import { formatNumber } from "helpers/number";
import { renderMasterIndex } from "helpers/table";
import { TFunction } from "i18next";
import { AppUser, AppUserFilter } from "models/AppUser";
import { Organization, OrganizationFilter } from "models/Organization";
/* end general import */
/* begin individual import */
import { WorkflowDirection } from "models/WorkflowDirection";
import React, { useMemo } from "react";
import { workflowDirectionRepository } from "repositories/workflow-direction-repository";
import nameof from "ts-nameof.macro";
/* end individual import */

interface WorkflowDirectionPreviewProps<T extends Model> {
  previewModel?: T;
  isOpenPreview?: boolean;
  isLoadingPreview?: boolean;
  handleClosePreview?: () => void;
  handleGoDetail?: (id: number) => () => void;
  translate?: TFunction;
}

function WorkflowDirectionPreview(
  props: WorkflowDirectionPreviewProps<WorkflowDirection>
) {
  const {
    previewModel,
    isOpenPreview,
    isLoadingPreview,
    handleClosePreview,
    // handleGoDetail,
    translate,
  } = props;
  const [organizationList, setOrganizationList] = React.useState<Organization>(
    []
  );
  const [appUserList, setAppUserList] = React.useState<AppUser>([]);
  React.useEffect(() => {
    workflowDirectionRepository
      .singleListOrganization(new OrganizationFilter())
      .subscribe((res) => {
        setOrganizationList(res);
      });
    workflowDirectionRepository
      .singleListAppUser(new AppUserFilter())
      .subscribe((res) => {
        setAppUserList(res);
      });
  }, []);
  const renderValue = React.useMemo(() => {
    return (content, value) => {
      switch (content?.workflowParameter?.workflowParameterTypeId) {
        /* singleList */
        case 1:
          let valueObject: any;
          if (content.workflowParameter.code === "OrganizationId") {
            valueObject = organizationList.filter(
              (item) => item.id === Number(value)
            );
          }
          if (content.workflowParameter.code === "SaleEmployeeId") {
            valueObject = appUserList.filter(
              (item) => item.id === Number(value)
            );
          }

          return (
            <>
              {valueObject && valueObject?.length > 0 && valueObject[0]?.id && (
                <div>
                  {valueObject[0].name
                    ? valueObject[0].name
                    : valueObject[0].displayName}
                </div>
              )}
            </>
          );
        /* string */
        case 2:
          return <>{value}</>;
        /* Long or decimal */
        case 3:
          return <>{formatNumber(Number(value))}</>;
        case 4:
          return <>{formatNumber(Number(value))}</>;
        /* date */
        case 5:
          return <>{formatDate(value)}</>;
      }
    };
  }, [appUserList, organizationList]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const columns: ColumnProps<WorkflowDirection>[] = useMemo(() => {
    return [
      {
        title: (
          <div className="text-center gradient-text">
            {translate("general.columns.index")}
          </div>
        ),
        key: "index",
        width: 100,
        align: "center",
        render: renderMasterIndex<WorkflowDirection>(),
      },
      {
        title: translate(
          "workflowDirections.workflowDirectionConditions.workflowParameter"
        ),
        key: nameof(
          previewModel.workflowDirectionConditions[0].workflowParameter
        ),
        dataIndex: nameof(
          previewModel.workflowDirectionConditions[0].workflowParameter
        ),
        render(...[workflowParameter]) {
          return workflowParameter?.name;
        },
      },
      {
        title: translate(
          "workflowDirections.workflowDirectionConditions.workflowOperator"
        ),
        key: nameof(
          previewModel.workflowDirectionConditions[0].workflowOperator
        ),
        dataIndex: nameof(
          previewModel.workflowDirectionConditions[0].workflowOperator
        ),
        align: "center",
        render(...[workflowOperator]) {
          return workflowOperator?.name;
        },
      },
      {
        title: translate(
          "workflowDirections.workflowDirectionConditions.value"
        ),
        key: nameof(previewModel.workflowDirectionConditions[0].value),
        dataIndex: nameof(previewModel.workflowDirectionConditions[0].value),
        render(...[value, content]) {
          return renderValue(content, value);
        },
      },
    ];
  }, [previewModel.workflowDirectionConditions, renderValue, translate]);

  return (
    <>
      <Modal
        title={null}
        visible={isOpenPreview}
        handleCancel={handleClosePreview}
        width={1200}
        visibleFooter={false}
      >
        {isLoadingPreview ? (
          <div className="loading-block">
            <img src="/assets/svg/spinner.svg" alt="Loading..." />
          </div>
        ) : (
          <div className="preview__containter">
            <div className="preview__left-side">
              <div className="preview__header">
                <div className="preview__vertical-bar"></div>
                <div className="preview__header-info">

                </div>
              </div>
              <div className="preview__body">
                <div className="preview__content">
                  <Descriptions title={previewModel.name} column={2}>
                    <Descriptions.Item
                      label={translate("workflowDirections.workflowDefinition")}
                    >
                      <span className="gradient-text">
                        {previewModel?.workflowDefinition?.name}
                      </span>
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={translate("workflowDirections.status")}
                    >
                      <span className="gradient-text">
                        {previewModel?.status?.name}
                      </span>
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={translate("workflowDirections.fromStep")}
                    >
                      <span className="gradient-text">
                        {previewModel?.fromStep?.name}
                      </span>
                    </Descriptions.Item>

                    <Descriptions.Item
                      label={translate("workflowDirections.toStep")}
                    >
                      <span className="gradient-text">
                        {previewModel?.toStep?.name}
                      </span>
                    </Descriptions.Item>
                  </Descriptions>

                  <Descriptions
                    title={translate(
                      "workflowDirections.titles.mailForCurrentStep"
                    )}
                    column={2}
                  >
                    <Descriptions.Item
                      label={translate("workflowDirections.subjectMail")}
                    >
                      <span className="gradient-text">
                        {previewModel.subjectMailForCurrentStep}
                      </span>
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={translate("workflowDirections.bodyMail")}
                    >
                      <span className="gradient-text">
                        {previewModel.bodyMailForCurrentStep}
                      </span>
                    </Descriptions.Item>
                  </Descriptions>
                  <Descriptions
                    title={translate(
                      "workflowDirections.titles.mailForCreator"
                    )}
                    column={2}
                  >
                    <Descriptions.Item
                      label={translate("workflowDirections.subjectMail")}
                    >
                      <span className="gradient-text">
                        {previewModel.subjectMailForCreator}
                      </span>
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={translate("workflowDirections.bodyMail")}
                    >
                      <span className="gradient-text">
                        {previewModel.bodyMailForCreator}
                      </span>
                    </Descriptions.Item>
                  </Descriptions>
                  <Descriptions
                    title={translate(
                      "workflowDirections.titles.mailForNextStep"
                    )}
                    column={2}
                  >
                    <Descriptions.Item
                      label={translate("workflowDirections.subjectMail")}
                    >
                      <span className="gradient-text">
                        {previewModel.subjectMailForNextStep}
                      </span>
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={translate("workflowDirections.bodyMail")}
                    >
                      <span className="gradient-text">
                        {previewModel.bodyMailForNextStep}
                      </span>
                    </Descriptions.Item>
                  </Descriptions>
                </div>
                <div className="preview__content">
                  <Descriptions
                    title={translate(
                      "workflowDirections.titles.workflowDirectionCondition"
                    )}
                    column={1}
                  >
                    <Descriptions.Item>
                      <Table
                        columns={columns}
                        dataSource={previewModel.workflowDirectionConditions}
                        rowKey={nameof(
                          previewModel.workflowDirectionConditions[0].id
                        )}
                        pagination={false}
                        className="w-100"
                      />
                    </Descriptions.Item>
                  </Descriptions>
                </div>
              </div>
              <div className="preview__footer">
                <button className="btn btn-cancel" onClick={handleClosePreview}>
                  <span>
                    <i className="tio-clear_circle_outlined"></i> Đóng
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

export default WorkflowDirectionPreview;
