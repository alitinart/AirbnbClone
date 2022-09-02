import { useLocation, useNavigate } from "react-router-dom";

interface Props {
  icon: string;
  text: string;
  queryParam: string;
}

export default function FilterOption({ icon, text, queryParam }: Props) {
  const params: any = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop: any) => searchParams.get(prop),
  });
  const nav = useNavigate();

  return (
    <div
      className={`filters__option ${
        params.filter === queryParam
          ? "active-option"
          : window.location.pathname === "/" &&
            !params.filter &&
            queryParam === "none"
          ? "active-option"
          : ""
      }`}
      onClick={() => {
        if (queryParam !== "none") {
          return nav({
            pathname: "/",
            search: `?filter=${queryParam}`,
          });
        }

        nav("/");
      }}
    >
      <i className={`bi bi-${icon}`}></i>
      <p>{text}</p>
    </div>
  );
}
