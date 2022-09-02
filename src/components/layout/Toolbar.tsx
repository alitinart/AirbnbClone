import { Link, useLocation } from "react-router-dom";
import PersonIcon from "/src/assets/images/icons/Person.svg";

export default function Toolbar() {
  const { pathname } = useLocation();

  return (
    <div className="toolbar">
      <Link
        to={"/"}
        className={`toolbar__item ${pathname === "/" ? "active" : ""}`}
      >
        <i className="bi bi-house-fill"></i>
        <p className="toolbar__item__text">Home</p>
      </Link>
      <Link
        to={"/account"}
        className={`toolbar__item ${pathname === "/account" ? "active" : ""}`}
      >
        <img src={PersonIcon} alt="Account" className="toolbar__item__icon" />
        <p className="toolbar__item__text">Account</p>
      </Link>
    </div>
  );
}
