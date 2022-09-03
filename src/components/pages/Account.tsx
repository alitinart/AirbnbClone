import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { State } from "../../models/state.model";
import { requests } from "../../services/request.provider";
import { refresh } from "../../store/userSlice";
import Loader from "../elements/Loader";

export default function Account() {
  const { user } = useSelector((state: State) => state);
  const [dialog, setDialog] = useState(false);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      nav("/register");
    }
  }, []);

  const nav = useNavigate();
  const dispatch = useDispatch();

  const handleEdit = async (data: any) => {
    if (!user.data || !user.token) {
      return nav("/register");
    }
    if (data.password !== data.retype_password) {
      return toast.error("Passwords don't match");
    }

    let newUser = { ...user.data };
    newUser.email = data.email;
    newUser.fullName = data.fullName;
    newUser.password = data.password;

    requests.userRequests
      .updateUser(newUser, user.token)
      .then(async (res) => {
        if (!user.token) {
          return;
        }

        // Refresh token and user data

        const newAccountData = await requests.userRequests.refreshData(
          user.token
        );

        localStorage.setItem("token", newAccountData.data.token);

        dispatch(
          refresh({
            token: newAccountData.data.token,
            data: newAccountData.data.userData,
          })
        );

        toast.success("Account info has been changed");
        setDialog(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setDialog(false);
      });
  };

  return user.data ? (
    <div className="account">
      <div className="account__greetings">
        <h1>Hello {user.data?.fullName},</h1>
        <p>What can we do for you ?</p>
      </div>
      <div className="account__buttons">
        <button onClick={() => nav("/add-listing")}>Add Listing</button>
        <button onClick={() => setDialog(true)}>Edit Profile</button>
      </div>

      <div className={`account__edit ${dialog ? "account__edit__open" : ""}`}>
        <i className="bi bi-x-circle-fill" onClick={() => setDialog(false)}></i>
        <form
          className="account__edit__dialog"
          onSubmit={handleSubmit(handleEdit)}
        >
          <h1>Edit Profile</h1>
          <input
            type="email"
            className="form_control"
            placeholder="Email"
            defaultValue={user.data.email}
            {...register("email")}
          />
          <input
            type="text"
            className="form_control"
            placeholder="Full Name"
            defaultValue={user.data.fullName}
            {...register("fullName")}
          />
          <input
            type="password"
            className="form_control"
            placeholder="Password"
            {...register("password")}
          />
          <input
            type="password"
            className="form_control"
            placeholder="Retype Password"
            {...register("retype_password")}
          />
          <button className="form__submit" type="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  ) : (
    <></>
  );
}
