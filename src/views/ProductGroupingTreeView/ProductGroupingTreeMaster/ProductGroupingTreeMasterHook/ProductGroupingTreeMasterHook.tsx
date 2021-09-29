import { Model } from "@react3l/react3l/core";
import { commonService } from "@react3l/react3l/services";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import appMessageService from "services/app-message-service";
import { formService } from "services/form-service";

export function useDetailProductGroupingModal<T extends Model>(
    ModelClass: new () => T,
    getDetail: (id: number) => Observable<T>,
    saveModel: (t: T) => Observable<T>,
    handleSeach?: () => void //trigger updateList
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
    ] = formService.useDetailForm<T>(ModelClass, undefined, getDetail); // id is undefined as we not archive id from url

    const handleOpenDetailModal = useCallback(
        (id: number) => {
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
        [getDetail, handleUpdateNewModel, subscription]
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
                        if (typeof handleSeach === "function") handleSeach(); // updateList if necessary
                        notifyUpdateItemSuccess(); // global message service go here
                    },
                    (error: AxiosError<T>) => {
                        if (error.response && error.response.status === 400)
                            handleUpdateNewModel(error.response?.data);
                        notifyUpdateItemError(); // global message service go here
                    }
                )
        );
    }, [
        saveModel,
        subscription,
        handleSeach,
        notifyUpdateItemError,
        notifyUpdateItemSuccess,
        handleUpdateNewModel,
        model,
    ]);

    const handleCloseDetailModal = useCallback(() => {
        setIsOpenDetailModal(false);
        if (model.id) handleUpdateNewModel({ ...model });
        else handleUpdateNewModel({ ...new ModelClass() });
        // if (typeof handleSeach === "function") handleSeach(); // updateList if necessary
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
        handleUpdateNewModel,
        dispatch,
    };
}
