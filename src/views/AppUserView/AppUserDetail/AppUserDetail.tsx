import { CaretRightOutlined } from "@ant-design/icons";
import { Col, Collapse, Row } from "antd";
import AppFooter from "components/AppFooter/AppFooter";
import DatePicker from "components/Utility/Calendar/DatePicker/DatePicker";
import FormItem from "components/Utility/FormItem/FormItem";
import InputNumber from "components/Utility/Input/InputNumber/InputNumber";
import InputText from "components/Utility/Input/InputText/InputText";
import Select from "components/Utility/Select/Select";
import UploadFile, {
  UPLOADTYPE,
} from "components/Utility/UploadFile/UploadFile";
import { APP_USER_MASTER_ROUTE, CUSTOMER_MASTER_ROUTE } from "config/route-consts";
import { AppUser } from "models/AppUser";
import { OrganizationFilter } from "models/Organization";
import { SexFilter } from "models/Sex";
import React from "react";
import { useTranslation } from "react-i18next";
import { appUserRepository } from "repositories/app-user-repository";
import { formService } from "services/form-service";
import detailService from "services/pages/detail-service";
import nameof from "ts-nameof.macro";
import { useAppUserDetailHook } from "./AppUserDetailHook/AppUserDetailHook";
import { useAppUserFooter } from "./AppUserDetailHook/useAppUserFooterHook";

const { Panel } = Collapse;

function AppUserDetail() {
  const [translate] = useTranslation();
  const {
    model,
    // isDetail,
    handleUpdateNewModel,
    handleChangeSimpleField,
    handleChangeObjectField,
    handleGoBase,
    handleSave,
  } = detailService.useDetail<AppUser>(
    AppUser,
    appUserRepository.get,
    appUserRepository.save,
    APP_USER_MASTER_ROUTE
  );

  const { handleChangeAvatar } = useAppUserDetailHook(
    model,
    handleUpdateNewModel
  );

  const { childrenAction } = useAppUserFooter(
    translate,
    model,
    handleSave,
    handleGoBase
  );

  return (
    <>
      <div className="w-100 mt-3 page__detail-tabs">
        <Row className="d-flex">
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
                header={translate("Thông tin chung")}
                key="1"
                className="site-collapse-custom-panel"
              >
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  <Col lg={12} className="gutter">
                    <FormItem
                      label={translate("appUsers.avatar")}
                      validateStatus={formService.getValidationStatus<AppUser>(
                        model.errors,
                        nameof(model.avatar)
                      )}
                      message={model.errors?.avatar}
                      isRequired={true}
                    >
                      <div className="upload-file__container">
                        <UploadFile
                          files={model.avatar ? [{ url: model.avatar }] : []}
                          onUploadImage={appUserRepository.saveImage}
                          type={UPLOADTYPE.IMAGE}
                          updateList={handleChangeAvatar}
                        />
                      </div>
                    </FormItem>
                  </Col>
                  <Col lg={12} className="gutter"></Col>
                </Row>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  <Col lg={12} className="gutter">
                    <FormItem
                      label={translate("appUsers.username")}
                      validateStatus={formService.getValidationStatus<AppUser>(
                        model.errors,
                        nameof(model.username)
                      )}
                      message={model.errors?.username}
                      isRequired={true}
                    >
                      <InputText
                        isMaterial={true}
                        value={model.username}
                        placeHolder={translate("Shared.write", {
                          value: translate("appUsers.username").toLowerCase(),
                        })}
                        onChange={handleChangeSimpleField(
                          nameof(model.username)
                        )}
                      />
                    </FormItem>
                  </Col>
                  <Col lg={12} className="gutter">
                    <FormItem
                      label={translate("appUsers.organization")}
                      validateStatus={formService.getValidationStatus<AppUser>(
                        model.errors,
                        nameof(model.organizationId)
                      )}
                      message={model.errors?.organizationId}
                      isRequired={true}
                    >
                      <Select
                        isMaterial={true}
                        classFilter={OrganizationFilter}
                        placeHolder={translate("Shared.choose", {
                          value: translate(
                            "appUsers.organization"
                          ).toLowerCase(),
                        })}
                        getList={appUserRepository.singleListOrganization}
                        onChange={handleChangeObjectField(
                          nameof(model.organization)
                        )}
                        model={model.organization}
                      />
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  <Col lg={12} className="gutter">
                    <FormItem
                      label={translate("appUsers.displayName")}
                      validateStatus={formService.getValidationStatus<AppUser>(
                        model.errors,
                        nameof(model.displayName)
                      )}
                      message={model.errors?.displayName}
                      isRequired={true}
                    >
                      <InputText
                        isMaterial={true}
                        value={model.displayName}
                        placeHolder={translate("Shared.write", {
                          value: translate(
                            "appUsers.displayName"
                          ).toLowerCase(),
                        })}
                        onChange={handleChangeSimpleField(
                          nameof(model.displayName)
                        )}
                      />
                    </FormItem>
                  </Col>
                  <Col lg={12} className="gutter">
                    <FormItem
                      label={translate("appUsers.dayofBirth")}
                      validateStatus={formService.getValidationStatus<AppUser>(
                        model.errors,
                        nameof(model.birthday)
                      )}
                      message={model.errors?.birthday}
                    >
                      <DatePicker
                        isMaterial={true}
                        value={model.birthday}
                        disabledDate={(d) =>
                          d.isAfter(
                            new Date(
                              new Date().setDate(new Date().getDate() - 1)
                            )
                          )
                        }
                        placeholder={translate("Shared.choose", {
                          value: translate("appUsers.dayofBirth").toLowerCase(),
                        })}
                        onChange={handleChangeSimpleField(
                          nameof(model.birthday)
                        )}
                      />
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  <Col lg={12} className="gutter">
                    <FormItem
                      label={translate("appUsers.phone")}
                      validateStatus={formService.getValidationStatus<AppUser>(
                        model.errors,
                        nameof(model.phone)
                      )}
                      message={model.errors?.phone}
                      isRequired={true}
                    >
                      <InputNumber
                        isMaterial={true}
                        value={model.phone}
                        maxLength={11}
                        numberType={"PHONE"}
                        placeHolder={translate("Shared.write", {
                          value: translate("appUsers.phone").toLowerCase(),
                        })}
                        onChange={handleChangeSimpleField(nameof(model.phone))}
                      />
                    </FormItem>
                  </Col>
                  <Col lg={12} className="gutter">
                    <FormItem
                      label={translate("appUsers.address")}
                      validateStatus={formService.getValidationStatus<AppUser>(
                        model.errors,
                        nameof(model.address)
                      )}
                      message={model.errors?.address}
                    >
                      <InputText
                        isMaterial={true}
                        value={model.address}
                        placeHolder={translate("Shared.write", {
                          value: translate("appUsers.address").toLowerCase(),
                        })}
                        onChange={handleChangeSimpleField(
                          nameof(model.address)
                        )}
                      />
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  <Col lg={12} className="gutter">
                    <FormItem
                      label={translate("appUsers.email")}
                      validateStatus={formService.getValidationStatus<AppUser>(
                        model.errors,
                        nameof(model.email)
                      )}
                      message={model.errors?.email}
                      isRequired={true}
                    >
                      <InputText
                        isMaterial={true}
                        value={model.email}
                        placeHolder={translate("Shared.write", {
                          value: translate("appUsers.email").toLowerCase(),
                        })}
                        onChange={handleChangeSimpleField(nameof(model.email))}
                      />
                    </FormItem>
                  </Col>
                  <Col lg={6} className="gutter">
                    <FormItem
                      label={translate("appUsers.sex")}
                      validateStatus={formService.getValidationStatus<AppUser>(
                        model.errors,
                        nameof(model.sex)
                      )}
                      message={model.errors?.sex}
                    >
                      <Select
                        isMaterial={true}
                        classFilter={SexFilter}
                        placeHolder={translate("Shared.choose", {
                          value: translate("appUsers.sex").toLowerCase(),
                        })}
                        getList={appUserRepository.singleListSex}
                        onChange={handleChangeObjectField(nameof(model.sex))}
                        model={model.sex}
                      />
                    </FormItem>
                  </Col>
                  <Col lg={6} className="gutter">
                    <FormItem
                      label={translate("appUsers.sex")}
                      validateStatus={formService.getValidationStatus<AppUser>(
                        model.errors,
                        nameof(model.status)
                      )}
                      message={model.errors?.status}
                    >
                      <Select
                        isMaterial={true}
                        classFilter={SexFilter}
                        placeHolder={translate("Shared.choose", {
                          value: translate("appUsers.status").toLowerCase(),
                        })}
                        getList={appUserRepository.singleListStatus}
                        onChange={handleChangeObjectField(nameof(model.status))}
                        model={model.status}
                      />
                    </FormItem>
                  </Col>
                </Row>
              </Panel>
            </Collapse>
          </Col>
        </Row>
      </div>
      <AppFooter childrenAction={childrenAction}></AppFooter>
    </>
  );
}

export default AppUserDetail;
