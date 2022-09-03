import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { State } from "../../../models/state.model";
import { requests } from "../../../services/request.provider";
import { login } from "../../../store/userSlice";
import Loader from "../../elements/Loader";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: State) => state);

  useEffect(() => {
    if (user.token) {
      nav("/");
    }
  }, []);

  const onSubmit = (data: any) => {
    setLoading(true);
    requests.userRequests
      .loginUser({ ...data })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        const decode = JSON.parse(atob(res.data.token.split(".")[1]));

        dispatch(login({ token: res.data.token, data: decode }));

        setLoading(false);
        nav("/");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="login">
      <h1 className="page_title">
        Login in into your <span className="primary_color">Airbnb</span> Account
      </h1>
      {!loading ? (
        <form className="register__from" onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="form_control"
            required
          />
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="form_control"
            required
          />
          <p className="form_redirect">
            Don't have a account ? <Link to="/register">Register</Link>
          </p>
          <button className="form__submit" type="submit">
            Submit
          </button>
        </form>
      ) : (
        <Loader />
      )}
    </div>
  );
}
