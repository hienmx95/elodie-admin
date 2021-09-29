/* begin general import */
import { Card, Col, Row, Switch, Tabs } from "antd";
import { AppStoreContext } from "app/app-context";
import { AppAction, AppState } from "app/app-store";
import AppFooter from "components/AppFooter/AppFooter";
import { AppMainDetailForm } from "components/AppMain/DetailPage/AppMainDetailForm";
import { AppMainDetailTable } from "components/AppMain/DetailPage/AppMainDetailTable";
import { AppMainDetailTitle } from "components/AppMain/DetailPage/AppMainDetailTitle";
import DatePicker from "components/Utility/Calendar/DatePicker/DatePicker";
import ChatBox from 'components/Utility/ChatBox/ChatBox';
import ContentModal from "components/Utility/ContentModal/ContentModal";
import ContentTable from "components/Utility/ContentTable/ContentTable";
import FormItem from "components/Utility/FormItem/FormItem";
import InputText from "components/Utility/Input/InputText/InputText";
import Select from "components/Utility/Select/Select";
import TreeSelect from "components/Utility/TreeSelect/TreeSelect";
import { REQUEST_FOR_QUOTATION_MASTER_ROUTE } from 'config/route-consts';
import { AppUserFilter } from 'models/AppUser';
import { OrganizationFilter } from 'models/Organization';
import { RequestForQuotation } from 'models/RequestForQuotation';
import { StatusFilter } from 'models/Status';
import React, { Dispatch, ReactNode, useContext } from "react";
import { useTranslation } from "react-i18next";
import { appUserRepository } from 'repositories/app-user-repository';
import { discussionRepository } from "repositories/discussion-repository";
import { requestForQuotationRepository } from "repositories/request-for-quotation-repository";
import { formService } from "services/form-service";
import detailService from "services/pages/detail-service";
import nameof from "ts-nameof.macro";
import { useRequestForQuotationContentTable } from "./RequestForQuotationContentHook";
import { requestForQuotationFileMappingContentMapper, useRequestForQuotationFileMappingModal, useRequestForQuotationFileMappingTable } from "./RequestForQuotationFileMappingHook";
import { requestForQuotationSupplierMappingContentMapper, useRequestForQuotationSupplierMappingModal, useRequestForQuotationSupplierMappingTable } from "./RequestForQuotationSupplierMappingHook";
/* end individual import */

const { TabPane } = Tabs;

function RequestForQuotationDetail() {
    const [translate] = useTranslation();

    const [state] = useContext<[AppState, Dispatch<AppAction>]>(AppStoreContext);

    const {
        model,
        handleUpdateNewModel,
        isDetail,
        handleChangeSimpleField,
        handleChangeTreeObjectField,
        handleChangeObjectField,
        handleSave,
        handleGoBase,
    } = detailService.useDetail<RequestForQuotation>
            (
                RequestForQuotation,
                requestForQuotationRepository.get,
                requestForQuotationRepository.save,
                REQUEST_FOR_QUOTATION_MASTER_ROUTE,
            );

    const {
        requestForQuotationContentFilter,
        // requestForQuotationContentContents,
        // setRequestForQuotationContentContents,
        requestForQuotationContentContentColumns,
        requestForQuotationContentList,
        loadRequestForQuotationContentList,
        requestForQuotationContentTotal,
        handleAddRequestForQuotationContent,
        handleRequestForQuotationContentTableChange,
        handleRequestForQuotationContentPagination,
        requestForQuotationContentRowSelection,
        canBulkDeleteRequestForQuotationContent,
        handleLocalBulkDeleteRequestForQuotationContent,
        requestForQuotationContentRef,
        handleClickRequestForQuotationContent,
        handleImportRequestForQuotationContent,
        handleExportRequestForQuotationContent,
        handleExportTemplateRequestForQuotationContent,
        // handleSearchRequestForQuotationContent,
    } = useRequestForQuotationContentTable(model, handleUpdateNewModel);


    const requestForQuotationContentTable = React.useMemo(() => (
        <ContentTable model={model}
            filter={requestForQuotationContentFilter}
            list={requestForQuotationContentList}
            loadingList={loadRequestForQuotationContentList}
            total={requestForQuotationContentTotal}
            handleTableChange={handleRequestForQuotationContentTableChange}
            rowSelection={requestForQuotationContentRowSelection}
            handleLocalBulkDelete={handleLocalBulkDeleteRequestForQuotationContent}
            canBulkDelete={canBulkDeleteRequestForQuotationContent}
            handleExportContent={handleExportRequestForQuotationContent}
            handleExportTemplateContent={handleExportTemplateRequestForQuotationContent}
            handlePagination={handleRequestForQuotationContentPagination}
            handleAddContent={handleAddRequestForQuotationContent}
            ref={requestForQuotationContentRef}
            handleClick={handleClickRequestForQuotationContent}
            handleImportContentList={handleImportRequestForQuotationContent}
            columns={requestForQuotationContentContentColumns}
            hasAddContentInline={true}
        />
    ), [
        model,
        requestForQuotationContentFilter,
        requestForQuotationContentList,
        loadRequestForQuotationContentList,
        requestForQuotationContentTotal,
        handleRequestForQuotationContentTableChange,
        requestForQuotationContentRowSelection,
        handleLocalBulkDeleteRequestForQuotationContent,
        canBulkDeleteRequestForQuotationContent,
        handleExportRequestForQuotationContent,
        handleExportTemplateRequestForQuotationContent,
        handleRequestForQuotationContentPagination,
        handleAddRequestForQuotationContent,
        requestForQuotationContentRef,
        handleClickRequestForQuotationContent,
        handleImportRequestForQuotationContent,
        requestForQuotationContentContentColumns,
    ]);


    const {
        requestForQuotationFileMappingFilter,
        requestForQuotationFileMappingContents,
        setRequestForQuotationFileMappingContents,
        requestForQuotationFileMappingContentColumns,
        requestForQuotationFileMappingList,
        loadRequestForQuotationFileMappingList,
        requestForQuotationFileMappingTotal,
        handleAddRequestForQuotationFileMapping,
        handleRequestForQuotationFileMappingTableChange,
        handleRequestForQuotationFileMappingPagination,
        requestForQuotationFileMappingRowSelection,
        canBulkDeleteRequestForQuotationFileMapping,
        handleLocalBulkDeleteRequestForQuotationFileMapping,
        requestForQuotationFileMappingRef,
        handleClickRequestForQuotationFileMapping,
        handleImportRequestForQuotationFileMapping,
        handleExportRequestForQuotationFileMapping,
        handleExportTemplateRequestForQuotationFileMapping,
        handleSearchRequestForQuotationFileMapping,
    } = useRequestForQuotationFileMappingTable(model, handleUpdateNewModel);

    const {
        visibleFile,
        fileFilter,
        handleUpdateNewFileFilter,
        handleSearchFile,
        handleResetFileFilter,
        loadFileList,
        setLoadFileList,
        fileModalFilters,
        handleOpenFileModal,
        handleCloseFileModal,
        handleSaveFileModal,
        selectedFileList,
        fileColumns,
    } = useRequestForQuotationFileMappingModal(requestForQuotationFileMappingContents, handleSearchRequestForQuotationFileMapping);

    const requestForQuotationFileMappingModal = React.useMemo(() => (
        <ContentModal content={requestForQuotationFileMappingContents}
            width={800}
            setContent={setRequestForQuotationFileMappingContents}
            visible={visibleFile}
            filter={fileFilter}
            onUpdateNewFilter={handleUpdateNewFileFilter}
            onResetFilter={handleResetFileFilter}
            onSearch={handleSearchFile}
            getList={requestForQuotationRepository.listFile}
            getTotal={requestForQuotationRepository.countFile}
            loadList={loadFileList}
            setLoadList={setLoadFileList}
            selectedList={selectedFileList}
            columns={fileColumns}
            filterList={fileModalFilters}
            mapperField={nameof(model.requestForQuotationFileMappings[0].file)}
            mapper={requestForQuotationFileMappingContentMapper}
            onClose={handleCloseFileModal}
            onSave={handleSaveFileModal} />
    ), [
        requestForQuotationFileMappingContents,
        setRequestForQuotationFileMappingContents,
        visibleFile,
        fileFilter,
        handleUpdateNewFileFilter,
        handleResetFileFilter,
        handleSearchFile,
        loadFileList,
        setLoadFileList,
        selectedFileList,
        fileColumns,
        fileModalFilters,
        model,
        handleCloseFileModal,
        handleSaveFileModal
    ]);

    const requestForQuotationFileMappingTable = React.useMemo(() => (
        <ContentTable model={model}
            filter={requestForQuotationFileMappingFilter}
            list={requestForQuotationFileMappingList}
            loadingList={loadRequestForQuotationFileMappingList}
            total={requestForQuotationFileMappingTotal}
            handleTableChange={handleRequestForQuotationFileMappingTableChange}
            rowSelection={requestForQuotationFileMappingRowSelection}
            handleLocalBulkDelete={handleLocalBulkDeleteRequestForQuotationFileMapping}
            canBulkDelete={canBulkDeleteRequestForQuotationFileMapping}
            handleExportContent={handleExportRequestForQuotationFileMapping}
            handleExportTemplateContent={handleExportTemplateRequestForQuotationFileMapping}
            handlePagination={handleRequestForQuotationFileMappingPagination}
            handleAddContent={handleAddRequestForQuotationFileMapping}
            ref={requestForQuotationFileMappingRef}
            handleClick={handleClickRequestForQuotationFileMapping}
            handleImportContentList={handleImportRequestForQuotationFileMapping}
            columns={requestForQuotationFileMappingContentColumns}
            onOpenModal={handleOpenFileModal}
        />
    ), [
        model,
        requestForQuotationFileMappingFilter,
        requestForQuotationFileMappingList,
        loadRequestForQuotationFileMappingList,
        requestForQuotationFileMappingTotal,
        handleRequestForQuotationFileMappingTableChange,
        requestForQuotationFileMappingRowSelection,
        handleLocalBulkDeleteRequestForQuotationFileMapping,
        canBulkDeleteRequestForQuotationFileMapping,
        handleExportRequestForQuotationFileMapping,
        handleExportTemplateRequestForQuotationFileMapping,
        handleRequestForQuotationFileMappingPagination,
        handleAddRequestForQuotationFileMapping,
        requestForQuotationFileMappingRef,
        handleClickRequestForQuotationFileMapping,
        handleImportRequestForQuotationFileMapping,
        requestForQuotationFileMappingContentColumns,
        handleOpenFileModal
    ]);


    const {
        requestForQuotationSupplierMappingFilter,
        requestForQuotationSupplierMappingContents,
        setRequestForQuotationSupplierMappingContents,
        requestForQuotationSupplierMappingContentColumns,
        requestForQuotationSupplierMappingList,
        loadRequestForQuotationSupplierMappingList,
        requestForQuotationSupplierMappingTotal,
        handleAddRequestForQuotationSupplierMapping,
        handleRequestForQuotationSupplierMappingTableChange,
        handleRequestForQuotationSupplierMappingPagination,
        requestForQuotationSupplierMappingRowSelection,
        canBulkDeleteRequestForQuotationSupplierMapping,
        handleLocalBulkDeleteRequestForQuotationSupplierMapping,
        requestForQuotationSupplierMappingRef,
        handleClickRequestForQuotationSupplierMapping,
        handleImportRequestForQuotationSupplierMapping,
        handleExportRequestForQuotationSupplierMapping,
        handleExportTemplateRequestForQuotationSupplierMapping,
        handleSearchRequestForQuotationSupplierMapping,
    } = useRequestForQuotationSupplierMappingTable(model, handleUpdateNewModel);

    const {
        visibleSupplier,
        supplierFilter,
        handleUpdateNewSupplierFilter,
        handleSearchSupplier,
        handleResetSupplierFilter,
        loadSupplierList,
        setLoadSupplierList,
        supplierModalFilters,
        handleOpenSupplierModal,
        handleCloseSupplierModal,
        handleSaveSupplierModal,
        selectedSupplierList,
        supplierColumns,
    } = useRequestForQuotationSupplierMappingModal(requestForQuotationSupplierMappingContents, handleSearchRequestForQuotationSupplierMapping);

    const requestForQuotationSupplierMappingModal = React.useMemo(() => (
        <ContentModal content={requestForQuotationSupplierMappingContents}
            width={800}
            setContent={setRequestForQuotationSupplierMappingContents}
            visible={visibleSupplier}
            filter={supplierFilter}
            onUpdateNewFilter={handleUpdateNewSupplierFilter}
            onResetFilter={handleResetSupplierFilter}
            onSearch={handleSearchSupplier}
            getList={requestForQuotationRepository.listSupplier}
            getTotal={requestForQuotationRepository.countSupplier}
            loadList={loadSupplierList}
            setLoadList={setLoadSupplierList}
            selectedList={selectedSupplierList}
            columns={supplierColumns}
            filterList={supplierModalFilters}
            mapperField={nameof(model.requestForQuotationSupplierMappings[0].supplier)}
            mapper={requestForQuotationSupplierMappingContentMapper}
            onClose={handleCloseSupplierModal}
            onSave={handleSaveSupplierModal} />
    ), [
        requestForQuotationSupplierMappingContents,
        setRequestForQuotationSupplierMappingContents,
        visibleSupplier,
        supplierFilter,
        handleUpdateNewSupplierFilter,
        handleResetSupplierFilter,
        handleSearchSupplier,
        loadSupplierList,
        setLoadSupplierList,
        selectedSupplierList,
        supplierColumns,
        supplierModalFilters,
        model,
        handleCloseSupplierModal,
        handleSaveSupplierModal
    ]);

    const requestForQuotationSupplierMappingTable = React.useMemo(() => (
        <ContentTable model={model}
            filter={requestForQuotationSupplierMappingFilter}
            list={requestForQuotationSupplierMappingList}
            loadingList={loadRequestForQuotationSupplierMappingList}
            total={requestForQuotationSupplierMappingTotal}
            handleTableChange={handleRequestForQuotationSupplierMappingTableChange}
            rowSelection={requestForQuotationSupplierMappingRowSelection}
            handleLocalBulkDelete={handleLocalBulkDeleteRequestForQuotationSupplierMapping}
            canBulkDelete={canBulkDeleteRequestForQuotationSupplierMapping}
            handleExportContent={handleExportRequestForQuotationSupplierMapping}
            handleExportTemplateContent={handleExportTemplateRequestForQuotationSupplierMapping}
            handlePagination={handleRequestForQuotationSupplierMappingPagination}
            handleAddContent={handleAddRequestForQuotationSupplierMapping}
            ref={requestForQuotationSupplierMappingRef}
            handleClick={handleClickRequestForQuotationSupplierMapping}
            handleImportContentList={handleImportRequestForQuotationSupplierMapping}
            columns={requestForQuotationSupplierMappingContentColumns}
            onOpenModal={handleOpenSupplierModal}
        />
    ), [
        model,
        requestForQuotationSupplierMappingFilter,
        requestForQuotationSupplierMappingList,
        loadRequestForQuotationSupplierMappingList,
        requestForQuotationSupplierMappingTotal,
        handleRequestForQuotationSupplierMappingTableChange,
        requestForQuotationSupplierMappingRowSelection,
        handleLocalBulkDeleteRequestForQuotationSupplierMapping,
        canBulkDeleteRequestForQuotationSupplierMapping,
        handleExportRequestForQuotationSupplierMapping,
        handleExportTemplateRequestForQuotationSupplierMapping,
        handleRequestForQuotationSupplierMappingPagination,
        handleAddRequestForQuotationSupplierMapping,
        requestForQuotationSupplierMappingRef,
        handleClickRequestForQuotationSupplierMapping,
        handleImportRequestForQuotationSupplierMapping,
        requestForQuotationSupplierMappingContentColumns,
        handleOpenSupplierModal
    ]);



    const tableChildren: ReactNode = React.useMemo(() => (
        <>
            <Col lg={18}>
                <Card className='mr-3'>
                    <Tabs defaultActiveKey='1'>

                        <TabPane tab={translate("requestForQuotations.requestForQuotationContents")}
                            key='requestForQuotationContents'>
                            <Row>
                                {requestForQuotationContentTable}
                            </Row>
                        </TabPane>

                        <TabPane tab={translate("requestForQuotations.requestForQuotationFileMappings")}
                            key='requestForQuotationFileMappings'>
                            <Row>
                                {requestForQuotationFileMappingTable}
                                {requestForQuotationFileMappingModal}
                            </Row>
                        </TabPane>

                        <TabPane tab={translate("requestForQuotations.requestForQuotationSupplierMappings")}
                            key='requestForQuotationSupplierMappings'>
                            <Row>
                                {requestForQuotationSupplierMappingTable}
                                {requestForQuotationSupplierMappingModal}
                            </Row>
                        </TabPane>

                    </Tabs>
                </Card>
            </Col>
            <Col lg={6}>
                <Card style={{ height: '100%' }}></Card>
            </Col>
        </>
    ), [

        requestForQuotationContentTable,

        requestForQuotationFileMappingTable,
        requestForQuotationFileMappingModal,

        requestForQuotationSupplierMappingTable,
        requestForQuotationSupplierMappingModal,
        translate,

    ]);

    const formChildren: ReactNode = React.useMemo(() => (
        <>
            <Col lg={18}>
                <Card className='mr-3'>
                    <Tabs defaultActiveKey='1'>
                        <TabPane tab={translate("general.detail.generalInfomation")}
                            key='1'>
                            <Row>


                                <Col lg={6} className='pr-3'>
                                    <FormItem label={translate("requestForQuotations.code")}
                                        validateStatus={formService.getValidationStatus<RequestForQuotation>(model.errors, nameof(model.code))}
                                        message={model.errors?.code}>
                                        <InputText isMaterial={true}
                                            value={model.code}
                                            placeHolder={translate("requestForQuotations.placeholder.code")}
                                            className={"tio-account_square_outlined"}
                                            onBlur={handleChangeSimpleField(nameof(model.code))} />
                                    </FormItem>
                                </Col>


                                <Col lg={6} className='pr-3'>
                                    <FormItem label={translate("requestForQuotations.description")}
                                        validateStatus={formService.getValidationStatus<RequestForQuotation>(model.errors, nameof(model.description))}
                                        message={model.errors?.description}>
                                        <InputText isMaterial={true}
                                            value={model.description}
                                            placeHolder={translate("requestForQuotations.placeholder.description")}
                                            className={"tio-account_square_outlined"}
                                            onBlur={handleChangeSimpleField(nameof(model.description))} />
                                    </FormItem>
                                </Col>


                                <Col lg={6} className='pr-3'>
                                    <FormItem label={translate("requestForQuotations.quotationExpectedAt")}
                                        validateStatus={formService.getValidationStatus<RequestForQuotation>(model.errors, nameof(model.quotationExpectedAt))}
                                        message={model.errors?.quotationExpectedAt}>
                                        <DatePicker isMaterial={true}
                                            value={model.quotationExpectedAt}
                                            placeholder={translate("requestForQuotations.placeholder.quotationExpectedAt")}
                                            onChange={handleChangeSimpleField(nameof(model.quotationExpectedAt))} />
                                    </FormItem>
                                </Col>



                                <Col lg={6} className='pr-3'>
                                    <FormItem label={translate("requestForQuotations.requestDepartmentName")}
                                        validateStatus={formService.getValidationStatus<RequestForQuotation>(model.errors, nameof(model.requestDepartmentName))}
                                        message={model.errors?.requestDepartmentName}>
                                        <InputText isMaterial={true}
                                            value={model.requestDepartmentName}
                                            placeHolder={translate("requestForQuotations.placeholder.requestDepartmentName")}
                                            className={"tio-account_square_outlined"}
                                            onBlur={handleChangeSimpleField(nameof(model.requestDepartmentName))} />
                                    </FormItem>
                                </Col>



                                <Col lg={6} className='pr-3'>
                                    <FormItem label={translate("requestForQuotations.recipientAddress")}
                                        validateStatus={formService.getValidationStatus<RequestForQuotation>(model.errors, nameof(model.recipientAddress))}
                                        message={model.errors?.recipientAddress}>
                                        <InputText isMaterial={true}
                                            value={model.recipientAddress}
                                            placeHolder={translate("requestForQuotations.placeholder.recipientAddress")}
                                            className={"tio-account_square_outlined"}
                                            onBlur={handleChangeSimpleField(nameof(model.recipientAddress))} />
                                    </FormItem>
                                </Col>



                                <Col lg={6} className='pr-3'>
                                    <FormItem label={translate("requestForQuotations.sendToPRC")}
                                        validateStatus={formService.getValidationStatus<RequestForQuotation>(model.errors, nameof(model.sendToPRC))}
                                        message={model.errors?.sendToPRC}>
                                        <Switch size='small'
                                            onChange={handleChangeSimpleField(nameof(model.sendToPRC))}
                                            checked={model.sendToPRC} />
                                    </FormItem>
                                </Col>



                                <Col lg={6} className='pr-3'>
                                    <FormItem label={translate("requestForQuotations.note")}
                                        validateStatus={formService.getValidationStatus<RequestForQuotation>(model.errors, nameof(model.note))}
                                        message={model.errors?.note}>
                                        <InputText isMaterial={true}
                                            value={model.note}
                                            placeHolder={translate("requestForQuotations.placeholder.note")}
                                            className={"tio-account_square_outlined"}
                                            onBlur={handleChangeSimpleField(nameof(model.note))} />
                                    </FormItem>
                                </Col>





                                <Col lg={6} className='pr-3'>
                                    <FormItem label={translate("requestForQuotations.used")}
                                        validateStatus={formService.getValidationStatus<RequestForQuotation>(model.errors, nameof(model.used))}
                                        message={model.errors?.used}>
                                        <Switch size='small'
                                            onChange={handleChangeSimpleField(nameof(model.used))}
                                            checked={model.used} />
                                    </FormItem>
                                </Col>



                                <Col lg={6} className='pr-3'>
                                    <FormItem label={translate("requestForQuotations.buyer")}
                                        validateStatus={formService.getValidationStatus<RequestForQuotation>(model.errors, nameof(model.buyer))}
                                        message={model.errors?.buyer} >
                                        <Select isMaterial={true}
                                            classFilter={AppUserFilter}
                                            placeHolder={translate("requestForQuotations.placeholder.buyer")}
                                            getList={requestForQuotationRepository.singleListAppUser}
                                            onChange={handleChangeObjectField(nameof(model.buyer))}
                                            model={model.buyer} />
                                    </FormItem>
                                </Col>

                                <Col lg={6} className='pr-3'>
                                    <FormItem label={translate("requestForQuotations.requestOrganization")}
                                        validateStatus={formService.getValidationStatus<RequestForQuotation>(model.errors, nameof(model.requestOrganization))}
                                        message={model.errors?.requestOrganization} >
                                        <TreeSelect isMaterial={true}
                                            placeHolder={translate("requestForQuotations.placeholder.requestOrganization")}
                                            selectable={true}
                                            classFilter={OrganizationFilter}
                                            onChange={handleChangeTreeObjectField(nameof(model.requestOrganization))}
                                            checkStrictly={true}
                                            getTreeData={requestForQuotationRepository.singleListOrganization}
                                            item={model.requestOrganization} />
                                    </FormItem>
                                </Col>

                                <Col lg={6} className='pr-3'>
                                    <FormItem label={translate("requestForQuotations.requestor")}
                                        validateStatus={formService.getValidationStatus<RequestForQuotation>(model.errors, nameof(model.requestor))}
                                        message={model.errors?.requestor} >
                                        <Select isMaterial={true}
                                            classFilter={AppUserFilter}
                                            placeHolder={translate("requestForQuotations.placeholder.requestor")}
                                            getList={requestForQuotationRepository.singleListAppUser}
                                            onChange={handleChangeObjectField(nameof(model.requestor))}
                                            model={model.requestor} />
                                    </FormItem>
                                </Col>

                                <Col lg={6} className='pr-3'>
                                    <FormItem label={translate("requestForQuotations.status")}
                                        validateStatus={formService.getValidationStatus<RequestForQuotation>(model.errors, nameof(model.status))}
                                        message={model.errors?.status} >
                                        <Select isMaterial={true}
                                            classFilter={StatusFilter}
                                            placeHolder={translate("requestForQuotations.placeholder.status")}
                                            getList={requestForQuotationRepository.singleListStatus}
                                            onChange={handleChangeObjectField(nameof(model.status))}
                                            model={model.status} />
                                    </FormItem>
                                </Col>




                            </Row>
                        </TabPane>
                    </Tabs>
                </Card>
            </Col>
            <Col lg={6}>
                <ChatBox getMessages={discussionRepository.list}
                    countMessages={discussionRepository.count}
                    postMessage={discussionRepository.create}
                    deleteMessage={discussionRepository.delete}
                    attachFile={discussionRepository.import}
                    suggestList={appUserRepository.list}
                    discussionId={model.rowId}
                    userInfo={state.user} />
            </Col>
        </>
    ), [
        translate,
        model,
        state,
        handleChangeTreeObjectField,
        handleChangeObjectField,
        handleChangeSimpleField]);

    return (
        <>
            <div className='page page__detail'>
                <AppMainDetailTitle translate={translate}
                    model={model}
                    isDetail={isDetail}>
                    translate("requestForQuotations.detail.title")
                </AppMainDetailTitle>
                <AppMainDetailForm>
                    {formChildren}
                </AppMainDetailForm>
                <AppMainDetailTable>
                    {tableChildren}
                </AppMainDetailTable>
            </div>
            <AppFooter onSave={handleSave()}
                onCancel={handleGoBase}></AppFooter>
        </>
    );
}

export default RequestForQuotationDetail;
