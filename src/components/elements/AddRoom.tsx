import AddIcon from "/src/assets/images/icons/AddIcon.svg";
import RemoveIcon from "/src/assets/images/icons/RemoveIcon.svg";

interface Props {
  add: Function;
  remove: Function;
  name: string;
  count: number;
  index: number;
}

export default function AddRoom({ add, remove, count, name, index }: Props) {
  return (
    <div className="room_counter">
      <div className="room_counter__info">
        <p className="room_counter__info__label">{name}</p>
      </div>
      <div className="counter">
        <div className="counter__state">
          <img
            className="counter__icon"
            onClick={() => {
              add(index);
            }}
            src={AddIcon}
            alt="Add Room"
          />
          <p className="counter__count">{count}</p>
          <img
            className="counter__icon"
            onClick={() => {
              remove(index);
            }}
            src={RemoveIcon}
            alt="Remove Room"
          />
        </div>
      </div>
    </div>
  );
}
