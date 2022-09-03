import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { State } from "../../../models/state.model";
import { requests } from "../../../services/request.provider";
import Loader from "../../elements/Loader";

export default function Register() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();
  const { user } = useSelector((state: State) => state);

  useEffect(() => {
    if (user.token) {
      nav("/");
    }
  }, []);

  const onSubmit = async (data: any) => {
    if (data.password !== data.retype_password) {
      return toast.error("Password don't match");
    }
    if (data.password.length < 8) {
      return toast.error("Password needs to be atleast 8 characters");
    }

    setLoading(true);
    requests.userRequests
      .registerUser({ ...data })
      .then((res) => {
        toast.success("Your accound has been registered");
        setLoading(false);
        nav("/login");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="register">
      <h1 className="page_title">
        Create your <span className="primary_color">Airbnb</span> Account
      </h1>
      {!loading ? (
        <form className="register__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form_control__row">
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="form_control"
              required
            />
            <input
              {...register("fullName")}
              type="text"
              placeholder="Full Name"
              className="form_control"
              required
            />
          </div>
          <div className="form_control__row">
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="form_control"
              required
            />
            <input
              {...register("retype_password")}
              type="password"
              placeholder="Retype Password"
              className="form_control"
              required
            />
          </div>
          <p className="form_redirect">
            Already have a account ? <Link to="/login">Login</Link>
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
