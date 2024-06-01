import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import HomePageLayout from "../../components/HomePageLayout";
import { images } from "../../constants";
import { useLogInUser } from "../../services/mutations/users";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../store/userSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo: user } = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);

  const logInUserMutation = useLogInUser((data) => {
    dispatch(setUserInfo(data));
    localStorage.setItem("account", JSON.stringify(data));
    navigate("/");
  });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    console.log("data submitted", data);
    const { email, password } = data;
    logInUserMutation.mutate({ email, password });
  };

  return (
    <HomePageLayout>
      <div className="w-96 bg-light-bg mx-auto mt-10 py-4 px-8 rounded-2xl flex flex-col items-center gap-8 shadow-[0_4px_4px_0_rgba(0,0,0,0.25),0_0_1px_0_rgba(0,0,0,0.1)]">
        <img src={images.Logo} alt="logo" className="h-3.5" />

        <h3 className="text-4xl font-bold">Log In</h3>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2.5 w-full"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Enter a valid email",
                },
                required: {
                  value: true,
                  message: "Email is required",
                },
              })}
              id="email"
              className="p-3 rounded-md border-2 border-dark-hard"
              placeholder="Enter your email..."
            />
            {errors?.email?.message && (
              <p className="text-red-700 text-xs">{errors?.email?.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <div className="flex items-center justify-between border-2 border-dark-hard rounded-md p-3 bg-white">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  minLength: {
                    value: 8,
                    message: "Password length must be at least 8 character",
                  },
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                })}
                id="password"
                className="w-[calc(100%-34px)] outline-none"
                placeholder="Enter your password..."
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="bg-white"
              >
                {showPassword ? (
                  <FaEyeSlash className="text-dark-soft w-8" />
                ) : (
                  <FaEye className="text-dark-soft w-8" />
                )}
              </button>
            </div>
            {errors?.password?.message && (
              <p className="text-red-700 text-xs">
                {errors?.password?.message}
              </p>
            )}
          </div>

          <div className="text-sm flex gap-1">
            <p>Do not have an account?</p>
            <Link
              to={"/signup"}
              className="text-light-hard underline font-bold"
            >
              Sign Up
            </Link>
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className="text-2xl bg-light-soft hover:bg-light-hard px-11 py-3 font-extrabold text-white rounded-md mt-8 transition-colors duration-200 disabled:opacity-[40%] disabled:cursor-not-allowed disabled:hover:bg-light-soft"
          >
            Log In
          </button>
        </form>
      </div>
    </HomePageLayout>
  );
};
export default LoginPage;
