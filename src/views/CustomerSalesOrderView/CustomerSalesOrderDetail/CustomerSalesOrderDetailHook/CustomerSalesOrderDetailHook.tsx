import { debounce } from "@react3l/react3l/helpers";
import { Customer, CustomerFilter } from "models/Customer";
import { CustomerSalesOrder } from "models/CustomerSalesOrder";
import { CustomerSalesOrderContent } from "models/CustomerSalesOrderContent";
import { DistrictFilter } from "models/District";
import { EditedPriceStatus } from "models/EditedPriceStatus";
import { ProvinceFilter } from "models/Province";
import React from "react";
import { customerSalesOrderRepository } from "repositories/customer-sales-order-repository";
import { enumService } from "services/enum-service";
import { queryStringService } from "services/query-string-service";

export function useCustomerSalesOrderDetailHook(
  model: CustomerSalesOrder,
  setModel: (data: CustomerSalesOrder) => void,
  isDetail: boolean
) {
  const [invoiceProvinceFilter, setInvoiceProvinceFilter] = React.useState<
    ProvinceFilter
  >(new ProvinceFilter());

  const [invoiceDistrictFilter, setInvoiceDistrictFilter] = React.useState<
    DistrictFilter
  >(new DistrictFilter());

  const [deliveryProvinceFilter, setDeliveryProvinceFilter] = React.useState<
    ProvinceFilter
  >(new ProvinceFilter());
  const [deliveryDistrictFilter, setDeliveryDistrictFilter] = React.useState<
    DistrictFilter
  >(new DistrictFilter());

  const [customerFilter, setCustomerFilter] = React.useState<CustomerFilter>(
    new CustomerFilter()
  );

  const handleDelete = React.useCallback(
    (index: number) => {
      return () => {
        model.customerSalesOrdercontents?.splice(index, 1);
        setModel(
          CustomerSalesOrder.clone<CustomerSalesOrder>({
            ...model,
          })
        );
      };
    },
    [model, setModel]
  );
  const [isCustomerSalesOrder, setIsCustomerSalesOrder] = React.useState<
    boolean
  >(true);

  const { id: customerId } = queryStringService.useGetQueryString("customerId");

  React.useEffect(() => {
    if (isCustomerSalesOrder && !isDetail) {
      if (customerId) {
        customerSalesOrderRepository
          .singleListCustomer({
            ...new CustomerFilter(),
            id: { equal: customerId },
          })
          .subscribe((list: Customer[]) => {
            model.customer = list[0];
            model.customerId = list[0].id;
            model.phone = list[0].phone;
            setModel({ ...model });
          });
      }
      setModel({
        ...model,
        requestState: {
          id: 1,
          name: "Mới tạo",
        },
        requestStateId: 1,
        orderPaymentStatus: { id: 1, name: "Chưa thanh toán" },
        orderPaymentStatusId: 1,
      });
      setIsCustomerSalesOrder(false);
    }
  }, [
    setModel,
    model,
    customerId,
    setIsCustomerSalesOrder,
    isCustomerSalesOrder,
    isDetail,
  ]);

  const handleCopyInvoiceAddress = React.useCallback(() => {
    setModel({
      ...model,
      deliveryAddress: model.invoiceAddress,
      deliveryNation: model.invoiceNation,
      deliveryNationId: model.invoiceNationId,
      deliveryProvince: model.invoiceProvince,
      deliveryProvinceId: model.invoiceProvinceId,
      deliveryDistrict: model.invoiceDistrict,
      deliveryDistrictId: model.invoiceDistrictId,
      deliveryZIPCode: model.invoiceZIPCode,
    });
  }, [model, setModel]);
  // filter địa chỉ
  const handleChangeInvoiceNation = React.useCallback(() => {
    return (invoiceNationId, invoiceNation) => {
      model.invoiceNation = invoiceNation;
      model.invoiceNationId = invoiceNationId;
      model.invoiceProvinceId = undefined;
      model.invoiceProvince = undefined;
      model.invoiceDistrict = undefined;
      model.invoiceDistrictId = undefined;
      setModel(
        CustomerSalesOrder.clone<CustomerSalesOrder>({
          ...model,
        })
      );
      setInvoiceProvinceFilter({
        ...invoiceProvinceFilter,
        nationId: { equal: invoiceNationId },
      });
    };
  }, [setModel, model, invoiceProvinceFilter]);

  const handleChangeInvoiceProvince = React.useCallback(() => {
    return (invoiceProvinceId, invoiceProvince) => {
      model.invoiceProvince = invoiceProvince;
      model.invoiceProvinceId = invoiceProvinceId;
      model.invoiceDistrict = undefined;
      model.invoiceDistrictId = undefined;
      setModel(
        CustomerSalesOrder.clone<CustomerSalesOrder>({
          ...model,
        })
      );
      setInvoiceDistrictFilter({
        ...invoiceDistrictFilter,
        provinceId: { equal: invoiceProvinceId },
      });
    };
  }, [setModel, model, invoiceDistrictFilter]);

  const handleChangeDeliveryNation = React.useCallback(() => {
    return (nationId, nation) => {
      model.deliveryNation = nation;
      model.deliveryNationId = nationId;
      model.deliveryProvince = undefined;
      model.deliveryProvinceId = undefined;
      model.deliveryDistrict = undefined;
      model.deliveryDistrictId = undefined;
      setModel(
        CustomerSalesOrder.clone<CustomerSalesOrder>({
          ...model,
        })
      );
      setDeliveryProvinceFilter({
        ...deliveryProvinceFilter,
        nationId: { equal: nationId },
      });
    };
  }, [model, setModel, deliveryProvinceFilter]);

  const handleChangeDeliveryProvince = React.useCallback(() => {
    return (provinceId, province) => {
      model.deliveryProvince = province;
      model.deliveryProvinceId = provinceId;
      model.deliveryDistrict = undefined;
      model.deliveryDistrictId = undefined;
      setModel(
        CustomerSalesOrder.clone<CustomerSalesOrder>({
          ...model,
        })
      );
      setDeliveryDistrictFilter({
        ...deliveryDistrictFilter,
        provinceId: { equal: provinceId },
      });
    };
  }, [model, setModel, deliveryDistrictFilter]);

  const handleChangeEmployee = React.useCallback(() => {
    return (salesEmployeeId, salesEmployee) => {
      model.salesEmployee = salesEmployee;
      model.salesEmployeeId = salesEmployeeId;
      setModel(
        CustomerSalesOrder.clone<CustomerSalesOrder>({
          ...model,
        })
      );
    };
  }, [model, setModel]);

  const handleChangeOrderType = React.useCallback(() => {
    return (event, item) => {
      model.customerSalesOrderTypeId = event;
      model.customerSalesOrderType = item;
      model.customer = undefined;
      model.customerId = undefined;
      setModel(
        CustomerSalesOrder.clone<CustomerSalesOrder>({
          ...model,
        })
      );
      setCustomerFilter({
        ...customerFilter,
        customerTypeId: { equal: event },
      });
    };
  }, [model, setModel, customerFilter, setCustomerFilter]);

  const handleChangeCustomer = React.useCallback(
    (id: number, item: Customer) => {
      model.customerId = id;
      model.customer = item;
      setModel(
        CustomerSalesOrder.clone<CustomerSalesOrder>({
          ...model,
        })
      );
    },
    [model, setModel]
  );

  // sản phẩm
  // editedPriceStatus
  const [editedPriceStatus] = enumService.useEnumList<EditedPriceStatus>(
    customerSalesOrderRepository.singleListEditedPriceStatus
  );
  const [calculateTotal, setCalculateTotal] = React.useState<boolean>(true);
  const [changeEditPrice, setChangeEditPrice] = React.useState<boolean>(false);
  const calculateAmount = React.useMemo(() => {
    return (
      quantity: number,
      salePrice: number,
      disCount: number,
      generalDiscountPercentage: number
    ) => {
      return Number.parseFloat(
        (
          (quantity *
            salePrice *
            ((100 - disCount) / 100) *
            (100 - generalDiscountPercentage)) /
          100
        ).toFixed(3)
      );
    };
  }, []);
  const calculateAmountTotal = React.useMemo(() => {
    return (quantity: number, salePrice: number, disCount: number) => {
      return Number.parseFloat(
        (quantity * salePrice * ((100 - disCount) / 100)).toFixed(3)
      );
    };
  }, []);
  React.useEffect(() => {
    if (calculateTotal) {
      let newSubTotal = 0;
      let generalDiscountAmountt =
        model.generalDiscountAmount !== undefined
          ? model.generalDiscountAmount
          : 0;
      let generalVAT = 0;
      // let generalVATOther = 0;
      if (
        model.customerSalesOrderContents &&
        model.customerSalesOrderContents.length >= 0
      ) {
        model.customerSalesOrderContents.forEach(
          (customerSalesOrderContent: CustomerSalesOrderContent) => {
            const subAmountTotal = calculateAmountTotal(
              customerSalesOrderContent.quantity,
              customerSalesOrderContent.salePrice,
              customerSalesOrderContent.discountPercentage
            );
            const subAmountDiscount = calculateAmount(
              customerSalesOrderContent.quantity,
              customerSalesOrderContent.salePrice,
              customerSalesOrderContent.discountPercentage,
              customerSalesOrderContent.generalDiscountPercentage
            );
            customerSalesOrderContent.generalDiscountPercentage =
              model.generalDiscountPercentage !== undefined
                ? model.generalDiscountPercentage
                : 0;
            newSubTotal += subAmountTotal;
            const tPercent = customerSalesOrderContent.taxPercentage || 0;
            generalVAT += (subAmountDiscount * tPercent) / 100;
          }
        );
        if (newSubTotal >= 0 && model.generalDiscountPercentage) {
          generalDiscountAmountt =
            (newSubTotal * model.generalDiscountPercentage) / 100;
        }

        let newTotal = newSubTotal - generalDiscountAmountt + generalVAT;
        if (model.generalDiscountPercentage === 100) {
          generalVAT = 0;
          newTotal = 0;
        }
        if (model.customerSalesOrderContents.length === 0) {
          model.generalDiscountPercentage = 0;
        }
        setModel({
          ...model,
          subTotal: newSubTotal,
          totalTax: Number.parseFloat(generalVAT.toFixed(2)),
          total: Number.parseFloat(newTotal.toFixed(2)),
          generalDiscountAmount: generalDiscountAmountt,
        });
      }

      setCalculateTotal(false);
    }
  }, [calculateAmountTotal, calculateTotal, model, setModel, calculateAmount]);
  const handleChangeGeneralDiscountPercentage = React.useCallback(
    debounce((event) => {
      let percent = event ? event : 0;
      if (percent > 100) {
        percent = 100;
      }

      let discountAmount = Math.floor(
        (percent / 100) * model?.subTotal,
      );

      if (percent === 0) {
        discountAmount = 0;
      }
      setModel({
        ...model,
        generalDiscountAmount:
          typeof event !== "undefined"
            ? discountAmount
            : model?.generalDiscountAmount,
        generalDiscountPercentage: percent,
      });
      setCalculateTotal(true);
    }),
    [model, setModel]
  );
  const handleChangeChangeEditPrice = React.useCallback(
    (editedPriceStatusId, editedPriceStatus) => {
      if (editedPriceStatusId === 0) {
        setChangeEditPrice(true);
        if (
          model.customerSalesOrderContents &&
          model.customerSalesOrderContents.length > 0
        ) {
          model.customerSalesOrderContents.forEach(
            (customerSalesOrderContent: CustomerSalesOrderContent) => {
              customerSalesOrderContent.primaryPrice =
                customerSalesOrderContent.item?.salePrice;
              customerSalesOrderContent.editedPriceStatusId = 0;
            }
          );
        }
      } else {
        setChangeEditPrice(false);
      }
      setModel({
        ...model,
        editedPriceStatusId,
        editedPriceStatus,
      });
    },
    [model, setModel]
  );
  // Create popup nhanh
  const [isOpenOpportunity, setIsOpenOpportunity] = React.useState<boolean>(
    false
  );
  const [issetOpportunity, setIsSetOpportunity] = React.useState<boolean>(
    false
  );

  const handleToggleOpenOpportunity = React.useCallback(() => {
    setIsOpenOpportunity(!isOpenOpportunity);
    setIsSetOpportunity(true);
  }, [isOpenOpportunity]);

  const [isOpenCustomer, setIsOpenCustomer] = React.useState<boolean>(false);
  const [issetCustomer, setIsSetCustomer] = React.useState<boolean>(false);

  const handleToggleOpenCustomer = React.useCallback(() => {
    setIsOpenCustomer(!isOpenCustomer);
    setIsSetCustomer(true);
  }, [isOpenCustomer]);

  if (model.id && model.customerSalesOrderTypeId) {
    customerFilter.customerTypeId.equal = model.customerSalesOrderTypeId;
  }
  if (model.id && model.invoiceNationId) {
    invoiceProvinceFilter.nationId.equal = model.invoiceNationId;
  }
  if (model.id && model.invoiceProvinceId) {
    invoiceDistrictFilter.provinceId.equal = model.invoiceProvinceId;
  }
  if (model.id && model.deliveryNationId) {
    deliveryProvinceFilter.nationId.equal = model.deliveryNationId;
  }
  if (model.id && model.deliveryDistrictId) {
    deliveryDistrictFilter.provinceId.equal = model.deliveryDistrictId;
  }

  return {
    issetOpportunity,
    isOpenOpportunity,
    setIsSetOpportunity,
    handleToggleOpenOpportunity,
    issetCustomer,
    isOpenCustomer,
    setIsSetCustomer,
    handleToggleOpenCustomer,
    handleChangeCustomer,
    handleChangeEmployee,
    handleDelete,
    handleCopyInvoiceAddress,
    handleChangeInvoiceNation,
    handleChangeInvoiceProvince,
    invoiceProvinceFilter,
    invoiceDistrictFilter,
    handleChangeDeliveryNation,
    handleChangeDeliveryProvince,
    deliveryProvinceFilter,
    deliveryDistrictFilter,
    editedPriceStatus,
    handleChangeChangeEditPrice,
    handleChangeGeneralDiscountPercentage,
    setCalculateTotal,
    changeEditPrice,
    setChangeEditPrice,
    handleChangeOrderType,
    customerFilter,
    customerId
  };
}
