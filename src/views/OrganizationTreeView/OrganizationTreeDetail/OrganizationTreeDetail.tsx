/* begin general import */
import { CaretRightOutlined } from "@ant-design/icons";
import { commonService } from "@react3l/react3l/services";
import { Col, Collapse, Row } from "antd";
import AppFooter from "components/AppFooter/AppFooter";
import FormItem from "components/Utility/FormItem/FormItem";
import InputText from "components/Utility/Input/InputText/InputText";
import SwitchStatus from "components/Utility/SwitchStatus/SwitchStatus";
import TreeSelect from "components/Utility/TreeSelect/TreeSelect";
/* end general import */
/* begin individual import */
import { ORGANIZATION_ROUTE } from "config/route-consts";
import { Organization, OrganizationFilter } from "models/Organization";
import { Status } from "models/Status";
import React from "react";
import { useTranslation } from "react-i18next";
import { organizationRepository } from "repositories/organization-repository";
import { enumService } from "services/enum-service";
import { formService } from "services/form-service";
import detailService from "services/pages/detail-service";
import nameof from "ts-nameof.macro";
import { useOrganizationTreeFooterHook } from "./OrganizationTreeDetailHook/OrganizationTreeFooterHook";

/* end individual import */

const { Panel } = Collapse;
function OrganizationTreeDetail() {
  const [translate] = useTranslation();
  const {
    model,
    handleUpdateNewModel,
    isDetail,
    handleChangeSimpleField,
    handleChangeTreeObjectField,
    handleChangeObjectField,
    handleGoBase,
    handleSave,
  } = detailService.useDetail<Organization>(
    Organization,
    organizationRepository.get,
    organizationRepository.save,
    ORGANIZATION_ROUTE
  );
  const { childrenAction } = useOrganizationTreeFooterHook(
    translate,
    model,
    handleGoBase,
    handleSave
  );
  const [statusList] = enumService.useEnumList<Status>(
    organizationRepository.singleListStatus
  );
  const [isSet, setIsSet] = React.useState<boolean>(true);
  const res = window.location.href.split("=");
  // let idOrg: any = null;
  // if (isSet && res && res.length > 1) {
  //   setIsSet(false);
  //   idOrg = Number(res[1]);
  //   let parenttt = new Organization();
  //   // parenttt.id = (res[1]);
  //   parenttt.name = (res[1]);
  //   handleUpdateNewModel({ ...model, parent: parenttt });
  // }
  const [subscription] = commonService.useSubscription();
  const url = document.URL;
  React.useEffect(() => {
    if (isSet && url.includes("createId=")) {
      setIsSet(false);
      subscription.add(
        organizationRepository
          .get(Number(res[1]))
          .pipe()
          .subscribe((item: Organization) => {
            model.parent = item;
            model.parentId = item?.id;
            handleUpdateNewModel(model);
          })
      );
    }
  }, [handleUpdateNewModel, isSet, model, res, subscription, url]);
  return (
    <>
      <div className="page page__detail">
        <div className="page__header d-flex align-items-center">
          {isDetail ? (
            <div className="page__title mr-1">
              {translate("general.detail.generalInfomation")}
            </div>
          ) : (
            translate("general.actions.create")
          )}
        </div>

        <div className="page__detail-tabs">
          <>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col lg={24}>
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
                    header={translate("organizations.detail.title")}
                    key="1"
                    className="site-collapse-custom-panel"
                  >
                    <Row className="justify-content-between">
                      <Col lg={11} className="labelDetail">
                        <FormItem
                          label={translate("organizations.code")}
                          validateStatus={formService.getValidationStatus<
                            Organization
                          >(model.errors, nameof(model.code))}
                          message={model.errors?.code}
                          isRequired={true}
                        >
                          <InputText
                            isMaterial={true}
                            value={model.code}
                            placeHolder={translate(
                              "organizations.placeholder.code"
                            )}
                            onChange={handleChangeSimpleField(
                              nameof(model.code)
                            )}
                          />
                        </FormItem>
                      </Col>
                      <Col lg={11} className="labelDetail">
                        <FormItem
                          label={translate("organizations.address")}
                          validateStatus={formService.getValidationStatus<
                            Organization
                          >(model.errors, nameof(model.address))}
                          message={model.errors?.address}
                        >
                          <InputText
                            isMaterial={true}
                            value={model.address}
                            placeHolder={translate(
                              "organizations.placeholder.address"
                            )}
                            onChange={handleChangeSimpleField(
                              nameof(model.address)
                            )}
                          />
                        </FormItem>
                      </Col>
                    </Row>
                    <Row className="justify-content-between">
                      <Col lg={11} className="labelDetail">
                        <FormItem
                          label={translate("organizations.name")}
                          validateStatus={formService.getValidationStatus<
                            Organization
                          >(model.errors, nameof(model.name))}
                          message={model.errors?.name}
                          isRequired={true}
                        >
                          <InputText
                            isMaterial={true}
                            value={model.name}
                            placeHolder={translate(
                              "organizations.placeholder.name"
                            )}
                            onChange={handleChangeSimpleField(
                              nameof(model.name)
                            )}
                          />
                        </FormItem>
                      </Col>
                      <Col lg={11} className="labelDetail">
                        <FormItem
                          label={translate("organizations.email")}
                          validateStatus={formService.getValidationStatus<
                            Organization
                          >(model.errors, nameof(model.email))}
                          message={model.errors?.email}
                        >
                          <InputText
                            isMaterial={true}
                            value={model.email}
                            placeHolder={translate(
                              "organizations.placeholder.email"
                            )}
                            onChange={handleChangeSimpleField(
                              nameof(model.email)
                            )}
                          />
                        </FormItem>
                      </Col>
                    </Row>
                    <Row className="justify-content-between">
                      <Col lg={11} className="labelDetail mt-3">
                        <FormItem>
                          <span className="component__title mr-3">
                            {translate("roles.status")}
                          </span>
                          <SwitchStatus
                            checked={
                              model.statusId === statusList[1]?.id
                                ? true
                                : false
                            }
                            list={statusList}
                            onChange={handleChangeObjectField(
                              nameof(model.status)
                            )}
                          />
                        </FormItem>
                      </Col>
                      <Col lg={11} className="labelDetail">
                        <FormItem
                          label={translate("organizations.phone")}
                          validateStatus={formService.getValidationStatus<
                            Organization
                          >(model.errors, nameof(model.phone))}
                          message={model.errors?.phone}
                        >
                          <InputText
                            isMaterial={true}
                            value={model.phone}
                            placeHolder={translate(
                              "organizations.placeholder.phone"
                            )}
                            onChange={handleChangeSimpleField(
                              nameof(model.phone)
                            )}
                            className={"tio-layers"}
                          />
                        </FormItem>
                      </Col>
                    </Row>
                    <Row className="justify-content-between">
                      <Col lg={11} className="labelDetail">
                        <FormItem
                          label={translate("organizations.organization")}
                          validateStatus={formService.getValidationStatus<
                            Organization
                          >(model.errors, nameof(model.parent))}
                          message={model.errors?.parent}
                        >
                          <TreeSelect
                            isMaterial={true}
                            placeHolder={translate(
                              "organizations.placeholder.organization"
                            )}
                            selectable={true}
                            classFilter={OrganizationFilter}
                            onChange={handleChangeTreeObjectField(
                              nameof(model.parent)
                            )}
                            checkStrictly={true}
                            getTreeData={
                              organizationRepository.singleListOrganization
                            }
                            item={model.parent}
                            // defaultValue={isDetail ? model.parent?.id : idOrg}
                          />
                        </FormItem>
                      </Col>
                    </Row>
                  </Panel>
                </Collapse>
              </Col>
            </Row>
          </>
        </div>
        <AppFooter childrenAction={childrenAction} />
      </div>
    </>
  );
}

export default OrganizationTreeDetail;
