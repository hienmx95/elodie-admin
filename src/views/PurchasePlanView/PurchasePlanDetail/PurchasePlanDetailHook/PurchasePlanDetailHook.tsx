import { Model } from "@react3l/react3l/core";
import { commonService } from "@react3l/react3l/services";
import { Modal } from "antd";
import { AxiosError } from "axios";
import { PurchasePlan } from "models/PurchasePlan";
import React, { useCallback, useMemo, useState } from "react";
import { useHistory } from "react-router";
import { purchasePlanRepository } from "repositories/purchase-plan-repository";
import { Observable, Subscription } from "rxjs";
import { finalize } from "rxjs/operators";
import appMessageService from "services/app-message-service";
import { formService } from "services/form-service";
import { queryStringService } from "services/query-string-service";
import { routerService } from "services/route-service";
import "../PurchasePlanDetail.scss";

export function usePurchasePlanQuery(routePrefix: string) {
  // get id from url

  const { id }: any = queryStringService.useGetQueryString("id");

  const { id: purchaseRequestId }: any = queryStringService.useGetQueryString(
    "purchaseRequestId"
  );
  const { id: purchasePlanTypeId }: any = queryStringService.useGetQueryString(
    "purchasePlanTypeId"
  );
  // navigating master when update or create successfully
  const [, , , handleGoBase] = routerService.useMasterNavigation(
    routePrefix // master route
  );
  // message service

  return {
    handleGoBase,
    purchaseRequestId,
    purchasePlanTypeId,
    id,
  };
}

export function usePurchasePlanDraft<T extends Model>(
  getDraft: (T) => Observable<T>,
  initData: T,
  handleUpdateNewModel?: (data: PurchasePlan) => void,
  purchaseRequestId?: number
) {
  // get id from url
  const { id }: any = queryStringService.useGetQueryString("id");
  // navigating master when update or create successfully

  const isDetail = useMemo(
    () => (id?.toString().match(/^[0-9]+$/) ? true : false), // check if id is number
    [id]
  );

  const [loading, setLoadingInitData] = React.useState<boolean>(true);

  React.useEffect(() => {
    const subscription: Subscription = new Subscription();
    if (!isDetail && loading && purchaseRequestId) {
      const purchasePlan = new PurchasePlan();
      purchasePlan.purchaseRequestId = purchaseRequestId;
      subscription.add(
        getDraft(purchasePlan).subscribe((model: PurchasePlan) => {
          model.organization = initData?.organization;
          model.organizationId = initData?.organizationId;
          model.mainCurrency = initData?.mainCurrency;
          model.mainCurrencyId = initData?.mainCurrencyId;
          model.purchasePlanTypeId = initData?.purchasePlanTypeId;
          handleUpdateNewModel(model);
          setLoadingInitData(false);
        })
      );
    }

    return function cleanup() {
      subscription.unsubscribe();
    };
  }, [
    getDraft,
    handleUpdateNewModel,
    id,
    initData,
    isDetail,
    loading,
    purchaseRequestId,
  ]);

  return {
    setLoadingInitData,
  };
}

export function useDetailModal<T extends Model>(
  ModelClass: new () => T,
  getDetail?: (id: number) => Observable<T>,
  saveModel?: (t: T) => Observable<Model>,
  getDraftClosing?: (purchasePlan: T) => Observable<T>,
  handleUpdateNewPurchasePlan?,
  textNoti?: string
) {
  // message service
  const {
    notifyUpdateItemSuccess,
    notifyUpdateItemError,
  } = appMessageService.useCRUDMessage();

  const [subscription] = commonService.useSubscription();

  const [isOpenDetailModal, setIsOpenDetailModal] = useState<boolean>(false);
  const [loadingModel, setLoadingModel] = useState<boolean>(false);

  const [
    model,
    handleChangeSimpleField,
    handleChangeObjectField,
    handleUpdateNewModel, // alternate for setModel
    handleChangeTreeObjectField,
    handleChangeTreeListField,
    dispatch,
    handleChangeMappingField,
  ] = formService.useDetailForm<T>(ModelClass, undefined, getDetail); // id is undefined as we not archive id from url

  const handleOpenDetailModal = useCallback(
    (id?: number) => {
      setIsOpenDetailModal(true);
      if (id) {
        setLoadingModel(true);

        subscription.add(
          getDetail(id)
            .pipe(finalize(() => setLoadingModel(false)))
            .subscribe((item: T) => {
              handleUpdateNewModel(item);
            })
        );
      }
    },
    [subscription, handleUpdateNewModel, getDetail]
  ); // handleOpen detailModal from list

  const handleOpenDraftModal = useCallback(
    (model?: T) => {
      setIsOpenDetailModal(true);
      if (model) {
        setLoadingModel(true);

        subscription.add(
          getDraftClosing(model)
            .pipe(finalize(() => setLoadingModel(false)))
            .subscribe((item: T) => {
              handleUpdateNewModel(item);
            })
        );
      } else {
        handleUpdateNewModel(new ModelClass());
      }
    },
    [subscription, getDraftClosing, handleUpdateNewModel, ModelClass]
  ); // handleOpen detailModal from list

  const handleSaveModel = useCallback(() => {
    setLoadingModel(true);
    subscription.add(
      saveModel(model)
        .pipe(finalize(() => setLoadingModel(false)))
        .subscribe(
          (item: T) => {
            handleUpdateNewModel(item); // setModel
            setIsOpenDetailModal(false); // close Modal
            notifyUpdateItemSuccess(); // global message service go here
            Modal.warning({
              className: "purchase-plan__confirm",
              title: "",
              icon: "",
              content: (
                <>
                  <div className="d-flex align-items-center justify-content-center mt-3">
                    <div>
                      <img
                        alt=""
                        src={require("assets/images/illutration-image/sendmail.svg")}
                        width="150"
                      />
                      <div className="send-mail-success mt-3">{textNoti}</div>
                    </div>
                  </div>
                </>
              ),
              okText: (
                <span>
                  <i className="tio-chevron_left" /> Quay lại
                </span>
              ),
              onOk() {
                if (model?.id) {
                  purchasePlanRepository
                    .get(model?.id)
                    .subscribe((res: any) => {
                      handleUpdateNewPurchasePlan(res);
                    });
                }
              },
            });
          },
          (error: AxiosError<T>) => {
            if (error.response && error.response.status === 400)
              handleUpdateNewModel(error.response?.data);
            notifyUpdateItemError(); // global message service go here
          }
        )
    );
  }, [
    subscription,
    saveModel,
    model,
    handleUpdateNewModel,
    notifyUpdateItemSuccess,
    textNoti,
    handleUpdateNewPurchasePlan,
    notifyUpdateItemError,
  ]);

  const handleCloseDetailModal = useCallback(() => {
    setIsOpenDetailModal(false);
    if (model.id) handleUpdateNewModel({ ...model });
    else handleUpdateNewModel({ ...new ModelClass() });
  }, [ModelClass, handleUpdateNewModel, model]);

  return {
    model,
    isOpenDetailModal,
    loadingModel,
    handleOpenDetailModal,
    handleSaveModel,
    handleChangeSimpleField,
    handleChangeObjectField,
    handleChangeTreeObjectField,
    handleCloseDetailModal,
    handleChangeTreeListField,
    dispatch,
    handleChangeMappingField,
    handleUpdateNewModel,
    setIsOpenDetailModal,
    handleOpenDraftModal,
  };
}

export function useMailModal<T extends Model>(
  ModelClass: new () => T,
  getDetail?: (id: number) => Observable<T>,
  saveModel?: (t: T) => Observable<Model>,
  createMail?: (t: T) => Observable<Model>,
  routePrefix?,
  purchasePlan?: T,
  handleUpdatePurchasePlan?
) {
  // message service
  const {
    notifyUpdateItemSuccess,
    notifyUpdateItemError,
  } = appMessageService.useCRUDMessage();

  const [subscription] = commonService.useSubscription();

  const [isOpenDetailModal, setIsOpenDetailModal] = useState<boolean>(false);
  const [loadingModel, setLoadingModel] = useState<boolean>(false);

  const history = useHistory();
  const baseRoute = React.useMemo(() => {
    let listPath = routePrefix.split("/");
    const baseRoute = "/" + listPath[listPath.length - 1];
    return baseRoute;
  }, [routePrefix]);

  const handleGoNextStep = React.useCallback(
    (id) => {
      history.replace(
        `${routePrefix}${baseRoute}-waiting?id=${id}&purchasePlanTypeId=${purchasePlan?.purchasePlanTypeId}`
      );
    },
    [baseRoute, history, purchasePlan, routePrefix]
  );
  const [
    model,
    handleChangeSimpleField,
    handleChangeObjectField,
    handleUpdateNewModel, // alternate for setModel
    handleChangeTreeObjectField,
    handleChangeTreeListField,
    dispatch,
    handleChangeMappingField,
  ] = formService.useDetailForm<T>(ModelClass, undefined, getDetail); // id is undefined as we not archive id from url

  const handleOpenDetailModal = useCallback(
    (id?: number) => {
      subscription.add(
        saveModel(purchasePlan)
          .pipe(finalize(() => setLoadingModel(false)))
          .subscribe(
            (item: any) => {
              handleUpdatePurchasePlan(item); // setModel
              setIsOpenDetailModal(true);
              const newModel = {
                ...model,
                purchasePlanId: item?.id,
              };
              handleUpdateNewModel(newModel);
            },
            (error: AxiosError<T>) => {
              if (error.response && error.response.status === 400)
                handleUpdatePurchasePlan(error.response?.data);
            }
          )
      );
    },
    [
      subscription,
      saveModel,
      purchasePlan,
      handleUpdatePurchasePlan,
      model,
      handleUpdateNewModel,
    ]
  ); // handleOpen detailModal from list

  const handleSaveModel = useCallback(() => {
    setLoadingModel(true);
    const newNodel = {
      ...model,
      purchasePlanId: purchasePlan?.id,
    };
    subscription.add(
      createMail(newNodel)
        .pipe(finalize(() => setLoadingModel(false)))
        .subscribe(
          (item: T) => {
            handleUpdateNewModel(item); // setModel
            setIsOpenDetailModal(false); // close Modal
            notifyUpdateItemSuccess(); // global message service go here
            // handleGoBase();
            Modal.warning({
              className: "purchase-plan__confirm",
              title: "",
              icon: "",
              content: (
                <>
                  <div className="d-flex align-items-center justify-content-center mt-3">
                    <div>
                      <img
                        alt=""
                        src={require("assets/images/illutration-image/sendmail.svg")}
                        width="150"
                      />
                      <div className="send-mail-success mt-3">
                        Gửi Email thành công!
                      </div>
                    </div>
                  </div>
                </>
              ),
              okText: (
                <span>
                  <i className="tio-chevron_left" /> Quay lại
                </span>
              ),
              onOk() {
                if (purchasePlan?.id) {
                  handleGoNextStep(purchasePlan?.id);
                }
              },
            });
          },
          (error: AxiosError<T>) => {
            if (error.response && error.response.status === 400)
              handleUpdateNewModel(error.response?.data);
            notifyUpdateItemError(); // global message service go here
          }
        )
    );
  }, [
    subscription,
    createMail,
    model,
    handleUpdateNewModel,
    notifyUpdateItemSuccess,
    purchasePlan,
    handleGoNextStep,
    notifyUpdateItemError,
  ]);

  const handleCloseDetailModal = useCallback(() => {
    setIsOpenDetailModal(false);
    if (model.id) handleUpdateNewModel({ ...model });
    else handleUpdateNewModel({ ...new ModelClass() });
  }, [ModelClass, handleUpdateNewModel, model]);

  return {
    model,
    isOpenDetailModal,
    loadingModel,
    handleOpenDetailModal,
    handleSaveModel,
    handleChangeSimpleField,
    handleChangeObjectField,
    handleChangeTreeObjectField,
    handleCloseDetailModal,
    handleChangeTreeListField,
    dispatch,
    handleChangeMappingField,
    handleUpdateNewModel,
    setIsOpenDetailModal,
  };
}

export function useDetail<T extends Model>(
  ModelClass: new () => T,
  getDetail: (id: number) => Observable<T>,
  saveModel: (t: T) => Observable<T>,
  routePrefix: string,
  initData?: T
) {
  // get id from url
  const { id }: any = queryStringService.useGetQueryString("id");
  const { id: purchaseRequestId }: any = queryStringService.useGetQueryString(
    "purchaseRequestId"
  );
  const history = useHistory();

  const baseRoute = React.useMemo(() => {
    let listPath = routePrefix.split("/");
    const baseRoute = "/" + listPath[listPath.length - 1];
    return baseRoute;
  }, [routePrefix]);

  const handleGoBase = React.useCallback(() => {
    if (purchaseRequestId) {
      history.replace(`${routePrefix}${baseRoute}-master?viewIndex=1`);
    } else {
      history.replace(`${routePrefix}${baseRoute}-master?viewIndex=2`);
    }
  }, [baseRoute, history, purchaseRequestId, routePrefix]);

  const handleGoPurchasePlanType = React.useCallback(() => {
    Modal.confirm({
      className: "modal-purchase-plan-type__confirm",
      title: "",
      icon: "",
      content: (
        <>
          <div className="confirm d-flex align-items-center justify-content-center mt-3">
            <img
              alt=""
              src={require("assets/images/illutration-image/plan.jpg")}
              width="167"
            />
            <div className="confirm-title mt-3">
              Thay đổi Phương án mua sắm!
            </div>
            <div className="confirm-content mt-3">
              Toàn bộ thông tin đã nhập sẽ bị xóa khi bạn thay đổi Phương án mua
              sắm. Hãy chắc chắn bạn muốn thực hiện trước khi xác nhận!
            </div>
          </div>
        </>
      ),
      okText: (
        <span>
          <i className="tio-checkmark_circle_outlined" /> Xác nhận
        </span>
      ),

      cancelText: (
        <span>
          <i className="tio-clear" /> Hủy
        </span>
      ),
      onOk() {
        if (typeof initData?.purchaseRequestId === "undefined") {
          history.replace(`${routePrefix}${baseRoute}-master?viewIndex=3`);
        } else {
          history.replace(
            `${routePrefix}${baseRoute}-master?viewIndex=3&purchaseRequestId=${initData?.purchaseRequestId}`
          );
        }
      },
    });
  }, [initData, history, routePrefix, baseRoute]);
  // message service
  const {
    notifyUpdateItemSuccess,
    notifyUpdateItemError,
  } = appMessageService.useCRUDMessage();
  // subscription service for clearing subscription
  const [subscription] = commonService.useSubscription();

  const isDetail = useMemo(
    () => (id?.toString().match(/^[0-9]+$/) ? true : false), // check if id is number
    [id]
  );

  const [loading, setLoading] = useState<boolean>(false);

  const [
    model,
    handleChangeSimpleField,
    handleChangeObjectField,
    handleUpdateNewModel, // alternate for setModel
    handleChangeTreeObjectField,
    handleChangeTreeListField,
    dispatch,
    handleChangeMappingField,
  ] = formService.useDetailForm<T>(
    ModelClass,
    parseInt(id),
    getDetail,
    initData
  );

  const handleSave = useCallback(
    (onSaveSuccess?: (item: T) => void, onSaveError?: (item: T) => void) => {
      return () => {
        setLoading(true);
        subscription.add(
          saveModel(model)
            .pipe(finalize(() => setLoading(false)))
            .subscribe(
              (item: T) => {
                handleUpdateNewModel(item); // setModel
                handleGoBase(); // go master
                notifyUpdateItemSuccess(); // global message service go here
                if (typeof onSaveSuccess === "function") {
                  onSaveSuccess(item); // trigger custom effect when updating success
                }
              },
              (error: AxiosError<T>) => {
                if (error.response && error.response.status === 400) {
                  handleUpdateNewModel(error.response?.data); // setModel for catching error
                }
                notifyUpdateItemError(); // global message service go here
                if (typeof onSaveError === "function") {
                  onSaveError(error.response?.data); // trigger custom effect when updating success
                }
              }
            )
        );
      };
    },
    [
      handleGoBase,
      handleUpdateNewModel,
      model,
      notifyUpdateItemError,
      notifyUpdateItemSuccess,
      saveModel,
      subscription,
    ]
  );

  return {
    model,
    isDetail,
    handleChangeSimpleField,
    handleChangeObjectField,
    handleChangeMappingField,
    handleUpdateNewModel,
    handleChangeTreeObjectField,
    handleChangeTreeListField,
    loading,
    handleGoBase,
    handleSave,
    dispatch,
    handleGoPurchasePlanType,
  };
}
