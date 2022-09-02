import { Link, useLocation } from "react-router-dom";

export default function HomeButton() {
  const { pathname } = useLocation();

  return (
    <Link
      to={"/"}
      className={`home_button ${pathname !== "/" ? "shown" : ""}`}
    >
      <i className="bi bi-house-fill"></i>
    </Link>
  );
}
