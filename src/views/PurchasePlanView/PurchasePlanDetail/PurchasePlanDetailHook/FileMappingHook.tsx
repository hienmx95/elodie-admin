import { LoadingOutlined } from "@ant-design/icons";
import { Model } from "@react3l/react3l/core";
import { Col, Row, Spin } from "antd";
import { FileType } from "components/Utility/FileType/FileType";
import Modal from "components/Utility/Modal/Modal";
import { File as FileModel } from "models/File";
import React from "react";
import { useDropzone } from "react-dropzone";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";

const antIcon = (
  <LoadingOutlined style={{ fontSize: 24, color: "#3F8CFF" }} spin />
);

export function useFileMapping(
  model: Model,
  modelField: string,
  uploadFile?: (files: File[]) => Observable<Model>,
  handleChangeModel?,
  handleChangeSimpleField?,
  classMapping?: new () => Model
) {
  const files = React.useMemo(() => {
    const files = model[modelField]
      ? model[modelField].map((current) => current.file)
      : [];
    return files;
  }, [model, modelField]);

  const [openFileModal, setOpenFileModal] = React.useState<boolean>(false);
  const [isLoadingFile, setIsLoadingFile] = React.useState<boolean>(false);

  const handleChangeFile = React.useCallback(
    (files: File[]) => {
      if (files && files.length > 0) {
        setIsLoadingFile(true);
        uploadFile(files)
          .pipe(finalize(() => setIsLoadingFile(false)))
          .subscribe(
            (res: FileModel[]) => {
              if (res && res.length > 0) {
                const fileMappings = [];
                res.forEach((current) => {
                  const mappingObj = new classMapping();
                  mappingObj.fileId = current.id;
                  mappingObj.file = current;
                  fileMappings.push(mappingObj);
                });
                handleChangeModel(modelField)(fileMappings);
              }
            },
            (err) => {}
          );
      }
    },
    [uploadFile, handleChangeModel, modelField, classMapping]
  );

  const handleCloseFileModal = React.useCallback(() => {
    setOpenFileModal(false);
  }, []);

  const handleOpenFileModal = React.useCallback(() => {
    setOpenFileModal(true);
  }, []);

  const handleDeleteFile = React.useCallback(
    (index: number) => (event: any) => {
      const fileMappings = [...model[modelField]];
      fileMappings.splice(index, 1);
      handleChangeSimpleField(modelField)(fileMappings);
    },
    [model, modelField, handleChangeSimpleField]
  );

  return {
    files,
    isLoadingFile,
    openFileModal,
    handleChangeFile,
    handleCloseFileModal,
    handleOpenFileModal,
    handleDeleteFile,
  };
}

export interface FileMappingModalProps {
  files?: FileModel[];
  visibleDialog?: boolean;
  isLoadingFile?: boolean;
  isViewMode?: boolean;
  onCancelDialog?: () => void;
  handleDeleteFile?: (index: number) => (event: any) => void;
  handleChangeFile?: (files: File[]) => void;
}

export function FileMappingModal(props: FileMappingModalProps) {
  const {
    files,
    visibleDialog,
    isLoadingFile,
    isViewMode = false,
    onCancelDialog,
    handleDeleteFile,
    handleChangeFile,
  } = props;

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleChangeFile,
  });

  return (
    <>
      <Modal
        closable={false}
        title={null}
        width={710}
        visible={visibleDialog}
        handleCancel={onCancelDialog}
        visibleFooter={false}
      >
        <div className="file-modal__wrapper">
          <div className="file-modal__container">
            <div className="file-modal__title">
              <div className="title__text">
                <span>Tải tập tin đính kèm</span>
              </div>
              <div className="title__icon" onClick={onCancelDialog}>
                <i className="tio-clear"></i>
              </div>
            </div>
            {!isViewMode && (
              <div className="file-modal__content" {...getRootProps()}>
                {!isLoadingFile ? (
                  <span>
                    Kéo thả hoặc <span className="content--link">tìm</span>
                  </span>
                ) : (
                  <Spin size="large" indicator={antIcon} />
                )}
                <input
                  type="file"
                  style={{ display: "none" }}
                  {...getInputProps()}
                />
              </div>
            )}
            {files && files.length > 0 && (
              <div className="file-modal__list">
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  {files.map((file, index) => (
                    <Col span={12} className="gutter-row mt-4" key={index}>
                      <FileType
                        file={file}
                        isShowClear={!isViewMode}
                        index={index}
                        handleDeleteFile={handleDeleteFile}
                      ></FileType>
                    </Col>
                  ))}
                </Row>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}
