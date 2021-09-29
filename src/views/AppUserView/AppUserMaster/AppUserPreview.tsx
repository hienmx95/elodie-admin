/* begin general import */
import { Model } from '@react3l/react3l/core/model';
import { Descriptions } from 'antd';
import Modal from 'components/Utility/Modal/Modal';
import { TFunction } from 'i18next';
/* end general import */
/* begin individual import */
import { AppUser } from 'models/AppUser';
import React from 'react';
/* end individual import */

interface AppUserPreviewProps<T extends Model> {
    previewModel?: T;
    isOpenPreview?: boolean;
    isLoadingPreview?: boolean;
    handleClosePreview?: () => void;
    handleGoDetail?: (id: number) => () => void;
    translate?: TFunction;
};

function AppUserPreview(props: AppUserPreviewProps<AppUser>
) {

    const {
        previewModel,
        isOpenPreview,
        isLoadingPreview,
        handleClosePreview,
        translate,
    } = props;


    return <>
        <Modal title={null}
            visible={isOpenPreview}
            handleCancel={handleClosePreview}
            width={1200}
            visibleFooter={false}>
            {isLoadingPreview ?
                <div className="loading-block">
                    <img src="/assets/svg/spinner.svg" alt='Loading...' />
                </div> :
                <div className="preview__containter">
                    <div className="preview__left-side">
                        <div className="preview__header">
                            <div className="preview__vertical-bar"></div>

                        </div>
                        <div className="preview__body">
                            <div className="preview__content">
                                <Descriptions title={previewModel.name} column={2}>
                                    <Descriptions.Item label={translate('appUsers.username')}>
                                        <span className="gradient-text">{previewModel.username}</span>
                                    </Descriptions.Item>
                                    <Descriptions.Item label={translate('appUsers.displayName')}>
                                        <span className="gradient-text">{previewModel.displayName}</span>
                                    </Descriptions.Item>
                                    <Descriptions.Item label={translate('appUsers.organization')}>
                                        <span className="gradient-text">{previewModel?.organization?.name}</span>
                                    </Descriptions.Item>
                                    <Descriptions.Item label={translate('appUsers.email')}>
                                        <span className="gradient-text">{previewModel.email}</span>
                                    </Descriptions.Item>
                                    <Descriptions.Item label={translate('appUsers.phone')}>
                                        <span className="gradient-text">{previewModel.phone}</span>
                                    </Descriptions.Item>

                                    <Descriptions.Item label={translate('appUsers.status')}>
                                        <span className="gradient-text">{previewModel?.status?.name}</span>
                                    </Descriptions.Item>
                                </Descriptions>
                            </div>

                        </div>
                        <div className="preview__footer">
                            <button
                                className="btn btn-cancel"
                                onClick={handleClosePreview}
                            >
                                <span>
                                    <i className="tio-clear_circle_outlined"></i> Đóng
                                    </span>
                            </button>
                        </div>
                    </div>

                </div>
            }
        </Modal>
    </>;
}

export default AppUserPreview;
