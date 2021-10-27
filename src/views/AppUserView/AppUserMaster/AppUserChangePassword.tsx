/* begin general import */
import { Model } from "@react3l/react3l/core/model";
import { Col, Row } from "antd";
import FormItem from "components/Utility/FormItem/FormItem";
import InputText from "components/Utility/Input/InputText/InputText";
import Modal from "components/Utility/Modal/Modal";
import { TFunction } from "i18next";
/* end general import */
/* begin individual import */
import { Customer } from "models/Customer";
import React from "react";
import { formService } from "services/form-service";
import { AppUserChangePasswordHook } from "./AppUserChangePasswordHook";
import nameof from "ts-nameof.macro";
/* end individual import */

interface CustomerPreviewProps<T extends Model> {
  id: number;
  isOpenPreview?: boolean;
  isLoadingPreview?: boolean;
  handleClosePanel?: () => void;
  translate?: TFunction;
}

export class ChangePassword extends Model {
  public newPassword?: string;
  public reNewpassword?: string;
}

function AppUserChangePassword(props: CustomerPreviewProps<Customer>) {
  const {
    id,
    isOpenPreview,
    isLoadingPreview,
    handleClosePanel,
    translate,
  } = props;

  const {
    handleChangePassWord,
    handleChangePassWordRe,
    model,
    isCheck,
    handleSave,
    closePanel
  } = AppUserChangePasswordHook(id, translate, handleClosePanel);

  return (
    <>
      <Modal
        title={null}
        visible={isOpenPreview}
        handleCancel={closePanel}
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
                  <div className="preview__header-text">
                    <span className="preview__header-title">
                      {translate("appUsers.changePassword")}
                    </span>
                  </div>
                </div>
              </div>
              <div className="preview__body">
                <div className="preview__content">
                  <Row className="w-100">
                    <Col lg={8} className="gutter"></Col>
                    <Col lg={8} className="gutter">
                      <FormItem
                        label={translate("appUsers.writePassword")}
                        validateStatus={formService.getValidationStatus<
                          ChangePassword
                        >(model.errors, nameof(model.newPassword))}
                        message={model.errors?.newPassword}
                        isRequired={true}
                      >
                        <InputText
                          isMaterial={true}
                          type={'password'}
                          value={model.newPassword}
                          onChange={handleChangePassWord()}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={8} className="gutter"></Col>
                  </Row>
                  <Row className="w-100">
                    <Col lg={8} className="gutter"></Col>
                    <Col lg={8} className="gutter">
                      <FormItem
                        label={translate("appUsers.reWritePassword")}
                        validateStatus={formService.getValidationStatus<
                          ChangePassword
                        >(model.errors, nameof(model.reNewpassword))}
                        message={model.errors?.reNewpassword}
                        isRequired={true}
                      >
                        <InputText
                          isMaterial={true}
                          type={'password'}
                          value={model.reNewpassword}
                          onChange={handleChangePassWordRe()}
                        />
                      </FormItem>
                    </Col>
                    <Col lg={8} className="gutter"></Col>{" "}
                  </Row>
                </div>
              </div>
              <div className="preview__footer">
                <button
                  className="btn btn-sm component__btn-primary mr-2"
                  disabled={!isCheck}
                  onClick={handleSave}
                >
                  <span>
                    <i className="tio-save mr-2" />{" "}
                    {translate("general.actions.save")}
                  </span>
                </button>

                <button
                  className="btn btn-sm component__btn-cancel mr-2"
                  onClick={closePanel}
                >
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

export default AppUserChangePassword;
