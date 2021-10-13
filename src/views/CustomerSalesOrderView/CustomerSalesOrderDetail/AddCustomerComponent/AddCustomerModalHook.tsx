import { commonService } from "@react3l/react3l/services";
import { AxiosError } from "axios";
import { STANDARD_DATE_FORMAT_INVERSE } from "config/consts";
import { Currency } from "models/Currency";
import { Customer } from "models/Customer";
import { CustomerGroupingFilter } from "models/CustomerGrouping";
import { CustomerSalesOrder } from "models/CustomerSalesOrder";
import { DistrictFilter } from "models/District";
import { ProvinceFilter } from "models/Province";
import { Moment } from "moment";
import React, { Dispatch, SetStateAction } from "react";
import { customerRepository } from "repositories/customer-repository";
import appMessageService from "services/app-message-service";
import { enumService } from "services/enum-service";
export function useObjectModalHook(
  modelLocal?: CustomerSalesOrder,
  setModelLocal?: Dispatch<SetStateAction<CustomerSalesOrder>>,
  handleClosePreview?: () => void,
  isSet?: boolean,
  setIsSet?: Dispatch<SetStateAction<boolean>>,
) {
  const [customer, setCustomer] = React.useState<Customer>(new Customer());

  const [subscription] = commonService.useSubscription();
  const [display, setDisplay] = React.useState<boolean>(false);
  const [displayBlock, setDisplayBlock] = React.useState<boolean>(false);
  const [customerGroupingFilter, setCustomerGroupingFilter] = React.useState<CustomerGroupingFilter>(
    new CustomerGroupingFilter()
  );
  const [provinceFilter, setProvinceFilter] = React.useState<ProvinceFilter>(
    new ProvinceFilter()
  );
  const [districtFilter, setDistrictFilter] = React.useState<DistrictFilter>(
    new DistrictFilter()
  );
  React.useEffect(() => {
    if (isSet) {
      customer.sex = { name: "Nữ", id: 2 };
      customer.sexId = 2;
      customer.statusId = 1;
      setDisplayBlock((customer?.customerTypeId === 1) ? false : true);
      setCustomer({ ...customer });
      setIsSet(false);
    }
  }, [customer, isSet, setIsSet]);

  const toggle = () => setDisplay(!display);

  const {
    notifyUpdateItemSuccess,
    notifyUpdateItemError,
  } = appMessageService.useCRUDMessage();

  const onclickCLoseModal = React.useCallback(() => {
    setIsSet(false);
    setCustomer(new Customer());
    handleClosePreview();
  }, [handleClosePreview, setIsSet]);

  const handleChangeSimpleField = React.useCallback(
    (fieldName: string) => {
      return (fieldValue: any) => {
        let value: any = fieldValue;
        if (typeof fieldValue?.target?.checked === "boolean") {
          value = fieldValue?.target?.checked;
        }
        setCustomer({ ...customer, [fieldName]: value });
      };
    },
    [customer]
  );
  const handleChangeDateField = React.useCallback((fieldName: string) => {
    return (moment: Moment) => {
      let value: any = moment;
      if (typeof moment?.toDate === STANDARD_DATE_FORMAT_INVERSE) {
        value = moment?.toDate;
      }
      setCustomer({
        ...customer,
        [fieldName]: value,
      });
    };
  }, [customer]);
  const handleChangeObjectField = React.useCallback(
    (fieldName: string) => {
      return (fieldIdValue: number, fieldValue?: any) => {
        setCustomer({
          ...customer,
          [fieldName]: fieldValue,
          [fieldName + "Id"]: fieldIdValue,
        });
      };
    },
    [customer]
  );

  const onClickhandleSave = React.useCallback(() => {
    subscription.add(
      customerRepository.create(customer).subscribe(
        (item: Customer) => {
          modelLocal.customer = item;
          modelLocal.customerId = item.id;
          modelLocal.customer.name = item?.name;
          modelLocal.phone = item?.phone;
          onclickCLoseModal();
          notifyUpdateItemSuccess(); // global message service go here
          setModelLocal({ ...modelLocal });
        },
        (error: AxiosError<Customer>) => {
          if (error.response && error.response.status === 400) {
            setCustomer(error.response?.data); // setModel for catching error
          }
          notifyUpdateItemError(); // global message service go here
        }
      )
    );
  }, [
    setCustomer,
    modelLocal,
    setModelLocal,
    onclickCLoseModal,
    notifyUpdateItemSuccess,
    notifyUpdateItemError,
    customer,
    subscription,
  ]);

  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [dropdownOpen1, setDropdownOpen1] = React.useState(false);
  const toggleDropDown = () => setDropdownOpen(!dropdownOpen);
  const toggleDropDown1 = () => setDropdownOpen1(!dropdownOpen1);

  React.useEffect(() => {
    if (isSet || typeof customer?.currency === undefined) {
      setIsSet(false);
      setCustomer({
        ...customer,
        currency: {
          id: 78,
          name: "VND",
        },
        currencyId: 78,
      }
      );
    }
  }, [isSet, setIsSet, customer]);
  const onChangeCurrency = React.useCallback(
    (value: Currency, check: boolean) => {
      if (check) {
        customer.currencyInvestment = value;
        customer.currencyInvestmentId = value.id;
        setCustomer({ ...customer });
      } else {
        customer.currencyRevenueAnnual = value;
        customer.currencyRevenueAnnualId = value.id;
        setCustomer({ ...customer });
      }
    },
    [customer]
  );
  const handleChangeNation = React.useCallback(() => {
    return (nationId, nation) => {
      customer.nation = nation;
      customer.nationId = nationId;
      customer.provinceId = undefined;
      customer.province = undefined;
      customer.district = undefined;
      customer.districtId = undefined;
      setCustomer(
        Customer.clone<Customer>({
          ...customer,
        })
      );
      setProvinceFilter({
        ...provinceFilter,
        nationId: { equal: nationId },
      });
    };
  }, [customer, provinceFilter]);

  const handleChangeProvince = React.useCallback(() => {
    return (provinceId, province) => {
      customer.province = province;
      customer.provinceId = provinceId;
      customer.district = undefined;
      customer.districtId = undefined;
      setCustomer(
        Customer.clone<Customer>({
          ...customer,
        })
      );
      setDistrictFilter({
        ...districtFilter,
        provinceId: { equal: provinceId },
      });
    };
  }, [customer, districtFilter]);

  return {
    customer,
    setCustomer,
    toggle,
    display,
    displayBlock,
    handleChangeSimpleField,
    handleChangeObjectField,
    handleChangeDateField,
    onclickCLoseModal,
    onClickhandleSave,
    onChangeCurrency,
    toggleDropDown,
    dropdownOpen,
    dropdownOpen1,
    toggleDropDown1,
    handleChangeNation,
    handleChangeProvince,
    provinceFilter,
    districtFilter,
    customerGroupingFilter,
  };
}
