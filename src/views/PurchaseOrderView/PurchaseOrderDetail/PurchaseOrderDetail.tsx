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
import ContentTable from "components/Utility/ContentTable/ContentTable";
import FormItem from "components/Utility/FormItem/FormItem";
import InputNumber, { DECIMAL } from "components/Utility/Input/InputNumber/InputNumber";
import InputText from "components/Utility/Input/InputText/InputText";
import Select from "components/Utility/Select/Select";
import TreeSelect from "components/Utility/TreeSelect/TreeSelect";
import { PURCHASE_ORDER_MASTER_ROUTE } from 'config/route-consts';
import { AppUserFilter } from 'models/AppUser';
import { OrganizationFilter } from 'models/Organization';
import { ProjectFilter } from 'models/Project';
import { ProjectBudgetFilter } from 'models/ProjectBudget';
import { PurchaseOrder } from 'models/PurchaseOrder';
import { PurchaseOrderTypeFilter } from 'models/PurchaseOrderType';
import { PurchasePlanFilter } from 'models/PurchasePlan';
import { PurchaseRequestFilter } from 'models/PurchaseRequest';
import { StatusFilter } from 'models/Status';
import { SupplierFilter } from 'models/Supplier';
import React, { Dispatch, ReactNode, useContext } from "react";
import { useTranslation } from "react-i18next";
import { appUserRepository } from 'repositories/app-user-repository';
import { discussionRepository } from "repositories/discussion-repository";
import { purchaseOrderRepository } from "repositories/purchase-order-repository";
import { formService } from "services/form-service";
import detailService from "services/pages/detail-service";
import nameof from "ts-nameof.macro";
import { usePurchaseOrderConditionTable } from "./PurchaseOrderConditionHook";
import { usePurchaseOrderContentTable } from "./PurchaseOrderContentHook";
/* end individual import */

const { TabPane } = Tabs;

function PurchaseOrderDetail() {
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
    } = detailService.useDetail<PurchaseOrder>
            (
                PurchaseOrder,
                purchaseOrderRepository.get,
                purchaseOrderRepository.save,
                PURCHASE_ORDER_MASTER_ROUTE,
            );

    const {
        purchaseOrderConditionFilter,
        // purchaseOrderConditionContents,
        // setPurchaseOrderConditionContents,
        purchaseOrderConditionContentColumns,
        purchaseOrderConditionList,
        loadPurchaseOrderConditionList,
        purchaseOrderConditionTotal,
        handleAddPurchaseOrderCondition,
        handlePurchaseOrderConditionTableChange,
        handlePurchaseOrderConditionPagination,
        purchaseOrderConditionRowSelection,
        canBulkDeletePurchaseOrderCondition,
        handleLocalBulkDeletePurchaseOrderCondition,
        purchaseOrderConditionRef,
        handleClickPurchaseOrderCondition,
        handleImportPurchaseOrderCondition,
        handleExportPurchaseOrderCondition,
        handleExportTemplatePurchaseOrderCondition,
        // handleSearchPurchaseOrderCondition,
    } = usePurchaseOrderConditionTable(model, handleUpdateNewModel);


    const purchaseOrderConditionTable = React.useMemo(() => (
        <ContentTable model={model}
            filter={purchaseOrderConditionFilter}
            list={purchaseOrderConditionList}
            loadingList={loadPurchaseOrderConditionList}
            total={purchaseOrderConditionTotal}
            handleTableChange={handlePurchaseOrderConditionTableChange}
            rowSelection={purchaseOrderConditionRowSelection}
            handleLocalBulkDelete={handleLocalBulkDeletePurchaseOrderCondition}
            canBulkDelete={canBulkDeletePurchaseOrderCondition}
            handleExportContent={handleExportPurchaseOrderCondition}
            handleExportTemplateContent={handleExportTemplatePurchaseOrderCondition}
            handlePagination={handlePurchaseOrderConditionPagination}
            handleAddContent={handleAddPurchaseOrderCondition}
            ref={purchaseOrderConditionRef}
            handleClick={handleClickPurchaseOrderCondition}
            handleImportContentList={handleImportPurchaseOrderCondition}
            columns={purchaseOrderConditionContentColumns}
            hasAddContentInline={true}
        />
    ), [
        model,
        purchaseOrderConditionFilter,
        purchaseOrderConditionList,
        loadPurchaseOrderConditionList,
        purchaseOrderConditionTotal,
        handlePurchaseOrderConditionTableChange,
        purchaseOrderConditionRowSelection,
        handleLocalBulkDeletePurchaseOrderCondition,
        canBulkDeletePurchaseOrderCondition,
        handleExportPurchaseOrderCondition,
        handleExportTemplatePurchaseOrderCondition,
        handlePurchaseOrderConditionPagination,
        handleAddPurchaseOrderCondition,
        purchaseOrderConditionRef,
        handleClickPurchaseOrderCondition,
        handleImportPurchaseOrderCondition,
        purchaseOrderConditionContentColumns,
    ]);


    const {
        purchaseOrderContentFilter,
        // purchaseOrderContentContents,
        // setPurchaseOrderContentContents,
        purchaseOrderContentContentColumns,
        purchaseOrderContentList,
        loadPurchaseOrderContentList,
        purchaseOrderContentTotal,
        handleAddPurchaseOrderContent,
        handlePurchaseOrderContentTableChange,
        handlePurchaseOrderContentPagination,
        purchaseOrderContentRowSelection,
        canBulkDeletePurchaseOrderContent,
        handleLocalBulkDeletePurchaseOrderContent,
        purchaseOrderContentRef,
        handleClickPurchaseOrderContent,
        handleImportPurchaseOrderContent,
        handleExportPurchaseOrderContent,
        handleExportTemplatePurchaseOrderContent,
        // handleSearchPurchaseOrderContent,
    } = usePurchaseOrderContentTable(model, handleUpdateNewModel);


    const purchaseOrderContentTable = React.useMemo(() => (
        <ContentTable model={model}
            filter={purchaseOrderContentFilter}
            list={purchaseOrderContentList}
            loadingList={loadPurchaseOrderContentList}
            total={purchaseOrderContentTotal}
            handleTableChange={handlePurchaseOrderContentTableChange}
            rowSelection={purchaseOrderContentRowSelection}
            handleLocalBulkDelete={handleLocalBulkDeletePurchaseOrderContent}
            canBulkDelete={canBulkDeletePurchaseOrderContent}
            handleExportContent={handleExportPurchaseOrderContent}
            handleExportTemplateContent={handleExportTemplatePurchaseOrderContent}
            handlePagination={handlePurchaseOrderContentPagination}
            handleAddContent={handleAddPurchaseOrderContent}
            ref={purchaseOrderContentRef}
            handleClick={handleClickPurchaseOrderContent}
            handleImportContentList={handleImportPurchaseOrderContent}
            columns={purchaseOrderContentContentColumns}
            hasAddContentInline={true}
        />
    ), [
        model,
        purchaseOrderContentFilter,
        purchaseOrderContentList,
        loadPurchaseOrderContentList,
        purchaseOrderContentTotal,
        handlePurchaseOrderContentTableChange,
        purchaseOrderContentRowSelection,
        handleLocalBulkDeletePurchaseOrderContent,
        canBulkDeletePurchaseOrderContent,
        handleExportPurchaseOrderContent,
        handleExportTemplatePurchaseOrderContent,
        handlePurchaseOrderContentPagination,
        handleAddPurchaseOrderContent,
        purchaseOrderContentRef,
        handleClickPurchaseOrderContent,
        handleImportPurchaseOrderContent,
        purchaseOrderContentContentColumns,
    ]);



    const tableChildren: ReactNode = React.useMemo(() => (
        <>
            <Col lg={18}>
                <Card className='mr-3'>
                    <Tabs defaultActiveKey='1'>

                        <TabPane tab={translate("purchaseOrders.purchaseOrderConditions")}
                            key='purchaseOrderConditions'>
                            <Row>
                                {purchaseOrderConditionTable}
                            </Row>
                        </TabPane>

                        <TabPane tab={translate("purchaseOrders.purchaseOrderContents")}
                            key='purchaseOrderContents'>
                            <Row>
                                {purchaseOrderContentTable}
                            </Row>
                        </TabPane>

                    </Tabs>
                </Card>
            </Col>
            <Col lg={6}>
                <Card style={{ height: '100%' }}></Card>
            </Col>
        </>
    ), [purchaseOrderConditionTable, purchaseOrderContentTable, translate]);

    const formChildren: ReactNode = React.useMemo(() => (
        <>
            <Col lg={18}>
                <Card className='mr-3'>
                    <Tabs defaultActiveKey='1'>
                        <TabPane tab={translate("general.detail.generalInfomation")}
                            key='1'>
                            <Row>


                                <Col lg={6} className='pr-3'>
                                    <FormItem label={translate("purchaseOrders.description")}
                                        validateStatus={formService.getValidationStatus<PurchaseOrder>(model.errors, nameof(model.description))}
                                        message={model.errors?.description}>
                                        <InputText isMaterial={true}
                                            value={model.description}
                                            placeHolder={translate("purchaseOrders.placeholder.description")}
                                            className={"tio-account_square_outlined"}
                                            onBlur={handleChangeSimpleField(nameof(model.description))} />
                                    </FormItem>
                                </Col>


                                <Col lg={6} className='pr-3'>
                                    <FormItem label={translate("purchaseOrders.pOCode")}
                                        validateStatus={formService.getValidationStatus<PurchaseOrder>(model.errors, nameof(model.pOCode))}
                                        message={model.errors?.pOCode}>
                                        <InputText isMaterial={true}
                                            value={model.pOCode}
                                            placeHolder={translate("purchaseOrders.placeholder.pOCode")}
                                            className={"tio-account_square_outlined"}
                                            onBlur={handleChangeSimpleField(nameof(model.pOCode))} />
                                    </FormItem>
                                </Col>


                                <Col lg={6} className='pr-3'>
                                    <FormItem label={translate("purchaseOrders.pONumber")}
                                        validateStatus={formService.getValidationStatus<PurchaseOrder>(model.errors, nameof(model.pONumber))}
                                        message={model.errors?.pONumber}>
                                        <InputNumber isMaterial={true}
                                            value={model.pONumber}
                                            placeHolder={translate("purchaseOrders.placeholder.pONumber")}
                                            onBlur={handleChangeSimpleField(nameof(model.pONumber))}
                                            numberType={DECIMAL} />
                                    </FormItem>
                                </Col>









                                <Col lg={6} className='pr-3'>
                                    <FormItem label={translate("purchaseOrders.purchaserAddress")}
                                        validateStatus={formService.getValidationStatus<PurchaseOrder>(model.errors, nameof(model.purchaserAddress))}
                                        message={model.errors?.purchaserAddress}>
                                        <InputText isMaterial={true}
                                            value={model.purchaserAddress}
                                            placeHolder={translate("purchaseOrders.placeholder.purchaserAddress")}
                                            className={"tio-account_square_outlined"}
                                            onBlur={handleChangeSimpleField(nameof(model.purchaserAddress))} />
                                    </FormItem>
                                </Col>


                                <Col lg={6} className='pr-3'>
                                    <FormItem label={translate("purchaseOrders.purchaserPhoneNumber")}
                                        validateStatus={formService.getValidationStatus<PurchaseOrder>(model.errors, nameof(model.purchaserPhoneNumber))}
                                        message={model.errors?.purchaserPhoneNumber}>
                                        <InputText isMaterial={true}
                                            value={model.purchaserPhoneNumber}
                                            placeHolder={translate("purchaseOrders.placeholder.purchaserPhoneNumber")}
                                            className={"tio-account_square_outlined"}
                                            onBlur={handleChangeSimpleField(nameof(model.purchaserPhoneNumber))} />
                                    </FormItem>
                                </Col>



                                <Col lg={6} className='pr-3'>
                                    <FormItem label={translate("purchaseOrders.supplierEmail")}
                                        validateStatus={formService.getValidationStatus<PurchaseOrder>(model.errors, nameof(model.supplierEmail))}
                                        message={model.errors?.supplierEmail}>
                                        <InputText isMaterial={true}
                                            value={model.supplierEmail}
                                            placeHolder={translate("purchaseOrders.placeholder.supplierEmail")}
                                            className={"tio-account_square_outlined"}
                                            onBlur={handleChangeSimpleField(nameof(model.supplierEmail))} />
                                    </FormItem>
                                </Col>


                                <Col lg={6} className='pr-3'>
                                    <FormItem label={translate("purchaseOrders.supplierPhoneNumber")}
                                        validateStatus={formService.getValidationStatus<PurchaseOrder>(model.errors, nameof(model.supplierPhoneNumber))}
                                        message={model.errors?.supplierPhoneNumber}>
                                        <InputText isMaterial={true}
                                            value={model.supplierPhoneNumber}
                                            placeHolder={translate("purchaseOrders.placeholder.supplierPhoneNumber")}
                                            className={"tio-account_square_outlined"}
                                            onBlur={handleChangeSimpleField(nameof(model.supplierPhoneNumber))} />
                                    </FormItem>
                                </Col>



                                <Col lg={6} className='pr-3'>
                                    <FormItem label={translate("purchaseOrders.recipientAddress")}
                                        validateStatus={formService.getValidationStatus<PurchaseOrder>(model.errors, nameof(model.recipientAddress))}
                                        message={model.errors?.recipientAddress}>
                                        <InputText isMaterial={true}
                                            value={model.recipientAddress}
                                            placeHolder={translate("purchaseOrders.placeholder.recipientAddress")}
                                            className={"tio-account_square_outlined"}
                                            onBlur={handleChangeSimpleField(nameof(model.recipientAddress))} />
                                    </FormItem>
                                </Col>


                                <Col lg={6} className='pr-3'>
                                    <FormItem label={translate("purchaseOrders.recipientPhoneNumber")}
                                        validateStatus={formService.getValidationStatus<PurchaseOrder>(model.errors, nameof(model.recipientPhoneNumber))}
                                        message={model.errors?.recipientPhoneNumber}>
                                        <InputText isMaterial={true}
                                            value={model.recipientPhoneNumber}
                                            placeHolder={translate("purchaseOrders.placeholder.recipientPhoneNumber")}
                                            className={"tio-account_square_outlined"}
                                            onBlur={handleChangeSimpleField(nameof(model.recipientPhoneNumber))} />
                                    </FormItem>
                                </Col>



                                <Col lg={6} className='pr-3'>
                                    <FormItem label={translate("purchaseOrders.expectedAt")}
                                        validateStatus={formService.getValidationStatus<PurchaseOrder>(model.errors, nameof(model.expectedAt))}
                                        message={model.errors?.expectedAt}>
                                        <DatePicker isMaterial={true}
                                            value={model.expectedAt}
                                            placeholder={translate("purchaseOrders.placeholder.expectedAt")}
                                            onChange={handleChangeSimpleField(nameof(model.expectedAt))} />
                                    </FormItem>
                                </Col>



                                <Col lg={6} className='pr-3'>
                                    <FormItem label={translate("purchaseOrders.subTotal")}
                                        validateStatus={formService.getValidationStatus<PurchaseOrder>(model.errors, nameof(model.subTotal))}
                                        message={model.errors?.subTotal}>
                                        <InputNumber isMaterial={true}
                                            value={model.subTotal}
                                            placeHolder={translate("purchaseOrders.placeholder.subTotal")}
                                            onBlur={handleChangeSimpleField(nameof(model.subTotal))}
                                            numberType={DECIMAL} />
                                    </FormItem>
                                </Col>


                                <Col lg={6} className='pr-3'>
                                    <FormItem label={translate("purchaseOrders.commission")}
                                        validateStatus={formService.getValidationStatus<PurchaseOrder>(model.errors, nameof(model.commission))}
                                        message={model.errors?.commission}>
                                        <InputNumber isMaterial={true}
                                            value={model.commission}
                                            placeHolder={translate("purchaseOrders.placeholder.commission")}
                                            onBlur={handleChangeSimpleField(nameof(model.commission))}
                                            numberType={DECIMAL} />
                                    </FormItem>
                                </Col>


                                <Col lg={6} className='pr-3'>
                                    <FormItem label={translate("purchaseOrders.generalDiscountPercentage")}
                                        validateStatus={formService.getValidationStatus<PurchaseOrder>(model.errors, nameof(model.generalDiscountPercentage))}
                                        message={model.errors?.generalDiscountPercentage}>
                                        <InputNumber isMaterial={true}
                                            value={model.generalDiscountPercentage}
                                            placeHolder={translate("purchaseOrders.placeholder.generalDiscountPercentage")}
                                            onBlur={handleChangeSimpleField(nameof(model.generalDiscountPercentage))}
                                            numberType={DECIMAL} />
                                    </FormItem>
                                </Col>


                                <Col lg={6} className='pr-3'>
                                    <FormItem label={translate("purchaseOrders.generalDiscountAmount")}
                                        validateStatus={formService.getValidationStatus<PurchaseOrder>(model.errors, nameof(model.generalDiscountAmount))}
                                        message={model.errors?.generalDiscountAmount}>
                                        <InputNumber isMaterial={true}
                                            value={model.generalDiscountAmount}
                                            placeHolder={translate("purchaseOrders.placeholder.generalDiscountAmount")}
                                            onBlur={handleChangeSimpleField(nameof(model.generalDiscountAmount))}
                                            numberType={DECIMAL} />
                                    </FormItem>
                                </Col>


                                <Col lg={6} className='pr-3'>
                                    <FormItem label={translate("purchaseOrders.total")}
                                        validateStatus={formService.getValidationStatus<PurchaseOrder>(model.errors, nameof(model.total))}
                                        message={model.errors?.total}>
                                        <InputNumber isMaterial={true}
                                            value={model.total}
                                            placeHolder={translate("purchaseOrders.placeholder.total")}
                                            onBlur={handleChangeSimpleField(nameof(model.total))}
                                            numberType={DECIMAL} />
                                    </FormItem>
                                </Col>


                                <Col lg={6} className='pr-3'>
                                    <FormItem label={translate("purchaseOrders.used")}
                                        validateStatus={formService.getValidationStatus<PurchaseOrder>(model.errors, nameof(model.used))}
                                        message={model.errors?.used}>
                                        <Switch size='small'
                                            onChange={handleChangeSimpleField(nameof(model.used))}
                                            checked={model.used} />
                                    </FormItem>
                                </Col>










                                <Col lg={6} className='pr-3'>
                                    <FormItem label={translate("purchaseOrders.creator")}
                                        validateStatus={formService.getValidationStatus<PurchaseOrder>(model.errors, nameof(model.creator))}
                                        message={model.errors?.creator} >
                                        <Select isMaterial={true}
                                            classFilter={AppUserFilter}
                                            placeHolder={translate("purchaseOrders.placeholder.creator")}
                                            getList={purchaseOrderRepository.singleListAppUser}
                                            onChange={handleChangeObjectField(nameof(model.creator))}
                                            model={model.creator} />
                                    </FormItem>
                                </Col>

                                <Col lg={6} className='pr-3'>
                                    <FormItem label={translate("purchaseOrders.project")}
                                        validateStatus={formService.getValidationStatus<PurchaseOrder>(model.errors, nameof(model.project))}
                                        message={model.errors?.project} >
                                        <TreeSelect isMaterial={true}
                                            placeHolder={translate("purchaseOrders.placeholder.project")}
                                            selectable={true}
                                            classFilter={ProjectFilter}
                                            onChange={handleChangeTreeObjectField(nameof(model.project))}
                                            checkStrictly={true}
                                            getTreeData={purchaseOrderRepository.singleListProject}
                                            item={model.project} />
                                    </FormItem>
                                </Col>

                                <Col lg={6} className='pr-3'>
                                    <FormItem label={translate("purchaseOrders.projectBudget")}
                                        validateStatus={formService.getValidationStatus<PurchaseOrder>(model.errors, nameof(model.projectBudget))}
                                        message={model.errors?.projectBudget} >
                                        <Select isMaterial={true}
                                            classFilter={ProjectBudgetFilter}
                                            placeHolder={translate("purchaseOrders.placeholder.projectBudget")}
                                            getList={purchaseOrderRepository.singleListProjectBudget}
                                            onChange={handleChangeObjectField(nameof(model.projectBudget))}
                                            model={model.projectBudget} />
                                    </FormItem>
                                </Col>

                                <Col lg={6} className='pr-3'>
                                    <FormItem label={translate("purchaseOrders.projectOrganization")}
                                        validateStatus={formService.getValidationStatus<PurchaseOrder>(model.errors, nameof(model.projectOrganization))}
                                        message={model.errors?.projectOrganization} >
                                        <TreeSelect isMaterial={true}
                                            placeHolder={translate("purchaseOrders.placeholder.projectOrganization")}
                                            selectable={true}
                                            classFilter={OrganizationFilter}
                                            onChange={handleChangeTreeObjectField(nameof(model.projectOrganization))}
                                            checkStrictly={true}
                                            getTreeData={purchaseOrderRepository.singleListOrganization}
                                            item={model.projectOrganization} />
                                    </FormItem>
                                </Col>

                                <Col lg={6} className='pr-3'>
                                    <FormItem label={translate("purchaseOrders.purchaseOrderType")}
                                        validateStatus={formService.getValidationStatus<PurchaseOrder>(model.errors, nameof(model.purchaseOrderType))}
                                        message={model.errors?.purchaseOrderType} >
                                        <Select isMaterial={true}
                                            classFilter={PurchaseOrderTypeFilter}
                                            placeHolder={translate("purchaseOrders.placeholder.purchaseOrderType")}
                                            getList={purchaseOrderRepository.singleListPurchaseOrderType}
                                            onChange={handleChangeObjectField(nameof(model.purchaseOrderType))}
                                            model={model.purchaseOrderType} />
                                    </FormItem>
                                </Col>

                                <Col lg={6} className='pr-3'>
                                    <FormItem label={translate("purchaseOrders.purchaseOrganization")}
                                        validateStatus={formService.getValidationStatus<PurchaseOrder>(model.errors, nameof(model.purchaseOrganization))}
                                        message={model.errors?.purchaseOrganization} >
                                        <TreeSelect isMaterial={true}
                                            placeHolder={translate("purchaseOrders.placeholder.purchaseOrganization")}
                                            selectable={true}
                                            classFilter={OrganizationFilter}
                                            onChange={handleChangeTreeObjectField(nameof(model.purchaseOrganization))}
                                            checkStrictly={true}
                                            getTreeData={purchaseOrderRepository.singleListOrganization}
                                            item={model.purchaseOrganization} />
                                    </FormItem>
                                </Col>

                                <Col lg={6} className='pr-3'>
                                    <FormItem label={translate("purchaseOrders.purchasePlan")}
                                        validateStatus={formService.getValidationStatus<PurchaseOrder>(model.errors, nameof(model.purchasePlan))}
                                        message={model.errors?.purchasePlan} >
                                        <Select isMaterial={true}
                                            classFilter={PurchasePlanFilter}
                                            placeHolder={translate("purchaseOrders.placeholder.purchasePlan")}
                                            getList={purchaseOrderRepository.singleListPurchasePlan}
                                            onChange={handleChangeObjectField(nameof(model.purchasePlan))}
                                            model={model.purchasePlan} />
                                    </FormItem>
                                </Col>

                                <Col lg={6} className='pr-3'>
                                    <FormItem label={translate("purchaseOrders.purchaseRequest")}
                                        validateStatus={formService.getValidationStatus<PurchaseOrder>(model.errors, nameof(model.purchaseRequest))}
                                        message={model.errors?.purchaseRequest} >
                                        <Select isMaterial={true}
                                            classFilter={PurchaseRequestFilter}
                                            placeHolder={translate("purchaseOrders.placeholder.purchaseRequest")}
                                            getList={purchaseOrderRepository.singleListPurchaseRequest}
                                            onChange={handleChangeObjectField(nameof(model.purchaseRequest))}
                                            model={model.purchaseRequest} />
                                    </FormItem>
                                </Col>

                                <Col lg={6} className='pr-3'>
                                    <FormItem label={translate("purchaseOrders.purchaser")}
                                        validateStatus={formService.getValidationStatus<PurchaseOrder>(model.errors, nameof(model.purchaser))}
                                        message={model.errors?.purchaser} >
                                        <Select isMaterial={true}
                                            classFilter={AppUserFilter}
                                            placeHolder={translate("purchaseOrders.placeholder.purchaser")}
                                            getList={purchaseOrderRepository.singleListAppUser}
                                            onChange={handleChangeObjectField(nameof(model.purchaser))}
                                            model={model.purchaser} />
                                    </FormItem>
                                </Col>

                                <Col lg={6} className='pr-3'>
                                    <FormItem label={translate("purchaseOrders.receiveOrganization")}
                                        validateStatus={formService.getValidationStatus<PurchaseOrder>(model.errors, nameof(model.receiveOrganization))}
                                        message={model.errors?.receiveOrganization} >
                                        <TreeSelect isMaterial={true}
                                            placeHolder={translate("purchaseOrders.placeholder.receiveOrganization")}
                                            selectable={true}
                                            classFilter={OrganizationFilter}
                                            onChange={handleChangeTreeObjectField(nameof(model.receiveOrganization))}
                                            checkStrictly={true}
                                            getTreeData={purchaseOrderRepository.singleListOrganization}
                                            item={model.receiveOrganization} />
                                    </FormItem>
                                </Col>

                                <Col lg={6} className='pr-3'>
                                    <FormItem label={translate("purchaseOrders.recipient")}
                                        validateStatus={formService.getValidationStatus<PurchaseOrder>(model.errors, nameof(model.recipient))}
                                        message={model.errors?.recipient} >
                                        <Select isMaterial={true}
                                            classFilter={AppUserFilter}
                                            placeHolder={translate("purchaseOrders.placeholder.recipient")}
                                            getList={purchaseOrderRepository.singleListAppUser}
                                            onChange={handleChangeObjectField(nameof(model.recipient))}
                                            model={model.recipient} />
                                    </FormItem>
                                </Col>

                                <Col lg={6} className='pr-3'>
                                    <FormItem label={translate("purchaseOrders.status")}
                                        validateStatus={formService.getValidationStatus<PurchaseOrder>(model.errors, nameof(model.status))}
                                        message={model.errors?.status} >
                                        <Select isMaterial={true}
                                            classFilter={StatusFilter}
                                            placeHolder={translate("purchaseOrders.placeholder.status")}
                                            getList={purchaseOrderRepository.singleListStatus}
                                            onChange={handleChangeObjectField(nameof(model.status))}
                                            model={model.status} />
                                    </FormItem>
                                </Col>

                                <Col lg={6} className='pr-3'>
                                    <FormItem label={translate("purchaseOrders.supplier")}
                                        validateStatus={formService.getValidationStatus<PurchaseOrder>(model.errors, nameof(model.supplier))}
                                        message={model.errors?.supplier} >
                                        <Select isMaterial={true}
                                            classFilter={SupplierFilter}
                                            placeHolder={translate("purchaseOrders.placeholder.supplier")}
                                            getList={purchaseOrderRepository.singleListSupplier}
                                            onChange={handleChangeObjectField(nameof(model.supplier))}
                                            model={model.supplier} />
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
                    translate("purchaseOrders.detail.title")
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

export default PurchaseOrderDetail;
