import InputNumber, {
    DECIMAL
} from "components/Utility/Input/InputNumber/InputNumber";
import { PermissionContent } from "models/PermissionContent";
import { Moment } from "moment";
import React from "react";
import { useTranslation } from "react-i18next";



export interface NumberInputProps {
    value?: string | number | Moment | boolean | undefined;
    contents?: PermissionContent[];
    index?: number;
    setContents?: (v: PermissionContent[]) => void;
    disabled?: boolean;
}

function NumberFieldInput(props: NumberInputProps) {
    const { value: defaultValue, contents, index, setContents, disabled } = props;
    const [translate] = useTranslation();

    const handleChange = React.useCallback(
        (value) => {
            if (contents) {
                contents[index] = { ...contents[index], value };
                setContents([...contents]);
            }
        },
        [contents, index, setContents]
    );

    return (

        <InputNumber
            value={defaultValue ? +defaultValue : 0}
            onChange={handleChange}
            disabled={disabled}
            numberType={DECIMAL}
            isMaterial={true}
            placeHolder={translate('permisiions.placeholder.stringFiled')}
        />
    );
}

export default NumberFieldInput;
