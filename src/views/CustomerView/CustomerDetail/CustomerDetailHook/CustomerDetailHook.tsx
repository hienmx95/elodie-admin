import { Model } from "@react3l/react3l/core";
import { Currency } from "models/Currency";
import { Customer } from "models/Customer";
import { DistrictFilter } from "models/District";
import { ProvinceFilter } from "models/Province";
import React, { Dispatch, SetStateAction } from "react";
import { queryStringService } from "services/query-string-service";
export function useCustomerDetailHook(
  model?: Customer,
  setModel?: Dispatch<SetStateAction<Model>>
) {
  const [provinceFilter, setProvinceFilter] = React.useState<ProvinceFilter>(
    new ProvinceFilter()
  );
  const [districtFilter, setDistrictFilter] = React.useState<DistrictFilter>(
    new DistrictFilter()
  );

  const [isOpenCompany, setIsOpenCompany] = React.useState<boolean>(false);

  const handleToggleOpenCompany = React.useCallback(() => {
    setIsOpenCompany(!isOpenCompany);
  }, [isOpenCompany]);

  const [display, setDisplay] = React.useState<boolean>(false);

  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const [dropdownOpen1, setDropdownOpen1] = React.useState(false);

  const toggleDropDown = () => setDropdownOpen(!dropdownOpen);

  const toggleDropDown1 = () => setDropdownOpen1(!dropdownOpen1);

  const onChangeCurrency = React.useCallback(
    (value: Currency, check: boolean) => {
      if (check) {
        model.currencyInvestment = value;
        model.currencyInvestmentId = value.id;
        setModel({ ...model });
      } else {
        model.currencyRevenueAnnual = value;
        model.currencyRevenueAnnualId = value.id;
        setModel({ ...model });
      }
    },
    [setModel, model]
  );

  // const [srcImage, setSrcImage] = React.useState<string>("");

  const handleChangeNation = React.useCallback(() => {
    return (nationId, nation) => {
      model.nation = nation;
      model.nationId = nationId;
      model.provinceId = undefined;
      model.province = undefined;
      model.district = undefined;
      model.districtId = undefined;
      setModel(
        Customer.clone<Customer>({
          ...model,
        })
      );
      setProvinceFilter({
        ...provinceFilter,
        nationId: { equal: nationId },
      });
    };
  }, [setModel, model, provinceFilter]);

  const handleChangeProvince = React.useCallback(() => {
    return (provinceId, province) => {
      model.province = province;
      model.provinceId = provinceId;
      model.district = undefined;
      model.districtId = undefined;
      setModel(
        Customer.clone<Customer>({
          ...model,
        })
      );
      setDistrictFilter({
        ...districtFilter,
        provinceId: { equal: provinceId },
      });
    };
  }, [setModel, model, districtFilter]);

  const [addNew, setAddNew] = React.useState<boolean>(true);

  const [isEdit, setIsEdit] = React.useState<boolean>(true);

  const { id: customerTypeId } = queryStringService.useGetQueryString(
    "customerTypeId"
  );

  React.useEffect(() => {
    if (isEdit && model.id) {
      if (model.id) {
        setDisplay(model.customerTypeId === 1 ? false : true);
      }
      setIsEdit(false);
    }

    if (addNew) {
      model.statusId = 1;
      model.status = { id: 1, name: "Hoạt động" };
      model.sex = { name: "Nữ", id: 2 };
      model.sexId = 2;
      setDisplay(false);
      setModel({ ...model });
      setAddNew(false);
    }
  }, [
    addNew,
    isEdit,
    setIsEdit,
    setDisplay,
    setModel,
    setAddNew,
    model,
    customerTypeId,
  ]);

  return {
    toggleDropDown,
    dropdownOpen,
    toggleDropDown1,
    dropdownOpen1,
    onChangeCurrency,
    display,
    handleToggleOpenCompany,
    isOpenCompany,
    provinceFilter,
    districtFilter,
    handleChangeNation,
    handleChangeProvince,
  };
}
