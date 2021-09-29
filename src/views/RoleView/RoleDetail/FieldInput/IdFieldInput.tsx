import { Model, ModelFilter, Repository } from "@react3l/react3l/core";
import { AxiosResponse } from "axios";
import Select from "components/Utility/Select/Select";
import TreeSelect from "components/Utility/TreeSelect/TreeSelect";
import { httpConfig } from "config/http";
import { CategoryFilter } from "models/Category/CategoryFilter";
import { OrganizationFilter } from "models/Organization/OrganizationFilter";
import { PermissionContent } from "models/PermissionContent";
import { Moment } from "moment";
import React from "react";
import { useTranslation } from "react-i18next";
import { roleRepository } from "repositories/role-repository";
import { map } from "rxjs/operators";


export class ListService extends Repository {
    constructor() {
        super(httpConfig);
    }

    public singleList(api) {
        return this.httpObservable
            .post<any[]>(`${api}`, {})
            .pipe(map((response: AxiosResponse<any[]>) => response.data));
    }

}
export interface IdFilterInputProps {
    value?: string | number | Moment | boolean | undefined | Model;
    fieldName?: string;
    index?: number;
    contents?: PermissionContent[];
    setContents?: (v: PermissionContent[]) => void;
    disabled?: boolean;
}

function IdFieldInput(props: IdFilterInputProps) {
    const [translate] = useTranslation();
    const { value, fieldName, index, contents, setContents, disabled } = props;
    const [object, setObject] = React.useState<Model>(new Model());
    const [api, setApi] = React.useState<any>('');
    const listService = new ListService();
    const [loadList, setLoadList] = React.useState<boolean>(true);
    React.useEffect(() => {
        roleRepository.getSingleListApi({ fieldName: fieldName }).subscribe((res) => {
            setApi(res._API);
        });
    }, [fieldName]);
    React.useEffect(() => {
        if (loadList) {
            if (value && api) {
                listService.singleList(api).subscribe(res => {
                    res.forEach(item => {
                        if (item.id === Number(value)) {
                            setObject(item);
                            setLoadList(false);
                        }
                    });
                });

            }
        }

    }, [api, listService, loadList, value]);
    const handleChange = React.useCallback(
        (value, valueObject) => {
            if (value?.length > 0) {
                setObject(value[0]);
                contents[index] = { ...contents[index], value: value[0]?.id };
            } else {
                setObject(valueObject);
                contents[index] = { ...contents[index], value: valueObject?.id };
            }
            setContents([...contents]);
        },
        [contents, index, setContents]
    );
    const renderInput = React.useMemo(() => {
        return () => {
            switch (fieldName.trim()) {
                case 'OrganizationId':
                    return (
                        <TreeSelect
                            isMaterial={true}
                            placeHolder={translate("permissions.placeholder.idField")}
                            selectable={true}
                            classFilter={OrganizationFilter}
                            onChange={handleChange}
                            checkStrictly={true}
                            getTreeData={() => listService.singleList(api)}
                            item={object}
                            disabled={disabled}
                        />
                    );

                case 'CategoryId':
                    return (
                        <TreeSelect
                            isMaterial={true}
                            placeHolder={translate("permissions.placeholder.idField")}
                            selectable={true}
                            classFilter={CategoryFilter}
                            onChange={handleChange}
                            checkStrictly={true}
                            getTreeData={() => listService.singleList(api)}
                            item={object}
                            disabled={disabled}
                        />
                    );
                default:
                    return (
                        <Select
                            isMaterial={true}
                            classFilter={ModelFilter}
                            placeHolder={translate("permissions.placeholder.idField")}
                            getList={() => listService.singleList(api)}
                            onChange={handleChange}
                            model={object}
                            disabled={disabled}
                        />
                    );

            }

        };
    }, [api, disabled, fieldName, handleChange, listService, object, translate]);

    return (
        <>{renderInput()}</>
    );
}

export default IdFieldInput;

