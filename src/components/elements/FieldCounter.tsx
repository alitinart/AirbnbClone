import * as React from "react";
import AddIcon from "/src/assets/images/icons/AddIcon.svg";
import RemoveIcon from "/src/assets/images/icons/RemoveIcon.svg";

interface Props {
  label: string;
  info: string;
}

export default function FieldCounter({ label, info }: Props) {
  const [count, setCount] = React.useState(0);

  return (
    <div className="field_counter">
      <div className="field_counter__info">
        <p className="field_counter__info__label">{label}</p>
        <p className="field_counter__info__info">{info}</p>
      </div>
      <div className="counter">
        <div className="counter__state">
          <img
            className="counter__icon"
            onClick={() => {
              setCount((prevstate) => prevstate + 1);
            }}
            src={AddIcon}
            alt="Add Guests"
          />
          <p className="counter__count">{count}</p>
          <img
            className="counter__icon"
            onClick={() => {
              setCount((prevstate) => {
                if (prevstate !== 0) {
                  return prevstate - 1;
                }
                return prevstate;
              });
            }}
            src={RemoveIcon}
            alt="Remove Guests"
          />
        </div>
      </div>
    </div>
  );
}
