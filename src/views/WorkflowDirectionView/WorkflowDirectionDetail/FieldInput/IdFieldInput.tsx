import { StringFilter } from "@react3l/advanced-filters";
import { Model, ModelFilter, Repository } from "@react3l/react3l/core";
import { AxiosResponse } from "axios";
import Select from "components/Utility/Select/Select";
import TreeSelect from "components/Utility/TreeSelect/TreeSelect";
import { httpConfig } from "config/http";
import { CategoryFilter } from "models/Category";
import { OrganizationFilter } from "models/Organization";
import { WorkflowDefinition } from "models/WorkflowDefinition";
import { Moment } from "moment";
import React from "react";
import { useTranslation } from "react-i18next";
import { workflowDirectionRepository } from "repositories/workflow-direction-repository";
import { map } from "rxjs/operators";



export class ListService extends Repository {
  constructor() {
    super(httpConfig);
  }

  public singleList(api, modelFilter) {
    return this.httpObservable
      .post<any[]>(`${api}`, modelFilter)
      .pipe(map((response: AxiosResponse<any[]>) => response.data));
  }

}
export interface IdFilterInputProps {
  value?: string | number | Moment | boolean | undefined | Model;
  fieldName?: string;
  index?: number;
  contents?: WorkflowDefinition[];
  setContents?: (v: WorkflowDefinition[]) => void;
  disabled?: boolean;
}


export class DynamicClassFilter extends ModelFilter {
  public name?: StringFilter = new StringFilter();
  public displayName?: StringFilter = new StringFilter()
}
function IdFieldInput(props: IdFilterInputProps) {
  const [translate] = useTranslation();
  const { value, fieldName, index, contents, setContents, disabled } = props;
  const [object, setObject] = React.useState<Model>(new Model());
  const [api, setApi] = React.useState<any>('');
  const listService = new ListService();
  const [loadList, setLoadList] = React.useState<boolean>(true);
  const filter = new DynamicClassFilter();
  React.useEffect(() => {
    workflowDirectionRepository.getSingleListApi({ fieldName: fieldName }).subscribe((res) => {
      setApi(res._API);
    });
  }, [fieldName]);

  React.useEffect(() => {
    if (loadList) {
      if (value && api) {
        listService.singleList(api, filter).subscribe(res => {
          res.forEach(item => {
            if (item.id === Number(value)) {
              setObject(item);
              setLoadList(false);
            }
          });
        });

      }
    }

  }, [api, filter, listService, loadList, value]);


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
      if (fieldName.includes('Organization')) {
        return (
          <TreeSelect
            isMaterial={true}
            placeHolder={translate(
              "workflowDirections.workflowDirectionConditions.placeholder.organization"
            )}
            selectable={true}
            classFilter={OrganizationFilter}
            onChange={handleChange}
            checkStrictly={true}
            getTreeData={workflowDirectionRepository.singleListOrganization}
            item={object}
            disabled={disabled}
          />
        );
      } else {
        if (fieldName.includes('Category')) {
          return (
            <TreeSelect
              isMaterial={true}
              placeHolder={translate(
                "workflowDirections.workflowDirectionConditions.placeholder.category"
              )}
              selectable={true}
              classFilter={CategoryFilter}
              onChange={handleChange}
              checkStrictly={true}
              getTreeData={workflowDirectionRepository.singleListCategory}
              item={object}
              disabled={disabled}
            />
          );
        }
        else {
          if (api) {
            return (
              <Select
                isMaterial={true}
                classFilter={DynamicClassFilter}
                modelFilter={filter}
                placeHolder={translate("workflowDirections.workflowDirectionConditions.placeholder.idField")}
                getList={() => listService.singleList(api, filter)}
                onChange={handleChange}
                model={object}
                disabled={disabled}
                searchType={"contain"}
                searchProperty={"name"}

              />
            );
          }

        }
      }
    };
  }, [fieldName, translate, handleChange, object, disabled, listService, api, filter]);

  return (
    <>{renderInput()}</>
  );
}

export default IdFieldInput;
