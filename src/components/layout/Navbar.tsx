import Logo from "/src/assets/images/GroupedLogo.svg";
import SmallLogo from "/src/assets/images/Logo.svg";
import SearchIcon from "/src/assets/images/icons/Search.svg";
import PersonIcon from "/src/assets/images/icons/Person.svg";
import Hamburger from "/src/assets/images/icons/Hamburger.svg";
import Leave from "/src/assets/images/icons/Leave.svg";

import { Link, useNavigate } from "react-router-dom";
import { RefObject, useRef, useState } from "react";
import FieldContainer from "../elements/FieldContainer";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../models/state.model";
import { logout } from "../../store/userSlice";

export default function Navbar() {
  const nav = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);
  const [advancedFilter, setAdvancedFilter] = useState(false);

  const sidebarRef = useRef<HTMLElement>(null);
  const { user } = useSelector((state: State) => state);
  const dispatch = useDispatch();

  const menuHandler = () => {
    setOpenMenu((prevState) => !prevState);
    if (openMenu) {
      return sidebarRef.current?.classList.remove("navbar__sidebar__open");
    }
    sidebarRef.current?.classList.add("navbar__sidebar__open");
  };

  return (
    <>
      <div className={`navbar ${advancedFilter ? "navbar__fill" : ""}`}>
        <div onClick={() => nav("/")} className="navbar__branding">
          <img
            className="navbar__branding__logo"
            src={Logo}
            alt="Airbnb Logo"
          />
          <img
            className="navbar__branding__smallLogo"
            src={SmallLogo}
            alt="Airbnb Logo"
          />
        </div>
        <div className="navbar__filter">
          <p className="navbar__filter__option">Anywhere</p>
          <p className="navbar__filter__option">Any Week</p>
          <p className="navbar__filter__option">Add Guests</p>
          <button
            onClick={() => setAdvancedFilter(true)}
            className="navbar__filter__searchButton"
          >
            <img src={SearchIcon} alt="Search Icon" />
          </button>

          <div
            className={`navbar__filter__advanced ${
              advancedFilter ? "navbar__filter__advanced__show" : ""
            }`}
          >
            <div className="navbar__filter__advanced__options">
              <p className="navbar__filter__advanced__options__option">Stays</p>
              <p className="navbar__filter__advanced__options__option">
                Experiences
              </p>
              <p className="navbar__filter__advanced__options__option">
                Online Experiences
              </p>
            </div>
            <FieldContainer leaveMenu={setAdvancedFilter} />
          </div>
        </div>
        <div className="navbar__account">
          {!user.token ? (
            <Link to={"/register"} className="navbar__account__host">
              Become Host
            </Link>
          ) : (
            <p
              className="navbar__account__logout"
              onClick={() => {
                dispatch(logout());
              }}
            >
              Logout
            </p>
          )}
          <button
            onClick={() => nav("/account")}
            className="navbar__account__accountButton"
          >
            <img src={PersonIcon} alt="Search Icon" />
          </button>
        </div>
        <img
          onClick={menuHandler}
          src={!openMenu ? Hamburger : Leave}
          alt="Open Menu"
          className="navbar__icon navbar__hamburger"
        />
        <div
          ref={sidebarRef as RefObject<HTMLDivElement>}
          className={`navbar__sidebar`}
        >
          <div className="navbar__sidebar__filter">
            <p className="navbar__sidebar__filter__option">Anywhere</p>
            <p className="navbar__sidebar__filter__option">Any Week</p>
            <p className="navbar__sidebar__filter__option">Add Guests</p>
            <button className="navbar__sidebar__filter__searchButton">
              <img src={SearchIcon} alt="Search Icon" />
            </button>
          </div>
        </div>
      </div>
      <div className={`tint ${advancedFilter ? "tint__show" : ""}`}></div>
    </>
  );
}
