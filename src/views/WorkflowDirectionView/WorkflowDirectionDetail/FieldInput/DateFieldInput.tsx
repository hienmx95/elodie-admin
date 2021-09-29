import DatePicker from "components/Utility/Calendar/DatePicker/DatePicker";
import { WorkflowDefinition } from "models/WorkflowDefinition";
import { Moment } from "moment";
import React from "react";
import { useTranslation } from "react-i18next";

export interface DateFieldInputProps {
  value: string | number | Moment | boolean | undefined;
  index?: number;
  contents?: WorkflowDefinition[];
  setContents?: (v: WorkflowDefinition[]) => void;
  disabled?: boolean;
}
function DateFieldInput(props: DateFieldInputProps) {
  const [translate] = useTranslation();
  const { value, index, contents, setContents, disabled } = props;
  const handleChange = React.useCallback(
    (moment: Moment) => {
      if (contents) {
        contents[index] = { ...contents[index], value: moment };
        setContents([...contents]);
      }
    },
    [contents, index, setContents]
  );

  return (

    <DatePicker
      isMaterial={true}
      value={value as Moment}
      placeholder={translate("principalContracts.placeholder.startedAt")}
      onChange={handleChange}
      disabled={disabled}
    />
  );
}

export default DateFieldInput;
