import * as React from "react";

export interface FieldProps {
  label: string;
  placeholder: string;
  options?: any[];
  type?: string;
  index?: number;
  selectedState: boolean;
  clear?: Function;
  onClick?: Function;
}

export default function FieldFilter({
  label,
  placeholder,
  options,
  type,
  index,
  selectedState,
  clear,
  onClick,
}: FieldProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <>
      <div
        className={`field ${selectedState ? "field-selected" : ""}`}
        onClick={() => {
          onClick?.(selectedState, index);
          if (selectedState) {
            return inputRef.current?.blur();
          }
          inputRef.current?.focus();
        }}
      >
        <p className="field__label">{label}</p>
        {options ? <p className="placeholder">{placeholder}</p> : <></>}

        <div className="field__select">
          {type ? (
            <input
              ref={inputRef}
              type={type}
              className="field__select__input"
              placeholder={placeholder}
            />
          ) : (
            ""
          )}
        </div>
      </div>
      {options ? (
        <div
          className={`field__select__options ${
            options && selectedState ? "field__select__options__open" : ""
          }`}
        >
          {options ? (
            options.map((option) => {
              return option;
            })
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
