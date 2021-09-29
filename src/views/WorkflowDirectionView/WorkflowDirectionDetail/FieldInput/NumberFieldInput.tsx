import InputNumber, {
  DECIMAL
} from "components/Utility/Input/InputNumber/InputNumber";
import { WorkflowDefinition } from "models/WorkflowDefinition";
import { Moment } from "moment";
import React from "react";


export interface NumberInputProps {
  value?: string | number | Moment | boolean | undefined;
  contents?: WorkflowDefinition[];
  index?: number;
  setContents?: (v: WorkflowDefinition[]) => void;
  disabled?: boolean;
}

function NumberFieldInput(props: NumberInputProps) {
  const { value: defaultValue, contents, index, setContents, disabled } = props;

  const handleChange = React.useCallback(
    (value: number) => {
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
    />

  );
}

export default NumberFieldInput;
