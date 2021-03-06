import { StringFilter } from "@react3l/advanced-filters/StringFilter";
import { DEBOUNCE_TIME_300 } from "@react3l/react3l/config";
import { Model, ModelFilter } from "@react3l/react3l/core";
import { debounce } from "@react3l/react3l/helpers";
import { commonService } from "@react3l/react3l/services/common-service";
import Spin from "antd/lib/spin";
import classNames from "classnames";
import { ASSETS_IMAGE } from "config/consts";
import React, { RefObject } from "react";
import { ErrorObserver, Observable } from "rxjs";
import { commonWebService } from "services/common-web-service";
import nameof from "ts-nameof.macro";
import InputSelect from "../Input/InputSelect/InputSelect";
import "./SelectAddOption.scss";

export interface SelectAddOptionProps<
  T extends Model,
  TModelFilter extends ModelFilter
> {
  model?: Model;

  modelFilter?: TModelFilter;

  searchProperty?: string;

  searchType?: string;

  placeHolder?: string;

  disabled?: boolean;

  isMaterial?: boolean;

  isEnumerable?: boolean;

  getList?: (TModelFilter?: TModelFilter) => Observable<T[]>;

  onChange?: (id: number, T?: T) => void;

  render?: (t: T) => string;

  classFilter: new () => TModelFilter;

  onAdd?: () => void;

  textFooter?: string;
}

function defaultRenderObject<T extends Model>(t: T) {
  return t?.name;
}

function SelectAddOption(props: SelectAddOptionProps<Model, ModelFilter>) {
  const {
    model,
    modelFilter,
    searchProperty,
    searchType,
    placeHolder,
    disabled,
    isMaterial,
    isEnumerable,
    getList,
    onChange,
    render,
    classFilter: ClassFilter,
    onAdd,
    textFooter,
  } = props;
  // model ko thay đổi nên nó ko return model ??? nếu nó thay đổi thì sẽ cập nhật được giá trị
  const internalModel = React.useMemo((): Model => {
    return model || null;
  }, [model]);

  const [loading, setLoading] = React.useState<boolean>(false);

  const [list, setList] = React.useState<Model[]>([]);

  const [isExpand, setExpand] = React.useState<boolean>(false);

  const wrapperRef: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(
    null
  );

  const [subscription] = commonService.useSubscription();

  const handleLoadList = React.useCallback(() => {
    try {
      setLoading(true);
      subscription.add(getList);
      const filter = modelFilter ? modelFilter : new ClassFilter();
      getList(filter).subscribe(
        (res: Model[]) => {
          setList(res);
          setLoading(false);
        },
        (err: ErrorObserver<Error>) => {
          setList([]);
          setLoading(false);
        }
      );
    } catch (error) {}
  }, [getList, modelFilter, ClassFilter, subscription]);

  const handleToggle = React.useCallback(
    async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!disabled) {
        setExpand(true);
        if (isEnumerable) {
          if (list.length === 0) {
            await handleLoadList();
          }
        } else {
          await handleLoadList();
        }
      }
    },
    [handleLoadList, isEnumerable, list, disabled]
  );

  const handleCloseSelect = React.useCallback(() => {
    setExpand(false);
  }, []);

  const handleClickItem = React.useCallback(
    (item: Model) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      onChange(item.id, item);
      handleCloseSelect();
    },
    [handleCloseSelect, onChange]
  );

  const handleSearchChange = React.useCallback(
    debounce((searchTerm: string) => {
      const cloneModelFilter = modelFilter
        ? { ...modelFilter }
        : new ClassFilter();
      if (!isEnumerable) {
        if (searchType)
          cloneModelFilter[searchProperty][searchType] = searchTerm;
        else cloneModelFilter[searchProperty] = searchTerm;
      }
      setLoading(true);
      subscription.add(getList);
      getList(cloneModelFilter).subscribe(
        (res: Model[]) => {
          setList(res);
          setLoading(false);
        },
        (err: ErrorObserver<Error>) => {
          setList([]);
          setLoading(false);
        }
      );
    }, DEBOUNCE_TIME_300),
    []
  );

  const handleClearItem = React.useCallback(() => {
    onChange(null);
  }, [onChange]);

  const handleAdd = React.useCallback(() => {
    onAdd();
  }, [onAdd]);

  commonWebService.useClickOutside(wrapperRef, handleCloseSelect);
  return (
    <>
      <div className="select__container" ref={wrapperRef}>
        <div className="select__input" onClick={handleToggle}>
          <InputSelect
            model={internalModel} // value of input, event should change these on update
            render={render}
            isMaterial={isMaterial}
            placeHolder={placeHolder}
            expanded={isExpand}
            disabled={disabled}
            onSearch={handleSearchChange}
            onClear={handleClearItem}
          />
        </div>
        {isExpand && (
          <div className="select__list-container">
            {!loading ? (
              <div className="select__list">
                {list.length > 0 ? (
                  list.map((item, index) => (
                    <div
                      className={classNames("select__item", {
                        "select__item--selected": item.id === internalModel?.id,
                      })}
                      key={index}
                      onClick={handleClickItem(item)}
                    >
                      <span className="select__text">{render(item)}</span>
                    </div>
                  ))
                ) : (
                  <img
                    className="img-emty"
                    src={ASSETS_IMAGE + "/no-data.png"}
                    alt=""
                  />
                )}
              </div>
            ) : (
              <div className="select__loading">
                <Spin tip="Loading..."></Spin>
              </div>
            )}
            <div className="select__divider"></div>
            <div className="select__footer">
              <div className="action__container mt-3">
                <div className="button__add" onClick={handleAdd}>
                  <span>
                    <i className="tio-add_circle_outlined mt-3"></i>{" "}
                    {textFooter}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

SelectAddOption.defaultProps = {
  searchProperty: nameof(Model.prototype.name),
  searchType: nameof(StringFilter.prototype.contain),
  isEnumerable: false,
  render: defaultRenderObject,
  isMaterial: false,
  disabled: false,
};

export default SelectAddOption;
