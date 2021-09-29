import { debounce } from "@react3l/react3l/helpers";
import InputText from "components/Utility/Input/InputText/InputText";
import { PermissionContent } from "models/PermissionContent";
import { Moment } from "moment";
import React from "react";
import { useTranslation } from "react-i18next";



export interface StringFieldInputProps {

    value?: string | number | Moment | boolean | undefined;
    contents?: PermissionContent[];
    index?: number;
    setContents?: (v: PermissionContent[]) => void;
    disabled?: boolean;
}

function StringFieldInput(props: StringFieldInputProps) {
    const [translate] = useTranslation();
    const {
        value: defaultValue = '',
        contents,
        index,
        setContents,
        disabled,
    } = props;

    const handleChange = React.useCallback(
        debounce((value) => {
            if (contents) {
                contents[index] = { ...contents[index], value };
                setContents([...contents]);
            }
        }),
        [contents, index, setContents]
    );
    return (

        <InputText
            isMaterial={true}
            value={String(defaultValue)}
            placeHolder={translate(
                "permisiions.placeholder.stringFiled"
            )}
            className={"tio-filter_list"}
            onChange={handleChange}
            disabled={disabled}
        />
    );
}

export default StringFieldInput;
