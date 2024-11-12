import { useLogin, useTranslate } from "@refinedev/core";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { PiEyeLight } from "react-icons/pi";


type LoginFormInputs = {
  email: string;
  password: string;
  remember: boolean;
};

export type userDataType = {
  email: string;
  password: string;
};

export const CustomLoginPage: React.FC = () => {
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPass, setIsFocusedPass] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isLoading, isError } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const translate = useTranslate();

  const onSubmit = async (data: LoginFormInputs) => {
    login({ ...data });
  };

 

  useEffect(() => {
    if (isError) {
      toast.error(translate("pages.login.errors.invalid", "Invalide credentials"));
    }
  }, [isError, translate]);

  return (
    <article className="flex h-screen justify-center items-center">
      <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex justify-center items-center"
        >
          <div className="flex flex-col rounded-[40px] pt-12 text-black shadow-2xl max-w-[800px] w-1/2 px-[8%] py-8 pb-24">

            <h6 className="text-[32px] font-semibold">Login to your account</h6>
            <label
              htmlFor="email-input"
              className="mt-8 mb-2 flex justify-start"
            >
              <p>{translate("pages.login.fields.email", "Email")}</p>
              <p className="text-red-500 ml-1">*</p>
            </label>
            <div
              className={`flex items-stretch border rounded-xl overflow-hidden  ${
                errors.email
                  ? "border-red-500 text-red-500"
                  : isFocusedEmail
                  ? "border-[#3170B5]"
                  : "border-gray-300"
              }`}
            >
              <input
                id="email-input"
                type="email"
                autoComplete="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value:
                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
                className={`pt-3 pb-3 px-4 border-0 bg-inherit w-full focus:bg-transparent`}
                onFocus={() => setIsFocusedEmail(true)}
                onBlur={() => setIsFocusedEmail(false)}
              />
            </div>

            <label
              htmlFor="password-input"
              className="mt-6 mb-2 flex justify-start"
            >
              <p>{translate("pages.login.fields.password", "Password")}</p>
              <p className="text-red-500 ml-1">*</p>
            </label>
            <div
              className={`flex items-stretch border rounded-xl overflow-hidden ${
                errors.password
                  ? "border-red-500 text-red-500"
                  : isFocusedPass
                  ? "border-[#3170B5]"
                  : "border-gray-300"
              } `}
            >
              <input
                id="password-input"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
                className={`bg-inherit border-0 w-full px-4`}
                onFocus={() => setIsFocusedPass(true)}
                onBlur={() => setIsFocusedPass(false)}
              />
              <button
                type="button"
                className="bg-inherit px-2 text-sm h-12 flex justify-center items-center border-0"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <PiEyeLight size={24} />
                ) : (
                  <AiOutlineEyeInvisible size={24} />
                )}
              </button>
            </div>

            <p className="text-xs font-light mt-3">
              Must have at least two characters, and don’t start with a number
            </p>

            <div className="mt-10 flex flex-col">
              {/* <Link to="/change-password" className="text-sm font-medium mb-1">
                Reset Password?
              </Link> */}
              <button
                type="submit"
                className={`mt-2 py-2 px-4 border-none   rounded disabled:opacity-50 w-full ${
                  !errors.password && !errors.email
                    ? " bg-btn_primary text-white font-semibold"
                    : "bg-[#c7c7c7] border-4 text-black "
                }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex justify-center items-center">
                    <ClipLoader
                      color={"#fff"}
                      loading={true}
                      size={24}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </div>
                ) : (
                  <div className="flex gap-1 items-center justify-center">
                    {translate("pages.login.signin", "Login now")}
                  </div>
                )}
              </button>
            </div>
          </div>
        </form>
      <ToastContainer />
    </article>
  );
};
