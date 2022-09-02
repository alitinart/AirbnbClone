import React from "react";
import FieldCounter from "./FieldCounter";
import FieldFilter, { FieldProps } from "./FieldFilter";

import CloseIcon from "/src/assets/images/icons/Leave.svg";
import SearchIcon from "/src/assets/images/icons/Search.svg";

interface Props {
  leaveMenu: Function;
}

export default function FieldContainer({ leaveMenu }: Props) {
  const [fields, setFields] = React.useState<FieldProps[]>([
    {
      label: "Where",
      placeholder: "Search Destinations",
      selectedState: false,
      type: "search",
    },
    {
      label: "Check in",
      placeholder: "Add dates",
      selectedState: false,
      type: "date",
    },
    {
      label: "Check out",
      placeholder: "Add dates",
      selectedState: false,
      type: "date",
    },
    {
      label: "Who",
      placeholder: "Add guests",
      selectedState: false,
      options: [
        <FieldCounter key={1} label="Adults" info="Ages 13 or above" />,
        <hr key={1.5} />,
        <FieldCounter key={2} label="Children" info="Ages 2 - 12" />,
        <hr key={2.5} />,
        <FieldCounter key={3} label="Infants" info="Under 2" />,
        <hr key={3.5} />,
        <FieldCounter
          key={4}
          label="Pets"
          info="Service Animals don't count"
        />,
      ],
    },
  ]);

  const clickHandler = (state: boolean, index: number) => {
    let changedFields = fields.slice();
    changedFields[index].selectedState = !state;
    changedFields.forEach((field, i) => {
      if (i !== index) {
        field.selectedState = false;
      }
    });
    setFields(changedFields);
  };

  const clearHanlder = (setState: Function) => {
    setState("");
  };

  return (
    <div className="navbar__filter__advanced__search">
      {fields.map((field, index) => {
        return (
          <FieldFilter
            key={index}
            {...field}
            onClick={clickHandler}
            index={index}
            clear={clearHanlder}
          />
        );
      })}
      <div className="field clear-field">
        <button onClick={() => leaveMenu(false)} className="field__leave">
          <img src={CloseIcon} alt="Search Icon" />
        </button>
      </div>
    </div>
  );
}
