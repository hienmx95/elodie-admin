import { Model } from "@react3l/react3l/core";
import { Modal } from "antd";
import { PurchasePlan } from "models/PurchasePlan";
import { QuotationHistory } from "models/QuotationHistory";
import React, { useCallback } from "react";
import { purchasePlanRepository } from "repositories/purchase-plan-repository";
import { Observable } from "rxjs";
import appMessageService from "services/app-message-service";
import "../../PurchasePlanDetail.scss";

export function useQuotation(
  model: PurchasePlan,
  getQuotationBySupplier?: (purchasePlanId, supplierId) => Observable<Model>,
  handleUpdateNewModel?
) {
  const [listQuotation, setListQuotation] = React.useState<QuotationHistory[]>(
    []
  );

  const handleGetSupplierQuotation = React.useCallback(
    (supplierId: any, index: any) => {
      return () => {
        const newModel = { ...model };
        newModel.selectedSupplierId = supplierId;
        if (
          newModel.purchasePlanSupplierMappings &&
          newModel.purchasePlanSupplierMappings?.length > 0
        ) {
          newModel.purchasePlanSupplierMappings.forEach((...[, i]) => {
            if (i === index) {
              newModel.purchasePlanSupplierMappings[i]["active"] = true;
            } else {
              newModel.purchasePlanSupplierMappings[i]["active"] = false;
            }
          });
        }
        handleUpdateNewModel(newModel);
        if (model?.requestForQuotationId) {
          getQuotationBySupplier(
            model?.requestForQuotationId,
            supplierId
          ).subscribe((res: any[]) => {
            setListQuotation(res);
          });
        }
      };
    },
    [getQuotationBySupplier, handleUpdateNewModel, model]
  );

  return {
    handleGetSupplierQuotation,
    listQuotation,
  };
}

export function useComparision(
  handleOpenDetailModal?,
  model?,
  handleUpdateNewModel?,
  handleGoBase?
) {
  // message service
  const {
    notifyUpdateItemSuccess,
    notifyUpdateItemError,
  } = appMessageService.useCRUDMessage();

  const handleOpenConfirmModal = useCallback(() => {
    Modal.confirm({
      className: "modal-comparision__confirm",
      icon: "",
      title: "",
      content: (
        <>
          <div className="modal-comparision__content d-flex align-items-center justify-content-center mt-3">
            <img
              alt=""
              src={require("assets/images/illutration-image/blogging1.svg")}
              width="168"
            />
            <div className="modal-comparision__content-title mt-3">
              Bạn có muốn tính điểm Nhà cung cấp?
            </div>
            <div className="modal-comparision__content-des mt-3">
              <div>Hệ thống sẽ tự tính điểm theo báo giá của các</div>
              <div>Nhà cung cấp và đưa ra lựa chọn Nhà cung cấp</div>
              <div> giá rẻ nhất.</div>
            </div>
          </div>
        </>
      ),
      cancelText: (
        <span>
          <i className="tio-clear" /> Đóng
        </span>
      ),
      okText: (
        <span>
          <i className="tio-checkmark_circle_outlined" /> Tính điểm
        </span>
      ),
      onOk() {
        purchasePlanRepository
          .getSupplierRankingByPrice(model?.id)
          .subscribe((res) => {
            handleOpenDetailModal(res);
          });
      },
    });
  }, [handleOpenDetailModal, model]);

  const handleOpenConfirmReplay = useCallback(() => {
    Modal.confirm({
      className: "modal-comparision__confirm modal-replay__confirm",
      icon: "",
      title: "",
      content: (
        <>
          <div className="modal-comparision__content d-flex align-items-center justify-content-center mt-3">
            <img
              alt=""
              src={require("assets/images/illutration-image/blogging1.svg")}
              width="168"
            />
            <div className="modal-comparision__content-title mt-3">
              Bạn có muốn chọn lại Nhà cung cấp ?
            </div>
            <div className="modal-comparision__content-des mt-3">
              Nhấn nút Chọn lại để tìm lại Nhà cung cấp phù hợp nhất.
            </div>
          </div>
        </>
      ),
      cancelText: (
        <span>
          <i className="tio-clear" /> Đóng
        </span>
      ),
      okText: (
        <span>
          <i className="tio-replay" /> Chọn lại
        </span>
      ),
      onOk() {
        purchasePlanRepository.rechooseSupplier(model?.id).subscribe(
          (res) => {
            handleUpdateNewModel(res);
            notifyUpdateItemSuccess();
          },
          () => {
            notifyUpdateItemError(); // global message service go here
          }
        );
      },
    });
  }, [
    handleUpdateNewModel,
    model,
    notifyUpdateItemError,
    notifyUpdateItemSuccess,
  ]);

  const handleOpenConfirmCancel = useCallback(() => {
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
            <div className="confirm-title mt-3">Hủy Phương án mua sắm!</div>
            <div className="confirm-content mt-3">
              Toàn bộ thông tin đã nhập sẽ bị xóa khi bạn hủy Phương án mua sắm.
              Hãy chắc chắn bạn muốn thực hiện trước khi xác nhận!
            </div>
          </div>
        </>
      ),
      okText: (
        <span>
          <i className="tio-checkmark_circle_outlined" /> Hủy PAMS
        </span>
      ),

      cancelText: (
        <span>
          <i className="tio-clear" /> Hủy
        </span>
      ),
      onOk() {
        purchasePlanRepository.cancel(model?.id).subscribe(
          () => {
            notifyUpdateItemSuccess();
            handleGoBase();
          },
          () => {
            notifyUpdateItemError(); // global message service go here
          }
        );
      },
    });
  }, [handleGoBase, model, notifyUpdateItemError, notifyUpdateItemSuccess]);

  return {
    handleOpenConfirmModal,
    handleOpenConfirmReplay,
    handleOpenConfirmCancel,
  };
}
