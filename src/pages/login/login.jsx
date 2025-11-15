import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import isEmpty from "lodash/isEmpty";
import clsx from "clsx";
import validator from "validator";

import { useLogin } from "../../hooks/useLogin";

const Login = () => {
  const navigate = useNavigate();
  const {
    control,
    formState: { errors, isDirty },
    getValues,
  } = useForm({
    defaultValues: {
      emailId: "",
      password: "",
    },
    mode: "onBlur",
  });

  useEffect(() => {
    if (localStorage.getItem("isAuthenticated") === "true") {
      navigate("/notes");
    }
  }, [navigate]);

  const { mutate: loginMutate, isPending } = useLogin();
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <div className="flex flex-col gap-4 shadow-lg rounded-lg p-4 justify-center  dark:bg-neutral items-center m-8 md:m-0 flex-grow md:flex-grow-0 md:w-135 md:h-115">
        <div className="flex flex-col gap-2 w-full">
          <h1 className="text-xl text-primary text-center">Welcome to Todo</h1>
          <h5 className="text-preset-5 text-center text-neutral-500">
            Please login to continue
          </h5>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <Controller
            name="emailId"
            control={control}
            rules={{
              required: "Email ID is required",
              validate: (value) => {
                return (
                  validator.isEmail(value) || "Enter a valid email address"
                );
              },
            }}
            render={({
              field: { onChange, onBlur, value, ref },
              fieldState: { error },
            }) => {
              return (
                <input
                  className={clsx({
                    input: true,
                    "input-error": !isEmpty(error),
                    "w-full": true,
                  })}
                  placeholder="email@example.com"
                  label="Email Address"
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  ref={ref}
                />
              );
            }}
          />

          <Controller
            name="password"
            control={control}
            rules={{
              required: "Password is required",
              validate: (value) => {
                return (
                  validator.isStrongPassword(value) ||
                  "Password should contain at least 8 characters, including uppercase, lowercase, number, and special character."
                );
              },
            }}
            render={({
              field: { onChange, onBlur, value, ref },
              fieldState: { error },
            }) => {
              return (
                <input
                  className={clsx({
                    input: true,
                    "input-error": !isEmpty(error),
                    "w-full": true,
                  })}
                  placeholder="Enter your password"
                  label="Password"
                  type="password"
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  ref={ref}
                />
              );
            }}
          />

          <button
            disabled={!isDirty || !isEmpty(errors) || isPending}
            variant="primary"
            className="w-full mt-2 btn btn-primary"
            onClick={() => {
              loginMutate(getValues(), {
                onSuccess: () => {
                  navigate("/todos");
                },
              });
            }}
          >
            Login
          </button>
        </div>

        <div className="flex flex-row gap-2 items-center">
          <span className="text-neutral-600 text-preset-5">
            No account yet?
          </span>
          <button
            className="text-primarytext-preset-5 cursor-pointer"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
