"use client";
import { FaUser, FaLock } from "react-icons/fa";

import Link from "next/link";
import AuthButton from "../../subcomponents/AuthButton";
import useSignIn from "./useSignIn";
import CustomAuthInput from "@/components/Common/CustomInput/CustomAuthInput";

import { useTranslations } from "next-intl";

const SignInForm = ({ AuthButtonTitle }: { AuthButtonTitle: string }) => {
  const t = useTranslations("LoginPage.form");
  const { email, setEmail, password, setPassword, handleSubmit, loading } =
    useSignIn();
  return (
    <>
      <CustomAuthInput
        name="username"
        label={t("usernameLabel")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon={<FaUser />}
      />
      <CustomAuthInput
        name="password"
        label={t("passwordLabel")}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        icon={<FaLock />}
        className="mt-6"
      />
      {/* <Link
        href="/auth/forget-password"
        className="block text-right text-grayscale-500 text-sm font-medium mt-2 hover:text-greenAccent-900"
      >
        {t("forgotPasswordButton")}
      </Link> */}
      <div className="flex justify-between items-center  mx-0.5">
        <Link
          href="/auth/signup"
          className="block text-right text-grayscale-500 text-sm font-medium mt-2.5 hover:text-greenAccent-900"
        >
          {t("createAccountButton")}
        </Link>
        <Link
          href="/auth/forget-password"
          className="block text-right text-grayscale-500 text-sm font-medium mt-2.5 hover:text-greenAccent-900"
        >
          {t("forgotPasswordButton")}
        </Link>
      </div>
      <AuthButton
        title={AuthButtonTitle}
        onClick={handleSubmit}
        loading={loading}
      />
    </>
  );
};

export default SignInForm;
